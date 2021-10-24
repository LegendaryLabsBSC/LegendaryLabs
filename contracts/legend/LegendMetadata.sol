// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendMetadata {
    struct LegendMetadata {
        uint256 id;
        string season;
        string prefix;
        string postfix;
        uint256[2] parents;
        uint256 birthDay;
        uint256 blendingCost;
        uint256 totalOffspring;
        uint256 blendingInstancesUsed; //TODO: take into account if number is lowed and token is over new limir
        address payable legendCreator;
        bool isLegendary; // Legendary concept will need to be reevaluated
        bool isHatched;
        bool isDestroyed;
    }

    event LegendCreated(uint256 legendId);
    event LegendHatched(uint256 legendId);
    event LegendsBlended(uint256 parent1, uint256 parent2, uint256 childId);
    event LegendNamed(uint256 legendId, string prefix, string postfix);
    event LegendDestroyed(uint256 legendId);
}
