// SPDX-License-Identifier: MIT

/**
 * Original contract by OpenZeppelin (Pull Payments)
 * Slightly modified to fit Legendary Labs needs
 * These changes were made primarily to facilitate auctions
 */

pragma solidity ^0.8.4;
import "./LegendsEscrow.sol";

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
abstract contract LegendsMarketClerk {
    LegendsEscrow private immutable _escrow;

    mapping(uint256 => mapping(address => bool)) internal _withdrawAllowed;

    constructor() {
        _escrow = new LegendsEscrow();
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

    function _withdrawPayments(uint256 listingId, address payable payee)
        internal
        virtual
    {
        require(_withdrawAllowed[listingId][payee], "Not authorized");
        _escrow.withdraw(payee);
    }

    function _withdrawBid(uint256 listingId, address payable payee)
        internal
        virtual
    {
        require(_withdrawAllowed[listingId][payee], "Not authorized");
        _escrow.refundBid(listingId, payee);
    }

    function _withdrawRoyalties(address payable payee) internal virtual {
        _escrow.withdrawRoyalties(payee);
    }

    /**
     * @dev Returns the payments owed to an address.
     * @param dest The creditor's address.
     */
    function payments(address dest) public view returns (uint256) {
        return _escrow.depositsOf(dest);
    }

    function royalties(address payee) public view returns (uint256) {
        return _escrow.royaltiesOf(payee);
    }

    /*/*
     * @dev Called by the payer to store the sent amount as credit to be pulled.
     * Funds sent in this way are stored in an intermediate {Escrow} contract, so
     * there is no danger of them being spent before withdrawal.
     *
     * @param dest The destination address of the funds.
     * @param amount The amount to transfer.
     */
    function _asyncTransfer(address payee, uint256 amount) internal virtual {
        _escrow.deposit{value: amount}(payee);
    }

    function _asyncTransferBid(
        uint256 listingId,
        address payer,
        uint256 amount
    ) internal virtual {
        _escrow.depositBid{value: amount}(listingId, payer);
    }

    function _asyncTransferRoyalty(address payee, uint256 amount)
        internal
        virtual
    {
        _escrow.depositRoyalty{value: amount}(payee);
    }

    function _obligateBid(
        uint256 listingId,
        address buyer,
        address seller,
        uint256 marketFee,
        uint256 royaltyFee,
        address legendCreator
    ) internal virtual {
        _escrow.obligateBid(
            listingId,
            buyer,
            payable(seller),
            marketFee,
            royaltyFee,
            payable(legendCreator)
        );
    }
}
