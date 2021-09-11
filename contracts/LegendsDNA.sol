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

    mapping(uint256 => DNAData) public legendDNA;

    event dnaGenerated(DNAData data);

    function getGene(uint256 dna, uint256 n) public pure returns (uint256) {
        return (dna / (10**(15 - n))) % 9;
    }

    function createDNA(uint256 id) public returns (string memory) {
        uint256 randomValue1 = random(255);
        uint256 randomValue2 = random(100);
        DNAData memory d;
        d.CdR1 = (randomValue1 - 8);
        d.CdG1 = (randomValue2 + 81);
        d.CdB1 = (randomValue1 - 4);
        d.CdR2 = (randomValue2 + 31);
        d.CdG2 = (randomValue1 - 13);
        d.CdB2 = (randomValue2 + 33);
        d.CdR3 = (randomValue1 - 22);
        d.CdG3 = (randomValue2 + 5);
        d.CdB3 = (randomValue1 - 10);

        legendDNA[id] = DNAData(
            d.CdR1,
            d.CdG1,
            d.CdB1,
            d.CdR2,
            d.CdG2,
            d.CdB2,
            d.CdR3,
            d.CdG3,
            d.CdB3
        );

        emit dnaGenerated(d);

        string memory dna = (
            append(
                uint2str(d.CdR1),
                uint2str(d.CdG1),
                uint2str(d.CdB1),
                uint2str(d.CdR2),
                uint2str(d.CdG2),
                uint2str(d.CdB2),
                uint2str(d.CdR3),
                uint2str(d.CdG3),
                uint2str(d.CdB3)
            )
        );

        return dna;
    }

    function mixDNA(uint256 _parent1, uint256 _parent2)
        public
        returns (string memory)
    {
        DNAData storage parent1 = legendDNA[_parent1];
        DNAData storage parent2 = legendDNA[_parent2];

        DNAData memory data = DNAData(
            parent1.CdR1,
            parent2.CdG1,
            parent1.CdB1,
            parent2.CdR2,
            parent1.CdG2,
            parent2.CdB2,
            parent1.CdR3,
            parent2.CdG3,
            parent1.CdB3
        );

        emit dnaGenerated(data);

        string memory dna = (
            append(
                uint2str(data.CdR1),
                uint2str(data.CdG1),
                uint2str(data.CdB1),
                uint2str(data.CdR2),
                uint2str(data.CdG2),
                uint2str(data.CdB2),
                uint2str(data.CdR3),
                uint2str(data.CdG3),
                uint2str(data.CdB3)
            )
        );

        return dna;
    }

    // Random Number oracle call could go here
    function random(uint256 range) internal view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % range;
    }

    // already in String; look into importing
    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function append(
        string memory a,
        string memory b,
        string memory c,
        string memory d,
        string memory e,
        string memory f,
        string memory g,
        string memory h,
        string memory i
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    a,
                    ",",
                    b,
                    ",",
                    c,
                    ",",
                    d,
                    ",",
                    e,
                    ",",
                    f,
                    ",",
                    g,
                    ",",
                    h,
                    ",",
                    i
                )
            );
    }
}
