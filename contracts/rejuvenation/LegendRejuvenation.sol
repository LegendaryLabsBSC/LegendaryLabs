// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
import "./RejuvenationPod.sol";

pragma solidity 0.8.4;

contract LegendRejuvenation is IRejuvenationPod, ReentrancyGuard {
    using Counters for Counters.Counter;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    //TODO: no-loss-lottery extension support

    uint256 private minimumSecure = 1000; // what if min is raised and amount in pod is lower than min ?
    uint256 private maxMultiplier = 5;

    // BSC blocks-per-day: ~28750 ; Matic blocks-per-day: ~43200
    uint256 private reJuPerBlock = 1; // testing with BSC count in mind ~10 days per slot
    uint256 private reJuNeededPerSlot = 300000;

    /* legendId => podDetails */
    mapping(uint256 => RejuvenationPod) public rejuvenationPod;

    constructor() {
        lab = LegendsLaboratory(msg.sender);
    }

    function enterRejuvenationPod(
        address _nftContract,
        uint256 _legendId,
        uint256 _tokensToSecure
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(_nftContract);
        RejuvenationPod storage r = rejuvenationPod[_legendId];

        // require(lab.isListable(_legendId), "Not eligible"); // commented out for testing
        require(!r.occupied, "Legend in pod");
        require(
            _tokensToSecure >= minimumSecure,
            "amount must be minimum or greater"
        ); // can put in more than max multiplier but will not increase reju, will raise odds of no-loss-lottery win

        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            _tokensToSecure
        );

        r.nftContract = _nftContract;

        r.depositedBy = msg.sender;
        r.depositBlock = block.number;
        r.blendingInstancesUsed = lab.fetchBlendingCount(_legendId);
        r.tokenAmountSecured = _tokensToSecure;
        r.multiplier = _calculateMultiplier(_tokensToSecure);
        r.occupied = true;

        emit PodStatusChanged(_legendId, true);
    }

    function leaveRejuvenationPod(uint256 _legendId) external nonReentrant {
        RejuvenationPod storage r = rejuvenationPod[_legendId];

        require(r.occupied, "Legend not in pod");
        require(msg.sender == r.depositedBy, "Not Authorized");

        r.occupied = false;

        removeSecuredTokens(_legendId, r.tokenAmountSecured);

        IERC721(r.nftContract).transferFrom(
            address(this),
            r.depositedBy,
            _legendId
        );

        emit PodStatusChanged(_legendId, false);
    }

    function removeSecuredTokens(uint256 _legendId, uint256 _amountToRemove)
        public
        nonReentrant
    {
        RejuvenationPod storage r = rejuvenationPod[_legendId];

        require(msg.sender == r.depositedBy, "Not authorized");
        require(
            _amountToRemove != 0 && _amountToRemove <= r.tokenAmountSecured,
            "Invalid amount"
        );

        if (r.blendingInstancesUsed != 0) {
            _restoreBlendingSlots(_legendId);
        }

        uint256 newAmount = r.tokenAmountSecured - _amountToRemove;

        r.tokenAmountSecured = newAmount;
        r.multiplier = _calculateMultiplier(newAmount);

        lab.legendToken().transferFrom(
            address(this),
            msg.sender,
            _amountToRemove
        );

        emit PodTokensChanged(_legendId, newAmount);
    }

    function increaseSecuredTokens(uint256 _legendId, uint256 _amountToSecure)
        external
        nonReentrant
    {
        RejuvenationPod storage r = rejuvenationPod[_legendId];

        require(msg.sender == r.depositedBy, "Not authorized");
        require(r.occupied, "Not in Pod");

        if (r.blendingInstancesUsed != 0) {
            _restoreBlendingSlots(_legendId);
        }

        lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            _amountToSecure
        );

        uint256 newAmount = r.tokenAmountSecured + _amountToSecure;

        r.tokenAmountSecured = newAmount;
        r.multiplier = _calculateMultiplier(newAmount);

        emit PodTokensChanged(_legendId, newAmount);
    }

    function _restoreBlendingSlots(uint256 _legendId) private {
        uint256 restoredSlots = _calculateRestoredSlots(_legendId);

        lab._restoreBlendingSlots(_legendId, restoredSlots);

        rejuvenationPod[_legendId].blendingInstancesUsed -= restoredSlots;

        emit BlendingSlotsRestored(_legendId, restoredSlots);
    }

    function _calculateMultiplier(uint256 _amount)
        private
        view
        returns (uint256)
    {
        uint256 multiplier = _amount / minimumSecure;

        if (multiplier > maxMultiplier) {
            multiplier = maxMultiplier;
        }

        return (multiplier);
    }

    function _calculateRestoredSlots(uint256 _legendId)
        private
        view
        returns (uint256)
    {
        uint256 earnedReJu = _fetchEarnedReju(_legendId);

        uint256 restoredSlots = earnedReJu / reJuNeededPerSlot; // make sure rounds down

        return restoredSlots;
    }

    function _fetchEarnedReju(uint256 _legendId)
        private
        view
        returns (uint256)
    {
        RejuvenationPod memory r = rejuvenationPod[_legendId];

        uint256 maxEarnableReJu = (reJuNeededPerSlot * r.blendingInstancesUsed);

        uint256 earnedReJu = ((reJuPerBlock * r.multiplier) *
            (block.number - r.depositBlock));

        if (earnedReJu > maxEarnableReJu) {
            earnedReJu = maxEarnableReJu;
        }

        return earnedReJu;
    }

    function fetchRejuvenationProgress(uint256 _legendId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        uint256 earnedReJu = _fetchEarnedReju(_legendId);

        uint256 maxEarnableReJu = (reJuNeededPerSlot *
            rejuvenationPod[_legendId].blendingInstancesUsed);

        uint256 restoredSlots = _calculateRestoredSlots(_legendId);

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
        return (minimumSecure, maxMultiplier, reJuPerBlock, reJuNeededPerSlot);
    }

    function setMinimumSecure(uint256 _newMinimum) public onlyLab {
        minimumSecure = _newMinimum;
    }

    function setMaxMultiplier(uint256 _newMax) public onlyLab {
        maxMultiplier = _newMax;
    }

    function setReJuPerBlock(uint256 _newRate) public onlyLab {
        reJuPerBlock = _newRate;
    }

    function setReJuNeededPerSlot(uint256 _newAmount) public onlyLab {
        reJuNeededPerSlot = _newAmount;
    }
}
