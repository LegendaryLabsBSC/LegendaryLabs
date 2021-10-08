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

    function gaH(uint256 listingId) public view returns (address[] memory) {
        return listBidders[listingId];
    }

    mapping(uint256 => uint256) public instantBuyPrice;
    mapping(uint256 => AuctionDetails) public auctionDetails;

    //TODO: change to bid
    mapping(uint256 => mapping(address => uint256)) internal bids; // make getter
    mapping(uint256 => mapping(address => bool)) internal exists;

    function _createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantPrice
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

        emit ListingStatusChanged(_listingId, ListingStatus.Open);
    }

    function _placeBid(uint256 listingId, uint256 newBid) internal {
        AuctionDetails storage a = auctionDetails[listingId];

        bids[listingId][msg.sender] = newBid; // redundant LMplace.sol 153

        if (!exists[listingId][msg.sender]) {
            a.bidders.push(msg.sender);
            listBidders[listingId].push(msg.sender);
            exists[listingId][msg.sender] = true;

            // TODO:
            // // Adds to the auctions where the user is participating
            // auctionsParticipating[msg.sender].push(_auctionId);
        }

        a.highestBid = newBid;
        a.highestBidder = payable(msg.sender);

        if (shouldExtend(listingId)) {
            if (newBid != instantBuyPrice[listingId]) {
                a.duration = (a.duration + 600); // TODO: make extension a state variable

                emit AuctionExtended(listingId, a.duration);
            }
        }

        emit BidPlaced(listingId, a.highestBidder, a.highestBid);
    }

    function _closeAuction(uint256 listingId) internal {
        LegendListing storage l = legendListing[listingId];
        AuctionDetails storage a = auctionDetails[listingId];

        l.buyer = a.highestBidder;
        l.price = a.highestBid;
        l.status = ListingStatus.Closed;

        _legendOwed[listingId][a.highestBidder] = l.tokenId; // ? does this belong in this contract ; yes, until we get moved over to escrow

        _listingsClosed.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Closed);
    }

    function isExpired(uint256 listingId) public view returns (bool) {
        AuctionDetails memory a = auctionDetails[listingId];
        bool _isExpired;

        uint256 expirationTime = a.createdAt + a.duration;
        if (block.timestamp >= expirationTime) {
            _isExpired = true;
        }

        return _isExpired;
    }

    function shouldExtend(uint256 listingId) internal view returns (bool) {
        AuctionDetails memory a = auctionDetails[listingId];
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
