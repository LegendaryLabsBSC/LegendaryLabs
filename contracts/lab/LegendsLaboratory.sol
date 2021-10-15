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
            LegendsMarketplace,
            LegendsMatchingBoard
        )
    {
        return (
            legendsNFT,
            legendToken,
            legendsMarketplace,
            legendsMatchingBoard
        );
    }

    function createPromoEvent(
        string memory eventName,
        uint256 maxTicketCount,
        bool isUnrestricted
    ) public onlyOwner {
        _createPromoEvent(eventName, maxTicketCount, isUnrestricted);
    }

    function closePromoEvent(string memory name) public onlyOwner {
        _closePromoEvent(name);
    }

    function dispensePromoTicket(
        string memory promoName,
        address recipient,
        uint256 ticketAmount
    ) public {
        // if (promoEvent[promoName].isUnrestricted == false) {
        //     require(owner() == msg.sender);
            _dispensePromoTicket(promoName, recipient, ticketAmount);
        }
    // }

    // function dispensePromoTicket(
    //     string memory eventName,
    //     address recipient,
    //     uint256 ticketAmount
    // ) public {
    //     PromoEvent storage p = promoEvent[eventName];
    //     require(!p.eventClosed, "Promo Closed");

    //     if (p.unrestricted == false) {
    //         require(owner() == msg.sender);
    //     } else if (p.unrestricted == true) {
    //         require(p.claimed[recipient] == false, "Promo already claimed");
    //         require(ticketAmount == 1, "One ticket per address");
    //     }

    //     p.claimed[recipient] = true;

    //     promoTicket[eventName][recipient] += ticketAmount;
    // }

    // function setIncubationDuration(uint256 newIncubationDuration)
    //     public
    //     onlyOwner
    // {
    //     legendsNFT.setIncubationDuration(newIncubationDuration);
    // }


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
