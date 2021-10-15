// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendMetadata{
    struct LegendMetadata {
        uint256 id; 
        string season;
        string prefix;
        string postfix; 
        uint256 birthDay;
        uint256[2] parents;
        uint256 breedingCost; 
        uint256 totalOffspring; 
        uint256 breedingInstancesUsed;
        address payable legendCreator;
        bool isLegendary; // Legendary concept will need to be reevaluated
        bool isHatched; 
        bool isDestroyed; // token burnt permanently
    }
    struct LegendGenetics {
        uint256 CdR1;
        uint256 CdG1;
        uint256 CdB1;
        uint256 CdR2;
        uint256 CdG2;
        uint256 CdB2;
        uint256 CdR3;
        uint256 CdG3;
        uint256 CdB3;
    }

}
