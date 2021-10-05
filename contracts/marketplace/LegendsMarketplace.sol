// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./escrow/LegendsAuctioneer.sol";
import "../control/LegendsLaboratory.sol";
import "../legend/LegendsNFT.sol";
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

    function createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(price > 0, "Price can not be 0");

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

    function cancelLegendSale(address nftContract, uint256 listingId)
        public
        payable
        nonReentrant
    {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Open);

        LegendsNFT(nftContract).transferFrom(
            address(this),
            l.seller,
            l.tokenId
        );
        _cancelLegendSale(listingId);

        // emit ListingStatusChanged(listingId, TradeStatus.Cancelled);
    }

    // TODO: take into account cancels

    //
    //
    //
    //

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

        uint256 newBid = bids[listingId][msg.sender] + (msg.value); // try without SM
        require(newBid > a.highestBid, "Bid must be higher than current bid"); // ! allowing same price bid

        // // We're going to do this 'require' only if the auction has no
        // // bids yet.(zed)
        // if(auction.bidders.length == 0) {
        //     require(msg.value >= auction.minimum, "lowerBidThanMinimum");
        // } --TODO: Determine here after wednesday meeting ; ^ startingPrice

        bids[listingId][msg.sender] = newBid;
        _asyncTransfer(payable(msg.sender), newBid);

        // this might go up there ^189-193^
        // Allow previous highest bidder to reclaim or increase their bid  !! did we test this??
        _withdrawAllowed[listingId][a.highestBidder] = true; // make sure applied to previous highestbidder not new

        _placeBid(listingId, newBid);
        _withdrawAllowed[listingId][msg.sender] = false;

        // emit LogBid(msg.sender, newBid);
    }

    function closeAuction(uint256 listingId) external payable {
        require(queryExpiration(listingId), "Auction has not expired");
        LegendListing storage l = legendListing[listingId];

        require(
            msg.sender == l.seller ||
                msg.sender == auctionDetails[listingId].highestBidder,
            "Not authorized to close"
        ); // see what happens when you remove v

        // ! add some type of closing bonus
        if (l.status == ListingStatus.Open) {
            _closeAuction(listingId);
            _withdrawAllowed[listingId][l.seller] = true; // instant buy will error this
        }

        if (msg.sender == l.seller) {
            claimPayment(listingId);
        } else if (msg.sender == l.buyer) {
            claimLegend(listingId);
        }
    }

    function withdrawFromAuction(uint256 listingId) external payable {
        LegendListing storage l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        // require not seller ??

        // make sure highest bidder cant withdraw

        withdrawPayments(listingId, payable(msg.sender)); // escrow not refunding

        bids[listingId][msg.sender] = 0;
        _withdrawAllowed[listingId][msg.sender] = false;
    }

    function claimLegend(uint256 listingId) internal {
        LegendListing memory l = legendListing[listingId];
        // require(msg.sender == l.buyer);
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

    function claimPayment(uint256 listingId) internal {
        LegendListing memory l = legendListing[listingId];
        // require(msg.sender == l.seller);
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

    // function fetchLegendListings()
    //     public
    //     view
    //     returns (LegendListing[] memory)
    // {
    //     uint256 listingCount = _listingIds.current();
    //     uint256 openListingCount = _listingIds.current() -
    //         (_listingsClosed.current() + _listingsCancelled.current());
    //     uint256 currentIndex = 0;

    //     LegendListing[] memory listings = new LegendListing[](openListingCount);
    //     for (uint256 i = 0; i < listingCount; i++) {
    //         if (legendListing[i + 1].buyer == address(0)) {
    //             uint256 currentId = i + 1;
    //             // legendListing[i + 1].listingId;
    //             LegendListing storage currentListing = legendListing[currentId];
    //             listings[currentIndex] = currentListing;
    //             currentIndex++;
    //         }
    //     }
    //     return listings;
    // }

    // function fetchAuctionDetails()
    //     public
    //     view
    //     returns (AuctionDetails[] memory)
    // {
    //     uint256 listingCount = _listingIds.current();
    //     uint256 openListingCount = _listingIds.current() -
    //         (_listingsClosed.current() + _listingsCancelled.current());
    //     uint256 currentIndex = 0;

    //     AuctionDetails[] memory auctions = new AuctionDetails[](
    //         openListingCount
    //     );
    //     for (uint256 i = 0; i < listingCount; i++) {
    //         if (legendListing[i + 1].buyer == address(0)) {
    //             if (legendListing[i + 1].isAuction) {
    //                 uint256 currentId = i +1;
    //                 // legendListing[i + 1].listingId;
    //                 AuctionDetails storage currentAuction = auctionDetails[
    //                     currentId
    //                 ];
    //                 auctions[currentIndex] = currentAuction;
    //                 currentIndex++;
    //             }
    //         }
    //     }
    //     return auctions;
    // }
}
