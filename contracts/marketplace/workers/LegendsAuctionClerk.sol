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

    // mapping(uint256 => mapping(address => uint256)) private _bidOwed;

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

    // function bidOwedTo(address payee) public view returns(uint256){
    //     return _deposits[payee];
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

    // function bid(
    //     uint256 listingId,
    //     address seller,
    //     address bidder
    // ) public payable virtual {
    //     require(
    //         state() == State.Active,
    //         "RefundEscrow: can only deposit while active" // change to check if withdrable
    //     );
    //     // uint256 amount = msg.value;
    //     // _deposits[seller] = amount;
    //     deposit(bidder);
    // }

    /**
     * @dev Allows for the beneficiary to withdraw their funds, rejecting
     * further deposits.
     */
    // function close(uint256 _highestBid, address seller, address highestBidder) public payable virtual onlyOwner {
    //     require(
    //         state() == State.Active,
    //         "RefundEscrow: can only close while active"
    //     );
    //     uint256 highestBid = _highestBid;
    //     _deposits[highestBidder] -= highestBid;

    // }

    // function beneficiaryWithdraw(
    //     uint256 listingId,
    //     address payable seller
    // ) public virtual {
    //     require(
    //         state() == State.Closed,
    //         "RefundEscrow: beneficiary can only withdraw while closed"
    //     );
    //     uint256 payment = _bidOwed[listingId][seller];

    //     _bidOwed[listingId][seller] = 0;

    //     seller.sendValue(payment);

    //     // emit Withdrawn(payee, payment);
    // }

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
