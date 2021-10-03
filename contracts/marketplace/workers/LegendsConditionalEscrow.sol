// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/escrow/Escrow.sol";

/**
 * @title ConditionalEscrow
 * @dev Base abstract escrow to only allow withdrawal if a condition is met.
 * @dev Intended usage: See {Escrow}. Same usage guidelines apply here.
 */
abstract contract LegendsConditionalEscrow is Escrow {

    //TODO: if not used to hold more functions can just use escrow probably


    // withdraw highest bidder
    function withdraw(address payable payee) public virtual override {
        super.withdraw(payee);
    }
}
