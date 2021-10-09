// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./escrow/LegendsAuctioneer.sol";
import "../control/LegendsLaboratory.sol";
import "../legend/LegendsNFT.sol"; // remove, use an interface/abstract where needed
import "./listings/LegendAuction.sol";
import "./listings/LegendOffer.sol";

/** TODO:
 * incorporate royalties
 * add offer functionality (linked with all legends page)
 * add require error messages
 */

contract LegendsMarketplace is
    ReentrancyGuard,
    LegendsAuctioneer,
    LegendAuction,
    LegendOffer
{
    using SafeMath for uint256; // try to get rid of

    event BidRefunded(uint256 listingId, address bidder, uint256 bidAmount);

    uint256 public marketplaceFee;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    constructor() {
        lab = LegendsLaboratory(msg.sender);
    }

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        marketplaceFee = newFee;
    }

    function fetchListingCounts()
        public
        view
        returns (Counters.Counter[3] memory)
    {
        Counters.Counter[3] memory counts = [
            _listingIds,
            _listingsClosed,
            _listingsCancelled
        ];

        return counts;
    }

    function createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender); // ? reworkable; to modifier?
        require(price > 0, "Price can not be 0");

        // _asyncTransferLegend(address(0), tokenId);
        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendSale(nftContract, tokenId, price);
    }

    function buyLegend(uint256 listingId) public payable nonReentrant {
        LegendListing memory l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        require(msg.sender != l.seller, "Seller can not buy");
        require(msg.value == l.price, "Incorrect price submitted for item");

        // uint256 laboratoryFee = (l.price * marketplaceFee) / 100;
        // TODO:  include royality payment logic
        // TODO: include Lab fee

        _asyncTransfer(l.seller, msg.value);

        _buyLegend(listingId);

        _withdrawAllowed[listingId][l.seller] = true;
    }

    function createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantPrice
    ) public payable nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(startingPrice > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        _createLegendAuction(
            nftContract,
            tokenId,
            duration,
            startingPrice,
            instantPrice
        );
    }

    //TODO: look at making more modular
    function placeBid(uint256 listingId) public payable {
        AuctionDetails storage a = auctionDetails[listingId];
        LegendListing storage l = legendListing[listingId];

        require(l.status == ListingStatus.Open, "bad1");
        require(!isExpired(listingId), "Auction has expired");
        require(msg.sender != l.seller, "Seller can not bid");

        if (a.bidders.length == 0) {
            require(msg.value >= a.startingPrice, "Minimum price not met");
        }

        uint256 newBid = bids[listingId][msg.sender].add((msg.value)); // ! thoroughly test without SC
        require(newBid > a.highestBid, "Bid must be higher than current bid"); // ! allowing same price bid

        _withdrawAllowed[listingId][msg.sender] = false;

        // bids[listingId][msg.sender] = newBid; // redundant LAuction.sol 70
        _asyncTransferBid(listingId, payable(msg.sender), newBid);

        // Allow previous highest bidder to reclaim or increase their bid  !! did we test this with PoP??
        _withdrawAllowed[listingId][a.highestBidder] = true;

        _placeBid(listingId, newBid);

        if (a.instantBuy) {
            if (newBid >= instantBuyPrice[listingId]) {
                //TODO: do not allow user input over IB-price on FE
                _closeAuction(listingId);
                _withdrawAllowed[listingId][l.seller] = true;
            }
        }
    }

    function debugBid(uint256 listingId) external payable {
        uint256 newBid = bids[listingId][msg.sender].add((msg.value)); // ! thoroughly test without SC

        _asyncTransferBid(listingId, payable(msg.sender), newBid);

        _placeBid(listingId, newBid);
    }

    //TODO: change name to accommodate offer
    function withdrawBid(uint256 listingId) external payable {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender != l.seller);

        _withdrawBid(listingId, payable(msg.sender));

        if (legendListing[listingId].isAuction) {
            bids[listingId][msg.sender] = 0;
        }

        _withdrawAllowed[listingId][msg.sender] = false;

        emit BidRefunded(listingId, msg.sender, payments(msg.sender)); // will error ; payments not set up for bidders
    }

    function makeLegendOffer(address nftContract, uint256 tokenId)
        public
        payable
        // uint256 price
        nonReentrant
    {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        // require(legendsNFT.ownerOf(tokenId) == msg.sender); // ? reworkable
        // owner cant be... make dynamic offer blacklist
        require(msg.value > 0, "Price can not be 0");

        address tokenOwner = legendsNFT.ownerOf(tokenId);

        uint256 listingId = _makeLegendOffer(nftContract, tokenOwner, tokenId);

        _withdrawAllowed[listingId][msg.sender] = false;

        _asyncTransferBid(listingId, msg.sender, msg.value);
    }

    function decideLegendOffer(uint256 listingId, bool isAccepted)
        external
        payable
        nonReentrant
    {
        LegendListing memory l = legendListing[listingId];
        OfferDetails memory o = offerDetails[listingId];
        LegendsNFT legendsNFT = LegendsNFT(l.nftContract);

        require(
            legendsNFT.ownerOf(l.tokenId) == msg.sender &&
                msg.sender == o.tokenOwner,
            "Not authorized"
        );
        require(block.timestamp < o.expirationTime, "Offer is expired");
        require(l.status == ListingStatus.Open);

        // uint256 laboratoryFee = (l.price * marketplaceFee) / 100;
        // TODO:  include royality payment logic
        // TODO: include Lab fee

        if (isAccepted) {
            legendsNFT.transferFrom(msg.sender, address(this), l.tokenId);
            _acceptLegendOffer(listingId);

            _obligateBid(listingId, l.buyer, msg.sender);

            _withdrawAllowed[listingId][msg.sender] = true; // make sure l.seller is updated intime
        } else {
            /**
             * Token owner can also just let the offer expire
             * if they do not wish to pay gas to reject
             */

            _rejectLegendOffer(listingId);
            _withdrawAllowed[listingId][l.buyer] = true;
        }
    }

    function closeListing(uint256 listingId) external payable {
        LegendListing storage l = legendListing[listingId];
        // AuctionDetails storage a = auctionDetails[listingId];

        require(
            msg.sender == l.seller ||
                msg.sender == l.buyer ||
                msg.sender == auctionDetails[listingId].highestBidder,
            "Not authorized to close"
        );

        // ?! add some type of closing bonus
        if (l.isAuction) {
            if (l.status == ListingStatus.Open) {
                require(isExpired(listingId), "Auction has not expired");

                _closeAuction(listingId);
                _obligateBid(
                    listingId,
                    auctionDetails[listingId].highestBidder,
                    l.seller
                );
                _withdrawAllowed[listingId][l.seller] = true;
            }
        }

        if (msg.sender == l.seller) {
            _claimPayment(listingId);
        } else if (msg.sender == l.buyer) {
            _claimLegend(listingId);
        }

        emit PaymentClaimed(listingId, msg.sender); // TODO: change name of event, and possibly params
    }

    function cancelLegendListing(uint256 listingId) public nonReentrant {
        LegendListing memory l = legendListing[listingId];
        require(l.status == ListingStatus.Open);

        if (l.isOffer) {
            require(msg.sender == l.buyer);
        } else {
            require(msg.sender == l.seller);
        }

        if (l.isAuction) {
            require(
                auctionDetails[listingId].bidders.length == 0,
                "Bids already placed"
            );
        }

        if (l.isOffer) {
            _withdrawAllowed[listingId][msg.sender] = true;
        } else {
            // this must be reworked if we get ierc721 escrow
            LegendsNFT(l.nftContract).transferFrom(
                address(this),
                l.seller,
                l.tokenId
            );
        }

        _cancelLegendListing(listingId);
    }

    function _claimLegend(uint256 listingId) internal {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.buyer);
        require(l.status == ListingStatus.Closed);

        uint256 legendOwed = _legendOwed[listingId][l.buyer];
        require(legendOwed != 0);

        _legendOwed[listingId][l.buyer] = 0;

        LegendsNFT(l.nftContract).transferFrom(
            address(this),
            l.buyer,
            legendOwed
        );
    }

    function _claimPayment(uint256 listingId) internal {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Closed);

        //TODO: subtract fees
        uint256 amount;

        if (!l.isAuction) {
            amount = payments(l.seller);
        } else if (l.isAuction) {
            amount = payments(l.buyer);
        }

        // if (l.isOffer) {
        //     amount = payments(l.seller);
        // } else if (l.isAuction) {
        //     amount = payments(l.buyer);
        // } else if (!l.isAuction && !l.isOffer) {
        //     amount = payments(l.seller);
        // }

        require(amount != 0, "Address is owed 0");

        // if (!l.isAuction) {
        _withdrawPayments(listingId, l.seller);
        // } else if (l.isAuction) {
        // _withdrawPayments(listingId, l.seller);
        // _closeAuction(listingId);
        // _withdrawAllowed[listingId][l.seller] = true;
        // }
    }
}
