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

    function getGene(uint256 dna, uint256 n) public pure returns (uint256) {
        return (dna / (10**(15 - n))) % 10;
    }

    function mixDNA(uint256 dna1, uint256 dna2) public pure returns (uint256) {
        // uint256 randomValue = random(256);
        DNAData memory data = DNAData(
            // ((getGene(dna1, 0) * getGene(dna2, 0) * randomValue) % 5) + 1, // CdR1

            // True algorithem will still need to be develpoed
            // For testing purposes only
            // ((getGene(dna1, 0) % 3) + getGene(dna2, 0)) - 20, // CdR1
            // ((getGene(dna1, 1) % 3) + getGene(dna2, 1)) - 20, // CdG1
            // ((getGene(dna1, 2) % 3) + getGene(dna2, 2)) - 20, // CdB1
            // ((getGene(dna1, 3) % 3) + getGene(dna2, 3)) - 20, // CdR2
            // ((getGene(dna1, 4) % 3) + getGene(dna2, 4)) - 20, // CdG2
            // ((getGene(dna1, 5) % 3) + getGene(dna2, 5)) - 20, // CdB2
            // ((getGene(dna1, 6) % 3) + getGene(dna2, 6)) - 20, // CdR3
            // ((getGene(dna1, 7) % 3) + getGene(dna2, 7)) - 20, // CdG3
            // ((getGene(dna1, 8) % 3) + getGene(dna2, 8)) - 20 // CdB3

            // Simple Test Version
            getGene(dna1, 0), // CdR1
            getGene(dna2, 1), // CdG1
            getGene(dna1, 2), // CdB1
            getGene(dna1, 3), // CdR2
            getGene(dna2, 4), // CdG2
            getGene(dna2, 5), // CdB2
            getGene(dna1, 6), // CdR3
            getGene(dna2, 7), // CdG3
            getGene(dna1, 8) // CdB3
        );

        // Need something to decipher?
        uint256 newDNA = data.CdR1 +
            data.CdG1 +
            data.CdB1 +
            data.CdR2 +
            data.CdG2 +
            data.CdB2 +
            data.CdR3 +
            data.CdG3 +
            data.CdB3;

        return newDNA;
    }

    function clamp(
        uint256 value,
        uint256 min,
        uint256 max
    ) public pure returns (uint256) {
        return (value < min) ? min : (value > max) ? max : value;
    }

    // Random Number oracle call could go here
    function random(uint256 range) internal view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % range;
    }
}
