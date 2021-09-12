// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LegendsNFT.sol";
// import "./LegendaryToken.sol";
// import "./LegendsAccessories.sol";
// import "./LegendsMarketplace.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//TODO: look into openZeppelin Access Control docs more ; OZ Governor

contract LegendsLabratory is Ownable {
    // master deals with anything that can be minted (not dna, stat, etc contracts)
    LegendsNFT public legendsNFT = new LegendsNFT();

    // LegendaryToken public legendaryToken = new LegendaryToken();
    // LegendsAccessories public legendsAccessories = new LegendsAccessories(msg.sender);
    // LegendsMarketplace public legendsMarketplace = new LegendsMarketplace();
    constructor() {}

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

    function setBreedingCost(uint256 BreedingCost) public onlyOwner {
        legendsNFT.setBreedingCost(BreedingCost);
    }

    function setSeason(string memory newSeason) public onlyOwner {
        legendsNFT.setSeason(newSeason);
    }

    // function mintPromotion(address receiver, string memory prefix, string memory postfix, uint dna) public onlyOwner {
    //     strainzNFT.mintPromotion(receiver, prefix, postfix, dna);
    // }

    // function setMarketplaceFee(uint newFee) public onlyOwner {
    //     strainzMarketplace.setMarketplaceFee(newFee);
    // }
}
