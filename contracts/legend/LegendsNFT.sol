// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./LegendMetadata.sol";

contract LegendsNFT is ERC721Enumerable, ILegendMetadata {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _legendIds;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab), "Not Authorized");
        _;
    }

    enum KinBlendingLevel {
        None,
        Parents,
        Siblings
    }

    KinBlendingLevel private kinBlendingLevel;

    uint256 private baseBlendingCost = 100;

    uint256 private blendingLimit = 5; // will need visable/getter for matching&rpools
    // uint256 private blendingCooldown = 86400; // seconds // hold off until discuss relisting in matching

    uint256 private incubationPeriod; // seconds

    /* legendId => ipfsHash */
    mapping(uint256 => string) private _tokenURIs;

    /* legendId => metadata */
    mapping(uint256 => LegendMetadata) public legendMetadata; // private ?

    /* legendId => skipIncubation? */
    mapping(uint256 => bool) private _noIncubation;

    /* parentId => childId => isParent? */
    mapping(uint256 => mapping(uint256 => bool)) private parentOf;

    constructor() ERC721("Legend", "LEGEND") {
        lab = LegendsLaboratory(msg.sender);
    }

    function createLegend(
        address _recipient,
        uint256 _promoId,
        bool _isLegendary
    ) external onlyLab {
        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        // origin Legends wont have parents
        uint256[2] memory parents = [uint256(0), uint256(0)];

        string memory uri = _formatURI(newLegendId, Strings.toString(_promoId));

        bool skipIncubation = lab.fetchPromoIncubation(_promoId);

        _mintLegend(
            _recipient,
            newLegendId,
            parents,
            uri,
            _isLegendary,
            skipIncubation
        );
    }

    function blendLegends(
        address _recipient,
        uint256 _parent1,
        uint256 _parent2,
        bool _skipIncubation
    ) external returns (uint256) {
        require(
            ownerOf(_parent1) == msg.sender && ownerOf(_parent2) == msg.sender
        );

        LegendMetadata storage p1 = legendMetadata[_parent1];
        LegendMetadata storage p2 = legendMetadata[_parent2];

        require(isBlendable(_parent1), "Blending limit reached");
        require(isBlendable(_parent2), "Blending limit reached");

        // thoroughly test bool returns
        if (kinBlendingLevel != KinBlendingLevel.Siblings) {
            require(_notSiblings(p1.parents, p2.parents));
            if (kinBlendingLevel != KinBlendingLevel.Parents) {
                require(_notParent(_parent1, _parent2));
            }
        }

        uint256 blendingCost = (fetchBlendingCost(_parent1) +
            fetchBlendingCost(_parent2)) / 2;

        lab.legendToken().blendingBurn(msg.sender, blendingCost); // may become liqlock

        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        uint256[2] memory parents = [_parent1, _parent2];

        for (uint256 i = 0; i < parents.length; i++) {
            // test thoroughly
            LegendMetadata storage m = legendMetadata[parents[i]];

            m.totalOffspring += 1;
            m.blendingInstancesUsed += 1;

            parentOf[parents[i]][newLegendId] = true;
        }

        string memory uri = _formatURI(
            newLegendId,
            string(
                abi.encodePacked(
                    Strings.toString(parents[0]),
                    "+",
                    Strings.toString(parents[1])
                )
            )
        );

        _mintLegend(
            _recipient,
            newLegendId,
            parents,
            uri,
            false,
            _skipIncubation
        );

        emit LegendsBlended(_parent1, _parent2, newLegendId);

        return (newLegendId);
    }

    function hatchLegend(uint256 _legendId, string memory _ipfsHash) public {
        require(ownerOf(_legendId) == msg.sender);
        require(isHatchable(_legendId), "Needs to incubate longer");

        _setLegendURI(_legendId, _ipfsHash);

        legendMetadata[_legendId].isHatched = true;

        emit LegendHatched(_legendId);
    }

    function nameLegend(
        uint256 _legendId,
        string memory _prefix,
        string memory _postfix
    ) external {
        require(isListable(_legendId), "Not Authorized");

        legendMetadata[_legendId].prefix = _prefix;
        legendMetadata[_legendId].postfix = _postfix;

        emit LegendNamed(_legendId, _prefix, _postfix);
    }

    function destroyLegend(uint256 _legendId) public {
        require(ownerOf(_legendId) == msg.sender);

        _burn(_legendId);

        emit LegendDestroyed(_legendId);
    }

    function _formatURI(uint256 _newLegendId, string memory data)
        private
        pure
        returns (string memory)
    {
        //TODO:
        string
            memory enumEgg = "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG";

        return
            string(
                abi.encodePacked(
                    Strings.toString(_newLegendId),
                    ",",
                    enumEgg,
                    ",",
                    data
                )
            );
    }

    function _mintLegend(
        address _recipient,
        uint256 _newLegendId,
        uint256[2] memory _parents,
        string memory _uri,
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
        m.season = lab.fetchSeason();
        m.parents = _parents;
        m.birthDay = block.timestamp;
        m.legendCreator = creator;
        m.isLegendary = _isLegendary;

        _noIncubation[_newLegendId] = _skipIncubation;

        _setLegendURI(_newLegendId, _uri);

        emit LegendCreated(_newLegendId);
    }

    function _setLegendURI(uint256 _legendId, string memory _ipfsHash) private {
        _tokenURIs[_legendId] = _ipfsHash;
    }

    function _notSiblings(
        uint256[2] memory _parents1,
        uint256[2] memory _parents2
    ) private pure returns (bool) {
        if (_parents1[0] == 0 || _parents2[0] == 0) return true;

        return
            keccak256(abi.encodePacked(_parents1)) !=
            keccak256(abi.encodePacked(_parents2)) &&
            keccak256(abi.encodePacked(_parents2)) !=
            keccak256(abi.encodePacked(_parents1));
    }

    function _notParent(uint256 _parent1, uint256 _parent2)
        private
        view
        returns (bool)
    {
        if (parentOf[_parent1][_parent2]) return false;
        if (parentOf[_parent2][_parent1]) return false;

        return true;
    }

    function isBlendable(uint256 _legendId) public view returns (bool) {
        return (legendMetadata[_legendId].blendingInstancesUsed <
            blendingLimit); // test return thoroughly
    }

    function isHatchable(uint256 _legendId) public view returns (bool) {
        require(!isHatched(_legendId), "Already hatched");

        if (_noIncubation[_legendId]) return true;

        uint256 hatchableWhen = (legendMetadata[_legendId].birthDay +
            incubationPeriod);

        if (block.timestamp < hatchableWhen) return false;

        return true;
    }

    function isHatched(uint256 _legendId) public view returns (bool) {
        return legendMetadata[_legendId].isHatched;
    }

    function isListable(uint256 _legendId) public view returns (bool) {
        if (ownerOf(_legendId) != msg.sender) return false;
        if (!isHatched(_legendId)) return false;

        return true;
    }

    function tokenURI(uint256 _legendId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_legendId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenURIs[_legendId];
    }

    function fetchTokenMetadata(uint256 _legendId)
        public
        view
        returns (LegendMetadata memory)
    {
        return legendMetadata[_legendId];
    }

    function fetchBlendingCost(uint256 _legendId)
        public
        view
        returns (uint256)
    {
        if (legendMetadata[_legendId].totalOffspring != 0) {
            return (baseBlendingCost *
                legendMetadata[_legendId].totalOffspring);
        } else {
            return baseBlendingCost;
        }
    }

    function setKinBlendingLevel(uint256 _kinBlendingLevel)
        public
        virtual
        onlyLab
    {
        if (_kinBlendingLevel == 0) {
            kinBlendingLevel == KinBlendingLevel.None;
        } else if (_kinBlendingLevel == 1) {
            kinBlendingLevel == KinBlendingLevel.Siblings;
        } else if (_kinBlendingLevel == 2) {
            kinBlendingLevel == KinBlendingLevel.Parents;
        }
    }

    function setBlendingLimit(uint256 _blendingLimit) public onlyLab {
        blendingLimit = _blendingLimit;
    }

    function setBaseBlendingCost(uint256 _baseBlendingCost) public onlyLab {
        baseBlendingCost = _baseBlendingCost;
    }

    function setIncubationPeriod(uint256 _incubationPeriod) public onlyLab {
        incubationPeriod = _incubationPeriod;
    }
}
