// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../legend/LegendsNFT.sol";
import "../token/LegendToken.sol";
import "../marketplace/LegendsMarketplace.sol";
import "../matching/LegendsMatchingBoard.sol";
import "../rejuvenation/LegendRejuvenation.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 *
 */
contract LegendsLaboratory is Ownable {
    LegendsNFT public legendsNFT = new LegendsNFT();
    LegendToken public legendToken = new LegendToken(msg.sender);
    LegendsMarketplace public legendsMarketplace = new LegendsMarketplace();
    LegendsMatchingBoard public legendsMatchingBoard =
        new LegendsMatchingBoard();
    LegendRejuvenation public legendRejuvenation = new LegendRejuvenation();

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

    function setIncubationDuration(uint256 newIncubationDuration)
        public
        onlyOwner
    {
        legendsNFT.setIncubationDuration(newIncubationDuration);
    }

    function setBreedingCooldown(uint256 newBreedingCooldown) public onlyOwner {
        legendsNFT.setBreedingCooldown(newBreedingCooldown);
    }

    function setOffspringLimit(uint256 newOffspringLimit) public onlyOwner {
        legendsNFT.setOffspringLimit(newOffspringLimit);
    }

    function setBreedingCost(uint256 breedingCost) public onlyOwner {
        legendsNFT.setBreedingCost(breedingCost);
    }

    function setSeason(string memory newSeason) public onlyOwner {
        legendsNFT.setSeason(newSeason);
    }

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
        return legendsNFT.tokenMeta(_tokenId).legendCreator;
    }

    function fetchOffspringCount(uint256 _tokenId)
        public
        view
        returns (uint256)
    //only ? //TODO: in access control rework
    {
        return legendsNFT.tokenMeta(_tokenId).offspringCount;
    }

    function restoreBreedingSlots(uint256 _tokenId, uint256 _newOffspringCount)
        internal
        view
        returns (uint256)
    //only ? //TODO: in access control rework
    {
        return legendsNFT.tokenMeta(_tokenId).offspringCount;
    }
}
