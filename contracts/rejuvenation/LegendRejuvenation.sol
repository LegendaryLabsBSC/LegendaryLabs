// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./IRejuvenationPod.sol";

pragma solidity 0.8.4;

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
            ); // can put in more than max multiplier but will not increase reju, will raise odds of no-loss-lottery win
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
     * :::note
     *
     * Legends created by this method will be assigned a (0) for both elements in `_legendMetadata.parents[2]`. Any Legend NFT
     * with (0)s in it's `_legendMetadata.parents[2]` will not be eligible to receive [**Royalties**](docs/info/royalties)
     *
     * :::
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

        if (r.blendingInstancesUsed != 0) {
            _restoreBlendingSlots(legendId);
        }

        _lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            amountToSecure
        );

        uint256 newAmount = r.tokenAmountSecured + amountToSecure;

        r.tokenAmountSecured = newAmount;
        r.multiplier = _calculateMultiplier(newAmount);

        emit PodTokensIncreased(legendId, newAmount);
    }

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

        r.rolloverReju = remainderReju;

        emit BlendingSlotsRestored(legendId, restoredSlots);
    }

    function _calculateMultiplier(uint256 amount)
        private
        view
        returns (uint256)
    {
        // if (amount < _minimumSecure) {
        //     return 0;
        // }

        uint256 multiplier = amount / _minimumSecure;

        if (multiplier > _maxMultiplier) {
            multiplier = _maxMultiplier;
        }

        return (multiplier);
    }

    function _calculateRestoredSlots(uint256 legendId)
        private
        view
        returns (uint256, uint256)
    {
        uint256 earnedReJu = _calculateEarnedReju(legendId);

        uint256 restoredSlots = earnedReJu / _reJuNeededPerSlot; // testing: make sure rounds down

        uint256 remainderReju = earnedReju -
            (restoredSlots * _reJuNeededPerSlot);

        return (restoredSlots, remainderReJu);
    }

    function _calculateEarnedReju(uint256 legendId)
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

        uint256 earnedReJu = _calculateEarnedReju(legendId);

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
