// SPDX-License-Identifier: MIT

/**
 * Original contract by OpenZeppelin(Pull Payments)
 * Only slightly modified to fit Legendary Labs needs
 * Additions are as follow:
 *
 */

pragma solidity ^0.8.0;

import "./LegendsAuctionClerk.sol";

/**
 * @dev Simple implementation of a
 * https://consensys.github.io/smart-contract-best-practices/recommendations/#favor-pull-over-push-for-external-calls[pull-payment]
 * strategy, where the paying contract doesn't interact directly with the
 * receiver account, which must withdraw its payments itself.
 *
 * Pull-payments are often considered the best practice when it comes to sending
 * Ether, security-wise. It prevents recipients from blocking execution, and
 * eliminates reentrancy concerns.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 *
 * To use, derive from the `PullPayment` contract, and use {_asyncTransfer}
 * instead of Solidity's `transfer` function. Payees can query their due
 * payments with {payments}, and retrieve them with {withdrawPayments}.
 */
abstract contract LegendsAuctioneer {
    LegendsAuctionClerk private immutable _escrow; // change to _clerk when done

    // comment well to explain this
    // mapping(uint256 => mapping(uint256 => mapping(address => bool)))
    //     public _withdrawAllowed; // public for testing ; no assignment picked yet

    mapping(uint256 => mapping(address => bool)) public _withdrawAllowed; // public for testing ; no assignment picked yet

    //try to add claim functions here

    constructor() {
        _escrow = new LegendsAuctionClerk();
    }

    /**
     * @dev Withdraw accumulated payments, forwarding all gas to the recipient.
     *
     * Note that _any_ account can call this function, not just the `payee`.
     * This means that contracts unaware of the `PullPayment` protocol can still
     * receive funds this way, by having a separate account call
     * {withdrawPayments}.
     *
     * WARNING: Forwarding all gas opens the door to reentrancy vulnerabilities.
     * Make sure you trust the recipient, or are either following the
     * checks-effects-interactions pattern or using {ReentrancyGuard}.
     *
     * @param payee Whose payments will be withdrawn.
     */
    function withdrawPayments(uint256 listingId, address payable payee)
        internal
        virtual
    {
        require(
            _withdrawAllowed[listingId][payee], // take into account the various listing types
            "ConditionalEscrow: payee is not allowed to withdraw"
        );
        _escrow.withdraw(payee);
    }

    function withdrawHighestBid(
        uint256 listingId,
        address payable buyer,
        address payable seller
    ) internal virtual {
        require(
            _withdrawAllowed[listingId][seller], // take into account the various listing types
            "ConditionalEscrow: payee is not allowed to withdraw"
        );
        _escrow.auctionWithdraw(buyer, seller);
    }

    /**
     * @dev Returns the payments owed to an address.
     * @param dest The creditor's address.
     */
    function payments(address dest) public view returns (uint256) {
        return _escrow.depositsOf(dest);
    }

    // function highestBid(uint256 listingId, address dest)
    //     public
    //     view
    //     returns (uint256)
    // {
    //     return _escrow.bidOwedTo(listingId, dest);
    // }

    /**
     * @dev Called by the payer to store the sent amount as credit to be pulled.
     * Funds sent in this way are stored in an intermediate {Escrow} contract, so
     * there is no danger of them being spent before withdrawal.
     *
     * @param dest The destination address of the funds.
     * @param amount The amount to transfer.
     */
    function _asyncTransfer(address dest, uint256 amount) internal virtual {
        _escrow.deposit{value: amount}(dest);
    }

    // function _asyncBid(
    //     uint256 listingId,
    //     address seller,
    //     address bidder,
    //     uint256 amount
    // ) internal virtual {
    //     _escrow.bid{value: amount}(listingId, seller, bidder);
    // }
}
