// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./ILegendMetadata.sol";

/**
 * @dev Contract which creates and manages the lifecycle of an ERC721 Legend NFT.
 * Inherits from {ILegendMetadata} to define a Legend NFT.
 *
 * New Legend NFTs can only be created by one of (2) methods:
 *  1. Redeeming a `promoTicket` obtained from a Legendary Lab's event. This method calls `createLegend`.
 *  2. Blending two Legend NFTs together to make a `childLegend`. This method utilizes `blendLegends`.
 *
 * Laboratory State variables such as `_kinBlendingLevel` and `_baseBlendingCost` are all manages and set by {LegendsLaboratory}
 * Each of these variables are private and have a corresponding public getter function. Due to smart-contract size limitations (EIP-170)
 * many of these variable's getters have be combines i.e. `fetchBlendingRules' which returns (4) values. Once again due to reaching size limits 
 * in this contract there are a few state variables with combined setter functions. However, with `setBlendingRule` the **`ADMIN`** caller 
 * specifies which (1) of the (4) **Blending Rules** they wish to set.
 *
 *
 */

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

    uint256 private _blendingLimit = 5;

    uint256 private _baseBlendingCost = 100;

    uint256 private _incubationPeriod = 100; // seconds

    /* legendId => metadata */
    mapping(uint256 => LegendMetadata) private _legendMetadata;

    /* legendId => ipfsHash */
    mapping(uint256 => string) private _legendURI;

    /* legendId => skipIncubation? */
    mapping(uint256 => bool) private _noIncubation;

    /* parentId => childId => isParent */
    mapping(uint256 => mapping(uint256 => bool)) private _parentOf;

    constructor() ERC721("Legend", "LEGEND") {
        _lab = LegendsLaboratory(msg.sender);
    }

    /**
     * @dev
     *
     *
     */
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

    /**
     * @dev
     *
     *
     */
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

        require(isBlendable(parent1));
        require(isBlendable(parent2));

        // thoroughly test bool returns
        if (_kinBlendingLevel != KinBlendingLevel.Siblings) {
            require(
                _notSiblings(p1.parents, p2.parents),
                "Blending Not Allowed With Sibling Legend"
            );
            if (_kinBlendingLevel != KinBlendingLevel.Parents) {
                require(
                    _notParent(parent1, parent2),
                    "Blending Not Allowed With Parent Legend"
                );
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

    /**
     * @dev
     *
     *
     */
    function hatchLegend(uint256 legendId, string calldata ipfsHash) public {
        require(ownerOf(legendId) == msg.sender);
        require(isHatchable(legendId), "Legend Needs Longer To Incubate");

        _legendMetadata[legendId].isHatched = true;

        _setLegendURI(legendId, ipfsHash);

        _legendMetadata[legendId].birthday = block.timestamp;

        emit LegendHatched(legendId, block.timestamp);
    }

    /**
     * @dev
     *
     *
     */
    function nameLegend(
        uint256 legendId,
        string calldata prefix,
        string calldata postfix
    ) external {
        require(isListable(legendId));

        _legendMetadata[legendId].prefix = prefix;
        _legendMetadata[legendId].postfix = postfix;

        emit LegendNamed(legendId, prefix, postfix);
    }

    /**
     * @dev
     *
     *
     */
    function destroyLegend(uint256 legendId) public {
        require(ownerOf(legendId) == msg.sender);

        _burn(legendId);

        emit LegendDestroyed(legendId);
    }

    /**
     * @dev
     *
     *
     */
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

    /**
     * @dev
     *
     *
     */
    function _randomIncubationChamber() private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % _incubationViews.length;
    }

    /**
     * @dev
     *
     *
     */
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
            /** @dev To accommodate matching, creator is legend's second parent creator(breeder address) */
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

    /**
     * @dev
     *
     *
     */
    function _setLegendURI(uint256 legendId, string memory ipfsHash) private {
        _legendURI[legendId] = ipfsHash;
    }

    /**
     * @dev
     *
     *
     */
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

    /**
     * @dev
     *
     *
     */
    function _notParent(uint256 parent1, uint256 parent2)
        private
        view
        returns (bool)
    {
        if (_parentOf[parent1][parent2]) return false;
        if (_parentOf[parent2][parent1]) return false;

        return true;
    }

    /**
     * @dev
     *
     *
     */
    function restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
        public
        onlyLab
    {
        _legendMetadata[legendId].blendingInstancesUsed -= regainedSlots;
    }

    /**
     * @dev
     *
     *
     */
    function isBlendable(uint256 legendId) public view returns (bool) {
        if (_legendMetadata[legendId].blendingInstancesUsed > _blendingLimit) {
            revert("Legend Has Reached Max Blending Slots"); // test return thoroughly
        }

        return true;
    }

    /**
     * @dev
     *
     *
     */
    function isHatchable(uint256 legendId) public view returns (bool) {
        require(!isHatched(legendId));

        if (_noIncubation[legendId]) return true;

        uint256 hatchableWhen = (_legendMetadata[legendId].birthday +
            _incubationPeriod);

        if (block.timestamp < hatchableWhen) return false;

        return true;
    }

    /**
     * @dev
     *
     *
     */
    function isHatched(uint256 legendId) public view returns (bool) {
        return _legendMetadata[legendId].isHatched;
    }

    /**
     * @dev
     *
     *
     */
    function isNoIncubation(uint256 legendId) public view returns (bool) {
        return _noIncubation[legendId];
    }

    /**
     * @dev
     *
     *
     */
    function isParentOf(uint256 parentLegendId, uint256 childLegendId)
        public
        view
        returns (bool)
    {
        return _parentOf[parentLegendId][childLegendId];
    }

    /**
     * @dev
     *
     *
     */
    function isListable(uint256 legendId) public view returns (bool) {
        // change to isUsable/syn ?
        if (ownerOf(legendId) != msg.sender) return false;
        if (!isHatched(legendId)) return false;

        return true;
    }

    /**
     * @dev
     *
     *
     */
    function fetchBlendingCost(uint256 legendId) public view returns (uint256) {
        uint256 blendingCost = _baseBlendingCost *
            (_legendMetadata[legendId].totalOffspring + 1);

        return blendingCost;
    }

    /**
     * @dev
     *
     *
     */
    function fetchLegendMetadata(uint256 legendId)
        public
        view
        virtual
        override
        returns (LegendMetadata memory)
    {
        require(_exists(legendId));
        return _legendMetadata[legendId];
    }

    /**
     * @dev
     *
     *
     */
    function fetchLegendURI(uint256 legendId)
        public
        view
        returns (string memory)
    {
        require(_exists(legendId));
        return _legendURI[legendId];
    }

    /**
     * @dev
     *
     *
     */
    function fetchBlendingRules()
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
            _blendingLimit,
            _baseBlendingCost,
            _incubationPeriod
        );
    }

    /**
     * @dev
     *
     *
     */
    function fetchIncubationViews() public view returns (string[5] memory) {
        return _incubationViews;
    }

    // function setKinBlendingLevel(uint256 newKinBlendingLevel) public onlyLab {
    //     if (newKinBlendingLevel == 0) {
    //         _kinBlendingLevel = KinBlendingLevel.None;
    //     } else if (newKinBlendingLevel == 1) {
    //         _kinBlendingLevel = KinBlendingLevel.Siblings;
    //     } else if (newKinBlendingLevel == 2) {
    //         _kinBlendingLevel = KinBlendingLevel.Parents;
    //     }
    // }

    /**
     * @dev
     *
     *
     */
    function setBlendingRule(uint256 blendingRule, uint256 newRuleData)
        public
        onlyLab
    {
        if (blendingRule == 0) {
            if (newRuleData == 0) {
                _kinBlendingLevel = KinBlendingLevel.None;
            } else if (newRuleData == 1) {
                _kinBlendingLevel = KinBlendingLevel.Siblings;
            } else if (newRuleData == 2) {
                _kinBlendingLevel = KinBlendingLevel.Parents;
            }
        } else if (blendingRule == 1) {
            _blendingLimit = newRuleData;
        } else if (blendingRule == 2) {
            _baseBlendingCost = newRuleData;
        } else if (blendingRule == 3) {
            _incubationPeriod = newRuleData;
        }
    }

    /**
     * @dev
     *
     *
     */
    function setIncubationViews(string[5] memory newIncubationViews)
        public
        onlyLab
    {
        _incubationViews = newIncubationViews;
    }

    /**
     * Do not delete below functions until after adding docs to above(setrules) ;; if still not enough size may just use individual
     */

    // function setBlendingLimit(uint256 newBlendingLimit) public onlyLab {
    //     _blendingLimit = newBlendingLimit;
    // }

    // function setBaseBlendingCost(uint256 newBaseBlendingCost) public onlyLab {
    //     _baseBlendingCost = newBaseBlendingCost;
    // }

    // function setIncubationPeriod(uint256 newIncubationPeriod) public onlyLab {
    //     _incubationPeriod = newIncubationPeriod;
    // }

    /**
     * @dev
     *
     *
     */
    function resetLegendName(uint256 legendId) public onlyLab {
        _legendMetadata[legendId].prefix = "";
        _legendMetadata[legendId].postfix = "";
    }
}
