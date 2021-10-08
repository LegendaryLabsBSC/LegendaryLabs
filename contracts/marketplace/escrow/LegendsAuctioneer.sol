// SPDX-License-Identifier: MIT

/**
 * Original contract by OpenZeppelin (Pull Payments)
 * Only slightly modified to fit Legendary Labs needs
 * These changes were made primarily to facilitate auctions
 * Additions are as follow:
 *
 * LAClerk ...
 * _withdrawlAllowed .. state variable,
 * listingId parameter in withdrawPayments function
 * withdrawHighestBid internal function
 *
 */

pragma solidity ^0.8.0;

// import "./LegendsAuctionClerk.sol";
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
abstract contract LegendsAuctioneer {
    LegendsEscrow private immutable _escrow;

    mapping(uint256 => mapping(address => bool)) internal _withdrawAllowed; // public for testing ; no assignment picked yet

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

    /*/*
     * @dev Called by the payer to store the sent amount as credit to be pulled.
     * Funds sent in this way are stored in an intermediate {Escrow} contract, so
     * there is no danger of them being spent before withdrawal.
     *
     * @param dest The destination address of the funds.
     * @param amount The amount to transfer.
     */
    // function withdrawHighestBid(
    //     uint256 listingId,
    //     address payable buyer,
    //     address payable seller
    // ) internal virtual {
    //     require(
    //         _withdrawAllowed[listingId][seller], // take into account the various listing types
    //         "ConditionalEscrow: payee is not allowed to withdraw"
    //     );
    //     _escrow.auctionWithdraw(listingId, buyer, seller);
    // }

    /**
     * @dev Returns the payments owed to an address.
     * @param dest The creditor's address.
     */
    function payments(address dest) public view returns (uint256) {
        return _escrow.depositsOf(dest);
    }

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

    function _asyncTransferBid(
        uint256 listingId,
        address bidder,
        uint256 amount
    ) internal virtual {
        _escrow.depositBid{value: amount}(listingId, bidder);
    }

        function _asyncTransferBid1(
        uint256 listingId,
        address bidder,
        uint256 amount
    ) internal virtual {
        _escrow.depositBid1{value: amount}(listingId, bidder);
    }

    function _obligateBid(
        uint256 listingId,
        address buyer,
        address seller
    ) internal virtual {
        _escrow.obligateBid(listingId, buyer, payable(seller));
    }

    // function _asyncTransferLegend(address dest, uint256 tokenId) internal virtual {
    //     _escrow.depositLegend(dest, tokenId);
    // }
}
