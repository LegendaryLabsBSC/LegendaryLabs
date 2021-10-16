// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./formation/LegendMetadata.sol";
import "./formation/LegendBreeding.sol";
import "./formation/LegendIncubation.sol";

contract LegendsNFT is ERC721Enumerable, LegendBreeding, ILegendMetadata {
    using Counters for Counters.Counter;
    using Strings for uint256;

    event Minted(uint256 tokenId);
    event BlendDNA(uint256 parent1, uint256 parent2, uint256 child);
    event Burned(uint256 tokenId);

    Counters.Counter private _legendIds;

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
        uint256 newLegendId,
        string memory prefix,
        string memory postfix,
        uint256[2] memory parents,
        uint256 promoId,
        bool isLegendary,
        bool skipIncubation
    ) private {
        uint256 _incubationDuration;
        bool isHatched;

        address payable _creator;

        _mint(_recipient, newLegendId);

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
        LegendMetadata storage m = legendMetadata[newLegendId];
        m.id = newLegendId;
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

        // legendMetadata[newLegendId] = m;

        // TODO: Generate "enumEgg" function ; randomize and send in from fe/be to save on gas

        string
            memory enumEgg = "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG";

        string memory data;

        if (promoId == 0) {
            data = string(
                abi.encodePacked(
                    Strings.toString(parents[0]),
                    "-",
                    Strings.toString(parents[0])
                )
            );
        } else {
            data = Strings.toString(promoId);
        }

        string memory _uri = string(
            abi.encodePacked(
                Strings.toString(newLegendId),
                ",",
                data,
                ",",
                enumEgg
            )
        );

        _setTokenURI(newLegendId, _uri);

        // emit NewLegend(newLegendId);
    }

    function blendDNA(
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

        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        uint256[2] memory parents = [_parent1, _parent2];

        bool mix = block.number % 2 == 0;

        mintTo(
            recipient,
            newLegendId,
            mix ? parent1.prefix : parent2.prefix,
            mix ? parent2.postfix : parent1.postfix,
            parents,
            0,
            false,
            skipIncubation
        );

        emit BlendDNA(parent1.id, parent2.id, newLegendId);
        return (newLegendId);
    }

    // TODO: restrict access control to lab
    function mintPromo(
        address _recipient,
        string memory _prefix,
        string memory _postfix,
        uint256 _promoId,
        bool _isLegendary
    ) public onlyLab {
        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        // createGenetics(newLegendId);
        // createStats(newLegendId);
        // , baseHealth);

        uint256 promoParent = 0;
        uint256[2] memory parents = [promoParent, promoParent]; // promotional Legends wont have parents

        bool skipIncubation = lab.fetchPromoIncubation(_promoId);

        mintTo(
            _recipient,
            newLegendId,
            _prefix,
            _postfix,
            parents,
            _promoId,
            _isLegendary,
            skipIncubation
        );
    }

    // function _createTokenURI(uint256 newLegendId, uint256)

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
