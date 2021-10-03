// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LegendsConditionalEscrow.sol";
// import "@openzeppelin/contracts/utils/escrow/Escrow.sol";

/**
 * @title RefundEscrow
 * @dev Escrow that holds funds for a beneficiary, deposited from multiple
 * parties.
 * @dev Intended usage: See {Escrow}. Same usage guidelines apply here.
 * @dev The owner account (that is, the contract that instantiates this
 * contract) may deposit, close the deposit period, and allow for either
 * withdrawal by the beneficiary, or refunds to the depositors. All interactions
 * with `RefundEscrow` will be made through the owner contract.
 */
contract LegendsAuctionClerk is LegendsConditionalEscrow {
    using Address for address payable;

    enum State {
        Active,
        Refunding,
        Closed
    }

    // event RefundsClosed();
    // event RefundsEnabled();

    State private _state;

    // address payable private immutable _beneficiary;

    /**
     * @dev Constructor.
     * @param beneficiary_ The beneficiary of the deposits.
     */
    // constructor(address payable beneficiary_) {
    //     require(
    //         beneficiary_ != address(0),
    //         "RefundEscrow: beneficiary is the zero address"
    //     );
    //     _beneficiary = beneficiary_;
    //     _state = State.Active;
    // }

    /**
     * @return The current state of the escrow.
     */
    function state() public view virtual returns (State) {
        return _state;
    }

    /*
     * @return The beneficiary of the escrow.
    //  */
    // function beneficiary() public view virtual returns (address payable) {
    //     return _beneficiary;
    // }

    /*
     * @dev Stores funds that may later be refunded.
     * @param refundee The address funds will be sent to if a refund occurs.
     */
    function deposit(address payee) public payable virtual override {
        require(
            state() == State.Active,
            "RefundEscrow: can only deposit while active"
        );
        super.deposit(payee);
    }

    function bid(address bidder) public payable virtual {
        require(
            state() == State.Active,
            "RefundEscrow: can only deposit while active" // change to check if withdrable
        );
        deposit(bidder);
    }

    /**
     * @dev Allows for the beneficiary to withdraw their funds, rejecting
     * further deposits.
     */
    function close() public virtual onlyOwner {
        require(
            state() == State.Active,
            "RefundEscrow: can only close while active"
        );
        _state = State.Closed;
        // emit RefundsClosed();
    }

    /**
     * @dev Allows for refunds to take place, rejecting further deposits.
     */
    function enableRefunds() public virtual onlyOwner {
        require(
            state() == State.Active,
            "RefundEscrow: can only enable refunds while active"
        );
        _state = State.Refunding;
        // emit RefundsEnabled();
    }

    /**
     * @dev Withdraws the beneficiary's funds.
     */
    // function beneficiaryWithdraw() public virtual {
    //     require(
    //         state() == State.Closed,
    //         "RefundEscrow: beneficiary can only withdraw while closed"
    //     );
    //     beneficiary().sendValue(address(this).balance);
    // }
}
