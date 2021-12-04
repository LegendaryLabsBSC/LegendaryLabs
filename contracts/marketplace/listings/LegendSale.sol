// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ILegendListing.sol";

/**
 * @dev The **LegendSale** contract inherits from [**ILegendListing**](./ILegendMatch) to define Legend NFT marketplace *listing*.
 * This contract acts as a ledger for *sale listings* & *offer listings*, recording important data and events during the
 * lifecycle of these *listing* types.
 * This contract is inherited by the [**LegendAuction**](./LegendAuction) contract which then further extends the functionality
 * of Legend NFT *listings*.
 */
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

    /**
     * :::note Info
     *
     * * `expirationTime` &rarr; *Offer listing's* creation `block.timestamp` + `_offerDuration`.
     * * `legendOwner` &rarr; Address that owns the Legend NFT.
     * * `isAccepted` &rarr; Indicates if an *offer listing* is accepted or not
     *
     * :::
     *
     */
    struct OfferDetails {
        uint256 expirationTime;
        address payable legendOwner;
        bool isAccepted;
    }

    uint256 internal _offerDuration = 432000; // 5 days

    /** listingId => listingDetails */
    mapping(uint256 => LegendListing) internal _legendListing;

    /** listingId => offerDetails */
    mapping(uint256 => OfferDetails) internal _offerDetails;

    /** listingId => buyerAddress => legendId */
    mapping(uint256 => mapping(address => uint256)) internal _legendPending;

    /**
     * @dev Emitted when an *offer* is placed on a Legend NFT.
     * [`makeLegendOffer`](../LegendsMarketplace#makelegendoffer)
     */
    event OfferMade(uint256 indexed listingId, uint256 price);

    /**
     * @dev Emitted when an **offer listing** is either accepted or rejected.
     * [`decidelegendoffer`](../LegendsMarketplace#decidelegendoffer)
     */
    event OfferDecided(uint256 indexed listingId, bool indexed isAccepted);

    /**
     * @dev Creates a new Legend NFT *sale listing*, and changes the state to `Open`.
     * Called from [**LegendsMarketplace**](../LegendsMarketplace#createlegendsale)
     *
     * @param nftContract Address of the ERC721 contract
     * @param legendId ID of Legend being listed for a *sale*.
     * @param price Amount the seller requests for the Legend NFT, in chain-currency.
     */
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

    /**
     * @dev Changes the state of a *sale listing* to `Closed` and credits the Legend NFT to the buyer.
     * Called from [**LegendsMarketplace**](../LegendsMarketplace#buylegend)
     *
     * @param listingId ID of *sale listing*.
     */
    function _buyLegend(uint256 listingId) internal {
        LegendListing storage l = _legendListing[listingId];

        l.status = ListingStatus.Closed;
        l.buyer = payable(msg.sender);

        _legendPending[listingId][payable(msg.sender)] = l.legendId;

        _listingsClosed.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Closed);
    }

    /**
     * @dev Creates a new Legend NFT *offer listing*. Returns the *listing* ID.
     * Called from [**LegendsMarketplace**](../LegendsMarketplace#makelegendoffer).
     *
     * @param nftContract Address of the ERC721 contract
     * @param legendOwner Address of Legend NFT owner.
     * @param legendId ID of Legend NFT the offer is being placed for.
     */
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

        // emit OfferMade(listingId, price);

        return (listingId);
    }

    /**
     * @dev Records whether an *offer listing* is accepted or rejected by the Legend NFT's owner.
     * If the offer is accepted, the state of the *offer listing* is changed to `Closed` and the address
     * which placed the *offer listing* is credited the Legend NFT.
     * If the offer is rejected, the state of the *offer listing* is changed to `Cancelled`,
     * Called from [**LegendsMarketplace**](../LegendsMarketplace#decidelegendoffer)
     *
     * @param listingId ID of *offer listing*.
     * @param isAccepted Indicates if an *offer listing* is accepted or not.
     */
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

        // emit OfferDecided(listingId, isAccepted);
    }

    /**
     * @dev Changes the state of a marketplace *listing* to `Cancelled`. Used by all marketplace *listing* types.
     * Called from [**LegendsMarketplace**](./LegendsMarketplace#cancellegendlisting).
     *
     * @param listingId ID of *listing* being cancelled.
     */
    function _cancelLegendListing(uint256 listingId) internal {
        _legendListing[listingId].status = ListingStatus.Cancelled;

        _listingsCancelled.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Cancelled);
    }

    /**
     * @dev Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchlistingcounts)
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

    /**
     * @dev Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchofferdetails)
     *
     * @param listingId ID of *offer listing*.
     */
    function fetchOfferDetails(uint256 listingId)
        public
        view
        virtual
        returns (OfferDetails memory);
}
