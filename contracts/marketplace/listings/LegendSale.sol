// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LegendListing.sol";

abstract contract LegendSale is ILegendListing {
    using Counters for Counters.Counter;

    modifier isValidListing(uint256 listingId) {
        if (listingId < _listingIds.current()) {
            revert();
        }
        _;
    }

    /// @dev initialize counters, used for all three marketplace types (Sale, Auction, Offer)
    Counters.Counter internal _listingIds;
    Counters.Counter internal _listingsClosed;
    Counters.Counter internal _listingsCancelled;

    struct OfferDetails {
        uint256 expirationTime;
        address payable legendOwner;
        bool isAccepted; // make enum if theres space
    }

    uint256 internal _offerDuration = 432000; // 5 days

    /** @dev listingId => listingDetails */
    mapping(uint256 => LegendListing) internal _legendListing;

    /** @dev listingId => offerDetails */
    mapping(uint256 => OfferDetails) internal _offerDetails;

    /** @dev listingId => buyerAddress => legendId */
    mapping(uint256 => mapping(address => uint256)) internal _legendPending;

    event OfferMade(uint256 indexed listingId, uint256 price);
    event OfferDecided(uint256 indexed listingId, bool indexed isAccepted);

    function _createLegendSale(
        address nftContract,
        uint256 legendId,
        uint256 price
    ) internal {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        LegendListing storage l = _legendListing[listingId];
        l.listingId = listingId;
        l.createdAt = block.timestamp;
        l.nftContract = nftContract;
        l.legendId = legendId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.price = price;
        l.status = ListingStatus.Open;

        emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function _buyLegend(uint256 listingId) internal {
        LegendListing storage l = _legendListing[listingId];

        l.status = ListingStatus.Closed;
        l.buyer = payable(msg.sender);

        _legendPending[listingId][payable(msg.sender)] = l.legendId;

        _listingsClosed.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Closed);
    }

    function _makeLegendOffer(
        address nftContract,
        address payable legendOwner,
        uint256 legendId
    ) internal returns (uint256) {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        uint256 price = msg.value;

        LegendListing storage l = _legendListing[listingId];
        l.listingId = listingId;
        l.createdAt = block.timestamp;
        l.nftContract = nftContract;
        l.legendId = legendId;
        l.seller = payable(address(0));
        l.buyer = payable(msg.sender);
        l.price = price;
        l.isOffer = true;
        l.status = ListingStatus.Open;

        OfferDetails storage o = _offerDetails[listingId];
        o.expirationTime = block.timestamp + _offerDuration;
        o.legendOwner = payable(legendOwner);

        emit OfferMade(listingId, price);

        return (listingId);
    }

    function _decideLegendOffer(uint256 listingId, bool isAccepted) internal {
        LegendListing storage l = _legendListing[listingId];

        if (isAccepted) {
            l.status = ListingStatus.Closed;
            l.seller = payable(msg.sender);

            _offerDetails[listingId].isAccepted = true;

            _legendPending[listingId][l.buyer] = l.legendId;

            _listingsClosed.increment();
        } else {
            l.status = ListingStatus.Cancelled;

            _offerDetails[listingId].isAccepted = false;

            _listingsCancelled.increment();
        }

        emit OfferDecided(listingId, isAccepted);
    }

    function _cancelLegendListing(uint256 listingId) internal {
        _legendListing[listingId].status = ListingStatus.Cancelled;

        _listingsCancelled.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Cancelled);
    }

    /**
     * @dev Getters implemented in parent contract LegendsMarketplace
     */

    function fetchListingCounts()
        public
        view
        virtual
        returns (
            Counters.Counter memory,
            Counters.Counter memory,
            Counters.Counter memory
        );

    function fetchOfferDetails(uint256 listingId)
        public
        view
        virtual
        returns (OfferDetails memory);
}
