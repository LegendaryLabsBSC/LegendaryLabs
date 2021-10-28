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
    mapping(uint256 => bool) private _promoIncubated;

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
        string calldata _eventName,
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

        _promoIncubated[promoId] = _skipIncubation;
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

        legendsNFT._restoreBlendingSlots(_legendId, _regainedSlots);
    }

    function isHatched(uint256 _legendId) public view returns (bool) {
        return legendsNFT.isHatched(_legendId);
    }

    function isListable(uint256 _legendId) public view returns (bool) {
        return legendsNFT.isListable(_legendId);
    }

    function isBlendable(uint256 _legendId) public view returns (bool) {
        return legendsNFT.isBlendable(_legendId);
    }

    function isPromoIncubated(uint256 _promoId) public view returns (bool) {
        return _promoIncubated[_promoId];
    }

    function fetchSeason() public view returns (string memory) {
        return season;
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

    function setSeason(string calldata _newSeason) public onlyOwner {
        season = _newSeason;
    }

    function setKinBlendingLevel(uint256 _newLevel) public onlyOwner {
        legendsNFT.setKinBlendingLevel(_newLevel);
    }

    function setIncubationViews(string[5] calldata _newViews) public onlyOwner {
        legendsNFT.setIncubationViews(_newViews);
    }

    function setBlendingLimit(uint256 _newLimit) public onlyOwner {
        legendsNFT.setBlendingLimit(_newLimit);
    }

    function setBaseBlendingCost(uint256 _newAmount) public onlyOwner {
        legendsNFT.setBaseBlendingCost(_newAmount);
    }

    function setIncubationPeriod(uint256 newDuration) public onlyOwner {
        legendsNFT.setIncubationPeriod(newDuration);
    }

    function setRoyaltyFee(uint256 _newFee) public onlyOwner {
        legendsMarketplace.setRoyaltyFee(_newFee);
    }

    function setMarketplaceFee(uint256 _newFee) public onlyOwner {
        legendsMarketplace.setMarketplaceFee(_newFee);
    }

    function setOfferDuration(uint256 _newDuration) public onlyOwner {
        legendsMarketplace.setOfferDuration(_newDuration);
    }

    function setAuctionExtension(uint256 _newDuration) public onlyOwner {
        legendsMarketplace.setAuctionExtension(_newDuration);
    }

    // function setMatchingBoardFee(uint256 newFee) public onlyOwner {
    //     legendsMatchingBoard.setMatchingBoardFee(newFee);
    // }

    function setMinimumSecure(uint256 _newMinimum) public onlyOwner {
        legendRejuvenation.setMinimumSecure(_newMinimum);
    }

    function setMaxMultiplier(uint256 _newMax) public onlyOwner {
        legendRejuvenation.setMaxMultiplier(_newMax);
    }

    function setReJuPerBlock(uint256 _newRate) public onlyOwner {
        legendRejuvenation.setReJuPerBlock(_newRate);
    }

    function setReJuNeededPerSlot(uint256 _newAmount) public onlyOwner {
        legendRejuvenation.setReJuNeededPerSlot(_newAmount);
    }
}
