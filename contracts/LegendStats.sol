// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LegendComposition.sol";

contract LegendStats is ILegendComposition {
    mapping(uint256 => LegendStats) public legendStats;

    event StatsAssigned(LegendStats s);

    function createStats(uint256 id, uint256 baseHealth) public {
        // TODO: Link oracle random number
        // TODO: base stat build enum
        uint256 randomValue = clamp(randomS(4), 1, 3);
        LegendStats memory s;
        s.level = clamp(randomS(3), 1, 2);
        s.health = (baseHealth + (s.level * baseHealth));
        s.strength = randomValue;
        s.defense = randomValue;
        s.agility = randomValue;
        s.speed = randomValue;
        s.accuracy = randomValue;
        s.destruction = "fire"; // TODO: destruction enum

        legendStats[id] = s;

        emit StatsAssigned(s);
    }

    function mixStats(
        uint256 _parent1,
        uint256 _parent2,
        uint256 id,
        uint256 baseHealth
    ) public {
        LegendStats storage parent1 = legendStats[_parent1];
        LegendStats storage parent2 = legendStats[_parent2];

        LegendStats memory s;
        s.level = clamp(((parent1.level + parent2.level) / 2) - 1, 1, 5);
        s.health = (baseHealth + (s.level * baseHealth));
        s.strength = clamp(
            ((parent1.strength + parent2.strength) / 2) - 1,
            1,
            25
        );
        s.defense = clamp(((parent1.defense + parent2.defense) / 2) - 1, 1, 25);
        s.agility = clamp(((parent1.agility + parent2.agility) / 2) - 1, 1, 25);
        s.speed = clamp(((parent1.speed + parent2.speed) / 2) - 1, 1, 25);
        s.accuracy = clamp(
            ((parent1.accuracy + parent2.accuracy) / 2) - 1,
            1,
            25
        );
        s.destruction = "fire"; // TODO: destruction enum

        legendStats[id] = s;

        emit StatsAssigned(s);
    }

    // Random Number oracle call could go here
    function randomS(uint256 range) internal view virtual returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % range;
    }

    function clamp(
        uint256 value,
        uint256 min,
        uint256 max
    ) public pure returns (uint256) {
        return (value < min) ? min : (value > max) ? max : value;
    }
}
