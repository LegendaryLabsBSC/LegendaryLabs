// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./formation/LegendMetadata.sol";
import "./formation/LegendIncubation.sol";

contract LegendsNFT is ERC721Enumerable, LegendIncubation, ILegendMetadata {
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

    function createLegend(
        address _recipient,
        string memory _prefix, // assign in inc?
        string memory _postfix,
        uint256 _promoId,
        bool _isLegendary
    ) public onlyLab {
        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        // promotional Legends wont have parents
        uint256[2] memory parents = [uint256(0), uint256(0)];

        bool skipIncubation = lab.fetchPromoIncubation(_promoId); // legends forced to incubate? ; if not legend ..

        _mintLegend(
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

    function blendLegends(
        address recipient,
        uint256 _parent1,
        uint256 _parent2,
        bool skipIncubation
    ) public returns (uint256) {
        require(
            ownerOf(_parent1) == msg.sender && ownerOf(_parent2) == msg.sender
        );

        //fees
        //total offspring
        //breeding instances

        LegendMetadata storage parent1 = legendMetadata[_parent1];
        LegendMetadata storage parent2 = legendMetadata[_parent2];

        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        uint256[2] memory parents = [_parent1, _parent2];

        bool mix = block.number % 2 == 0;

        _mintLegend(
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

    function destroyLegend(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);

        legendMetadata[_tokenId].isDestroyed = true;

        _burn(_tokenId);

        emit Burned(_tokenId);
    }

    function _mintLegend(
        address _recipient,
        uint256 _newLegendId,
        string memory _prefix,
        string memory _postfix,
        uint256[2] memory _parents,
        uint256 _promoId,
        bool _isLegendary,
        bool _skipIncubation
    ) private {
        _mint(_recipient, _newLegendId);

        address payable creator;

        if (_parents[0] == 0) {
            creator = payable(address(0));
        } else {
            ///@dev To accommodate matching, creator is legend's second parent creator(breeder address)
            creator = payable(legendMetadata[_parents[1]].legendCreator);
        }

        LegendMetadata storage m = legendMetadata[_newLegendId];
        m.id = _newLegendId;
        m.season = lab.season();
        m.prefix = _prefix;
        m.postfix = _postfix;
        m.parents = _parents;
        m.birthDay = block.timestamp;
        m.breedingCost = baseBreedingCost;
        m.legendCreator = creator;
        m.isLegendary = _isLegendary;
        m.skipIncubation = _skipIncubation;

        string memory data;
        if (_promoId == 0) {
            data = string(
                abi.encodePacked(
                    Strings.toString(_parents[0]),
                    "-",
                    Strings.toString(_parents[1])
                )
            );
        } else {
            data = Strings.toString(_promoId);
        }

        //TODO:
        string
            memory enumEgg = "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG";

        _setTokenURI(
            _newLegendId,
            string(
                abi.encodePacked(
                    Strings.toString(_newLegendId),
                    ",",
                    enumEgg,
                    ",",
                    data
                )
            )
        );
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) private {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function setOffspringLimit(uint256 _offspringLimit) public onlyLab {
        offspringLimit = _offspringLimit;
    }

    function setBreedingBaseCost(uint256 _baseBreedingCost) public onlyLab {
        baseBreedingCost = _baseBreedingCost;
    }

    function setIncubationDuration(uint256 _incubationDuration)
        public
        virtual
        override
        onlyLab
    {
        incubationDuration = _incubationDuration;
    }
}
