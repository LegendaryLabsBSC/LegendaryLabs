// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "../lab/LegendsLaboratory.sol";

// ERC20Snapshot,
contract LegendToken is ERC20
// , ERC20Permit, ERC20Votes 
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

    constructor(address owner) ERC20("Legends", "LGND")
    //  ERC20Permit("Legends")
      {
        _lab = LegendsLaboratory(msg.sender);
        _mint(owner, 100 * 1e24); // 100 Million
    }

    // function snapshot() public onlyLab returns (uint256) {
    //     return _snapshot();
    // }

    function labBurn(uint256 amount) public onlyLab {
        _burn(address(_lab), amount);
    }

    function blendingBurn(address account, uint256 amount) public onlyBlending {
        _burn(account, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // function _afterTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 amount
    // ) internal override(ERC20, ERC20Votes) {
    //     super._afterTokenTransfer(from, to, amount);
    // }

    // function _mint(address to, uint256 amount)
    //     internal
    //     override(ERC20, ERC20Votes)
    // {
    //     super._mint(to, amount);
    // }

    // function _burn(address account, uint256 amount)
    //     internal
    //     override(ERC20, ERC20Votes)
    // {
    //     super._burn(account, amount);
    // }
}
