// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

/**
 * @dev Interface used by [**LegendsNFT**](docs/contracts/legend/LegendNFT). Outlines the metadata of a Legend NFT.
 */
interface ILegendMetadata {
    
    /**
     * :::note Legend Metadata:
     *
     * * `id` => Numerical ID of a Legend NFT
     * * `season` => Season Legend NFT was created during
     * * `prefix` => First element of Legend NFT naming scheme
     * * `postfix` => Second element of Legend NFT naming scheme
     * * `parents[2]` => IDs of Legend NFTs used to create *this* Legend
     * * `birthday` => Time Legend NFT was minted, in Block/UNIX time
     * * `blendingInstancesUsed` => *Blending Slots* used by a Legend. Can be decreased in the [**LegendsRejuvenation*](docs/contracts/rejuvenation/LegendsRejuvenation#restoreBlendingSlot)
     * * `totalOffspring` => Total number of times a Legend NFT has created a *child Legend*. Can never be decreased.
     * * `legendCreator` => Address of Legend NFT creator. Legends created via a *promo event* will be assigned the *zero address*.
     * * `isLegendary` => Indicates if a Legend NFT is Legendary or not
     * * `isHatched` => Indicates if a Legend NFT has been *hatched* or not
     * * `isDestroyed` => Indicates if a Legend NFT has been sent to the burn address, destroyed for eternity, or not
     *
     * :::
     *
     */
    struct LegendMetadata {
        uint256 id;
        string season;
        string prefix;
        string postfix;
        uint256[2] parents;
        uint256 birthday;
        uint256 blendingInstancesUsed; // test lowering limit below current used count
        uint256 totalOffspring;
        address payable legendCreator;
        bool isLegendary; 
        bool isHatched;
        bool isDestroyed;
    }

    /**
     * @dev Implemented in [**LegendsNFT**](docs/contracts/legend/LegendsNFT#fetchLegendMetadata)
     */
    function fetchLegendMetadata(uint256 legendId)
        external
        view
        returns (LegendMetadata memory);

    /**
     * @dev Emitted when a new Legend is minted. [`_mintLegend`](docs/contracts/legend/LegendsNFT#mintLegend)
     */
    event LegendCreated(uint256 indexed legendId, address indexed creator);

    /**
     * @dev Emitted when a Legend removed from the incubation stage. [`hatchLegend`](docs/contracts/legend/LegendsNFT#hatchLegend)
     */
    event LegendHatched(uint256 indexed legendId, uint256 birthday);

    /**
     * @dev Emitted when a Legend has it's Prefix & Postfix changed. [`nametLegend`](docs/contracts/legend/LegendsNFT#nameLegend)
     */

    event LegendNamed(uint256 indexed legendId, string prefix, string postfix);

    /**
     * @dev Emitted when two Legends are Blended together. [`blendLegends`](docs/contracts/legend/LegendsNFT#blendLegends)
     */
    event LegendsBlended(
        uint256 indexed parent1,
        uint256 indexed parent2,
        uint256 childId
    );

    /**
     * @dev Emitted when a Legend NFT is sent to the burn address. [`destroyLegend`](docs/contracts/legend/LegendsNFT#destroyLegend)
     */
    event LegendDestroyed(uint256 legendId);
}
