// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "./LegendSale.sol";

abstract contract LegendAuction is LegendSale {
    using Counters for Counters.Counter;

    struct AuctionDetails {
        uint256 duration;
        uint256 startingPrice;
        uint256 highestBid;
        address payable highestBidder;
        bool isInstantBuy;
    }

    uint256 internal _auctionExtension = 600;

    /* listingId => auctionDetails*/
    mapping(uint256 => AuctionDetails) internal auctionDetails;
    /* listingId => instantBuyPrice */
    mapping(uint256 => uint256) internal instantBuyPrice;

    /* listingId => bidderAddresses */
    mapping(uint256 => address[]) internal bidders;

    /* listingId => bidderAddress => previouslyPlacedBid */
    mapping(uint256 => mapping(address => bool)) internal exists; // change var name ?

    /* listingId => bidderAddress => bidAmount*/
    mapping(uint256 => mapping(address => uint256)) internal bidPlaced;

    event AuctionExtended(uint256 indexed listingId, uint256 newDuration);
    event BidPlaced(
        uint256 indexed listingId,
        address newHighestBidder,
        uint256 newHighestBid
    );

    function _createLegendAuction(
        address _nftContract,
        uint256 _legendId,
        uint256 _duration,
        uint256 _startingPrice,
        uint256 _instantPrice
    ) internal {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        bool isInstantBuy;
        if (_instantPrice != 0) {
            isInstantBuy = true;
            instantBuyPrice[listingId] = _instantPrice;
        }

        LegendListing storage l = legendListing[listingId];
        l.listingId = listingId;
        l.createdAt = block.timestamp;
        l.nftContract = _nftContract;
        l.legendId = _legendId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.isAuction = true;
        l.status = ListingStatus.Open;

        AuctionDetails storage a = auctionDetails[listingId];
        a.duration = _duration;
        a.startingPrice = _startingPrice;
        a.isInstantBuy = isInstantBuy;

        emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function _placeBid(uint256 _listingId, uint256 _bidAmount) internal {
        AuctionDetails storage a = auctionDetails[_listingId];

        bidPlaced[_listingId][msg.sender] += _bidAmount;

        if (!exists[_listingId][msg.sender]) {
            bidders[_listingId].push(msg.sender);
            exists[_listingId][msg.sender] = true;
        }

        a.highestBid = _bidAmount;
        a.highestBidder = payable(msg.sender);

        if (_shouldExtend(_listingId)) {
            if (_bidAmount >= instantBuyPrice[_listingId]) {
                a.duration = (a.duration + _auctionExtension);

                emit AuctionExtended(_listingId, a.duration); // test ; event shows old duration or new?
            }
        }
        emit BidPlaced(_listingId, a.highestBidder, a.highestBid);
    }

    function _closeAuction(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];
        AuctionDetails storage a = auctionDetails[_listingId];

        l.buyer = a.highestBidder;
        l.price = a.highestBid;
        l.status = ListingStatus.Closed;

        _legendPending[_listingId][a.highestBidder] = l.legendId;

        _listingsClosed.increment();

        emit ListingStatusChanged(_listingId, ListingStatus.Closed);
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

        if (
            block.timestamp < expirationTime &&
            block.timestamp > (expirationTime - _auctionExtension)
        ) {
            shouldExtend = true;
        }

        return shouldExtend;
    }

    function fetchAuctionDetails(uint256 _listingId)
        public
        view
        virtual
        returns (AuctionDetails memory)
    {}

    function fetchInstantBuyPrice(uint256 _listingId)
        public
        view
        virtual
        returns (uint256)
    {}

    function fetchBidders(uint256 _listingId)
        public
        view
        virtual
        returns (address[] memory)
    {}

    function fetchBidPlaced(uint256 _listingId, address _bidder)
        public
        view
        virtual
        returns (uint256)
    {}
}
