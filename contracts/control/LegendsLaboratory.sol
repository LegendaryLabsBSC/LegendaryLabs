// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../legend/LegendsNFT.sol";
import "../token/LegendToken.sol";
// import "./LegendsAccessories.sol";
import "../marketplace/LegendsMarketplace.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//TODO: look into openZeppelin Access Control docs more ; OZ Governor
//TODO: fix lab owner for setter functions

contract LegendsLaboratory is Ownable {
    LegendsNFT public legendsNFT = new LegendsNFT();
    LegendToken public legendToken = new LegendToken(msg.sender);
    // LegendsAccessories public legendsAccessories = new LegendsAccessories(msg.sender);
    LegendsMarketplace public legendsMarketplace = new LegendsMarketplace();

    constructor() {}

    function getChildContracts()
        public
        view
        virtual
        returns (LegendsNFT, LegendToken, LegendsMarketplace)
    {
        return (legendsNFT, legendToken, legendsMarketplace);
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

    // function mintPromo(
    //     address recipient,
    //     string memory prefix,
    //     string memory postfix,
    //     bool isLegendary,
    //     bool skipIncubation
    // ) public onlyOwner {
    //     legendsNFT.mintPromo(
    //         recipient,
    //         prefix,
    //         postfix,
    //         isLegendary,
    //         skipIncubation
    //     );
    // }

    function setOffspringLimit(uint256 newOffspringLimit) public onlyOwner {
        legendsNFT.setOffspringLimit(newOffspringLimit);
    }

    function setBreedingCost(uint256 breedingCost) public onlyOwner {
        legendsNFT.setBreedingCost(breedingCost);
    }

    function setSeason(string memory newSeason) public onlyOwner {
        legendsNFT.setSeason(newSeason);
    }

    function setBaseHealth(uint256 baseHealth) public onlyOwner {
        legendsNFT.setBaseHealth(baseHealth);
    }

    // function mintPromotion(address receiver, string memory prefix, string memory postfix, uint dna) public onlyOwner {
    //     strainzNFT.mintPromotion(receiver, prefix, postfix, dna);
    // }

    // function setMarketplaceFee(uint newFee) public onlyOwner {
    //     strainzMarketplace.setMarketplaceFee(newFee);
    // }
}
