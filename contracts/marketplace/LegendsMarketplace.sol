// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./escrow/LegendsAuctioneer.sol";
import "../control/LegendsLaboratory.sol";
import "../legend/LegendsNFT.sol"; // remove, use an interface/abstract where needed
import "./listings/LegendAuction.sol";

/** TODO:
 * incorporate royalties
 * add offer functionality (linked with all legends page)
 * FE: sort by listing type
 * can not buy,bid,match, with own listing
 * add require error messages
 */

contract LegendsMarketplace is
    LegendAuction,
    LegendsAuctioneer,
    ReentrancyGuard
{
    // using SafeMath for uint256; // try to get rid of

    // event ListingStatusChanged(uint256 listingId, ListingStatus status);

    uint256 public marketplaceFee;

    address payable owner;
    LegendsLaboratory lab;

    // mapping(ListingType => mapping(uint256 => mapping(address => uint256)))
    //     public listingsEntered;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    constructor() {
        owner = payable(msg.sender);
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

    //TODO: check out returing array of structs
    // function fetchLegendListings()
    //     public
    //     view
    //     returns (LegendListing memory)
    // {
    //     LegendListing memory counts = [
    //         _listingIds,
    //         _listingsClosed,
    //         _listingsCancelled
    //     ];

    //     return counts;
    // }


    function createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender); // ? reworkable
        require(price > 0, "Price can not be 0");

        // _asyncTransferLegend(address(0), tokenId);
        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendSale(nftContract, tokenId, price);

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function buyLegend(uint256 listingId) public payable nonReentrant {
        LegendListing memory l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        require(msg.value == l.price, "Incorrect price submitted for item");

        // uint256 laboratoryFee = (l.price * marketplaceFee) / 100;
        // TODO:  include royality payment logic
        // TODO: include Lab fee

        _asyncTransfer(l.seller, msg.value);

        _buyLegend(listingId);

        _withdrawAllowed[listingId][l.seller] = true;

        // emit ListingStatusChanged(listingId, TradeStatus.Closed);
    }

    // function cancelLegendSale(uint256 listingId)
    //     public
    //     // payable
    //     nonReentrant
    // {
    //     LegendListing memory l = legendListing[listingId];
    //     require(msg.sender == l.seller);
    //     require(l.status == ListingStatus.Open);

    //     // this must be reworked if we get ierc721 escrow
    //     LegendsNFT(l.nftContract).transferFrom(
    //         address(this),
    //         l.seller,
    //         l.tokenId
    //     );
    //     _cancelLegendSale(listingId);

    //     // emit ListingStatusChanged(listingId, TradeStatus.Cancelled);
    // }

    // TODO: take into account cancels
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

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function placeBid(uint256 listingId) public payable {
        AuctionDetails storage a = auctionDetails[listingId];
        LegendListing storage l = legendListing[listingId];

        require(l.status == ListingStatus.Open);
        require(!queryExpiration(listingId), "Auction has expired");
        // require(msg.sender != a.seller, "Seller can not bid"); // disabled for testing

        if (a.bidders.length == 0) {
            require(msg.value >= a.startingPrice, "Minimum price not met");
        }

        uint256 newBid = bids[listingId][msg.sender] + (msg.value); // ! thoroughly test without SM
        require(newBid > a.highestBid, "Bid must be higher than current bid"); // ! allowing same price bid

        bids[listingId][msg.sender] = newBid;
        _asyncTransfer(payable(msg.sender), newBid);

        // Allow previous highest bidder to reclaim or increase their bid  !! did we test this with PoP??
        _withdrawAllowed[listingId][a.highestBidder] = true; // make sure applied to previous highestbidder not new

        _placeBid(listingId, newBid);
        _withdrawAllowed[listingId][msg.sender] = false;

        if (a.instantBuy) {
            if (newBid >= instantBuyPrice[listingId]) {
                // do not allow user input over IB-price on FE
                _closeAuction(listingId);
                _withdrawAllowed[listingId][l.seller] = true;
            }
        }

        // emit LogBid(msg.sender, newBid);
    }

    // ! have not verified this
    function withdrawBid(uint256 listingId) external payable {
        LegendListing storage l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        // require not seller ??

        // make sure highest bidder cant withdraw

        withdrawPayments(listingId, payable(msg.sender)); // escrow not refunding

        bids[listingId][msg.sender] = 0;
        _withdrawAllowed[listingId][msg.sender] = false;
    }

    function closeListing(uint256 listingId) external payable {
        LegendListing storage l = legendListing[listingId];

        require(
            msg.sender == l.seller ||
                msg.sender == l.buyer ||
                msg.sender == auctionDetails[listingId].highestBidder,
            "Not authorized to close"
        );

        // ?! add some type of closing bonus
        if (l.isAuction) {
            if (l.status == ListingStatus.Open) {
                require(queryExpiration(listingId), "Auction has not expired");

                _closeAuction(listingId);
                _withdrawAllowed[listingId][l.seller] = true; // instant buy will error this
            }
        }
        if (msg.sender == l.seller) {
            _claimPayment(listingId);
        } else if (msg.sender == l.buyer) {
            _claimLegend(listingId);
        }
    }

    function cancelLegendListing(uint256 listingId)
        public
        // payable
        nonReentrant
    {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Open);

        // Auctions can only be canceled if a bid has yet to be placed
        if (l.isAuction) {
            require(
                auctionDetails[listingId].bidders.length == 0,
                "Bids already placed"
            );
        }// auctions can not cancel

        // this must be reworked if we get ierc721 escrow
        LegendsNFT(l.nftContract).transferFrom(
            address(this),
            l.seller,
            l.tokenId
        );
        _cancelLegendListing(listingId);

        // emit ListingStatusChanged(listingId, TradeStatus.Cancelled);
    }

    // function closeAuction(uint256 listingId) external payable {
    //     require(queryExpiration(listingId), "Auction has not expired");
    //     LegendListing storage l = legendListing[listingId];

    //     // require(
    //     //     msg.sender == l.seller ||
    //     //         msg.sender == auctionDetails[listingId].highestBidder,
    //     //     "Not authorized to close"
    //     // ); // see what happens when you remove v

    //     // ! add some type of closing bonus
    //     if (l.status == ListingStatus.Open) {
    //         _closeAuction(listingId);
    //         _withdrawAllowed[listingId][l.seller] = true; // instant buy will error this
    //     }

    //     if (msg.sender == l.seller) {
    //         _claimPayment(listingId);
    //     } else if (msg.sender == l.buyer) {
    //         _claimLegend(listingId);
    //     }
    // }

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

        require(amount != 0, "Address is owed 0");

        if (!l.isAuction) {
            withdrawPayments(listingId, l.seller);
        } else if (l.isAuction) {
            withdrawHighestBid(listingId, l.buyer, l.seller);
            _closeAuction(listingId);
            _withdrawAllowed[listingId][l.seller] = true;
        }
    }
}
