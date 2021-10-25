// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../legend/LegendsNFT.sol";
import "../token/LegendToken.sol";
import "../rejuvenation/LegendRejuvenation.sol";
import "../marketplace/LegendsMarketplace.sol";
import "../matching/LegendsMatchingBoard.sol";
import "./TicketMachine.sol";

/**
 *
 */
contract LegendsLaboratory is Ownable, TicketMachine {
    LegendsNFT public legendsNFT = new LegendsNFT();
    LegendToken public legendToken = new LegendToken(msg.sender);
    LegendRejuvenation public legendRejuvenation = new LegendRejuvenation();
    LegendsMarketplace public legendsMarketplace = new LegendsMarketplace();
    LegendsMatchingBoard public legendsMatchingBoard =
        new LegendsMatchingBoard();

    string private season = "Phoenix";

    /* promoId => skipIncubation */
    mapping(uint256 => bool) private _promoIncubation;

    constructor() {}

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
        string memory _eventName,
        uint256 _duration,
        bool _isUnrestricted,
        uint256 _maxTickets,
        bool _skipIncubation
    ) external onlyOwner {
        uint256 promoId = _createPromoEvent(
            _eventName,
            _duration,
            _isUnrestricted,
            _maxTickets
        );

        _promoIncubation[promoId] = _skipIncubation;
    }

    function dispensePromoTicket(
        uint256 _promoId,
        address _recipient,
        uint256 _ticketAmount
    ) public {
        if (promoEvent[_promoId].isUnrestricted == false) {
            require(msg.sender == owner(), "Not Authorized");
        }

        _dispensePromoTicket(_promoId, _recipient, _ticketAmount);
    }

    function redeemPromoTicket(uint256 _promoId, address _recipient) public {
        _redeemPromoTicket(_promoId, _recipient);

        legendsNFT.createLegend(_recipient, _promoId, false);
    }

    function closePromoEvent(uint256 _promoId) public onlyOwner {
        _closePromoEvent(_promoId);
    }

    function mintLegendaryLegend(address _recipient, uint256 _promoId)
        public
        onlyOwner
    {
        _redeemPromoTicket(_promoId, _recipient);

        legendsNFT.createLegend(_recipient, _promoId, true);
    }

    function _restoreBlendingSlots(uint256 _legendId, uint256 _regainedSlots)
        public
    {
        require(msg.sender == address(legendRejuvenation), "Not Pod");

        legendsNFT.restoreBlendingSlots(_legendId, _regainedSlots);
    }

    function fetchSeason() public view returns (string memory) {
        return season;
    }

    function fetchPromoIncubation(uint256 promoId) public view returns (bool) {
        return _promoIncubation[promoId];
    }

    function fetchIsHatched(uint256 _legendId) public view returns (bool) {
        return legendsNFT.isHatched(_legendId);
    }

    function fetchIsListable(uint256 _legendId) public view returns (bool) {
        return legendsNFT.isListable(_legendId);
    }

    function fetchIsBlendable(uint256 _legendId) public view returns (bool) {
        return legendsNFT.isBlendable(_legendId);
    }

    function fetchBlendingCount(uint256 _legendId)
        public
        view
        returns (uint256)
    {
        return legendsNFT.fetchLegendMetadata(_legendId).blendingInstancesUsed;
    }

    function fetchBlendingCost(uint256 _legendId)
        public
        view
        returns (uint256)
    {
        return legendsNFT.fetchBlendingCost(_legendId);
    }

    function fetchRoyaltyRecipient(uint256 _legendId)
        public
        view
        returns (address payable)
    {
        return legendsNFT.fetchLegendMetadata(_legendId).legendCreator;
    }

    function setSeason(string memory _newSeason) public onlyOwner {
        season = _newSeason;
    }

    function setKinBlendingLevel(uint256 newKinBlendingLevel) public onlyOwner {
        legendsNFT.setKinBlendingLevel(newKinBlendingLevel);
    }

    function setIncubationPeriod(uint256 newIncubationPeriod) public onlyOwner {
        legendsNFT.setIncubationPeriod(newIncubationPeriod);
    }

    function setBlendingLimit(uint256 _newBlendingLimit) public onlyOwner {
        legendsNFT.setBlendingLimit(_newBlendingLimit);
    }

    function setBaseBlendingCost(uint256 _newBaseBlendingCost)
        public
        onlyOwner
    {
        legendsNFT.setBaseBlendingCost(_newBaseBlendingCost);
    }

    function setRoyaltyFee(uint256 _newFee) public onlyOwner {
        legendsMarketplace.setRoyaltyFee(_newFee);
    }

    function setMarketplaceFee(uint256 newFee) public onlyOwner {
        legendsMarketplace.setMarketplaceFee(newFee);
    }

    function setOfferDuration(uint256 _newDuration) public onlyOwner {
        legendsMarketplace.setOfferDuration(_newDuration);
    }

    function setAuctionExtension(uint256 _newDuration) public onlyOwner {
        legendsMarketplace.setAuctionExtension(_newDuration);
    }

    function setMatchingBoardFee(uint256 newFee) public onlyOwner {
        legendsMatchingBoard.setMatchingBoardFee(newFee);
    }

    function setMinimumSecure(uint256 _newMinimum) public onlyOwner {
        legendRejuvenation.setMinimumSecure(_newMinimum);
    }

    function setMaxMultiplier(uint256 _newMax) public onlyOwner {
        legendRejuvenation.setMaxMultiplier(_newMax);
    }

    function setReJuPerBlock(uint256 _newEmissionRate) public onlyOwner {
        legendRejuvenation.setReJuPerBlock(_newEmissionRate);
    }

    function setReJuNeededPerSlot(uint256 _newAmount) public onlyOwner {
        legendRejuvenation.setReJuNeededPerSlot(_newAmount);
    }
}
