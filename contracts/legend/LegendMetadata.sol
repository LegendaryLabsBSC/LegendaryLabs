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
}
