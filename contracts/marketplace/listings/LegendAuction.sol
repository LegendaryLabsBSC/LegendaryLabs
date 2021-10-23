// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./LegendSale.sol";

abstract contract LegendAuction is LegendSale {
    using Counters for Counters.Counter;

    struct AuctionDetails {
        uint256 duration;
        uint256 startingPrice;
        uint256 highestBid;
        address payable highestBidder;
        address[] bidders; // ? take array out (use mapping bid ?) ;; seperate so no risk of breaking rest of struct
        bool isInstantBuy;
    }

    // mapping(uint256 => address[]) internal listBidders; // for debug

    event AuctionExpired(uint256 listingId, string); //TODO:
    event AuctionExtended(uint256 listingId, uint256 newDuration);
    event BidPlaced(
        uint256 listingId,
        address newHighestBidder,
        uint256 newHighestBid
    );

    mapping(uint256 => uint256) public instantBuyPrice; // needs to be internal
    mapping(uint256 => AuctionDetails) public auctionDetails; // public for testing, needs internal

    //TODO: ? change to bid
    // mapping(address => uint256) internal bids; // debug bid
    mapping(uint256 => mapping(address => uint256)) internal bids; //TODO: make getter
    mapping(uint256 => mapping(address => bool)) internal exists;

    // function fetchBidders(uint256 listingId)
    //     public
    //     view
    //     returns (address[] memory)
    // {
    //     return listBidders[listingId];
    // }

    function _createLegendAuction(
        address _nftContract,
        uint256 _legendId,
        uint256 _duration,
        uint256 _startingPrice,
        uint256 _instantPrice
    ) internal {
        _listingIds.increment();
        uint256 _listingId = _listingIds.current();

        bool isInstantBuy;

        if (_instantPrice != 0) {
            isInstantBuy = true;
            instantBuyPrice[_listingId] = _instantPrice;
        }

        LegendListing storage l = legendListing[_listingId];
        l.listingId = _listingId;
        l.createdAt = block.timestamp;
        l.nftContract = _nftContract;
        l.legendId = _legendId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.isAuction = true;
        l.status = ListingStatus.Open;

        AuctionDetails storage a = auctionDetails[_listingId];
        a.duration = _duration;
        a.startingPrice = _startingPrice;
        a.isInstantBuy = isInstantBuy;

        // emit ListingStatusChanged(_listingId, ListingStatus.Open);
    }

    function _placeBid(uint256 _listingId, uint256 _bidAmount) internal {
        AuctionDetails storage a = auctionDetails[_listingId];

        bids[_listingId][msg.sender] += _bidAmount;

        if (!exists[_listingId][msg.sender]) {
            a.bidders.push(msg.sender);
            exists[_listingId][msg.sender] = true;
        }

        a.highestBid = _bidAmount;
        a.highestBidder = payable(msg.sender);

        // this should error when tested
        if (_shouldExtend(_listingId)) {
            if (_bidAmount >= instantBuyPrice[_listingId]) {
                a.duration = (a.duration + 600); // TODO: make extension a state variable

                emit AuctionExtended(_listingId, a.duration);
            }
        }
        // emit BidPlaced(_listingId, a.highestBidder, a.highestBid);
    }

    function _closeAuction(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];
        AuctionDetails storage a = auctionDetails[_listingId];

        l.buyer = a.highestBidder;
        l.price = a.highestBid;
        l.status = ListingStatus.Closed;

        _legendOwed[_listingId][a.highestBidder] = l.legendId; 

        _listingsClosed.increment();

        // emit ListingStatusChanged(_listingId, ListingStatus.Closed);
    }

    function isExpired(uint256 _listingId) public view returns (bool) {
        bool expired;

        uint256 expirationTime = legendListing[_listingId].createdAt +
            auctionDetails[_listingId].duration;

        if (block.timestamp > expirationTime) {
            expired = true;
        }

        return expired;
    }

    function _shouldExtend(uint256 _listingId) internal view returns (bool) {
        bool shouldExtend;

        uint256 expirationTime = legendListing[_listingId].createdAt +
            auctionDetails[_listingId].duration;

        uint256 extensionTime = 600; // 10 minute window ; TODO: make state variable
        if (
            block.timestamp < expirationTime &&
            block.timestamp >= (expirationTime - extensionTime)
        ) {
            shouldExtend = true;
        }

        return shouldExtend;
    }
}
