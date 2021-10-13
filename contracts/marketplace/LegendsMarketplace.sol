// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./escrow/LegendsAuctioneer.sol";
import "../control/LegendsLaboratory.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./listings/LegendAuction.sol";
import "./listings/LegendOffer.sol";

contract LegendsMarketplace is
    LegendsAuctioneer,
    LegendAuction,
    LegendOffer,
    ReentrancyGuard
{
    using SafeMath for uint256; // try to get rid of

    // uint256 public _marketplaceFee; commented out for testing
    uint256 public _marketplaceFee = 2;

    // uint256 public _royaltyFee; commented out for testing
    uint256 public _royaltyFee = 2;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    constructor() {
        lab = LegendsLaboratory(payable(msg.sender));
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
        IERC721 legendsNFT = IERC721(nftContract);

        require(legendsNFT.ownerOf(tokenId) == msg.sender); // ? reworkable; to modifier?
        require(price > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        _createLegendSale(nftContract, tokenId, price);
    }

    function buyLegend(uint256 listingId) public payable nonReentrant {
        LegendListing memory l = legendListing[listingId];

        require(l.status == ListingStatus.Open);
        require(msg.sender != l.seller, "Seller can not buy");
        require(msg.value == l.price, "Incorrect price submitted for item");

        // //TODO: finish after access control rework ; thoughout
        // uint256 labFee = (l.price * _marketplaceFee) / 100;
        // // _asyncTransfer(l.seller, _marketplaceFee);

        (
            uint256 marketFee,
            uint256 royaltyFee,
            address legendCreator
        ) = _calculateFees(listingId);

        _asyncTransferRoyalty(legendCreator, royaltyFee);

        _asyncTransfer(l.seller, (msg.value - (marketFee + royaltyFee)));

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
        IERC721 legendsNFT = IERC721(nftContract);

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

    //TODO: ? look at making more modular
    function placeBid(uint256 listingId) public payable {
        AuctionDetails storage a = auctionDetails[listingId];
        LegendListing storage l = legendListing[listingId];

        require(l.status == ListingStatus.Open);
        require(!isExpired(listingId), "Auction has expired");
        require(msg.sender != l.seller, "Seller can not bid");

        if (a.bidders.length == 0) {
            require(msg.value >= a.startingPrice, "Minimum price not met");
        }

        uint256 newBid = bids[listingId][msg.sender].add((msg.value));
        require(newBid > a.highestBid, "Bid must be higher than current bid");

        _withdrawAllowed[listingId][msg.sender] = false;

        // bids[listingId][msg.sender] = newBid; // redundant LAuction.sol ~70
        _asyncTransferBid(listingId, payable(msg.sender), newBid);

        // Allow previous highest bidder to reclaim or increase their bid
        _withdrawAllowed[listingId][a.highestBidder] = true; // ! does not allow for bid increase

        _placeBid(listingId, newBid);

        if (a.instantBuy) {
            if (newBid >= instantBuyPrice[listingId]) {
                //TODO: do not allow user input over IB-price on FE
                _closeAuction(listingId);
                _withdrawAllowed[listingId][l.seller] = true;
            }
        }
    }

    function withdrawBid(uint256 listingId) external payable {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender != l.seller);

        _withdrawBid(listingId, payable(msg.sender));

        if (legendListing[listingId].isAuction) {
            bids[listingId][msg.sender] = 0;
        }

        _withdrawAllowed[listingId][msg.sender] = false;
    }

    function makeLegendOffer(address nftContract, uint256 tokenId)
        public
        payable
        nonReentrant
    {
        IERC721 legendsNFT = IERC721(nftContract);

        //TODO:  owner cant be... make dynamic offer blacklist
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
        IERC721 legendsNFT = IERC721(l.nftContract);

        require(
            legendsNFT.ownerOf(l.tokenId) == msg.sender &&
                msg.sender == o.tokenOwner,
            "Not authorized"
        );
        require(block.timestamp < o.expirationTime, "Offer is expired");
        require(l.status == ListingStatus.Open);

        if (isAccepted) {
            legendsNFT.transferFrom(msg.sender, address(this), l.tokenId);
            _acceptLegendOffer(listingId);

            (
                uint256 marketFee,
                uint256 royaltyFee,
                address legendCreator
            ) = _calculateFees(listingId);

            _obligateBid(
                listingId,
                l.buyer,
                msg.sender,
                marketFee,
                royaltyFee,
                legendCreator
            ); // ? move into closeListing

            _withdrawAllowed[listingId][msg.sender] = true; // ? move into closeListing
        } else {
            /**
             * Token owner can also just let the offer expire
             * if they do not wish to pay gas to reject
             */

            _rejectLegendOffer(listingId);
            _withdrawAllowed[listingId][l.buyer] = true;
        }
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
            // ! this must be reworked if we use ierc721 escrow
            IERC721(l.nftContract).transferFrom(
                address(this),
                l.seller,
                l.tokenId
            );
        }

        _cancelLegendListing(listingId);
    }

    function closeListing(uint256 listingId) external payable {
        LegendListing storage l = legendListing[listingId];
        AuctionDetails storage a = auctionDetails[listingId];

        require(
            msg.sender == l.seller ||
                msg.sender == l.buyer ||
                msg.sender == a.highestBidder,
            "Not authorized to close"
        );

        if (l.isAuction) {
            if (l.status == ListingStatus.Open) {
                require(isExpired(listingId), "Auction has not expired");

                _closeAuction(listingId);

                (
                    uint256 marketFee,
                    uint256 royaltyFee,
                    address legendCreator
                ) = _calculateFees(listingId);

                _obligateBid(
                    listingId,
                    a.highestBidder,
                    l.seller,
                    marketFee,
                    royaltyFee,
                    legendCreator
                );
                _withdrawAllowed[listingId][l.seller] = true;
            }
        }

        if (msg.sender == l.seller) {
            _claimPayment(listingId);
        } else if (msg.sender == l.buyer) {
            _claimLegend(listingId);
        }

        // emit PaymentClaimed(listingId, msg.sender);
    }

    function _claimLegend(uint256 listingId) internal {
        LegendListing memory l = legendListing[listingId];

        require(msg.sender == l.buyer);
        require(l.status == ListingStatus.Closed);

        uint256 legendOwed = _legendOwed[listingId][l.buyer];
        require(legendOwed != 0);

        _legendOwed[listingId][l.buyer] = 0;

        IERC721(l.nftContract).transferFrom(address(this), l.buyer, legendOwed);
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

        require(amount != 0, "Address is owed 0");

        _withdrawPayments(listingId, l.seller);
    }

    function claimRoyalties() external {
        uint256 amount = royalties(msg.sender);
        require(amount != 0, "Royalties are 0");

        _withdrawRoyalties(payable(msg.sender));
    }

    function _calculateFees(uint256 listingId)
        internal
        view
        returns (
            uint256,
            uint256,
            address
        )
    {
        LegendListing memory l = legendListing[listingId];

        //TODO: finish after access control rework ; throughout
        uint256 marketFee = (l.price * _marketplaceFee) / 100;
        // _asyncTransfer(l.seller, _marketplaceFee);

        uint256 royaltyFee;
        address legendCreator = lab.fetchRoyaltyRecipient(l.tokenId);

        // ? no fees if buyer is creator ;; royalty blacklist probably needed
        if (legendCreator != address(0)) {
            if (legendCreator != l.seller)
                royaltyFee = (l.price * _royaltyFee) / 100;
        }

        return (marketFee, royaltyFee, legendCreator);
    }

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        _marketplaceFee = newFee;
    }
}
