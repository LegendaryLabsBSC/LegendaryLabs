// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LegendsDNA {
    struct DNAData {
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

    function createDNA() public view returns (uint256) {
        uint256 randomValue = random(255);
        DNAData memory data = DNAData(
            randomValue,
            randomValue,
            randomValue,
            randomValue,
            randomValue,
            randomValue,
            randomValue,
            randomValue,
            randomValue
        );

        uint256 dna = data.CdR1 +
            data.CdG1 +
            data.CdB1 +
            data.CdR2 +
            data.CdG2 +
            data.CdB2 +
            data.CdR3 +
            data.CdG3 +
            data.CdB3;

        return dna;
    }


    // Random Number oracle call could go here
    function random(uint256 range) internal view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % range;
    }
}
