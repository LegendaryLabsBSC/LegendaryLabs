// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LegendComposition.sol";

contract LegendStats is ILegendComposition {


    mapping(uint256 => LegendStats) public legendStats;

    // event dnaGenerated(LegendStats d);

    function createStats(uint256 id) public
    {
        // TODO: Link oracle random number
        uint256 randomValue = random(5);
        LegendStats memory s;
        s.level = random(2);
        s.health = 10;
        s.strength= randomValue;
        s.defense = randomValue;
        s.agility = randomValue;
        s.speed = randomValue;
        s.accuracy = randomValue;
        s.destruction = 'fire'; // TODO: destruction enum

        legendStats[id] = s;

        // emit dnaGenerated(d);
    }

    function mixDNA(
        uint256 _parent1,
        uint256 _parent2,
        uint256 id
    ) public
    {
        LegendStats storage parent1 = legendStats[_parent1];
        LegendStats storage parent2 = legendStats[_parent2];

        LegendStats memory d;
        d.CdR1 = parent1.CdR1;
        d.CdG1 = parent2.CdG1;
        d.CdB1 = parent1.CdB1;
        d.CdR2 = parent2.CdR2;
        d.CdG2 = parent1.CdG2;
        d.CdB2 = parent2.CdB2;
        d.CdR3 = parent1.CdR3;
        d.CdG3 = parent2.CdG3;
        d.CdB3 = parent1.CdB3;

        legendStats[id] = d;

        // emit dnaGenerated(d);
    }

    // Random Number oracle call could go here
    function random(uint256 range) internal view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % range;
    }
}
