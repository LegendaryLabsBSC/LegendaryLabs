// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "./LegendMetadata.sol";

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
//TODO: do not allow breeding or matching with same token

contract LegendBreeding 
// is ILegendMetadata 
{
    // mapping(uint256 => LegendGenetics) public legendGenetics;

    // event GeneticsGenerated(LegendGenetics g);

    // 115792089237316195423570985008687907853269984665640564039457584007913129639935
    function createGenetics(uint256 id) public {
        // uint256 randomValue1 = random(255);
        // uint256 randomValue2 = random(100);
        // LegendGenetics memory g;
        // g.CdR1 = 255255255255255255255255255255255255255255255255255;
        // g.CdG1 = 255255255255255255255255255255255255255255255255255;
        // g.CdB1 = 255255255255255255255255255255255255255255255255255;
        // g.CdR2 = 255255255255255255255255255255255255255255255255255;
        // g.CdG2 = 255255255255255255255255255255255255255255255255255;
        // g.CdB2 = 255255255255255255255255255255255255255255255255255;
        // g.CdR3 = 255255255255255255255255255255255255255255255255255;
        // g.CdG3 = 255255255255255255255255255255255255255255255255255;
        // g.CdB3 = 255255255255255255255255255255255255255255255255255;

        // legendGenetics[id] = g;

        // emit GeneticsGenerated(g);
    }

    function mixGenetics(
        uint256 _parent1,
        uint256 _parent2,
        uint256 id
    ) public {
        // LegendGenetics storage parent1 = legendGenetics[_parent1];
        // LegendGenetics storage parent2 = legendGenetics[_parent2];

        // LegendGenetics memory g;
        // g.CdR1 = parent1.CdR1;
        // g.CdG1 = parent2.CdG1;
        // g.CdB1 = parent1.CdB1;
        // g.CdR2 = parent2.CdR2;
        // g.CdG2 = parent1.CdG2;
        // g.CdB2 = parent2.CdB2;
        // g.CdR3 = parent1.CdR3;
        // g.CdG3 = parent2.CdG3;
        // g.CdB3 = parent1.CdB3;

        // legendGenetics[id] = g;

        // emit GeneticsGenerated(g);
    }

    // // Random Number oracle call could go here
    // function random(uint256 range) internal view returns (uint256) {
    //     return
    //         uint256(
    //             keccak256(abi.encodePacked(block.difficulty, block.timestamp))
    //         ) % range;
    // }
}
