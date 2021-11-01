// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// import "@openzeppelin/contracts/governance/TimelockController.sol";

import "./LaboratoryGovernor.sol";
import "../legend/LegendsNFT.sol";
import "../token/LegendToken.sol";
import "../rejuvenation/LegendRejuvenation.sol";
import "../marketplace/LegendsMarketplace.sol";
import "../matching/LegendsMatchingBoard.sol";
import "./TicketMachine.sol";

/**
 *
 */
contract LegendsLaboratory is AccessControlEnumerable, TicketMachine {
    LegendsNFT public legendsNFT = new LegendsNFT();
    LegendToken public legendToken = new LegendToken(msg.sender);
    LegendRejuvenation public legendRejuvenation = new LegendRejuvenation();
    LegendsMarketplace public legendsMarketplace = new LegendsMarketplace();
    LegendsMatchingBoard public legendsMatchingBoard =
        new LegendsMatchingBoard();
    LaboratoryGovernor public laboratoryGovernor =
        new LaboratoryGovernor(legendToken);

    bytes32 public constant LAB_ADMIN = keccak256("LAB_ADMIN");
    bytes32 public constant LAB_TECH = keccak256("LAB_TECH");

    string private _season = "Phoenix";

    /** @dev promoId => skipIncubation */
    mapping(uint256 => bool) private _promoIncubated;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, address(this));
        _setupRole(LAB_ADMIN, msg.sender);
        _setupRole(LAB_TECH, msg.sender);

        // _setRoleAdmin(LAB_ADMIN, LAB_ADMIN);
        _setRoleAdmin(LAB_TECH, LAB_ADMIN);
    }

    // for testing, remove before MVP launch
    function getChildContracts()
        public
        view
        virtual
        returns (
            LegendsNFT,
            LegendToken,
            LegendRejuvenation,
            LegendsMarketplace,
            LegendsMatchingBoard
        )
    {
        return (
            legendsNFT,
            legendToken,
            legendRejuvenation,
            legendsMarketplace,
            legendsMatchingBoard
        );
    }

    function createPromoEvent(
        string calldata eventName,
        uint256 duration,
        bool isUnrestricted,
        uint256 maxTickets,
        bool skipIncubation
    ) external onlyRole(LAB_TECH) {
        uint256 promoId = _createPromoEvent(
            eventName,
            duration,
            isUnrestricted,
            maxTickets
        );

        _promoIncubated[promoId] = skipIncubation;
    }

    function dispensePromoTicket(
        uint256 promoId,
        address recipient,
        uint256 ticketAmount
    ) public {
        if (_promoEvent[promoId].isUnrestricted == false) {
            _checkRole(LAB_TECH, msg.sender);
        }

        _dispensePromoTicket(promoId, recipient, ticketAmount);
    }

    function redeemPromoTicket(uint256 promoId, address recipient) public {
        _redeemPromoTicket(promoId, recipient);

        legendsNFT.createLegend(recipient, promoId, false);
    }

    function closePromoEvent(uint256 promoId) public onlyRole(LAB_TECH) {
        _closePromoEvent(promoId);
    }

    function mintLegendaryLegend(address recipient, uint256 promoId)
        public
        onlyRole(LAB_ADMIN)
    {
        _redeemPromoTicket(promoId, recipient);

        legendsNFT.createLegend(recipient, promoId, true);
    }

    function transferLabAdmin(address currentAdmin, address newAdmin)
        public
        onlyRole(LAB_ADMIN)
    {
        this.revokeRole(LAB_ADMIN, currentAdmin);
        this.grantRole(LAB_ADMIN, newAdmin);
    }

    // function captureLGNDSnapshot()
    //     public
    //     onlyRole(LAB_ADMIN)
    //     returns (uint256)
    // {
    //     return legendToken.snapshot();
    // }

    function labBurn(uint256 amount) public onlyRole(LAB_ADMIN) {
        legendToken.labBurn(amount);
    }

    function _restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
        public
    {
        require(
            msg.sender == address(legendRejuvenation),
            "Not Called By Rejuvenation Contract"
        );

        legendsNFT._restoreBlendingSlots(legendId, regainedSlots);
    }

    function isHatched(uint256 legendId) public view returns (bool) {
        return legendsNFT.isHatched(legendId);
    }

    function isListable(uint256 legendId) public view returns (bool) {
        return legendsNFT.isListable(legendId);
    }

    function isBlendable(uint256 legendId) public view returns (bool) {
        return legendsNFT.isBlendable(legendId);
    }

    function isPromoIncubated(uint256 promoId) public view returns (bool) {
        return _promoIncubated[promoId];
    }

    function fetchSeason() public view returns (string memory) {
        return _season;
    }

    function fetchBlendingCount(uint256 legendId)
        public
        view
        returns (uint256)
    {
        return legendsNFT.fetchLegendMetadata(legendId).blendingInstancesUsed;
    }

    function fetchBlendingCost(uint256 legendId) public view returns (uint256) {
        return legendsNFT.fetchBlendingCost(legendId);
    }

    function fetchRoyaltyRecipient(uint256 legendId)
        public
        view
        returns (address payable)
    {
        return legendsNFT.fetchLegendMetadata(legendId).legendCreator;
    }

    function setSeason(string calldata newSeason) public onlyRole(LAB_ADMIN) {
        _season = newSeason;
    }

    // function setKinBlendingLevel(uint256 newKinBlendingLevel) public onlyOwner {
    //     legendsNFT.setKinBlendingLevel(newKinBlendingLevel);
    // }

    function setIncubationViews(string[5] calldata newIncubationViews)
        public
        onlyRole(LAB_TECH)
    {
        legendsNFT.setIncubationViews(newIncubationViews);
    }

    // function setBlendingLimit(uint256 newBlendingLimit) public onlyOwner {
    //     legendsNFT.setBlendingLimit(newBlendingLimit);
    // }

    // function setBaseBlendingCost(uint256 newBaseBlendingCost) public onlyOwner {
    //     legendsNFT.setBaseBlendingCost(newBaseBlendingCost);
    // }

    // function setIncubationPeriod(uint256 newIncubationPeriod) public onlyOwner {
    //     legendsNFT.setIncubationPeriod(newIncubationPeriod);
    // }

    function setBlendingRule(uint256 blendingRule, uint256 newRuleData)
        public
        onlyRole(LAB_ADMIN)
    {
        require(blendingRule < 4, "Blending Rule Does Not Exist");

        if (blendingRule == 0) {
            require(newRuleData < 3, "Kin Blending Level Does Not Exist");
        }

        legendsNFT.setBlendingRule(blendingRule, newRuleData);
    }

    function setMarketplaceRule(uint256 marketplaceRule, uint256 newRuleData)
        public
        onlyRole(LAB_ADMIN)
    {
        require(marketplaceRule < 4, "Marketplace Rule Does Not Exist");

        legendsMarketplace.setMarketplaceRule(marketplaceRule, newRuleData);
    }

    // function setRoyaltyFee(uint256 newRoyaltyFee) public onlyOwner {
    //     legendsMarketplace.setRoyaltyFee(newRoyaltyFee);
    // }

    // function setMarketplaceFee(uint256 newMarketplaceFee) public onlyOwner {
    //     legendsMarketplace.setMarketplaceFee(newMarketplaceFee);
    // }

    // function setOfferDuration(uint256 newOfferDuration) public onlyOwner {
    //     legendsMarketplace.setOfferDuration(newOfferDuration);
    // }

    function setAuctionDurations(uint256[3] calldata newAuctionDurations)
        public
        onlyRole(LAB_TECH)
    {
        legendsMarketplace.setAuctionDurations(newAuctionDurations);
    }

    // function setAuctionExtension(uint256 newAuctionExtension) public onlyOwner {
    //     legendsMarketplace.setAuctionExtension(newAuctionExtension);
    // }

    function setMinimumSecure(uint256 newMinimumSecure)
        public
        onlyRole(LAB_TECH)
    {
        legendRejuvenation.setMinimumSecure(newMinimumSecure);
    }

    function setMaxMultiplier(uint256 newMaxMultiplier)
        public
        onlyRole(LAB_ADMIN)
    {
        legendRejuvenation.setMaxMultiplier(newMaxMultiplier);
    }

    function setReJuPerBlock(uint256 newReJuEmissionRate)
        public
        onlyRole(LAB_ADMIN)
    {
        legendRejuvenation.setReJuPerBlock(newReJuEmissionRate);
    }

    function setReJuNeededPerSlot(uint256 newReJuNeededPerSlot)
        public
        onlyRole(LAB_ADMIN)
    {
        legendRejuvenation.setReJuNeededPerSlot(newReJuNeededPerSlot);
    }

    /**
     * Admin - Legend Name Reset
     * @notice Only to be used in the, hopefully, rare event a
     * Legend NFT owner assigns their Legend a vulgar name.
     * Must be both reported by the community a set number of times, and
     * manually called by an admin address.
     */

    uint256 private _reportThreshold = 5;

    /* legendId => reportCount */
    mapping(uint256 => uint256) private _reportCount;

    /* legendId => reporterAddress => hasReported */
    mapping(uint256 => mapping(address => bool)) private _reported;

    /**
     * @notice Once an address reports a @param legendId they can not report
     * that @param legendId again, even after the name reset.
     * This is to help prevent abuse with the reporting system.
     */
    function reportVulgarLegend(uint256 legendId) public {
        require(
            !_reported[legendId][msg.sender],
            "You Have Already Reported This Legend's Name"
        );

        _reported[legendId][msg.sender] = true;

        _reportCount[legendId] += 1;
    }

    /**
     * @notice In order for admin to call, a @param legendId must have
     * a _reportCount equal to or greater than the _reportThreshold.
     * @dev Calls resetLegendName from LegendsNFT contract, then resets report count to 0.
     */
    function resetLegendName(uint256 legendId) public onlyRole(LAB_TECH) {
        if (_reportCount[legendId] < _reportThreshold) {
            revert("Threshold Not Reached For Admin To Call");
        }

        legendsNFT.resetLegendName(legendId);

        _reportCount[legendId] = 0;
    }

    function setReportThreshold(uint256 newReportThreshold)
        public
        onlyRole(LAB_TECH)
    {
        _reportThreshold = newReportThreshold;
    }
}
