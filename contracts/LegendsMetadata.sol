// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendMetadata {
    struct LegendMetadata {
        uint256 id; // token number of Legend
        string prefix; // first name of Legend; Scheme: TBD
        string postfix; // last name of Legend; Scheme: TBD
        uint256[2] parents; // parents of Legend
        uint256 birthDay; //
        uint256 incubationDuration; // time before Legend can be "hatched"
        uint256 breedingCooldown; // length of time before Legend can breed again, make change after each breed?
        uint256 breedingCost; // cost to breed Legend
        uint256 offspringLimit; // max times Legend can breed // ? change to offspring count
        string season; // season of Legend
        bool isLegendary; // is Legend one of a kind handmade
        bool isDestroyed; // if true token has been sent to dead address and is not visible
    }
    struct LegendDNA { // change to LegendGenetics
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
