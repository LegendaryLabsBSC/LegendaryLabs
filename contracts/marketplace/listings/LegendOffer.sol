// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "./LegendSale.sol";

abstract contract LegendOffer is LegendSale {
    using Counters for Counters.Counter;

    event OfferMade(uint256 listingId, uint256 price);
    event OfferDecided(uint256 listingId, bool isAccepted);

    // uint256 internal offerDuration; // commented out for testing
    uint256 internal offerDuration = 432000; // 5 days

    struct OfferDetails {
        uint256 placedAt;
        uint256 expirationTime;
        address payable tokenOwner;
        bool isAccepted; // make enum if theres space
    }

    mapping(uint256 => OfferDetails) public offerDetails;

    //TODO: offers placed

    function _makeLegendOffer(
        address _nftContract,
        address _tokenOwner,
        uint256 _tokenId
    ) internal returns (uint256) {
        _listingIds.increment();
        uint256 _listingId = _listingIds.current();

        uint256 _price = msg.value;

        LegendListing storage l = legendListing[_listingId];
        l.listingId = _listingId;
        l.nftContract = _nftContract;
        l.tokenId = _tokenId;
        l.seller = payable(address(0));
        l.buyer = payable(msg.sender);
        l.price = _price;
        l.isOffer = true;
        l.status = ListingStatus.Open;

        OfferDetails storage o = offerDetails[_listingId];
        o.placedAt = block.timestamp;
        o.expirationTime = block.timestamp + offerDuration;
        o.tokenOwner = payable(_tokenOwner);

        // emit OfferMade(_listingId, _price);

        return (_listingId);
    }

    function _acceptLegendOffer(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.seller = payable(msg.sender);
        l.status = ListingStatus.Closed;

        offerDetails[_listingId].isAccepted = true;

        _legendOwed[_listingId][l.buyer] = l.tokenId;

        _listingsClosed.increment();

        // emit OfferDecided(_listingId, true); // move to marketplace and remove one
    }

    function _rejectLegendOffer(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.status = ListingStatus.Closed;

        offerDetails[_listingId].isAccepted = false;

        _listingsClosed.increment();

        // emit OfferDecided(_listingId, false);
    }
}
