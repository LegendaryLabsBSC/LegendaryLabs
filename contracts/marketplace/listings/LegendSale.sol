// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LegendListing.sol";

/**
 * @dev Outlines a Legend NFT market sale. Functions called by LegendsMarketplace contract.
 */

abstract contract LegendSale is ILegendListing {
    using Counters for Counters.Counter;

    /// @dev intialize counters, used for all three marketplace types (Sale, Auction, Offer)
    Counters.Counter internal _listingIds;
    Counters.Counter internal _listingsClosed;
    Counters.Counter internal _listingsCancelled;

    struct OfferDetails {
        uint256 expirationTime;
        address payable tokenOwner;
        bool isAccepted; // make enum if theres space
    }

    uint256 internal offerDuration = 432000; // 5 days // make private
    //TODO: offers placed

    /* listingId => listingDetails */
    mapping(uint256 => LegendListing) public legendListing;

    /* listingId => buyerAddress => legendId */
    mapping(uint256 => mapping(address => uint256)) internal _legendOwed;

    /* listingId => offerDetails */
    mapping(uint256 => OfferDetails) public offerDetails; // make private

    event OfferMade(uint256 listingId, uint256 price);
    event OfferDecided(uint256 listingId, bool isAccepted);

    function _createLegendSale(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) internal {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        LegendListing storage l = legendListing[listingId];
        l.listingId = listingId;
        l.createdAt = block.timestamp;
        l.nftContract = _nftContract;
        l.legendId = _tokenId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.price = _price;
        l.status = ListingStatus.Open;

        // emit ListingStatusChanged(_listingId, ListingStatus.Open);
    }

    function _buyLegend(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.buyer = payable(msg.sender);
        l.status = ListingStatus.Closed;

        _legendOwed[_listingId][payable(msg.sender)] = l.legendId;

        _listingsClosed.increment();

        // emit ListingStatusChanged(_listingId, ListingStatus.Closed);
    }

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
        l.createdAt = block.timestamp;
        l.nftContract = _nftContract;
        l.legendId = _tokenId;
        l.seller = payable(address(0));
        l.buyer = payable(msg.sender);
        l.price = _price;
        l.isOffer = true;
        l.status = ListingStatus.Open;

        OfferDetails storage o = offerDetails[_listingId];
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

        _legendOwed[_listingId][l.buyer] = l.legendId;

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

    function _cancelLegendListing(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.status = ListingStatus.Cancelled;

        // _legendOwed[listingId][l.seller] = l.tokenId; // see parent comment

        _listingsCancelled.increment();

        // emit ListingStatusChanged(_listingId, ListingStatus.Cancelled);
    }
}
