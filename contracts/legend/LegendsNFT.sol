// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./LegendMetadata.sol";

contract LegendsNFT is ERC721Enumerable, ILegendMetadata {
    using Counters for Counters.Counter;
    using Strings for uint256;

    LegendsLaboratory _lab;

    Counters.Counter private _legendIds;

    modifier onlyLab() {
        require(msg.sender == address(_lab));
        _;
    }

    enum KinBlendingLevel {
        None,
        Parents,
        Siblings
    }

    KinBlendingLevel private _kinBlendingLevel;

    string[5] private _incubationViews = [
        // replace with Chucks incubators
        "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG",
        "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG",
        "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG",
        "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG",
        "ipfs://QmewiUnCt6cgadmci4M2s2jnDNx1y5gTQ2Qi5EX4EXBbNG"
    ];

    uint256 private _baseBlendingCost = 100;

    uint256 private _blendingLimit = 5;

    uint256 private _incubationPeriod; // seconds

    /* legendId => metadata */
    mapping(uint256 => LegendMetadata) private _legendMetadata;

    /* legendId => ipfsHash */
    mapping(uint256 => string) private _legendURI;

    /* legendId => skipIncubation? */
    mapping(uint256 => bool) private _noIncubation;

    /* parentId => childId => isParent? */
    mapping(uint256 => mapping(uint256 => bool)) private _parentOf;

    constructor() ERC721("Legend", "LEGEND") {
        _lab = LegendsLaboratory(msg.sender);
    }

    function createLegend(
        address recipient,
        uint256 promoId,
        bool isLegendary
    ) external onlyLab {
        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        // origin Legends wont have parents
        uint256[2] memory parents = [uint256(0), uint256(0)];

        string memory uri = _formatIncubationURI(
            newLegendId,
            Strings.toString(promoId)
        );

        bool skipIncubation = _lab.isPromoIncubated(promoId);

        _mintLegend(
            recipient,
            newLegendId,
            parents,
            uri,
            isLegendary,
            skipIncubation
        );
    }

    function blendLegends(
        address recipient,
        uint256 parent1,
        uint256 parent2,
        bool skipIncubation
    ) external returns (uint256) {
        require(
            ownerOf(parent1) == msg.sender && ownerOf(parent2) == msg.sender
        );

        LegendMetadata storage p1 = _legendMetadata[parent1];
        LegendMetadata storage p2 = _legendMetadata[parent2];

        require(
            isBlendable(parent1)
            // , "Blending limit reached"
        );
        require(
            isBlendable(parent2)
            // , "Blending limit reached"
        );

        // thoroughly test bool returns
        if (_kinBlendingLevel != KinBlendingLevel.Siblings) {
            require(_notSiblings(p1.parents, p2.parents));
            if (_kinBlendingLevel != KinBlendingLevel.Parents) {
                require(_notParent(parent1, parent2));
            }
        }

        uint256 blendingCost = (fetchBlendingCost(parent1) +
            fetchBlendingCost(parent2)) / 2;

        _lab.legendToken().blendingBurn(msg.sender, blendingCost); // may become liqlock

        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        uint256[2] memory parents = [parent1, parent2];

        for (uint256 i = 0; i < parents.length; i++) {
            // test thoroughly
            LegendMetadata storage m = _legendMetadata[parents[i]];

            m.totalOffspring += 1;
            m.blendingInstancesUsed += 1;

            _parentOf[parents[i]][newLegendId] = true;
        }

        string memory uri = _formatIncubationURI(
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
            recipient,
            newLegendId,
            parents,
            uri,
            false,
            skipIncubation
        );

        emit LegendsBlended(parent1, parent2, newLegendId);

        return (newLegendId);
    }

    function hatchLegend(uint256 legendId, string calldata ipfsHash) public {
        require(ownerOf(legendId) == msg.sender);
        require(
            isHatchable(legendId)
            // , "Needs to incubate longer"
        );

        _legendMetadata[legendId].isHatched = true;

        _setLegendURI(legendId, ipfsHash);

        _legendMetadata[legendId].birthday = block.timestamp;

        emit LegendHatched(legendId, block.timestamp);
    }

    function nameLegend(
        uint256 legendId,
        string calldata prefix,
        string calldata postfix
    ) external {
        require(
            isListable(legendId)
            // , "Not Authorized"
        );

        _legendMetadata[legendId].prefix = prefix;
        _legendMetadata[legendId].postfix = postfix;

        emit LegendNamed(legendId, prefix, postfix);
    }

    function destroyLegend(uint256 legendId) public {
        require(ownerOf(legendId) == msg.sender);

        _burn(legendId);

        emit LegendDestroyed(legendId);
    }

    function _formatIncubationURI(uint256 newLegendId, string memory data)
        private
        view
        returns (string memory)
    {
        uint256 incubationChamber = _randomIncubationChamber();

        return
            string(
                abi.encodePacked(
                    Strings.toString(newLegendId),
                    ",",
                    _incubationViews[incubationChamber],
                    ",",
                    data
                )
            );
    }

    function _randomIncubationChamber() private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % _incubationViews.length;
    }

    function _mintLegend(
        address recipient,
        uint256 newLegendId,
        uint256[2] memory parents,
        string memory uri,
        bool isLegendary,
        bool skipIncubation
    ) private {
        _mint(recipient, newLegendId);

        address payable creator;

        if (parents[0] == 0) {
            creator = payable(address(0));
        } else {
            ///@dev To accommodate matching, creator is legend's second parent creator(breeder address)
            creator = payable(_legendMetadata[parents[1]].legendCreator);
        }

        LegendMetadata storage m = _legendMetadata[newLegendId];
        m.id = newLegendId;
        m.season = _lab.fetchSeason();
        m.parents = parents;
        m.legendCreator = creator;
        m.isLegendary = isLegendary;

        _noIncubation[newLegendId] = skipIncubation;

        _setLegendURI(newLegendId, uri);

        emit LegendCreated(newLegendId, creator);
    }

    function _setLegendURI(uint256 legendId, string memory ipfsHash) private {
        _legendURI[legendId] = ipfsHash;
    }

    function _notSiblings(
        uint256[2] memory parents1,
        uint256[2] memory parents2
    ) private pure returns (bool) {
        if (parents1[0] == 0 || parents2[0] == 0) return true;

        return
            keccak256(abi.encodePacked(parents1)) !=
            keccak256(abi.encodePacked(parents2)) &&
            keccak256(abi.encodePacked(parents2)) !=
            keccak256(abi.encodePacked(parents1));
    }

    function _notParent(uint256 parent1, uint256 parent2)
        private
        view
        returns (bool)
    {
        if (_parentOf[parent1][parent2]) return false;
        if (_parentOf[parent2][parent1]) return false;

        return true;
    }

    function _restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
        public
        onlyLab
    {
        _legendMetadata[legendId].blendingInstancesUsed -= regainedSlots;
    }

    function isBlendable(uint256 legendId) public view returns (bool) {
        return (_legendMetadata[legendId].blendingInstancesUsed <
            _blendingLimit); // test return thoroughly
    }

    function isHatchable(uint256 legendId) public view returns (bool) {
        require(
            !isHatched(legendId)
            // , "Already hatched"
        );

        if (_noIncubation[legendId]) return true;

        uint256 hatchableWhen = (_legendMetadata[legendId].birthday +
            _incubationPeriod);

        if (block.timestamp < hatchableWhen) return false;

        return true;
    }

    function isHatched(uint256 legendId) public view returns (bool) {
        return _legendMetadata[legendId].isHatched;
    }

    function isNoIncubation(uint256 legendId) public view returns (bool) {
        return _noIncubation[legendId];
    }

    function isParentOf(uint256 parentLegendId, uint256 childLegendId)
        public
        view
        returns (bool)
    {
        return _parentOf[parentLegendId][childLegendId];
    }

    function isListable(uint256 legendId) public view returns (bool) {
        // change to isUsable/syn ?
        if (ownerOf(legendId) != msg.sender) return false;
        if (!isHatched(legendId)) return false;

        return true;
    }

    function fetchLegendMetadata(uint256 legendId)
        public
        view
        returns (LegendMetadata memory)
    {
        return _legendMetadata[legendId];
    }

    function fetchLegendURI(uint256 legendId)
        public
        view
        returns (string memory)
    {
        require(
            _exists(legendId)
            // "ERC721Metadata: URI query for nonexistent token"
        );
        return _legendURI[legendId];
    }

    function fetchBlendingCost(uint256 legendId) public view returns (uint256) {
        if (_legendMetadata[legendId].totalOffspring != 0) {
            return (_baseBlendingCost *
                _legendMetadata[legendId].totalOffspring);
        } else {
            return _baseBlendingCost;
        }
    }

    function fetchLabRules()
        public
        view
        returns (
            KinBlendingLevel,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            _kinBlendingLevel,
            _baseBlendingCost,
            _blendingLimit,
            _incubationPeriod
        );
    }

    function fetchIncubationViews() public view returns (string[5] memory) {
        return _incubationViews;
    }

    function setKinBlendingLevel(uint256 newKinBlendingLevel) public onlyLab {
        if (newKinBlendingLevel == 0) {
            _kinBlendingLevel = KinBlendingLevel.None;
        } else if (newKinBlendingLevel == 1) {
            _kinBlendingLevel = KinBlendingLevel.Siblings;
        } else if (newKinBlendingLevel == 2) {
            _kinBlendingLevel = KinBlendingLevel.Parents;
        }
    }

    function setIncubationViews(string[5] memory newIncubationViews)
        public
        onlyLab
    {
        _incubationViews = newIncubationViews;
    }

    function setBlendingLimit(uint256 newBlendingLimit) public onlyLab {
        _blendingLimit = newBlendingLimit;
    }

    function setBaseBlendingCost(uint256 newBaseBlendingCost) public onlyLab {
        _baseBlendingCost = newBaseBlendingCost;
    }

    function setIncubationPeriod(uint256 newIncubationPeriod) public onlyLab {
        _incubationPeriod = newIncubationPeriod;
    }



    function resetLegendName(uint256 legendId) public onlyLab {
        _legendMetadata[legendId].prefix = "";
        _legendMetadata[legendId].postfix = "";
    }
}
