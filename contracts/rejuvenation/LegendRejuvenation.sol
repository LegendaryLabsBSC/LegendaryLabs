// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./RejuvenationPod.sol";

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
    mapping(uint256 => RejuvenationPod) public rejuvenationPod;

    constructor() {
        _lab = LegendsLaboratory(msg.sender);
    }

    function enterRejuvenationPod(
        address nftContract,
        uint256 legendId,
        uint256 tokensToSecure
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);
        RejuvenationPod storage r = rejuvenationPod[legendId];

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
        r.depositBlock = block.number;
        r.blendingInstancesUsed = _lab.fetchBlendingCount(legendId);
        r.tokenAmountSecured = tokensToSecure;
        r.multiplier = _calculateMultiplier(tokensToSecure);
        r.occupied = true;

        emit PodStatusChanged(legendId, true);
        emit PodTokensIncreased(legendId, tokensToSecure);
    }

    function leaveRejuvenationPod(uint256 legendId) external nonReentrant {
        RejuvenationPod storage r = rejuvenationPod[legendId];

        require(r.occupied, "Legend Is Not Occupying Pod");
        require(msg.sender == r.depositedBy, "Caller Did Not Enter Legend");

        r.occupied = false;

        removeSecuredTokens(legendId, r.tokenAmountSecured);

        IERC721(r.nftContract).transferFrom(
            address(this),
            r.depositedBy,
            legendId
        );

        emit PodStatusChanged(legendId, false);
    }

    function removeSecuredTokens(uint256 legendId, uint256 amountToRemove)
        public
        nonReentrant
    {
        RejuvenationPod storage r = rejuvenationPod[legendId];

        require(r.occupied, "Legend Is Not Occupying Pod");
        require(msg.sender == r.depositedBy, "Caller Did Not Enter Legend");
        require(amountToRemove != 0, "Amount Can Not Be 0");

        if (amountToRemove > r.tokenAmountSecured) {
            revert("Amount Can Not Be Greater Than Secured");
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

    function increaseSecuredTokens(uint256 legendId, uint256 amountToSecure)
        external
        nonReentrant
    {
        RejuvenationPod storage r = rejuvenationPod[legendId];

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
        uint256 restoredSlots = _calculateRestoredSlots(legendId);

        _lab._restoreBlendingSlots(legendId, restoredSlots);

        rejuvenationPod[legendId].blendingInstancesUsed -= restoredSlots;

        emit BlendingSlotsRestored(legendId, restoredSlots);
    }

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

    function _calculateRestoredSlots(uint256 legendId)
        private
        view
        returns (uint256)
    {
        uint256 earnedReJu = _fetchEarnedReju(legendId);

        uint256 restoredSlots = earnedReJu / _reJuNeededPerSlot; // make sure rounds down

        return restoredSlots;
    }

    function _fetchEarnedReju(uint256 legendId) private view returns (uint256) {
        RejuvenationPod memory r = rejuvenationPod[legendId];

        uint256 maxEarnableReJu = (_reJuNeededPerSlot *
            r.blendingInstancesUsed);

        uint256 earnedReJu = ((_reJuPerBlock * r.multiplier) *
            (block.number - r.depositBlock));

        if (earnedReJu > maxEarnableReJu) {
            earnedReJu = maxEarnableReJu;
        }

        return earnedReJu;
    }

    function fetchPodDetails(uint256 legendId)
        public
        view
        virtual
        override
        returns (RejuvenationPod memory)
    {
        require(
            rejuvenationPod[legendId].occupied,
            "Legend Is Not Occupying Pod"
        );

        return rejuvenationPod[legendId];
    }

    function fetchRejuvenationProgress(uint256 legendId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        require(
            rejuvenationPod[legendId].occupied,
            "Legend Is Not Occupying Pod"
        );

        uint256 earnedReJu = _fetchEarnedReju(legendId);

        uint256 maxEarnableReJu = (_reJuNeededPerSlot *
            rejuvenationPod[legendId].blendingInstancesUsed);

        uint256 restoredSlots = _calculateRestoredSlots(legendId);

        return (earnedReJu, maxEarnableReJu, restoredSlots);
    }

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

    function setMinimumSecure(uint256 newMinimumSecure) public onlyLab {
        _minimumSecure = newMinimumSecure;
    }

    function setMaxMultiplier(uint256 newMaxMultiplier) public onlyLab {
        _maxMultiplier = newMaxMultiplier;
    }

    function setReJuPerBlock(uint256 newReJuEmissionRate) public onlyLab {
        _reJuPerBlock = newReJuEmissionRate;
    }

    function setReJuNeededPerSlot(uint256 newReJuNeededPerSlot) public onlyLab {
        _reJuNeededPerSlot = newReJuNeededPerSlot;
    }
}
