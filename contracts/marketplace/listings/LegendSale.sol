// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LegendListing.sol";

abstract contract LegendSale is ILegendListing {
    using Counters for Counters.Counter;

    /// @dev initialize counters, used for all three marketplace types (Sale, Auction, Offer)
    Counters.Counter internal _listingIds;
    Counters.Counter internal _listingsClosed;
    Counters.Counter internal _listingsCancelled;

    struct OfferDetails {
        uint256 expirationTime;
        address payable legendOwner;
        bool isAccepted; // make enum if theres space
    }

    uint256 internal offerDuration = 432000; // 5 days

    /* listingId => listingDetails */
    mapping(uint256 => LegendListing) internal legendListing;

    /* listingId => offerDetails */
    mapping(uint256 => OfferDetails) internal offerDetails;

    /* listingId => buyerAddress => legendId */
    mapping(uint256 => mapping(address => uint256)) internal _legendPending;

    event OfferMade(uint256 indexed listingId, uint256 price);
    event OfferDecided(uint256 indexed listingId, bool indexed isAccepted);

    function _createLegendSale(
        address _nftContract,
        uint256 _legendId,
        uint256 _price
    ) internal {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        LegendListing storage l = legendListing[listingId];
        l.listingId = listingId;
        l.createdAt = block.timestamp;
        l.nftContract = _nftContract;
        l.legendId = _legendId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.price = _price;
        l.status = ListingStatus.Open;

        emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function _buyLegend(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.status = ListingStatus.Closed;
        l.buyer = payable(msg.sender);

        _legendPending[_listingId][payable(msg.sender)] = l.legendId;

        _listingsClosed.increment();

        emit ListingStatusChanged(_listingId, ListingStatus.Closed);
    }

    function _makeLegendOffer(
        address _nftContract,
        address payable _legendOwner,
        uint256 _legendId
    ) internal returns (uint256) {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        uint256 price = msg.value;

        LegendListing storage l = legendListing[listingId];
        l.listingId = listingId;
        l.createdAt = block.timestamp;
        l.nftContract = _nftContract;
        l.legendId = _legendId;
        l.seller = payable(address(0));
        l.buyer = payable(msg.sender);
        l.price = price;
        l.isOffer = true;
        l.status = ListingStatus.Open;

        OfferDetails storage o = offerDetails[listingId];
        o.expirationTime = block.timestamp + offerDuration;
        o.legendOwner = payable(_legendOwner);

        emit OfferMade(listingId, price);

        return (listingId);
    }

    function _decideLegendOffer(uint256 _listingId, bool _isAccepted) internal {
        LegendListing storage l = legendListing[_listingId];

        if (_isAccepted) {
            l.status = ListingStatus.Closed;
            l.seller = payable(msg.sender);

            offerDetails[_listingId].isAccepted = true;

            _legendPending[_listingId][l.buyer] = l.legendId;

            _listingsClosed.increment();
        } else {
            l.status = ListingStatus.Cancelled;

            offerDetails[_listingId].isAccepted = false;

            _listingsCancelled.increment();
        }

        emit OfferDecided(_listingId, _isAccepted);
    }

    function _cancelLegendListing(uint256 _listingId) internal {
        legendListing[_listingId].status = ListingStatus.Cancelled;

        _listingsCancelled.increment();

        emit ListingStatusChanged(_listingId, ListingStatus.Cancelled);
    }

    function isValidListing(uint256 _listingId) public view returns (bool) {
        return _listingId >= _listingIds.current();
    }

    function fetchLegendListing(uint256 _listingId)
        public
        view
        virtual
        returns (
            // move to interface if move functions moved to virtual
            LegendListing memory
        )
    {}

    function fetchOfferDetails(uint256 _listingId)
        public
        view
        virtual
        returns (OfferDetails memory)
    {}
}
