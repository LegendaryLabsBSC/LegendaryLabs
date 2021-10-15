// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./formation/LegendMetadata.sol";
import "./formation/LegendBreeding.sol";
import "./formation/LegendIncubation.sol";

contract LegendsNFT is
    ERC721Enumerable,
    LegendBreeding,
    ILegendMetadata
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    event Minted(uint256 tokenId);
    event Breed(uint256 parent1, uint256 parent2, uint256 child);
    event Burned(uint256 tokenId);

    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => LegendMetadata) public legendMetadata;

    uint256 public offspringLimit = 4;
    uint256 public baseBreedingCost = 100;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab), "Not Lab");
        _;
    }
    constructor() ERC721("Legend", "LEGEND") {
        lab = LegendsLaboratory(msg.sender);
    }

    //TODO: rework variable naming throughout
    function mintTo(
        address _recipient,
        uint256 newItemId,
        string memory prefix,
        string memory postfix,
        uint256[2] memory parents,
        bool isLegendary,
        bool skipIncubation
    ) private {
        uint256 _incubationDuration;
        bool isHatched;

        address payable _creator;

        _mint(_recipient, newItemId);

        if (skipIncubation == true) {
            _incubationDuration = 0;
            isHatched = true;
        } else {
            // _incubationDuration = incubationDuration;
            isHatched = false;
        }

        if (parents[0] == 0) {
            _creator = payable(address(0));
        } else {
            ///@dev To accommodate matching, creator is legend's second parent creator(breeder address)
            _creator = payable(legendMetadata[parents[1]].legendCreator);
        }

        // LegendMetadata memory m;
        LegendMetadata storage m = legendMetadata[newItemId];
        m.id = newItemId;
        // m.season = season;
        m.prefix = prefix;
        m.postfix = postfix;
        m.parents = parents;
        m.birthDay = block.timestamp;
        // m.incubationDuration = _incubationDuration; //TODO: make state var in lab or this
        m.breedingCost = baseBreedingCost;
        m.legendCreator = _creator;
        m.isLegendary = isLegendary;
        m.isHatched = isHatched;
        m.isDestroyed = false;

        // legendMetadata[newItemId] = m;

        // TODO: Generate "enumEgg" function ; randomize and send in from fe/be to save on gas

        string
            memory enumEgg = "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG";

        _setTokenURI(newItemId, enumEgg);

        // emit NewLegend(newItemId);
    }

    function breed(
        address recipient,
        uint256 _parent1,
        uint256 _parent2,
        bool skipIncubation
    ) public returns (uint256) {
        require(
            ownerOf(_parent1) == msg.sender && ownerOf(_parent2) == msg.sender
        );

        LegendMetadata storage parent1 = legendMetadata[_parent1];
        LegendMetadata storage parent2 = legendMetadata[_parent2];

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        mixGenetics(parent1.id, parent2.id, newItemId);
        // mixStats(parent1.id, parent2.id, newItemId);
        // , baseHealth);

        uint256[2] memory parents = [_parent1, _parent2];
        bool mix = block.number % 2 == 0;
        bool isLegendary = false; // only one of a kind handmade Legends can be "Legendary"

        mintTo(
            recipient,
            newItemId,
            mix ? parent1.prefix : parent2.prefix,
            mix ? parent2.postfix : parent1.postfix,
            parents,
            isLegendary,
            skipIncubation
        );

        emit Breed(parent1.id, parent2.id, newItemId);
        return (newItemId);
    }

    // TODO: restrict access control to lab
    function mintPromo(
        address recipient,
        string memory prefix,
        string memory postfix,
        bool isLegendary,
        bool skipIncubation
    ) public {
        // require(lab._promoTickets[msg.sender] != 0, "No tickets");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        createGenetics(newItemId);
        // createStats(newItemId);
        // , baseHealth);

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

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function fetchTokenURI(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenURIs[tokenId];
    }

    function fetchTokenMetadata(uint256 tokenId)
        public
        view
        returns (LegendMetadata memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return legendMetadata[tokenId];
    }

    function destroyLegend(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender);

        legendMetadata[tokenId].isDestroyed = true;

        _burn(tokenId);

        emit Burned(tokenId);
    }

    // function setIncubationDuration(uint256 _incubationDuration) public onlyLab {
    //     incubationDuration = (_incubationDuration);
    // }

    function setOffspringLimit(uint256 _offspringLimit) public onlyLab {
        offspringLimit = _offspringLimit;
    }

    function setBreedingCost(uint256 _baseBreedingCost) public onlyLab {
        baseBreedingCost = _baseBreedingCost;
    }

    // function setSeason(string memory _season) public onlyLab {
    //     season = _season;
    // } // TODO: only have in lab, pull state variable from lab.var
}
