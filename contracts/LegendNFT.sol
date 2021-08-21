// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./LegendsDNA.sol";
import "./LegendsMetadata.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract LegendsNFT is ERC721, Ownable, LegendsDNA, ILegendMetadata {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    using Strings for uint256;
    mapping(uint256 => string) private _tokenURIs;

    event Minted(uint256 tokenId);
    event Breed(uint256 parent1, uint256 parent2, uint256 child);
    event Sacrificed(uint256 tokenId);

    uint256 public season = 1;
    uint256 public breedingCostFactor = 25;
    uint256 public newBreedingCostFactor = 3;
    uint256 public sacrificeFactor = 100;
    // Place effects for Training and such

    mapping(uint256 => LegendMetadata) public legendData;

    struct DNADataTest {
        uint256 colorR;
        uint256 colorG;
        uint256 colorB;
    }

    // mapping(uint256 => DNADataTest) public dnadata;

    constructor() ERC721("Legend", "LEGEND") {}

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function mint(address recipient, string memory uri)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uri);
        return newItemId;
    }

    // Random Mint Start

    event NewLegend(uint256 legendId, string name, uint256 dna);

    uint256 dnaDigits = 16;
    uint256 dnaModulus = 10**dnaDigits;

    struct Legend {
        string name;
        uint256 dna;
    }

    Legend[] public legends;

    function _createLegend(string memory _name, uint256 _dna) private {
        legends.push(Legend(_name, _dna));
        uint256 id = legends.length - 1;
        emit NewLegend(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomLegend(string memory _name) public {
        uint256 randDna = _generateRandomDna(_name);
        _createLegend(_name, randDna);
    }

    // Random Mint End

    function easy_breed(
        uint256 _firstR,
        uint256 _secondR,
        uint256 _firstG,
        uint256 _secondG,
        uint256 _firstB,
        uint256 _secondB,
        bool isLegendary
    ) public returns (uint256) {
        // uint childDNA[3];
        // uint childDNA[] = [
        //     1,
        //     2,
        //     3
        // ];
        // return childDNA; // return json obj
    }

    function mintTo(
        address receiver,
        string memory prefix,
        string memory postfix,
        uint256 dna,
        uint256 level,
        uint256 generation,
        bool isLegendary
    ) private returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(receiver, tokenId);
        legendData[tokenId] = LegendMetadata(
            tokenId,
            prefix,
            postfix,
            // block.timestamp, // birthday
            // block.timestamp, // cooldownEndBlock
            // block.timestamp, // cooldownIndex
            dna,
            level,
            // stats,
            //{
            // health,
            // level,
            // strength,
            // defense,
            // agility,
            // speed,
            // accuracy,
            // destruction,
            //}
            generation,
            season,
            level * breedingCostFactor,
            isLegendary
        );
        emit Minted(tokenId);
        return tokenId;
    }

    // // mint promotional unique strainz (will get custom images)
    // function mintPromotion(
    //     address receiver,
    //     string memory prefix,
    //     string memory postfix,
    //     uint256 dna
    // ) public onlyMaster {
    //     mintTo(receiver, prefix, postfix, dna, 0, 255);
    // }

    // Start here
    // breed two strainz
    function breed(
        uint256 _first,
        uint256 _second,
        bool isLegendary
    ) public {
        require(
            ownerOf(_first) == msg.sender && ownerOf(_second) == msg.sender
        );
        LegendMetadata storage legend1 = legendData[_first];
        LegendMetadata storage legend2 = legendData[_second];

        // Burn cost
        // uint256 childCost = (legend1.breedingCost + legend2.breedingCost) / 2;

        // master.LegendsToken().breedBurn(msg.sender, childCost);

        uint256 newLegendId = mixBreedMint(legend1, legend2, isLegendary);

        // uint256 averageGrowRate = (legend1.growRate + legend2.growRate) / 2;
        // place stat equations here ?

        // Burn fertilizer cost
        // if (breedFertilizer && averageGrowRate >= 128) {
        //     master.seedzToken().breedBurn(msg.sender, breedFertilizerCost);
        //     master.strainzAccessory().breedAccessories(
        //         legend1.id,
        //         legend2.id,
        //         newLegendId
        //     );
        // }

        emit Breed(legend1.id, legend2.id, newLegendId);
    }

    function mixBreedMint(
        LegendMetadata storage legend1,
        LegendMetadata storage legend2,
        bool isLegendary
    ) private returns (uint256) {
        uint256 newDNA = mixDNA(legend1.dna, legend2.dna);
        uint256 level = min(legend1.level, legend2.level) - 1;
        uint256 generation = max(legend1.generation, legend2.generation) + 1;

        bool mix = block.number % 2 == 0;

        // Used to increment parent Legends breeding cost after succesful breed
        legend1.breedingCost = legend1.breedingCost * newBreedingCostFactor;
        legend2.breedingCost = legend2.breedingCost * newBreedingCostFactor;

        return
            mintTo(
                msg.sender,
                mix ? legend1.prefix : legend2.prefix,
                mix ? legend2.postfix : legend1.postfix,
                newDNA,
                level,
                generation,
                isLegendary
                // mixStat(legend1.growRate, legend2.growRate, isLegendary)
            );
    }

    function max(uint256 a, uint256 b) private pure returns (uint256) {
        if (a > b) {
            return a;
        } else return b;
    }

    function min(uint256 a, uint256 b) private pure returns (uint256) {
        if (a < b) {
            return a;
        } else return b;
    }

    function mixStat(
        uint256 rate1,
        uint256 rate2,
        bool isLegendary
    ) private pure returns (uint256) {
        uint256 average = (rate1 + rate2) / 2;
        return
            isLegendary
                ? min(average + 10, 255)
                : (average > (25 + 16) ? average - 25 : 16);
    }
}
