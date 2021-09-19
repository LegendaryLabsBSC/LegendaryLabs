// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LegendComposition.sol";

/**
 * TODO: look into if modifiers such as this are needed

      modifier onlyBreeding() {
        require(msg.sender == breedingContract, "Not authorized");
        _;
    }
  * ZED == LEGEND : {Token => CFBase} => Breedings == LegendsNFT => LegendsBreeding  
 */

// TODO: ? map siblings & parents
// TODO: breeding token burn

contract LegendBreeding is ILegendComposition {
    mapping(uint256 => LegendGenetics) public legendGenetics;

    event GeneticsGenerated(LegendGenetics g);

    function createGenetics(uint256 id) public {
        uint256 randomValue1 = random(255);
        uint256 randomValue2 = random(100);
        LegendGenetics memory g;
        g.CdR1 = (randomValue1 - 8);
        g.CdG1 = (randomValue2 + 81);
        g.CdB1 = (randomValue1 - 4);
        g.CdR2 = (randomValue2 + 31);
        g.CdG2 = (randomValue1 - 13);
        g.CdB2 = (randomValue2 + 33);
        g.CdR3 = (randomValue1 - 22);
        g.CdG3 = (randomValue2 + 5);
        g.CdB3 = (randomValue1 - 10);

        legendGenetics[id] = g;

        emit GeneticsGenerated(g);
    }

    function mixGenetics(
        uint256 _parent1,
        uint256 _parent2,
        uint256 id
    ) public {
        LegendGenetics storage parent1 = legendGenetics[_parent1];
        LegendGenetics storage parent2 = legendGenetics[_parent2];

        LegendGenetics memory g;
        g.CdR1 = parent1.CdR1;
        g.CdG1 = parent2.CdG1;
        g.CdB1 = parent1.CdB1;
        g.CdR2 = parent2.CdR2;
        g.CdG2 = parent1.CdG2;
        g.CdB2 = parent2.CdB2;
        g.CdR3 = parent1.CdR3;
        g.CdG3 = parent2.CdG3;
        g.CdB3 = parent1.CdB3;

        legendGenetics[id] = g;

        emit GeneticsGenerated(g);
    }

    // Random Number oracle call could go here
    function random(uint256 range) internal view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % range;
    }
}
