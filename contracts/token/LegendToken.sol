// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../lab/LegendsLaboratory.sol";

contract LegendToken is ERC20 {
    LegendsLaboratory lab;

    //TODO: add support for liqlock

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

    modifier onlyBlending() {
        require(msg.sender == address(lab.legendsNFT()), "not blending");
        _;
    }

    constructor(address owner) ERC20("Legends", "LGND") {
        lab = LegendsLaboratory(msg.sender);
        _mint(owner, 100 * 1e24);
    }

    function labBurn(uint256 _amount) public onlyLab {
        _burn(address(lab), _amount);
    }

    function blendingBurn(address _account, uint256 _amount)
        public
        onlyBlending
    {
        _burn(_account, _amount);
    }

    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
    }
}
