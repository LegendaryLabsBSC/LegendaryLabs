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
 * :::important
 *
 * Legends will be given a temporary *Incubation URI*  when minted, prior to recieveing their
 * permanent *DNA-Generated URI* via `hatchLegend`
 *
 * :::
 *
 * :::note
 *
 * If space were to of allowed, of ends up allowing in the future, this would be reset to
 * a Legend base-naming scheme
 *
 * :::
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

    /* legendId => skipIncubation */
    mapping(uint256 => bool) private _noIncubation;

    /* parentId => childId => isParent */
    mapping(uint256 => mapping(uint256 => bool)) private _parentOf;

    constructor() ERC721("Legend", "LEGEND") {
        _lab = LegendsLaboratory(msg.sender);
    }

    /**
     * @dev Creates a new Legend NFT via redemption of a *promo ticket*.
     * Called by [`redeemPromoTicket`](docs/lab/LegendsLaboratory#redeemPromoTicket)
     *
     * :::note
     *
     * Legends created by this method will be assigned a (0) for both elements in `_legendMetadata.parents[2]`. Any Legend NFT
     * with (0)s in it's `_legendMetadata.parents[2]` will not be eligible to receive [**Royalties**](docs/info/royalties)
     *
     * :::
     *
     *
     * @param recipient Address that will receive the minted Legend
     * @param promoId ID of redeemed PromoEvent
     * @param isLegendary Determines if NFT is a Legendary
     */
    function createLegend(
        address recipient,
        uint256 promoId,
        bool isLegendary
    ) external onlyLab {
        _legendIds.increment();
        uint256 newLegendId = _legendIds.current();

        uint256[2] memory parents = [uint256(0), uint256(0)];

        string memory uri = _formatIncubationURI(
            newLegendId,
            Strings.toString(promoId)
        );

        /**
         * @dev Queries if the *promo event* permits the Legend to be immediately *hatched* or not
         *
         */
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
     * @notice Blend Two Legends Together
     *
     * @dev Blends two eligible Legends DNA, creating a new *child Legend*
     *
     * :::note
     *
     * During MVP phase, all new Legends created via the *blending* method will be required to undergo **Incubation**
     *
     * :::
     *
     *
     * @param recipient Address that will receive the *child Legend*
     * @param parent1 ID of first Legend used to create the *child Legend*
     * @param parent2 ID of first Legend used to create the *child Legend*
     */
    function blendLegends(
        address recipient,
        uint256 parent1,
        uint256 parent2
    )
        external
        returns (
            // bool skipIncubation
            uint256
        )
    {
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

        /**
         * @dev Uses simple average to calculate blending cost of parents *(P1 + P2) / 2*
         */
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

        _mintLegend(recipient, newLegendId, parents, uri, false, false);

        emit LegendsBlended(parent1, parent2, newLegendId);

        return (newLegendId);
    }

    /**
     * @notice Your New Specimen Awaits
     *
     * @dev Removes Legend from *incubation* stage and assigns permanent IPFS-URL
     *
     * :::note
     *
     * Requires Legend to met `isHatchable` criteria
     *
     * :::
     *
     *
     * @param legendId ID of Legend being removed from *incubation*
     * @param ipfsHash IPFS URL containing immutable off-chain Legend data
     */
    function hatchLegend(uint256 legendId, string calldata ipfsHash) public {
        require(ownerOf(legendId) == msg.sender);
        require(isHatchable(legendId), "Legend Needs Longer To Incubate");

        _legendMetadata[legendId].isHatched = true;

        _setLegendURI(legendId, ipfsHash);

        // _legendMetadata[legendId].birthday = block.timestamp;

        emit LegendHatched(legendId, block.timestamp);
    }

    /**
     * @notice Name Your Lab Specimen
     *
     * @dev Allows current Legend owner to modify `_legendMetadata.prefix` and `_legendMetadata.postfix`
     *
     * @param legendId ID of Legend being renamed
     * @param prefix First name element of Legend
     * @param postfix Second name element of Legend
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
     * @notice You Are Sending Your Legend To It's Death
     *
     * @dev Allows current Legend owner to send their Legend NFT token to the burn address, destroying it permanently
     *
     * :::warning
     *
     * If this is called on a `legendId` that Legend will cease to exist for all eternity.
     *
     * :::
     *
     * @param legendId ID of Legend being sent to burn address
     */
    function destroyLegend(uint256 legendId) public {
        require(ownerOf(legendId) == msg.sender);

        _burn(legendId);

        emit LegendDestroyed(legendId);
    }

    /**
     * @dev Function only callable by [`LegendsLaboratory`](/docs/lab/LegendsLaboratory#restoreBlendingSlots)
     */
    function restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
        public
        onlyLab
    {
        _legendMetadata[legendId].blendingInstancesUsed -= regainedSlots;
    }

    /**
     * @dev Formats a string to be used as the *incubation URI*
     *
     * @param newLegendId Address that will receive the minted Legend
     * @param data ID of redeemed PromoEvent
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
     * @dev Returns a "random" `_incubationViews` index for the Legend to display during the incubation stage.
     *
     * Relying on the blockchain for randomness has it's well documented flaws. So it should be noted that
     * the`incubationChamber` a Legend is assigned has zero influence over the post-incubation appearance
     * of the Legend, or otherwise value in any way.
     *
     */
    function _randomIncubationChamber() private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) % _incubationViews.length;
    }

    /**
     * @dev Mints a brand new Legend NFT and assigns it metadata.
     *
     * @param recipient Address that will receive the minted Legend
     * @param newLegendId ID the *child Legend*
     * @param parents IDs[2] of Legend's parents
     * @param uri incubation URI
     * @param isLegendary Determines if NFT is a Legendary
     * @param skipIncubation Determines if Legend is allowed to be hatched immediately after being minted
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
            /**
             * @dev To accommodate Matching, `creator` is Legend's second parent (breeder address)
             */
            creator = payable(recipient); // doesnt work properly
        }

        LegendMetadata storage m = _legendMetadata[newLegendId];
        m.id = newLegendId;
        m.season = _lab.fetchSeason();
        m.parents = parents;
        m.birthday = block.timestamp;
        m.legendCreator = creator;
        m.isLegendary = isLegendary;

        _noIncubation[newLegendId] = skipIncubation;

        _setLegendURI(newLegendId, uri);

        emit LegendCreated(newLegendId, creator);
    }

    /**
     * @dev Sets the Legend NFT's URI
     *
     * @param legendId ID of Legend having their URI set
     * @param ipfsHash Immutable Legend DNA
     */
    function _setLegendURI(uint256 legendId, string memory ipfsHash) private {
        _legendURI[legendId] = ipfsHash;
    }

    /**
     * @dev Queries if Legends are siblings
     *
     *
     * @param parents1 IDs[2] of first Legend's parents
     * @param parents2 IDs[2] of second Legend's parents
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
     * @dev Queries if Legends are each other's parents
     *
     * @param parent1 ID of first parent Legend
     * @param parent2 ID of second parent Legend
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
     * @dev Queries whether a Legend can be used to create a *child Legend* or not, based on
     * comparing `_legendsMetadata.blendingInstancesUsed` against the `_blendingLimit`
     *
     * @param legendId ID of Legend being queried
     */
    function isBlendable(uint256 legendId) public view returns (bool) {
        if (_legendMetadata[legendId].blendingInstancesUsed > _blendingLimit) {
            revert("Legend Has Reached Max Blending Slots"); // test return thoroughly
        }

        return true;
    }

    /**
     * @dev Queries whether a Legend is ready to be *hatched* or not, by reading the Legend's age.
     *
     * :::note
     *
     * Legends with `_noIncubation(true)` will be able to bypass this check
     *
     * :::
     *
     * @param legendId ID of Legend being queried
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
     * @dev Queries whether a Legend already has *hatched* or not
     *
     * :::important
     *
     * Whether a Legend has been hatched or not will not incluence the NFT owner's ability to transfer the token.
     *
     * :::
     *
     *
     * @param legendId ID of Legend being queried
     */
    function isHatched(uint256 legendId) public view returns (bool) {
        return _legendMetadata[legendId].isHatched;
    }

    /**
     * @dev Queries whether a Legend is allowed to bypass the incubation period
     *
     * @param legendId ID of Legend being queried
     */
    function isNoIncubation(uint256 legendId) public view returns (bool) {
        return _noIncubation[legendId];
    }

    /**
     * @dev Queries whether a Legend is the parent of another Legend
     *
     * @param parentLegendId ID of suspected parent Legend
     * @param childLegendId ID of suspected child Legend
     */
    function isParentOf(uint256 parentLegendId, uint256 childLegendId)
        public
        view
        returns (bool)
    {
        return _parentOf[parentLegendId][childLegendId];
    }

    /**
     * @dev Queries whether a Legend can be used in the **Marketplace**, **MatchingBoard, or **RejuvenationPod**.
     *
     * @param legendId ID of Legend being queried
     */
    function isListable(uint256 legendId) public view returns (bool) {
        // change to isUsable/syn ?
        if (ownerOf(legendId) != msg.sender) return false;
        if (!isHatched(legendId)) return false;

        return true;
    }

    /**
     * @dev Returns the cost to blend (2) Legend's together. *baseBlendCost x (totalOffspring + 1) *
     *
     * :::note
     *
     * `_legendMetadata.totalOffspring starts at (0), hence the need to increment the *offspring count*
     * for the purpose of calculating the *blending cost*.
     *
     * :::
     *
     *
     * @param legendId ID of Legend being queried
     */
    function fetchBlendingCost(uint256 legendId) public view returns (uint256) {
        uint256 blendingCost = _baseBlendingCost *
            (_legendMetadata[legendId].totalOffspring + 1);

        return blendingCost;
    }

    /**
     * @dev Returns the metadata of a given Legend NFT
     *
     * @param legendId ID of Legend being queried
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
     * @dev Returns the URI of a given Legend
     *
     * @param legendId ID of Legend being queried
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
     * @dev Returns the values of the (4) *blending rules*
     *
     * :::note Blending Rules:
     *
     * * [`_kinBlendingLevel`](/docs/info#kinBlendingLevel)
     * * [`_blendingLimit`](/docs/info#blendingLimit)
     * * [`_baseBlendingCost`](/docs/info#baseBlendingCost)
     * * [`_incubationPeriod`](/docs/info#incubationPeriod)
     *
     * :::
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
     * @dev Returns the current array[5] of strings being used as `incubationChamber`s
     */
    function fetchIncubationViews() public view returns (string[5] memory) {
        return _incubationViews;
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](/docs/LegendsLaboratory#setBlendingRule)'s `setBlendingRule`
     */
    function setBlendingRule(uint256 blendingRule, uint256 newRuleData)
        public
        onlyLab
    {
        if (blendingRule == 0) {
            if (newRuleData == 0) {
                _kinBlendingLevel = KinBlendingLevel.None;
            } else if (newRuleData == 1) {
                _kinBlendingLevel = KinBlendingLevel.Parents;
            } else if (newRuleData == 2) {
                _kinBlendingLevel = KinBlendingLevel.Siblings;
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
     * @dev Function only callable by [**LegendsLaboratory**](/docs/LegendsLaboratory#setIncubationViews)'s `setIncubationViews`
     */
    function setIncubationViews(string[5] memory newIncubationViews)
        public
        onlyLab
    {
        _incubationViews = newIncubationViews;
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](/docs/LegendsLaboratory#resetLegendName)'s `resetLegendName`
     */
    function resetLegendName(uint256 legendId) public onlyLab {
        _legendMetadata[legendId].prefix = "";
        _legendMetadata[legendId].postfix = "";
    }
}
