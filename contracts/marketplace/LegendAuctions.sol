// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./LegendSales.sol";


/// Refund Escrow


//TODO: make function without implementation
// TODO: extend auction by 10 min if a bid is made within the last 10 min
abstract contract LegendAuctions is LegendSales{
    using Counters for Counters.Counter;
    Counters.Counter private _auctionIds;
    Counters.Counter private _auctionsClosed;
    Counters.Counter private _auctionsCancelled;
    
    enum AuctionStatus {
        Open,
        Closed,
        Cancelled
    }
    // TODO: bids should stay private
    struct LegendAuction {
        uint256 auctionId;
        address nftContract;
        uint256 tokenId;
        uint256 duration;
        uint256 createdAt;
        uint256 startingPrice;
        // uint256 instantBuy;
        address payable seller;
        uint256 maxBid;
        address payable maxBidder;
        address[] bidders;
        AuctionStatus status;
        // mapping(address => uint256) bids;
        // mapping(address => bool) exists;
    }
    mapping(address => mapping(uint256 => LegendAuction)) bids;
    mapping(uint256 => LegendAuction) public legendAuction;

    // event ListingStatusChanged(uint256 auctionId, AuctionStatus status);

    function _createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice
        // uint256 instantBuy
    ) internal {
        _auctionIds.increment();
        uint256 auctionId = _auctionIds.current();

        LegendAuction storage a = legendAuction[auctionId];
        a.auctionId = auctionId;
        a.nftContract = nftContract;
        a.tokenId = tokenId;
        a.duration = duration;
        a.createdAt = block.timestamp;
        a.startingPrice = startingPrice;
        a.seller = payable(msg.sender);
        // a.buyer = payable(address(0));
        a.status = AuctionStatus.Open;

        // emit ListingStatusChanged(auctionId, ListingStatus.Open);
    }

    // function _bid(uint256 auctionId, uint256 newBid) internal {
    //     LegendAuction storage a = legendAuction[auctionId];
    //     a.bids[msg.sender] = newBid;

    //     if (!a.exists[msg.sender]) {
    //         a.bidders.push(msg.sender);
    //         a.exists[msg.sender] = true;

    //         // // Adds to the auctions where the user is participating
    //         // auctionsParticipating[msg.sender].push(_auctionId);
    //     }

    //     a.maxBid = newBid;
    //     a.maxBidder = payable(msg.sender);

    //     // emit LogBid(msg.sender, newBid);
    // }

    // // Auctions can only be canceled if a bid has yet to be palced
    // // function cancelLegendAuction(address nftContract, uint256 auctionId)
    // //     internal
    // // {
    // //     LegendListing memory l = legendListing[auctionId];
    // //     require(msg.sender == l.seller);
    // //     require(l.status == AuctionStatus.Open);

    // //     IERC721(nftContract).transferFrom(address(this), l.seller, l.tokenId);
    // //     legendListing[auctionId].buyer = payable(msg.sender);
    // //     legendListing[auctionId].status = AuctionStatus.Cancelled;

    // //     _listingsCancelled.increment();

    // //     emit ListingStatusChanged(auctionId, AuctionStatus.Cancelled);
    // // }

    // function _fetchLegendAuctions(uint256 auctionId)
    //     internal
    //     view
    //     virtual
    //     returns (LegendAuction memory)
    // {
    //     return legendAuction[auctionId];
    // }

    // function _fetchLegendAuctions()
    //     internal
    //     view
    //     returns (LegendAuction[] storage)
    // {
    //     uint256 auctionCount = _auctionIds.current();
    //     uint256 unsoldAuctionCount = _auctionIds.current() -
    //         (_auctionsClosed.current() + _auctionsCancelled.current());
    //     uint256 currentIndex = 0;

    //     LegendAuction[] storage auctions = new LegendAuction[](
    //         unsoldAuctionCount
    //     );
    //     for (uint256 i = 0; i < auctionCount; i++) {
    //         if (legendAuction[i + 1].buyer == address(0)) {
    //             uint256 currentId = legendAuction[i + 1].auctionId;
    //             LegendAuction storage currentListing = legendAuction[currentId];
    //             auctions[currentIndex] = currentListing;
    //             currentIndex++;
    //         }
    //     }
    //     return auctions;
    // }
}
