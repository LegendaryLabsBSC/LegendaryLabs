// SPDX-License-Identifier: MIT

/**
 * Original contract by OpenZeppelin (Pull Payments)
 * Slightly modified to fit Legendary Labs needs
 * These changes were made primarily to facilitate auctions
 */

pragma solidity 0.8.4;

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

    /** @dev listingId => bidderAddress => canWithdrawBid? */
    mapping(uint256 => mapping(address => bool)) internal _isBidRefundable;

    constructor() {
        _escrow = new LegendsEscrow();
    }

    /**
     * @dev Called by the payer to store the sent amount as credit to be pulled.
     * Funds sent in this way are stored in an intermediate {Escrow} contract, so
     * there is no danger of them being spent before withdrawal. --OpenZeppelin
     *
     * @dev Calls the {depositPayment} function in the {LegendsEscrow} contract.
     *
     * @param price The amount the payee wants for the Legend, in BNB.
     * @param marketplaceFee The amount collected from the sale, to be used for further project development.
     * @param royaltyFee The amount collected from the sale, to be later withdrawn by the original Legend Creator.
     * @param legendCreator The address which originally created the Legend through {Blending} in the {LegendsNFT} contract.
     * @param payee The destination address of the listing-payment.
     */
    function _asyncTransfer(
        uint256 price,
        uint256 marketplaceFee,
        uint256 royaltyFee,
        address payable legendCreator,
        address payable payee
    ) internal {
        _escrow.depositPayment{value: price}(
            marketplaceFee,
            royaltyFee,
            legendCreator,
            payee
        );
    }

    /**
     * @dev Auctions and Offers both utilize {_asyncTransferBid} in order to protect the funds of the payee.
     * The bid is stored as a credit attributed to the payers address, as opposed to the payees address.
     * Should a payer be outbid, or in the case of an Offer the seller not accept their offerAmount,
     * the bid is unlocked, for the payer to later withdraw through {_refundBid}. fdldslkflsek close bid
     */

    /**
     * @dev Calls the {depositBid} function in the {LegendsEscrow} contract.
     *
     * @param amount The bid amount, placed in BNB.
     * @param listingId The id of the Legend-Auction or Legend-Offer
     * @param payer The address of the auction-bidder or offer-maker.
     */
    function _asyncTransferBid(
        uint256 amount,
        uint256 listingId,
        address payer
    ) internal {
        _escrow.depositBid{value: amount}(listingId, payer);
    }

    /**
     * @dev Calls the {refundBid} function in the {LegendsEscrow} contract.
     *
     * @param listingId The id of the Legend-Auction or Legend-Offer.
     * @param payee The address of the auction-bidder or offer-maker to be refunded.
     */
    function _refundBid(uint256 listingId, address payable payee)
        internal
        virtual
    {
        _escrow.refundBid(listingId, payee);
    }

    /**
     * @dev Calls the {closeBid} function in the {LegendsEscrow} contract.
     *
     * @param listingId The id of the Legend-Auction or Legend-Offer.
     * @param payer The address of the auction-highestBidder or offer-buyer.
     */
    function _closeBid(
        uint256 listingId,
        address payable payer,
        uint256 marketplaceFee,
        uint256 royaltyFee,
        address payable legendCreator,
        address payable payee
    ) internal virtual {
        _escrow.closeBid(
            listingId,
            payer,
            marketplaceFee,
            royaltyFee,
            legendCreator,
            payee
        );
    }

    /**
     * @dev Withdraw accumulated payments, forwarding all gas to the recipient.
     *
     * @param payee Whose payments will be withdrawn.
     */

    function _withdrawPayments(address payable payee) internal {
        _escrow.withdrawPayments(payee);
    }

    function _withdrawRoyalties(address payable payee) internal {
        _escrow.withdrawRoyalties(payee);
    }

    /**
     * @dev Calls the getter for {_paymentsPending} inside the {LegendsEscrow} contract.
     */
    function fetchPaymentsPending(address payee) public view returns (uint256) {
        // these getters could be cut and fetched directly if more space is needed in contract
        return _escrow.fetchPaymentsPending(payee);
    }

    /**
     * @dev Calls the getter for {_bidPlaced} inside the {LegendsEscrow} contract.
     */
    function fetchBidPlaced(uint256 listingId, address bidder)
        public
        view
        returns (uint256)
    {
        return _escrow.fetchBidPlaced(listingId, bidder);
    }

    /**
     * @dev Calls the getter for {_royaltiesAccrued} inside the {LegendsEscrow} contract.
     */
    function fetchRoyaltiesAccrued(address payee)
        public
        view
        returns (uint256)
    {
        return _escrow.fetchRoyaltiesAccrued(payee);
    }
}
