// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "./LegendSale.sol";

abstract contract LegendAuction is LegendSale {
    using Counters for Counters.Counter;

    // event ListingStatusChanged(uint256 auctionId, ListingStatus status);
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
    mapping(uint256 => AuctionDetails) public auctionDetails;

    mapping(uint256 => mapping(address => uint256)) internal bids; // assign visability
    mapping(uint256 => mapping(address => bool)) exists; // assign visability

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

    function _createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantPrice // returns (uint256)
    ) internal {
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
        l.buyer = payable(address(0));
        l.isAuction = true;
        l.status = ListingStatus.Open;

        AuctionDetails storage a = auctionDetails[_listingId];
        a.createdAt = block.timestamp;
        a.duration = duration;
        a.startingPrice = startingPrice;
        a.instantBuy = _instantBuy;

        // emit ListingStatusChanged(auctionId, ListingStatus.Open);

        // return _listingId;
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

        a.highestBid = newBid;
        a.highestBidder = payable(msg.sender);

        if (queryExtension(listingId)) {
            a.duration = (a.duration + 600); // could make duration a state variable
        } // does not work currentlly

        // emit ListingStatusChanged(auctionId, ListingStatus.Cancelled);
    }

    //TODO: make admin close auction func in Lab or Market ; require auction be expired for X many days before allowed to
    //TODO: make incentive for first to claim and close
    function _closeAuction(uint256 listingId) internal {
        LegendListing storage l = legendListing[listingId];
        AuctionDetails storage a = auctionDetails[listingId];

        l.buyer = a.highestBidder;
        l.price = a.highestBid;
        l.status = ListingStatus.Closed;

        _legendOwed[listingId][a.highestBidder] = l.tokenId;

        _listingsClosed.increment();

        // emit ListingStatusChanged(auctionId, ListingStatus.Cancelled);
    }

    // // // // Auctions can only be canceled if a bid has yet to be placed
    // function _cancelLegendAuction(uint256 listingId) internal {
    //     legendListing[listingId].status = ListingStatus.Cancelled;

    //     _listingsCancelled.increment();

    //     // emit ListingStatusChanged(auctionId, ListingStatus.Cancelled);
    // }

}