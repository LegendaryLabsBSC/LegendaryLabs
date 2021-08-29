// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// DNA is a representation of PhoenixGenerator CSV data minus 'Name'/ID

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

    function createDNA() public view returns (uint256[9] memory) {
        uint256 randomValue1 = random(255);
        uint256 randomValue2 = random(100);
        DNAData memory data = DNAData(
            randomValue1 - 8,
            randomValue2 + 81,
            randomValue1 - 4,
            randomValue2 + 31,
            randomValue1 - 13,
            randomValue2 + 33,
            randomValue1 - 22,
            randomValue2 + 5,
            randomValue1 - 10
        );

        uint256[9] memory dna = [
            data.CdR1,
            data.CdG1,
            data.CdB1,
            data.CdR2,
            data.CdG2,
            data.CdB2,
            data.CdR3,
            data.CdG3,
            data.CdB3
        ];

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
