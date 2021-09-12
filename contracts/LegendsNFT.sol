// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./LegendBreeding.sol";
import "./LegendStats.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LegendsNFT is ERC721Enumerable, Ownable, LegendBreeding, LegendStats {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Strings for uint256;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => LegendMetadata) public legendData;

    uint256 incubationDuration;
    uint256 breedingCooldown;
    uint256 offspringLimit;
    uint256 baseBreedingCost;
    string season;

    event NewLegend(uint256 newItemId);
    event Minted(uint256 tokenId);
    event Breed(uint256 parent1, uint256 parent2, uint256 child);
    event Burned(uint256 tokenId);

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

    function setBaseBreedingCost(uint256 _baseBreedingCost) public {
        baseBreedingCost = _baseBreedingCost;
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

    // Leaving in for testing ; "Hatch" function will replace and call internally(safer)
    function assignIPFS(uint256 tokenId, string memory _tokenURI) public {
        require(ownerOf(tokenId) == msg.sender);
        // Needs another layer of security to prevent owner calling without reason ?
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

    function tokenDATA(
        uint256 tokenId // TODO: Clean this up, possibly not needed at all
    ) public view virtual returns (LegendDNA memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return legendDNA[tokenId];
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
        return legendData[tokenId];
    }

    function totalLegends() public view virtual returns (uint256) {
        require(_tokenIds.current() > 0, "No Legends have been minted");
        return _tokenIds.current();
    }

    function immolate(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender);

        LegendMetadata storage legend = legendData[tokenId];
        legend.isDestroyed = true;
        _burn(tokenId);

        emit Burned(tokenId);
    }

    function mintTo(
        address receiver,
        uint256 newItemId,
        string memory prefix,
        string memory postfix,
        uint256[2] memory parents,
        bool isLegendary,
        bool skipIncubation
    ) private returns (uint256) {
        uint256 _incubationDuration;

        _mint(receiver, newItemId);

        if (skipIncubation == true) {
            _incubationDuration = 0;
        } else {
            _incubationDuration = incubationDuration;
        }

        LegendMetadata memory m;
        m.id = newItemId;
        m.prefix = prefix;
        m.postfix = postfix;
        m.parents = parents;
        m.birthDay = block.timestamp;
        m.incubationDuration = _incubationDuration;
        m.breedingCooldown = breedingCooldown;
        m.breedingCost = baseBreedingCost;
        m.offspringLimit = offspringLimit;
        m.season = season;
        m.isLegendary = isLegendary;
        m.isDestroyed = false;

        legendData[newItemId] = m;

        // TODO: Generate "enumEgg" function

        string
            memory enumEgg = "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG";

        _setTokenURI(newItemId, enumEgg);

        emit NewLegend(newItemId);
    }

    function breed(
        uint256 _parent1,
        uint256 _parent2,
        bool skipIncubation
    ) public {
        require(
            ownerOf(_parent1) == msg.sender && ownerOf(_parent2) == msg.sender
        );

        LegendMetadata storage parent1 = legendData[_parent1];
        LegendMetadata storage parent2 = legendData[_parent2];

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        mixDNA(parent1.id, parent2.id, newItemId);

        uint256[2] memory parents = [_parent1, _parent2];
        bool mix = block.number % 2 == 0;
        bool isLegendary = false; // only one of a kind handmade Legends can be "Legendary"

        mintTo(
            msg.sender,
            newItemId,
            mix ? parent1.prefix : parent2.prefix,
            mix ? parent2.postfix : parent1.postfix,
            parents,
            isLegendary,
            skipIncubation
        );

        emit Breed(parent1.id, parent2.id, newItemId);
    }

    function mintPromo(
        address recipient,
        string memory prefix,
        string memory postfix,
        bool isLegendary,
        bool skipIncubation
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        createDNA(newItemId);

        uint256 promoParent = 0;
        uint256[2] memory parents = [promoParent, promoParent]; // promotional Legends wont have parents

        mintTo(
            recipient,
            newItemId,
            prefix,
            postfix,
            parents,
            isLegendary,
            skipIncubation
        );
    }
}
