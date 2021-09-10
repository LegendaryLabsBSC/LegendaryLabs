// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// contract LegendsStats {
//     struct LegendStats {
//         uint256 level; // v1 1-5
//         uint256 health;
//         uint256 strength;
//         uint256 defense;
//         uint256 agility;
//         uint256 speed;
//         uint256 accuracy;
//         uint256 destruction;
//     }

//     mapping(uint256 => LegendsStats) public legendStats;

//     event dnaGenerated(LegendStats data);

//     function getGene(uint256 dna, uint256 n) public pure returns (uint256) {
//         return (dna / (10**(15 - n))) % 9;
//     }

//     function createDNA(uint256 id) public returns (string memory) {
//         uint256 randomValue1 = random(255);
//         uint256 randomValue2 = random(100);
//         LegendsStats memory data = LegendStats(
//             id,
//             (randomValue1 - 8),
//             (randomValue2 + 81),
//             (randomValue1 - 4),
//             (randomValue2 + 31),
//             (randomValue1 - 13),
//             (randomValue2 + 33),
//             (randomValue1 - 22),
//             (randomValue2 + 5),
//             (randomValue1 - 10)
//         );

//         legendStats[id] = LegendStats(
//             data.id,
//             data.CdR1,
//             data.CdG1,
//             data.CdB1,
//             data.CdR2,
//             data.CdG2,
//             data.CdB2,
//             data.CdR3,
//             data.CdG3,
//             data.CdB3
//         );

//         emit dnaGenerated(data);

//         string memory dna = (
//             append(
//                 uint2str(data.id),
//                 uint2str(data.CdR1),
//                 uint2str(data.CdG1),
//                 uint2str(data.CdB1),
//                 uint2str(data.CdR2),
//                 uint2str(data.CdG2),
//                 uint2str(data.CdB2),
//                 uint2str(data.CdR3),
//                 uint2str(data.CdG3),
//                 uint2str(data.CdB3)
//             )
//         );

//         return dna;
//     }

//     function mixDNA(
//         uint256 childId,
//         uint256 _parent1,
//         uint256 _parent2
//     ) public returns (string memory) {
//         LegendStats storage parent1 = legendStats[_parent1];
//         LegendStats storage parent2 = legendStats[_parent2];

//         LegendStats memory data = LegendStats(
//             childId,
//             parent1.CdR1,
//             parent2.CdG1,
//             parent1.CdB1,
//             parent2.CdR2,
//             parent1.CdG2,
//             parent2.CdB2,
//             parent1.CdR3,
//             parent2.CdG3,
//             parent1.CdB3
//         );

//         emit dnaGenerated(data);

//         string memory dna = (
//             append(
//                 uint2str(data.id),
//                 uint2str(data.CdR1),
//                 uint2str(data.CdG1),
//                 uint2str(data.CdB1),
//                 uint2str(data.CdR2),
//                 uint2str(data.CdG2),
//                 uint2str(data.CdB2),
//                 uint2str(data.CdR3),
//                 uint2str(data.CdG3),
//                 uint2str(data.CdB3)
//             )
//         );

//         return dna;
//     }

//     // Random Number oracle call could go here
//     function random(uint256 range) internal view returns (uint256) {
//         return
//             uint256(
//                 keccak256(abi.encodePacked(block.difficulty, block.timestamp))
//             ) % range;
//     }

//     // already in String; look into importing
//     function uint2str(uint256 _i)
//         internal
//         pure
//         returns (string memory _uintAsString)
//     {
//         if (_i == 0) {
//             return "0";
//         }
//         uint256 j = _i;
//         uint256 len;
//         while (j != 0) {
//             len++;
//             j /= 10;
//         }
//         bytes memory bstr = new bytes(len);
//         uint256 k = len;
//         while (_i != 0) {
//             k = k - 1;
//             uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
//             bytes1 b1 = bytes1(temp);
//             bstr[k] = b1;
//             _i /= 10;
//         }
//         return string(bstr);
//     }

//     function append(
//         string memory a,
//         string memory b,
//         string memory c,
//         string memory d,
//         string memory e,
//         string memory f,
//         string memory g,
//         string memory h,
//         string memory i,
//         string memory j
//     ) internal pure returns (string memory) {
//         return
//             string(
//                 abi.encodePacked(
//                     a,
//                     ",",
//                     b,
//                     ",",
//                     c,
//                     ",",
//                     d,
//                     ",",
//                     e,
//                     ",",
//                     f,
//                     ",",
//                     g,
//                     ",",
//                     h,
//                     ",",
//                     i,
//                     ",",
//                     j
//                 )
//             );
//     }
// }
