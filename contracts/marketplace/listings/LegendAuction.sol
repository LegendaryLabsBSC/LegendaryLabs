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

    uint256[3] internal _auctionDurations = [259200, 432000, 604800];

    uint256 internal _auctionExtension = 600;

    /* listingId => auctionDetails*/
    mapping(uint256 => AuctionDetails) internal _auctionDetails;

    /* listingId => instantBuyPrice */
    mapping(uint256 => uint256) internal _instantBuyPrice;

    /* listingId => bidderAddresses */
    mapping(uint256 => address[]) internal _bidders;

    /* listingId => bidderAddress => previouslyPlacedBid */
    mapping(uint256 => mapping(address => bool)) internal _exists; // change var name ?

    /* listingId => bidderAddress => bidAmount*/
    mapping(uint256 => mapping(address => uint256)) internal _bidPlaced;

    event AuctionExtended(uint256 indexed listingId, uint256 newDuration);
    event BidPlaced(
        uint256 indexed listingId,
        address newHighestBidder,
        uint256 newHighestBid
    );

    function _createLegendAuction(
        address nftContract,
        uint256 legendId,
        uint256 durationIndex,
        uint256 startingPrice,
        uint256 instantPrice
    ) internal {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        bool isInstantBuy;
        if (instantPrice != 0) {
            isInstantBuy = true;
            _instantBuyPrice[listingId] = instantPrice;
        }

        LegendListing storage l = _legendListing[listingId];
        l.listingId = listingId;
        l.createdAt = block.timestamp;
        l.nftContract = nftContract;
        l.legendId = legendId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.isAuction = true;
        l.status = ListingStatus.Open;

        // uint256 duration;
        // if (durationIndex > _auctionDurations.length) {
        //     duration = _auctionDurations[0];
        // } else {
        //     duration = _auctionDurations[durationIndex];
        // }

        require(durationIndex <= _auctionDurations.length);
        uint256 duration = _auctionDurations[durationIndex];

        AuctionDetails storage a = _auctionDetails[listingId];
        a.duration = duration;
        a.startingPrice = startingPrice;
        a.isInstantBuy = isInstantBuy;

        emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function _placeBid(uint256 listingId, uint256 bidAmount) internal {
        AuctionDetails storage a = _auctionDetails[listingId];

        _bidPlaced[listingId][msg.sender] += bidAmount;

        if (!_exists[listingId][msg.sender]) {
            _bidders[listingId].push(msg.sender);
            _exists[listingId][msg.sender] = true;
        }

        a.highestBid = bidAmount;
        a.highestBidder = payable(msg.sender);

        if (_shouldExtend(listingId)) {
            if (bidAmount >= _instantBuyPrice[listingId]) {
                a.duration = (a.duration + _auctionExtension);

                emit AuctionExtended(listingId, a.duration); // test ; event shows old duration or new?
            }
        }
        emit BidPlaced(listingId, a.highestBidder, a.highestBid);
    }

    function _closeAuction(uint256 listingId) internal {
        LegendListing storage l = _legendListing[listingId];
        AuctionDetails storage a = _auctionDetails[listingId];

        l.buyer = a.highestBidder;
        l.price = a.highestBid;
        l.status = ListingStatus.Closed;

        _legendPending[listingId][a.highestBidder] = l.legendId;

        _listingsClosed.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Closed);
    }

    function isExpired(uint256 listingId) public view returns (bool) {
        bool expired;

        uint256 expirationTime = _legendListing[listingId].createdAt +
            _auctionDetails[listingId].duration;

        if (block.timestamp > expirationTime) {
            expired = true;
        }

        return expired;
    }

    function _shouldExtend(uint256 listingId) internal view returns (bool) {
        bool shouldExtend;

        uint256 expirationTime = _legendListing[listingId].createdAt +
            _auctionDetails[listingId].duration;

        if (
            block.timestamp < expirationTime &&
            block.timestamp > (expirationTime - _auctionExtension)
        ) {
            shouldExtend = true;
        }

        return shouldExtend;
    }

    function fetchAuctionDurations()
        public
        view
        virtual
        returns (uint256[3] memory)
    {}

    function fetchAuctionDetails(uint256 listingId)
        public
        view
        virtual
        returns (AuctionDetails memory)
    {}

    function fetchInstantBuyPrice(uint256 listingId)
        public
        view
        virtual
        returns (uint256)
    {}

    function fetchBidders(uint256 listingId)
        public
        view
        virtual
        returns (address[] memory)
    {}

    function fetchBidPlaced(uint256 listingId, address bidder)
        public
        view
        virtual
        returns (uint256)
    {}
}
