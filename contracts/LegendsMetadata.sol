// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Metadata is a representation of all attributes that a Legend is composed of
// IPFS URLs should be stored here*

interface ILegendMetadata {
    struct LegendMetadata {
        uint256 id; // token number of Legend
        string prefix; // first name of Legend; Scheme: TBD
        string postfix; // last name of Legend; Scheme: TBD
        string dna; // genetic makeup of Legend
        uint256[2] parents; // parents of Legend
        uint256 birthDay; // 
        uint256 incubationDuration; // time before Legend can be "hatched"
        uint256 breedingCooldown; // length of time before Legend can breed again, make change after each breed? 
        uint256 offspringLimit; // max times Legend can breed
        uint256 level; // v1 1-5
        // uint256 stats; // seperate stats from meta?
        // uint256 health;
        // uint256 strength;
        // uint256 defense;
        // uint256 agility;
        // uint256 speed;
        // uint256 accuracy;
        // uint256 destruction; //      ^
        // uint256 generation; // calculate
        string season; // season of Legend 
        // uint256 breedingCost; // cost to breed Legend
        bool isLegendary; // is Legend one of a kind handmade
    }
}
