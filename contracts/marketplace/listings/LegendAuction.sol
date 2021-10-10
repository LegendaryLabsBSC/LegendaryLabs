// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "./LegendSale.sol";

abstract contract LegendAuction is LegendSale {
    using Counters for Counters.Counter;

    event AuctionExpired(uint256 listingId, string); //TODO:
    event AuctionExtended(uint256 listingId, uint256 newDuration);
    event BidPlaced(
        uint256 listingId,
        address newHighestBidder,
        uint256 newHighestBid
    );

    struct AuctionDetails {
        uint256 createdAt;
        uint256 duration;
        uint256 startingPrice;
        uint256 highestBid;
        address payable highestBidder;
        address[] bidders; // ? take array out (use mapping bid ?)
        bool instantBuy;
    }

    mapping(uint256 => address[]) internal listBidders; // for debug

    function fetchBidders(uint256 listingId) public view returns (address[] memory) {
        return listBidders[listingId];
    }

    mapping(uint256 => uint256) public instantBuyPrice;
    mapping(uint256 => AuctionDetails) public auctionDetails;

    //TODO: ? change to bid
    mapping(uint256 => mapping(address => uint256)) internal bids; //TODO: make getter
    mapping(uint256 => mapping(address => bool)) internal exists;

    function _createLegendAuction(
        address _nftContract,
        uint256 _tokenId,
        uint256 _duration,
        uint256 _startingPrice,
        uint256 _instantPrice
    ) internal {
        _listingIds.increment();
        uint256 _listingId = _listingIds.current();

        bool instantBuy;

        if (_instantPrice != 0) {
            instantBuy = true;
            instantBuyPrice[_listingId] = _instantPrice;
        }

        LegendListing storage l = legendListing[_listingId];
        l.listingId = _listingId;
        l.nftContract = _nftContract;
        l.tokenId = _tokenId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.isAuction = true;
        l.status = ListingStatus.Open;

        AuctionDetails storage a = auctionDetails[_listingId];
        a.createdAt = block.timestamp;
        a.duration = _duration;
        a.startingPrice = _startingPrice;
        a.instantBuy = instantBuy;

        // emit ListingStatusChanged(_listingId, ListingStatus.Open);
    }

    function _placeBid(uint256 _listingId, uint256 _newBid) internal {
        AuctionDetails storage a = auctionDetails[_listingId];

        bids[_listingId][msg.sender] = _newBid; //TODO: redundant LMplace.sol ~153

        if (!exists[_listingId][msg.sender]) {
            a.bidders.push(msg.sender);
            listBidders[_listingId].push(msg.sender);
            exists[_listingId][msg.sender] = true;

            // TODO:
            // // Adds to the auctions where the user is participating
            // auctionsParticipating[msg.sender].push(_auctionId);
        }

        a.highestBid = _newBid;
        a.highestBidder = payable(msg.sender);

        if (shouldExtend(_listingId)) {
            if (_newBid != instantBuyPrice[_listingId]) {
                a.duration = (a.duration + 600); // TODO: make extension a state variable

                // emit AuctionExtended(_listingId, a.duration);
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

        _legendOwed[_listingId][a.highestBidder] = l.tokenId; // ? does this belong in this contract ; yes, until we get moved over to escrow

        _listingsClosed.increment();

        // emit ListingStatusChanged(_listingId, ListingStatus.Closed);
    }

    function isExpired(uint256 _listingId) public view returns (bool) {
        AuctionDetails memory a = auctionDetails[_listingId];

        bool _isExpired;

        uint256 expirationTime = a.createdAt + a.duration;
        if (block.timestamp >= expirationTime) {
            _isExpired = true;
        }

        return _isExpired;
    }

    function shouldExtend(uint256 _listingId) internal view returns (bool) {
        AuctionDetails memory a = auctionDetails[_listingId];
        
        bool _shouldExtend;

        uint256 expirationTime = a.createdAt + a.duration;
        uint256 extensionTime = 600; // 10 minute window ; TODO: make state variable
        if (
            block.timestamp < expirationTime &&
            block.timestamp >= (expirationTime - extensionTime)
        ) {
            _shouldExtend = true;
        }

        return _shouldExtend;
    }
}
