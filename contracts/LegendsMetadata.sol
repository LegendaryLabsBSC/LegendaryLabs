// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Metadata is a representation of all attributes that a Legend is composed of
// IPFS URLs should be stored here* 

interface ILegendMetadata {
    struct LegendMetadata {
        uint256 id;
        string prefix;
        string postfix;
        uint256[9] dna; //for testing
        // string dna; // in the form of IPFS hash
        // string[] parents;
        // uint256 birthDay;
        // uint256 cooldownEndBlock;
        // uint256 cooldownIndex; // Make cool down ~24h
        // uint256 level; // v1 1-5
        // uint256 stats;
        // uint256 health;
        // uint256 strength;
        // uint256 defense;
        // uint256 agility;
        // uint256 speed;
        // uint256 accuracy;
        // uint256 destruction;
        // uint256 generation;
        // uint256 season;
        // uint256 breedingCost;
        // bool isLegendary;
    }
}
