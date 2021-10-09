// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "./LegendSale.sol";

abstract contract LegendOffer is LegendSale {
    using Counters for Counters.Counter;

    // event AuctionExpired(uint256 listingId, string); //TODO:
    // event AuctionExtended(uint256 listingId, uint256 newDuration);
    // event BidPlaced(
    //     uint256 listingId,
    //     address newHighestBidder,
    //     uint256 newHighestBid
    // );

    struct OfferDetails {
        uint256 placedAt;
        uint256 expirationTime;
        address payable tokenOwner;
        bool isAccepted; // make enum if theres space
    }

    // uint256 internal offerDuration; // commented out for debugging
    uint256 internal offerDuration = 432000; // 5 days

    // mapping(uint256 => address[]) internal listBidders; // for debug

    // function gaH(uint256 listingId) public view returns (address[] memory) {
    //     return listBidders[listingId];
    // }

    // mapping(uint256 => uint256) public instantBuyPrice;
    mapping(uint256 => OfferDetails) public offerDetails;

    // //TODO: change to bid
    // mapping(uint256 => mapping(address => uint256)) internal bids; // make getter
    // mapping(uint256 => mapping(address => bool)) internal exists;

    function _makeLegendOffer(
        address _nftContract,
        address _tokenOwner,
        uint256 _tokenId
    ) internal returns (uint256) {
        _listingIds.increment();
        uint256 _listingId = _listingIds.current();

        LegendListing storage l = legendListing[_listingId];
        l.listingId = _listingId;
        l.nftContract = _nftContract;
        l.tokenId = _tokenId;
        l.seller = payable(address(0));
        l.buyer = payable(msg.sender);
        l.price = msg.value;
        l.isOffer = true;
        l.status = ListingStatus.Open;

        OfferDetails storage o = offerDetails[_listingId];
        o.placedAt = block.timestamp;
        o.expirationTime = block.timestamp + offerDuration;
        o.tokenOwner = payable(_tokenOwner);

        // emit ListingStatusChanged(_listingId, ListingStatus.Open);

        return (_listingId);
    }

    function _acceptLegendOffer(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.seller = payable(msg.sender);
        l.status = ListingStatus.Closed;

        offerDetails[_listingId].isAccepted = true;

        _legendOwed[_listingId][l.buyer] = l.tokenId;

        _listingsClosed.increment();

        // emit ListingStatusChanged(_listingId, ListingStatus.Closed); // try with l.status, on all
    }

    function _rejectLegendOffer(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.status = ListingStatus.Closed;

        offerDetails[_listingId].isAccepted = false;

        _listingsClosed.increment();

        // emit ListingStatusChanged(_listingId, ListingStatus.Closed); // try with l.status, on all
    }

    // function isExpired(uint256 listingId) public view returns (bool) {
    //     AuctionDetails memory a = auctionDetails[listingId];
    //     bool _isExpired;

    //     uint256 expirationTime = a.createdAt + a.duration;
    //     if (block.timestamp >= expirationTime) {
    //         _isExpired = true;
    //     }

    //     return _isExpired;
    // }
}
