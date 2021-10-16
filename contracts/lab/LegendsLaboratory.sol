// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

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

    string public season;

    constructor() {}

    // for testing
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

    /* promoId => skipIncubation */
    mapping(uint256 => bool) private _promoIncubation;

    function fetchPromoIncubation(uint256 promoId) public view returns (bool) {
        return _promoIncubation[promoId];
    }

    function createPromoEvent(
        string memory eventName,
        uint256 duration,
        bool isUnrestricted,
        bool skipIncubation
    ) public onlyOwner {
        uint256 promoId = _createPromoEvent(
            eventName,
            duration,
            isUnrestricted
        );

        _promoIncubation[promoId] = skipIncubation;
    }

    function dispensePromoTicket(
        uint256 promoId,
        address recipient,
        uint256 ticketAmount
    ) public {
        if (promoEvent[promoId].isUnrestricted == false) {
            require(msg.sender == owner(), "Not Authorized");
        }

        _dispensePromoTicket(promoId, recipient, ticketAmount);
    }

    function redeemPromoTicket(
        uint256 promoId,
        address recipient,
        string memory prefix,
        string memory postfix
    ) internal onlyOwner {
        // require(!promoEvent[promoId].promoClosed, "Promo Closed");

        // uint256 redeemableTickets = fetchRedeemableTickets(promoId, recipient);
        // require(redeemableTickets != 0, "No tickets to redeem");

        _redeemPromoTicket(promoId, recipient);

        legendsNFT.mintPromo(recipient, prefix, postfix, promoId, false);
    }

    function closePromoEvent(uint256 promoId) public onlyOwner {
        _closePromoEvent(promoId);
    }

    // function setIncubationDuration(uint256 newIncubationDuration)
    //     public
    //     onlyOwner
    // {
    //     legendsNFT.setIncubationDuration(newIncubationDuration);
    // }

    //TODO: mint legendary function

    function setOffspringLimit(uint256 newOffspringLimit) public onlyOwner {
        legendsNFT.setOffspringLimit(newOffspringLimit);
    }

    function setBreedingCost(uint256 breedingCost) public onlyOwner {
        legendsNFT.setBreedingCost(breedingCost);
    }

    // function setSeason(string memory newSeason) public onlyOwner {
    //     legendsNFT.setSeason(newSeason);
    // }

    // function setBaseHealth(uint256 baseHealth) public onlyOwner {
    //     legendsNFT.setBaseHealth(baseHealth);
    // } // TODO: fix in stats removal

    // function mintPromotion(address receiver, string memory prefix, string memory postfix, uint dna) public onlyOwner {
    //     legendsNFT.mintPromo(receiver, prefix, postfix, dna);
    // }

    function setMarketplaceFee(uint256 newFee) public onlyOwner {
        legendsMarketplace.setMarketplaceFee(newFee);
    }

    function fetchRoyaltyRecipient(uint256 _tokenId)
        public
        view
        returns (address payable)
    //onlyMarketplace //TODO: in access control rework
    {
        return legendsNFT.fetchTokenMetadata(_tokenId).legendCreator;
    }

    // function fetchOffspringCount(uint256 _tokenId)
    //     public
    //     view
    //     returns (uint256)
    // //only ? //TODO: in access control rework
    // {
    //     return legendsNFT.tokenMeta(_tokenId).offspringCount;
    // }

    //     function restoreBreedingSlots(uint256 _tokenId, uint256 _newOffspringCount)
    //         internal
    //         view
    //         returns (uint256)
    //     //only ? //TODO: in access control rework
    //     {
    //         return legendsNFT.tokenMeta(_tokenId).breedingInstancesUsed;
    //     }
}
