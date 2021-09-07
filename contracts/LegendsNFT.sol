// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./LegendsDNA.sol";
import "./LegendsMetadata.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LegendsNFT is ERC721Enumerable, Ownable, LegendsDNA, ILegendMetadata {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Strings for uint256;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => LegendMetadata) public legendData;

    uint256 incubationDuration;
    uint256 breedingCooldown;
    uint256 offspringLimit;
    string season;

    event createdDNA(uint256 newItemId);
    event Minted(uint256 tokenId);
    event Breed(uint256 parent1, uint256 parent2, uint256 child);

    constructor() ERC721("Legend", "LEGEND") {}

    function setIncubationDuration(uint256 _incubationDuration) public {
        incubationDuration = _incubationDuration;
    }

    function setBreedingCooldown(uint256 _breedingCooldown) public {
        breedingCooldown = _breedingCooldown;
    }

    function setOffspringLimit(uint256 _offspringLimit) public {
        offspringLimit = _offspringLimit;
    }

    function setSeason(string memory _season) public {
        season = _season;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        _setTokenURI(tokenId, _tokenURI);
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

    function tokenDATA(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        LegendMetadata memory _legendData = legendData[tokenId];
        return _legendData.dna;
    }

    function tokenMeta(uint256 tokenId)
        public
        view
        virtual
        returns (LegendMetadata memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        // LegendMetadata memory _legendData = legendData[tokenId];
        return legendData[tokenId];
    }

    function tokenMeta1(uint256 tokenId)
        public
        view
        virtual
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256[2] memory,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            string memory,
            bool
        )
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        LegendMetadata memory legend = legendData[tokenId];
        return (
            legend.id,
            legend.prefix,
            legend.postfix,
            legend.dna,
            legend.parents,
            legend.birthDay,
            legend.incubationDuration,
            legend.breedingCooldown,
            legend.offspringLimit,
            legend.level,
            legend.season,
            legend.isLegendary

        );
    }

    function mintPromo(
        address recipient,
        string memory prefix,
        string memory postfix,
        string memory uri,
        uint256 level,
        bool isLegendary
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);

        string memory dna = createDNA(newItemId);

        uint256 parent0 = 0;

        uint256[2] memory parents = [parent0, parent0]; // promotional Legends wont have parents ; non-existent may cause issue

        legendData[newItemId] = LegendMetadata(
            newItemId,
            prefix,
            postfix,
            dna,
            parents,
            block.timestamp,
            incubationDuration,
            breedingCooldown,
            offspringLimit,
            level,
            season,
            isLegendary
        );

        // LegendMetadata memory legendpp = legendData[newItemId];

        emit createdDNA(newItemId);

        _setTokenURI(newItemId, uri); // have this wait for IPFS to finish

        return newItemId;
    }

    function mintTo(
        address receiver,
        uint256 newItemId,
        string memory prefix,
        string memory postfix,
        string memory dna,
        uint256[2] memory parents,
        uint256 birthDay,
        uint256 level
    ) private returns (uint256) {
        bool isLegendary = false; // only one of a kind handmade Legends can be "Legendary"

        _mint(receiver, newItemId);

        legendData[newItemId] = LegendMetadata(
            newItemId,
            prefix,
            postfix,
            dna,
            parents,
            birthDay,
            incubationDuration,
            breedingCooldown,
            offspringLimit,
            level,
            season,
            isLegendary
        );

        // _setTokenURI(newItemId, uri); // set tempoary URI

        emit Minted(newItemId);
        return newItemId;
    }

    function breed(uint256 _parent1, uint256 _parent2) public {
        require(
            ownerOf(_parent1) == msg.sender && ownerOf(_parent2) == msg.sender
        );
        LegendMetadata storage parent1 = legendData[_parent1];
        LegendMetadata storage parent2 = legendData[_parent2];

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        string memory newDNA = mixDNA(newItemId, parent1.id, parent2.id);

        bool mix = block.number % 2 == 0;

        uint256[2] memory parents = [_parent1, _parent2];

        uint256 level = 1;

        mintTo(
            msg.sender,
            newItemId,
            mix ? parent1.prefix : parent2.prefix,
            mix ? parent2.postfix : parent1.postfix,
            newDNA,
            parents,
            block.timestamp,
            level
        );

        emit createdDNA(newItemId);
        emit Breed(parent1.id, parent2.id, newItemId);
    }
}
