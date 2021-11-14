// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "./LegendSale.sol";

/**
 * @dev The **LegendAuction** contract inherits from [**LegendSale**](./LegendSale) contract to further extend the functionality
 * of Legend NFT *listings*. This contract acts as a ledger for *auction listings*, recording important data and events during the
 * lifecycle of a **Legends Marketplace** *auction*.
 * This contract is inherited by the [**LegendsMarketplace**](../LegendsMarketplace).
 */
abstract contract LegendAuction is LegendSale {
    using Counters for Counters.Counter;

    /**
     * :::note Info
     *
     * * `duration` &rarr; Amount of time in seconds *auction listing* should run for.
     * * `startingPrice` &rarr; Minimum price seller will start the auction for.
     * * `highestBid` &rarr; The current highest bid for an *auction listing*.
     * * `highestBidder` &rarr; Address which placed the current `highestBid`.
     * * `isInstantBuy` &rarr; Indicates if an *auction listing* permits *instant buying*.
     *
     * :::
     *
     */
    struct AuctionDetails {
        uint256 duration;
        uint256 startingPrice;
        uint256 highestBid;
        address payable highestBidder;
        bool isInstantBuy;
    }

    uint256[3] internal _auctionDurations = [259200, 432000, 604800];

    uint256 internal _auctionExtension = 600;

    /** listingId => auctionDetails */
    mapping(uint256 => AuctionDetails) internal _auctionDetails;

    /** listingId => instantBuyPrice */
    mapping(uint256 => uint256) internal _instantBuyPrice;

    /** listingId => bidderAddresses */
    mapping(uint256 => address[]) internal _bidders;

    /** listingId => bidderAddress => previouslyPlacedBid */
    mapping(uint256 => mapping(address => bool)) internal _exists; //TODO: change var name ?

    // /** listingId => bidderAddress => bidAmount */
    // mapping(uint256 => mapping(address => uint256)) internal _bidPlaced;

    /**
     * @dev Emitted when an *auction listing* is extended.
     * [`_placeBid`](#_placebid)
     */
    event AuctionExtended(uint256 indexed listingId, uint256 newDuration);

    // /**
    //  * @dev Emitted when an bid.
    //  * [`makeLegendOffer`](../LegendsMarketplace#makelegendoffer)
    //  */
    // event BidPlaced(
    //     uint256 indexed listingId,
    //     address newHighestBidder,
    //     uint256 newHighestBid
    // );

    /**
     * @dev Creates a new Legend NFT *auction listing*, and changes the state to `Open`.
     * Called from [**LegendsMarketplace**](../LegendsMarketplace#createlegendauction)
     *
     *
     * :::tip Note
     *
     * If the value for `instantPrice` is passed `(0)`, the *auction listing* will **NOT** permit *instant buying.
     *
     * :::
     *
     *
     * @param nftContract Address of the ERC721 contract
     * @param legendId ID of Legend being listed for an *auction*.
     * @param duration Amount of time in seconds *auction listing* should run for.
     * @param startingPrice  Minimum price seller will start the auction for.
     * @param instantPrice Price the seller will allow the auction to instantly be purchased for.
     */
    function _createLegendAuction(
        address nftContract,
        uint256 legendId,
        uint256 duration,
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

        AuctionDetails storage a = _auctionDetails[listingId];
        a.duration = duration;
        a.startingPrice = startingPrice;
        a.isInstantBuy = isInstantBuy;

        emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    /**
     * @dev Records a bid placed on a *auction listing*.
     * Called from [**LegendsMarketplace**](../LegendsMarketplace#placebid)
     *
     *
     * :::tip Note
     *
     * If an address has already placed a bid on a particular *auction*, their total bid will be incremented.
     *
     * :::
     *
     * :::tip Note
     *
     * If an *auction listing* has a bid placed within the `_auctionExtension` threshold, the auction
     * duration will be incremented by the `_auctionExtension` amount.
     *
     * :::
     *
     *
     * @param listingId ID of *auction listing*.
     * @param bidAmount Bid value sent in buy an address.
     */
    function _placeBid(uint256 listingId, uint256 bidAmount) internal {
        AuctionDetails storage a = _auctionDetails[listingId];

        if (!_exists[listingId][msg.sender]) {
            _bidders[listingId].push(msg.sender);
            _exists[listingId][msg.sender] = true;
        }

        a.highestBid = bidAmount;
        a.highestBidder = payable(msg.sender);

        if (_shouldExtend(listingId)) {
            if (bidAmount < _instantBuyPrice[listingId]) {
                // ! test
                a.duration = (a.duration + _auctionExtension);

                emit AuctionExtended(listingId, a.duration); // test ; event shows old duration or new?
            }
        }
        // emit BidPlaced(listingId, a.highestBidder, a.highestBid);
    }

    /**
     * @dev Records the `highestBidder` & `highestBid` for a *auction listing*, changes the state to `Closed`, and credits the
     * Legend NFT to the `highestBidder`.
     * Called from [**LegendsMarketplace**](../LegendsMarketplace#closelisting)
     *
     * @param listingId ID of *auction listing*.
     */
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

    /**
     * @dev Queries whether a *auction listing* is expired or not*
     *
     * @param listingId ID of *auction listing* being queried.
     */
    function isExpired(uint256 listingId) public view returns (bool) {
        bool expired;

        uint256 expirationTime = _legendListing[listingId].createdAt +
            _auctionDetails[listingId].duration;

        if (block.timestamp > expirationTime) {
            expired = true;
        }

        return expired;
    }

    /**
     * @dev Queries whether a *auction listing* should extend or not.
     *
     * :::tip Note
     *
     * An *auction listing* will be extended by the same amount of time that the threshold for extension is. 
     * For example if `_auctionExtension` is set to the equivalent of (10) minutes, if a bid is placed within the final
     * (10) minutes of the auction, the auction will be extended by (10) minutes.
     *
     * :::
     *
     * @param listingId ID of *auction listing* being queried.
     */
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

    // /**
    //  * @dev Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchauctiondurations)
    //  */
    // function fetchAuctionDurations()
    //     public
    //     view
    //     virtual
    //     returns (uint256[3] memory);

    /**
     * @dev Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchauctiondetails)
     *
     * @param listingId ID of *auction listing*.
     */
    function fetchAuctionDetails(uint256 listingId)
        public
        view
        virtual
        returns (AuctionDetails memory);

    /**
     * @dev Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchinstantbuyprice)
     *
     * @param listingId ID of *auction listing*.
     */
    function fetchInstantBuyPrice(uint256 listingId)
        public
        view
        virtual
        returns (uint256);

    /**
     * @dev Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchbidders)
     *
     * @param listingId ID of *auction listing*.
     */
    function fetchBidders(uint256 listingId)
        public
        view
        virtual
        returns (address[] memory);
}
