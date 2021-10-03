// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./LegendSales.sol";

/// Refund Escrow

//TODO: make function without implementation
// TODO: extend auction by 10 min if a bid is made within the last 10 min
abstract contract LegendAuctions is LegendSales {
    using Counters for Counters.Counter;
    Counters.Counter internal _auctionIds;
    Counters.Counter internal _auctionsClosed;
    Counters.Counter internal _auctionsCancelled;

    // TODO: bids should stay private
    struct LegendAuction {
        uint256 auctionId;
        address nftContract;
        uint256 tokenId;
        uint256 duration;
        uint256 createdAt;
        uint256 startingPrice;
        bool instantBuy;
        address payable seller;
        uint256 highestBid;
        address payable highestBidder;
        address[] bidders;
        ListingStatus status;
    }
    mapping(uint256 => LegendAuction) public legendAuction;

    mapping(uint256 => uint256) public instantBuyPrice;
    mapping(uint256 => mapping(address => uint256)) internal bids; // assign visability
    mapping(uint256 => mapping(address => bool)) exists;

    // mapping(uint256 => mapping(address => bool)) public isReclaimable; // public for testing ; no assignment picked yet

    // event ListingStatusChanged(uint256 auctionId, ListingStatus status);

    function _createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantPrice
    ) internal {
        _auctionIds.increment();
        uint256 auctionId = _auctionIds.current();

        bool _instantBuy;

        if (instantPrice != 0) {
            _instantBuy = true;
            instantBuyPrice[auctionId] = instantPrice;
        }

        LegendAuction storage a = legendAuction[auctionId];
        a.auctionId = auctionId;
        a.nftContract = nftContract;
        a.tokenId = tokenId;
        a.duration = duration;
        a.createdAt = block.timestamp;
        a.startingPrice = startingPrice;
        a.instantBuy = _instantBuy;
        a.seller = payable(msg.sender);
        a.status = ListingStatus.Open;

        // emit ListingStatusChanged(auctionId, ListingStatus.Open);
    }

    function queryExpiration(uint256 auctionId) public view returns (bool) {
        LegendAuction memory a = legendAuction[auctionId];
        bool isExpired;

        uint256 expirationTime = a.createdAt + a.duration;
        if (block.timestamp >= expirationTime) {
            isExpired = true;
        }

        return isExpired;
    }

    function closeAuction(uint256 auctionId) public {
        require(queryExpiration(auctionId), "Auction has not expired");
        
    }

    function _bid(uint256 auctionId, uint256 newBid) internal {
        LegendAuction storage a = legendAuction[auctionId];

        bids[auctionId][msg.sender] = newBid;

        if (!exists[auctionId][msg.sender]) {
            a.bidders.push(msg.sender);
            exists[auctionId][msg.sender] = true;

            // // Adds to the auctions where the user is participating
            // auctionsParticipating[msg.sender].push(_auctionId);
        }

        // a.highestBid = newBid;
        // isReclaimable[auctionId][a.highestBidder] = true;

        // a.highestBidder = payable(msg.sender);
        // isReclaimable[auctionId][msg.sender] = false;

        a.highestBid = newBid;
        a.highestBidder = payable(msg.sender);

        // _withdrawAllowed[auctionId][msg.sender] = false;
        // Allow previous highest bidder to reclaim or increase their bid  !! did we test this??
        // _withdrawAllowed[auctionId][a.highestBidder] = true;

        if (a.instantBuy) {
            if (newBid >= instantBuyPrice[auctionId]) {
                a.status = ListingStatus.Closed;
            }
        }
    }

    // // // Auctions can only be canceled if a bid has yet to be palced
    // function cancelLegendAuction(address nftContract, uint256 auctionId)
    //     internal
    // {
    //     LegendAuction memory l = legendAuction[auctionId];
    //     require(msg.sender == l.seller);
    //     require(l.status == ListingStatus.Open);

    //     IERC721(nftContract).transferFrom(address(this), l.seller, l.tokenId);
    //     legendListing[auctionId].buyer = payable(msg.sender);
    //     legendListing[auctionId].status = ListingStatus.Cancelled;

    //     _listingsCancelled.increment();

    //     emit ListingStatusChanged(auctionId, ListingStatus.Cancelled);
    // }

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
