// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./IRejuvenationPod.sol";

pragma solidity 0.8.4;

/**
 * @dev The **LegendRejuvenation** contract allows a Legend NFT to restore decrease the value of its `_legendMetadata.blendingSlotsUsed`.
 * Inherits from [**ILegendRejuvenation**](./IRejuvenationPod) to define a *Rejuvenation Pod*.
 *
 *
 */
contract LegendRejuvenation is IRejuvenationPod, ReentrancyGuard {
    using Counters for Counters.Counter;

    LegendsLaboratory _lab;

    modifier onlyLab() {
        require(msg.sender == address(_lab), "Not Called By Lab Admin");
        _;
    }

    uint256 private _minimumSecure = 1000; // what if min is raised and amount in pod is lower than min ?
    uint256 private _maxMultiplier = 5;

    // BSC blocks-per-day: ~28750 ; Matic blocks-per-day: ~43200
    // testing with BSC count in mind ~10 days per slot
    uint256 private _reJuPerBlock = 1;
    uint256 private _reJuNeededPerSlot = 300000;

    /* legendId => podDetails */
    mapping(uint256 => RejuvenationPod) private _rejuvenationPod;

    constructor() {
        _lab = LegendsLaboratory(msg.sender);
    }

    /**
     * @notice Rejuvenate Your Legend
     *
     * @dev Places a Legend NFT into a *rejuvenation pod* where it gains back the ability to blend.
     *
     * legend must be considered [*listable*](../lab/LegendsLaboratory#islistable)
     *
     * LGND tokens must be secured, THIS IS NOT A FARM OR STAKING, those who secure LGND tokens in a *rejuvenation pod*
     * will neither gain nor lose LGND tokens. The securing of LGND tokens are for the purpose of earning in-game rewards.
     * Such as rejuvenation &rarr; *blending slots*, training &rarr; *experience*, lottery-side-games &rarr; *items* etc.
     *
     *
     * reju pods will have a set minimum amount of LGND tokens that are needed to enter a Legend into rpod.
     * Each times the minimum amount is secured into the pod, the rejuvenation rate multiplier increases
     *
     * when this function is called the legend is transferred to this contract
     *
     * :::note
     *
     *
     * :::
     *
     *
     * @param nftContract Address of the ERC721 contract
     * @param legendId ID of Legends entering its *rejuvenation pod*
     * @param tokensToSecure Amount of LGND tokens to secure in the *rejuvenation pod
     */
    function enterRejuvenationPod(
        address nftContract,
        uint256 legendId,
        uint256 tokensToSecure
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);
        RejuvenationPod storage r = _rejuvenationPod[legendId];

        require(
            _lab.isListable(legendId),
            "Caller Is Not Owner Or Legend Has Not Hatched"
        );

        require(!r.occupied, "Legend Already Occupying Pod");

        if (tokensToSecure < _minimumSecure) {
            revert(
                "LGND Token Amount Must Meet The Minimum To Rejuvenate Legend"
            );
        }

        uint256 maxSecure = _minimumSecure * _maxMultiplier;
        if (tokensToSecure > maxSecure) {
            revert("LGND Token Amount Can Not Exceed Max Allowed");
        }

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        _lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            tokensToSecure
        );

        r.nftContract = nftContract;

        r.depositedBy = msg.sender;
        r.checkpointBlock = block.number;
        r.blendingInstancesUsed = _lab.fetchBlendingCount(legendId);
        r.tokenAmountSecured = tokensToSecure;
        r.multiplier = _calculateMultiplier(tokensToSecure);
        r.occupied = true;

        emit PodStatusChanged(legendId, true);
        emit PodTokensIncreased(legendId, tokensToSecure);
    }

    /**
     * @notice Retrieve Your Legend From Rejuvenation
     *
     * @dev Removes a Legend NFT from its *rejuvenation pod* along with all LGND tokens currently secured in the pod.
     * If a Legend NFT is removed from its *rejuvenation pod* any rollover *ReJu* will be lost.
     *
     * @param legendId ID of Legends leaving its *rejuvenation pod
     */
    function leaveRejuvenationPod(uint256 legendId) external nonReentrant {
        RejuvenationPod storage r = _rejuvenationPod[legendId];

        require(r.occupied, "Legend Is Not Occupying Pod");
        require(msg.sender == r.depositedBy, "Caller Did Not Enter Legend");

        r.occupied = false;

        removeSecuredTokens(legendId, r.tokenAmountSecured);

        r.rolloverReju = 0;

        IERC721(r.nftContract).transferFrom(
            address(this),
            r.depositedBy,
            legendId
        );

        emit PodStatusChanged(legendId, false);
    }

    /**
     * @notice Retrieve Your Rejuvenation Pod LGND Tokens
     *
     * @dev Removes LGND tokens from a Legend's *rejuvenation pod*. When calling `removeSecuredTokens` directly, the caller
     * is not required to removed the entire secured amount. However, the remaining amount must meet the minimum required amount.
     * Any time a *rejuvenation pod* has its secured LGND token amount increase or decrease, the Legend NFT will be automatically
     * rejuvenated and the `_rejuvenationPod.multiplier` recalculated.
     *
     *
     *
     * @param legendId ID of Legends occupying its *rejuvenation pod
     * @param amountToRemove Number of LGND tokens to remove from the *rejuvenation pod*
     */
    function removeSecuredTokens(uint256 legendId, uint256 amountToRemove)
        public
        nonReentrant
    {
        RejuvenationPod storage r = _rejuvenationPod[legendId];

        require(r.occupied, "Legend Is Not Occupying Pod");
        require(msg.sender == r.depositedBy, "Caller Did Not Enter Legend");

        require(amountToRemove != 0, "Amount Can Not Be 0");

        if (amountToRemove > r.tokenAmountSecured) {
            revert("Amount Can Not Be Greater Than Secured");
        }

        if (amountToRemove != r.tokenAmountSecured) {
            if ((r.tokenAmountSecured - amountToRemove) < _minimumSecure) {
                revert("Remaining Amount Can Not Be Less Than Minimum");
            }
        }

        if (r.blendingInstancesUsed != 0) {
            _restoreBlendingSlots(legendId);
        }

        uint256 newAmount = r.tokenAmountSecured - amountToRemove;

        r.tokenAmountSecured = newAmount;
        r.multiplier = _calculateMultiplier(newAmount);

        _lab.legendToken().transferFrom(
            address(this),
            msg.sender,
            amountToRemove
        );

        emit PodTokensDecreased(legendId, newAmount);
    }

    /**
     * @notice Add To Your Rejuvenation Pod LGND Tokens
     *
     * @dev Adds LGND tokens to a Legend's *rejuvenation pod*.
     *
     * :::tip Note
     *
     * `tokenAmountSecured` can not exceed `_minimumSecure` * `_maxMultiplier`. There are checks
     * in place preventing this during `enterRejuvenationPod` & `increaseSecuredTokens`. Additionally,
     * `_calculateMultiplier` will not allow `_rejuvenationPod.multiplier` to exceed `_maxMultiplier`.
     *
     *
     * @param legendId ID of Legends occupying its *rejuvenation pod
     * @param amountToSecure Number of LGND tokens being added to the *rejuvenation pod*
     */
    function increaseSecuredTokens(uint256 legendId, uint256 amountToSecure)
        external
        nonReentrant
    {
        RejuvenationPod storage r = _rejuvenationPod[legendId];

        require(r.occupied, "Legend Is Not Occupying Pod");
        require(msg.sender == r.depositedBy, "Caller Did Not Enter Legend");

        require(amountToSecure != 0, "Amount Can Not Be 0");

        uint256 newAmount = r.tokenAmountSecured + amountToSecure;

        uint256 maxSecure = _minimumSecure * _maxMultiplier;
        if ((amountToSecure + r.tokenAmountSecured) > maxSecure) {
            revert("LGND Token Amount Can Not Exceed Max Allowed");
        }

        if (r.blendingInstancesUsed != 0) {
            _restoreBlendingSlots(legendId);
        }

        _lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            amountToSecure
        );

        r.tokenAmountSecured = newAmount;
        r.multiplier = _calculateMultiplier(newAmount);

        emit PodTokensIncreased(legendId, newAmount);
    }

    /**
     * @dev Calculates the number of *blending slots* to be restored and calls on
     * [**LegendsLaboratory**](../lab/LegendsLaboratory#restoreblendingslots) to do the
     * actual restoring.
     *
     * :::tip Note
     *
     * Any *reJu* not used in restoring *blending slots* will be rolled-over. However, if this function
     * was called by `leaveRejuvenationPool` then `_rejuvenationPod.rollover` will be reset to `(0)` upon
     * leaving the *pod*.
     *
     * :::
     *
     * @param legendId ID of Legend NFT having *blending slots* restored
     */
    function _restoreBlendingSlots(uint256 legendId) private {
        RejuvenationPod storage r = _rejuvenationPod[legendId];

        (
            uint256 restoredSlots,
            uint256 remainderReJu
        ) = _calculateRestoredSlots(legendId);

        r.checkpointBlock = block.number;

        if (restoredSlots > 0) {
            _lab.restoreBlendingSlots(legendId, restoredSlots);

            r.blendingInstancesUsed -= restoredSlots;
        }

        r.rolloverReju = remainderReJu;

        emit BlendingSlotsRestored(legendId, restoredSlots);
    }

    /**
     * @dev Calculates the multiplier for a Legend NFT in a *rejuvenation pod*. Every time the
     * *rejuvenation pod* has its LGND token balance modified, the multiplier will need to be recalculated.
     *
     * @param amount Number of LGND tokens secured in a *rejuvenation pod*
     */
    function _calculateMultiplier(uint256 amount)
        private
        view
        returns (uint256)
    {
        uint256 multiplier = amount / _minimumSecure;

        if (multiplier > _maxMultiplier) {
            multiplier = _maxMultiplier;
        }

        return (multiplier);
    }

    /**
     * @dev Calculates the number of *blending slots* the Legend NFT has regained from
     * being inside the *rejuvenation pod*. The value for any remaining *ReJu* not used in the restoration
     * will be returned as well.
     *
     * @param legendId ID of Legend NFT requesting calculations
     */
    function _calculateRestoredSlots(uint256 legendId)
        private
        view
        returns (uint256, uint256)
    {
        uint256 earnedReJu = _calculateEarnedReJu(legendId);

        uint256 restoredSlots = earnedReJu / _reJuNeededPerSlot; // testing: make sure rounds down

        uint256 remainderReJu = earnedReJu -
            (restoredSlots * _reJuNeededPerSlot);

        return (restoredSlots, remainderReJu);
    }

    /**
     * @dev Calculates the current amount of `earnedReju. The rate at which `reJu` is earned for
     * a given Legend is `_reJuPerBlock * _rejuvenationPod.multiplier`. This is this multiplied by
     * the number of `blocks` the Legends has been in their *pod* for, plus any *rollover reJu*.
     *
     * @param legendId ID of Legend NFT requesting calculations
     */
    function _calculateEarnedReJu(uint256 legendId)
        private
        view
        returns (uint256)
    {
        RejuvenationPod memory r = _rejuvenationPod[legendId];

        uint256 multipliedEmissionRate = _reJuPerBlock * r.multiplier;

        uint256 rejuvenationBlockDuration = block.number - r.checkpointBlock;

        uint256 earnedReJu = (multipliedEmissionRate *
            rejuvenationBlockDuration) + r.rolloverReju;

        uint256 maxEarnableReJu = (_reJuNeededPerSlot *
            r.blendingInstancesUsed);

        if (earnedReJu > maxEarnableReJu) {
            earnedReJu = maxEarnableReJu;
        }

        return earnedReJu;
    }

    /**
     * @dev Returns *rejuvenation pod* details for a given Legend NFT
     *
     *
     * @param legendId ID of Legend being queried
     */
    function fetchPodDetails(uint256 legendId)
        public
        view
        virtual
        override
        returns (RejuvenationPod memory)
    {
        require(
            _rejuvenationPod[legendId].occupied,
            "Legend Is Not Occupying Pod"
        );

        return _rejuvenationPod[legendId];
    }

    /**
     * @dev Returns the progress of a given Legend NFT's rejuvenation
     *
     * :::note Info
     *
     * #### Rejuvenation Progress:
     *
     * * [`earnedReJu`]
     * * [`maxEarnableReJu`]
     * * [`restoredSlots`]
     *
     * :::
     *
     *
     * @param legendId ID of Legend being queried
     */
    function fetchRejuvenationProgress(uint256 legendId)
        public
        view
        returns (uint256, uint256)
    {
        require(
            _rejuvenationPod[legendId].occupied,
            "Legend Is Not Occupying Pod"
        );

        uint256 earnedReJu = _calculateEarnedReJu(legendId);

        uint256 maxEarnableReJu = (_reJuNeededPerSlot *
            _rejuvenationPod[legendId].blendingInstancesUsed);

        return (earnedReJu, maxEarnableReJu);
    }

    /**
     * @dev Returns the values of the (4) *rejuvenation rules*
     *
     *
     * :::note Info
     *
     * #### Rejuvenation Rules:
     *
     * * [`_minimumSecure`]
     * * [`_maxMultiplier`]
     * * [`_reJuPerBlock`]
     * * [`_reJuNeededPerSlot`]
     *
     * :::
     *
     */
    function fetchRejuvenationRules()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            _minimumSecure,
            _maxMultiplier,
            _reJuPerBlock,
            _reJuNeededPerSlot
        );
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setminimumsecure)'s `setMinimumSecure`
     */
    function setMinimumSecure(uint256 newMinimumSecure) public onlyLab {
        _minimumSecure = newMinimumSecure;
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setmaxmultiplier)'s `setMaxMultiplier`
     */
    function setMaxMultiplier(uint256 newMaxMultiplier) public onlyLab {
        _maxMultiplier = newMaxMultiplier;
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setrejuperblock)'s `setReJuPerBlock`
     */
    function setReJuPerBlock(uint256 newReJuEmissionRate) public onlyLab {
        _reJuPerBlock = newReJuEmissionRate;
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#newrejuneededperslot)'s `newReJuNeededPerSlot`
     */
    function setReJuNeededPerSlot(uint256 newReJuNeededPerSlot) public onlyLab {
        _reJuNeededPerSlot = newReJuNeededPerSlot;
    }
}
