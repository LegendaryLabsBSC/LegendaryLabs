// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../lab/LegendsLaboratory.sol";

contract LegendToken is ERC20 

{
    LegendsLaboratory _lab;

    modifier onlyLab() {
        require(msg.sender == address(_lab), "Not Called By Lab Admin");
        _;
    }

    modifier onlyMarketplace() {
        require(
            msg.sender == address(_lab.legendsMarketplace()),
            "Not Called By Marketplace Contract"
        );
        _;
    }

    modifier onlyBlending() {
        require(
            msg.sender == address(_lab.legendsNFT()),
            "Not Called By NFT Contract"
        );
        _;
    }

    constructor(address owner)
        ERC20("Legends", "LGND")
    {
        _lab = LegendsLaboratory(msg.sender);
        _mint(owner, 100 * 1e24); // 100 Million
    }

    /**
     * @dev Function only callable by [`LegendsLaboratory`](../lab/LegendaryLaboratory#labburn)
     *
     *
     * @param amount Number of LGND tokens to burn
     */
    function labBurn(uint256 amount) public onlyLab {
        _burn(address(_lab), amount);
    }

    /**
     * @dev Function only callable by [`LegendsNFT`](../legend/LegendsNFT#blendlegends)
     *
     *
     * @param account Address burning LGND tokens to create a new *child Legend*
     * @param amount Number of LGND tokens to burn; blending cost
     */
    function blendingBurn(address account, uint256 amount) public onlyBlending {
        _burn(account, amount);
    }

    /**
     * @notice Destroy Your LGND Tokens Forever
     *
     * @dev Allows an address to burn their LGND tokens
     *
     *
     * :::warning
     *
     * Burned tokens can never be retrieved as they will be completely removed from the total supply.
     *
     * :::
     *
     *
     * @param amount Number of LGND tokens to burn
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

}
