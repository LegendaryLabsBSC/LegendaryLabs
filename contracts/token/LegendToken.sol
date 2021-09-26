// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

//TODO: clean out redundancy in imports-inheritance
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../legend/LegendsNFT.sol";

contract LegendToken is ERC20 {
    LegendsLaboratory lab;

    constructor(address owner) ERC20("Legends", "LGND") {
        lab = LegendsLaboratory(msg.sender);
        _mint(owner, 100 * 1e24);
    }

    modifier onlyLab() {
        require(msg.sender == address(lab), "not lab owner");
        _;
    }

    modifier onlyMarketplace() {
        require(
            msg.sender == address(lab.legendsMarketplace()),
            "not marketplace"
        );
        _;
    }

    function matchingBurn(address account, uint256 amount)
        public
        onlyMarketplace
    {
        _burn(account, amount);
    }
}
