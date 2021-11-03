// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

/**
 * @dev Interface used by {LegendsNFT}. Outlines the metadata of a Legend NFT.
 */
interface ILegendMetadata {
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
        bool isLegendary; // Legendary concept will need to be reevaluated
        bool isHatched;
        bool isDestroyed;
    }

    /**
     * @dev Implemented in {LegendsNFT}
     */
    function fetchLegendMetadata(uint256 legendId)
        external
        view
        returns (LegendMetadata memory);

    /**
     * @dev Emitted when a new Legend is minted.
     */
    event LegendCreated(uint256 indexed legendId, address indexed creator);

    /**
     * @dev Emitted when a Legend is hatched.
     */
    event LegendHatched(uint256 indexed legendId, uint256 birthday);

    /**
     * @dev Emitted when a Legend has it's Prefix & Postfix changed.
     */

    event LegendNamed(uint256 indexed legendId, string prefix, string postfix);

    /**
     * @dev Emitted when two Legends are Blended together.
     */
    event LegendsBlended(
        uint256 indexed parent1,
        uint256 indexed parent2,
        uint256 childId
    );

    /**
     * @dev Emitted when a Legend NFT is sent to the burn address.
     */
    event LegendDestroyed(uint256 legendId);
}
