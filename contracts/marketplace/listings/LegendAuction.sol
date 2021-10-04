// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./LegendSale.sol";

/// Refund Escrow

//TODO: make function without implementation
// TODO: extend auction by 10 min if a bid is made within the last 10 min
abstract contract LegendAuction is LegendSale {
    using Counters for Counters.Counter;

    // TODO: ? bids addresses should stay private
    struct AuctionDetails {
        uint256 createdAt;
        uint256 duration;
        uint256 startingPrice;
        uint256 highestBid;
        address payable highestBidder; // assign to buyer when they claim
        address[] bidders;
        bool instantBuy;
    }
    mapping(uint256 => uint256) public instantBuyPrice;
    mapping(uint256 => mapping(address => uint256)) internal bids; // assign visability
    mapping(uint256 => mapping(address => bool)) exists;

    mapping(uint256 => AuctionDetails) public auctionDetails;

    // mapping(uint256 => mapping(address => bool)) public isReclaimable; // public for testing ; no assignment picked yet

    // event ListingStatusChanged(uint256 auctionId, ListingStatus status);

    function _createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantPrice
    ) internal returns (uint256) {
        _listingIds.increment();
        uint256 _listingId = _listingIds.current();

        bool _instantBuy;
        if (instantPrice != 0) {
            _instantBuy = true;
            instantBuyPrice[_listingId] = instantPrice;
        }

        LegendListing storage l = legendListing[_listingId];
        l.listingId = _listingId;
        l.nftContract = nftContract;
        l.tokenId = tokenId;
        l.seller = payable(msg.sender);
        // l.buyer = payable(address(0)); // assign once auction has ended
        // l.price = price; // assign once auction has ended
        l.isAuction = true;
        l.status = ListingStatus.Open;

        AuctionDetails storage a = auctionDetails[_listingId];
        a.createdAt = block.timestamp;
        a.duration = duration;
        a.startingPrice = startingPrice;
        a.instantBuy = _instantBuy;

        // emit ListingStatusChanged(auctionId, ListingStatus.Open);

        return _listingId;
    }

    function queryExpiration(uint256 listingId) public view returns (bool) {
        AuctionDetails memory a = auctionDetails[listingId];
        bool isExpired;

        uint256 expirationTime = a.createdAt + a.duration;
        if (block.timestamp >= expirationTime) {
            isExpired = true;
        }

        return isExpired;
    }

    function queryExtension(uint256 listingId) internal view returns (bool) {
        AuctionDetails memory a = auctionDetails[listingId];
        bool shouldExtend;

        uint256 expirationTime = a.createdAt + a.duration;
        uint256 extensionTimeframe = 600; // 10 minute window
        if (
            expirationTime > block.timestamp &&
            block.timestamp >= (expirationTime - extensionTimeframe)
        ) {
            shouldExtend = false;
        }

        return shouldExtend;
    }

    //TODO: make admin close auction func in Lab or Market ; require auction be expired for X many days before allowed to
    //TODO: make incentive for first to claim and close
    function _closeAuction(uint256 listingId) internal {
        // require(queryExpiration(listingId), "Auction has not expired");
        LegendListing storage l = legendListing[listingId];
        AuctionDetails storage a = auctionDetails[listingId];

        l.buyer = a.highestBidder;
        l.price = a.highestBid;
        l.status = ListingStatus.Closed;

        _legendOwed[listingId][a.highestBidder] = l.tokenId;

        _listingsClosed.increment();
    }

    function _placeBid(uint256 listingId, uint256 newBid) internal {
        AuctionDetails storage a = auctionDetails[listingId];

        bids[listingId][msg.sender] = newBid;

        if (!exists[listingId][msg.sender]) {
            a.bidders.push(msg.sender);
            exists[listingId][msg.sender] = true;

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

        if (queryExtension(listingId)) {
            a.duration = (a.duration + 600); // could make duration a state variable
        }

        if (a.instantBuy) {
            if (newBid >= instantBuyPrice[listingId]) {
                // legendListing[listingId].status = ListingStatus.Closed;
                _closeAuction(listingId);
            }
        }
    }

    // // // Auctions can only be canceled if a bid has yet to be palced
    function cancelLegendAuction(uint256 listingId) internal {
        legendListing[listingId].seller = payable(msg.sender);
        legendListing[listingId].status = ListingStatus.Cancelled;

        _listingsCancelled.increment();
        // LegendAuction memory l = legendAuction[auctionId];
        // require(msg.sender == l.seller);
        // require(l.status == ListingStatus.Open);

        // IERC721(nftContract).transferFrom(address(this), l.seller, l.tokenId);
        // legendListing[auctionId].buyer = payable(msg.sender);
        // legendListing[auctionId].status = ListingStatus.Cancelled;

        // _listingsCancelled.increment();

        // emit ListingStatusChanged(auctionId, ListingStatus.Cancelled);
    }

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
