// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

/**
 * @dev Interface used by [**LegendSale*](./LegendSale). Outlines a Legend *listing*.
 */
interface ILegendListing {
    enum ListingStatus {
        Null,
        Open,
        Closed,
        Cancelled
    }

    /**
     * :::note Info
     *
     * * `listingId` &rarr; ID of Legend  *listing*.
     * * `createdAt` &rarr; Blocktime the listing was created at.
     * * `nftContract` &rarr; Address of the ERC721 contract.
     * * `legendId` &rarr; ID of Legend NFT associated with the *listing*.
     * * `seller` &rarr; Address that owns the Legend NFT.
     * * `buyer` &rarr; Address that purchases the Legend NFT.
     * * `price` &rarr; Amount the Legend NFT is purchased for.
     * * `isAuction` &rarr; Indicates if a *listing* is an *auction* or not.
     * * `isOffer` &rarr; Indicates if a *listing* is an *offer* or not.
     * * `status` &rarr; Indicates whether a given *matching listing* is either `Null`, `Open`, `Closed`, or `Cancelled`.
     *
     * :::
     *
     */
    struct LegendListing {
        uint256 listingId;
        uint256 createdAt;
        address nftContract;
        uint256 legendId;
        address payable seller;
        address payable buyer;
        uint256 price;
        bool isAuction;
        bool isOffer;
        ListingStatus status;
    }

    /**
     * @dev Implemented in [**LegendsMarketplace**](../LegendsMarketplace#fetchlegendlisting)
     */
    function fetchLegendListing(uint256 listingId)
        external
        view
        returns (LegendListing memory);

    /**
     * @dev Emitted when a *listing* has a status change.
     * [[`_createLegendSale`](./LegendSale#_createlegendsale),
     * [`_buyLegend`](./LegendSale#_buylegend),
     * [`_cancelLegendListing`](./LegendSale#_cancellegendlisting)]
     * [`_createLegendAuction`](./LegendAuction#_createlegendauction),
     * [`_closeAuction`](./LegendAuction#_closeauction)]
     */
    event ListingStatusChanged(uint256 indexed listingId, ListingStatus status);

    /**
     * @dev Emitted when a *listing* is closed and a party claims their respective "payment".
     * [`closeListing`](../LegendsMarketplace#closelisting)
     */
    event TradeClaimed(uint256 indexed listingId, address indexed payee);
}
