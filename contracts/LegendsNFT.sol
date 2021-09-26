// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./LegendsLabratory.sol";
import "./LegendBreeding.sol";
import "./LegendStats.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// ? Consider merging stats with NFT contract ?

contract LegendsNFT is ERC721Enumerable, Ownable, LegendBreeding, LegendStats {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Strings for uint256;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => LegendMetadata) public legendData;

    uint256 public incubationDuration;
    uint256 public breedingCooldown;
    uint256 public offspringLimit;
    uint256 public baseBreedingCost;
    string public season;

    uint256 public baseHealth;

    event NewLegend(uint256 newItemId);
    event Minted(uint256 tokenId);
    event Breed(uint256 parent1, uint256 parent2, uint256 child);
    event Burned(uint256 tokenId);

    LegendsLabratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab), "not lab owner");
        _;
    }

    // modifier isHatchable

    constructor() ERC721("Legend", "LEGEND") {
        lab = LegendsLabratory(msg.sender);
    }

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

    // function tokenDATA(
    //     uint256 tokenId // TODO: Clean this up, possibly not needed at all
    // ) public view virtual returns (LegendGenetics memory) {
    //     require(
    //         _exists(tokenId),
    //         "ERC721Metadata: URI query for nonexistent token"
    //     );
    //     return legendGenetics[tokenId];
    // }

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

    function immolate(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender);

        LegendMetadata storage legend = legendData[tokenId];
        legend.isDestroyed = true;
        _burn(tokenId);

        emit Burned(tokenId);
    }

    function isHatchable(uint256 tokenId, bool testToggle)
        public
        view
        returns (
            bool,
            uint256,
            uint256
        )
    {
        bool hatchable;
        uint256 hatchableWhen;
        LegendMetadata memory l = legendData[tokenId];
        if (!testToggle) {
            hatchableWhen = l.incubationDuration + l.birthDay;
        } else {
            hatchableWhen = block.timestamp;
        }
        if (hatchableWhen <= block.timestamp) {
            hatchable = true;
        }

        return (hatchable, hatchableWhen, block.timestamp);
    }

    function hatch(uint256 tokenId, string memory _tokenURI) public {
        // require(isHatchable(tokenId, false) === true);
        _setTokenURI(tokenId, _tokenURI);
        LegendMetadata memory legend = legendData[tokenId];
        legend.isHatched = true;
    }

    function mintTo(
        address receiver,
        uint256 newItemId,
        string memory prefix,
        string memory postfix,
        uint256[2] memory parents,
        bool isLegendary,
        bool skipIncubation
    ) private {
        uint256 _incubationDuration;
        bool isHatched;

        _mint(receiver, newItemId);

        if (skipIncubation == true) {
            _incubationDuration = 0;
            isHatched = true;
        } else {
            _incubationDuration = incubationDuration;
            isHatched = false;
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
        m.isHatched = isHatched;
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
        mixGenetics(parent1.id, parent2.id, newItemId);
        mixStats(parent1.id, parent2.id, newItemId, baseHealth);

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

    // TODO: restrict access control to lab
    function mintPromo(
        address recipient,
        string memory prefix,
        string memory postfix,
        bool isLegendary,
        bool skipIncubation
    ) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        createGenetics(newItemId);
        createStats(newItemId, baseHealth);

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

    function setIncubationDuration(uint256 _incubationDuration) public onlyLab {
        incubationDuration = (_incubationDuration);
    }

    function setBreedingCooldown(uint256 _breedingCooldown) public onlyLab {
        breedingCooldown = _breedingCooldown;
    }

    // function setOffspringLimit(uint256 _offspringLimit) public onlyLab {
    //     offspringLimit = _offspringLimit;
    // }

    // function setBreedingCost(uint256 _baseBreedingCost) public onlyLab {
    //     baseBreedingCost = _baseBreedingCost;
    // }

    // function setSeason(string memory _season) public onlyLab {
    //     season = _season;
    // }

    // function setBaseHealth(uint256 _baseHealth) public onlyLab {
    //     baseHealth = _baseHealth;
    // }
}
