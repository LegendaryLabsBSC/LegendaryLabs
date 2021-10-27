// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface ILegendMetadata {
    struct LegendMetadata {
        uint256 id;
        string season;
        string prefix;
        string postfix;
        uint256[2] parents;
        uint256 birthday;
        uint256 blendingInstancesUsed; //TODO: take into account if number is lowed and token is over new limir
        uint256 lastBlend;
        uint256 totalOffspring;
        address payable legendCreator;
        bool isLegendary; // Legendary concept will need to be reevaluated
        bool isHatched;
        bool isDestroyed;
    }

    event LegendCreated(uint256 indexed legendId, address indexed creator);
    event LegendHatched(uint256 indexed legendId, uint256 birthday);
    event LegendNamed(uint256 indexed legendId, string prefix, string postfix);

    event LegendsBlended(
        uint256 indexed parent1,
        uint256 indexed parent2,
        uint256 childId
    );

    event LegendDestroyed(uint256 legendId);
}
