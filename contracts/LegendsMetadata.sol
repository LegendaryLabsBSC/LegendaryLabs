// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendMetadata {
    struct LegendMetadata {
        uint256 id;
        string prefix;
        string postfix;
        // uint256 birthDay;
        // uint256 cooldownEndBlock;
        // uint256 cooldownIndex; // Make cool down ~24h
        uint256 dna;
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
