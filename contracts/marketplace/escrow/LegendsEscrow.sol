// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * Original contract by OpenZeppelin (Escrow)
 * Slightly modified to fit Legendary Labs needs
 * These changes were made primarily to facilitate auctions
 */

/**
 * @title Escrow
 * @dev Base escrow contract, holds funds designated for a payee until they
 * withdraw them.
 *
 * Intended usage: This contract (and derived escrow contracts) should be a
 * standalone contract, that only interacts with the contract that instantiated
 * it. That way, it is guaranteed that all Ether will be handled according to
 * the `Escrow` rules, and there is no need to check for payable functions or
 * transfers in the inheritance tree. The contract that uses the escrow as its
 * payment method should be its owner, and provide public methods redirecting
 * to the escrow's deposit and withdraw.
 */
contract LegendsEscrow is Ownable {
    using Address for address payable;

    address payable _marketplace;

    /** @dev payeeAddress => paymentAmount */
    mapping(address => uint256) private _paymentPending;

    /** @dev listingId => bidderAddress => bidAmount  */
    mapping(uint256 => mapping(address => uint256)) private _bidPlaced;

    /** @dev legendCreator => royaltiesAmount */
    mapping(address => uint256) private _royaltiesAccrued;

    event PaymentDeposited(address indexed payee, uint256 amount);
    event PaymentsWithdrawn(address indexed payee, uint256 amount);
    event RoyaltiesWithdrawn(address indexed payee, uint256 amount);
    event BidPlaced(
        uint256 indexed listingId,
        address indexed payer,
        uint256 amount
    );
    event BidRefunded(
        uint256 indexed listingId,
        address indexed payer,
        uint256 amount
    );

    constructor() {
        _marketplace = payable(msg.sender);
    }

    /**
     * @notice Collects fees and then credits seller with listing-payment to be later withdrawn.
     *
     * @dev This function does the actual collection of {_marketplaceFee} and {_royaltyFee}
     * prior to crediting payment to the seller. Fee collection at this step makes it easier to
     * incorporate auction and offer logic into the Escrow and Pull-over-Push patterns.
     * Collecting here also allows an address to withdraw the accumulation of payments
     * from successful sales, rather than having to collect payment from each individual sale/
     *
     * @param marketplaceFee The amount collected from the sale, to be used for further project development.
     * @param royaltyFee The amount collected from the sale, to be later withdrawn by the original Legend Creator.
     * @param legendCreator The address which originally created the Legend through {Blending} in the {LegendsNFT} contract.
     * @param payee The destination address of the listing-payment.
     */
    function depositPayment(
        uint256 marketplaceFee,
        uint256 royaltyFee,
        address payable legendCreator,
        address payable payee
    ) public payable virtual onlyOwner {
        _marketplace.call{value: marketplaceFee}; // send to marketplace ; would need a lab withdraw getter ;; or can send to lab directly ? ; make state var here to hold lab address and setter in marketplace

        if (royaltyFee != 0) {
            _royaltiesAccrued[legendCreator] += royaltyFee;
        }

        /** @param payment Amount owed to payee after fees have been collected */
        uint256 payment = msg.value - (marketplaceFee + royaltyFee);

        _paymentPending[payee] += payment;

        emit PaymentDeposited(payee, payment);
    }

    // function depositPayment(
    //     uint256 marketplaceFee,
    //     uint256 royaltyFee,
    //     uint256 price,
    //     address payable legendCreator,
    //     address payable payee
    // ) public payable virtual onlyOwner {
    //     _marketplace.call{value: marketplaceFee}; // send to marketplace ; would need a lab withdraw getter ;; or can send to lab directly ? ; make state var here to hold lab address and setter in marketplace

    //     if (royaltyFee != 0) {
    //         _royaltiesAccrued[legendCreator] += royaltyFee;
    //     }

    //     /** @param payment Amount owed to payee after fees have been collected */
    //     uint256 payment = price - (marketplaceFee + royaltyFee);

    //     _paymentPending[payee] += payment;

    //     emit PaymentDeposited(payee, payment);
    // }

    /**
     * @notice Stores auction-bid or offer-amount as a credit attributed to the payer address.
     *
     * @param listingId The id of the Legend-Auction or Legend-Offer.
     * @param payer The address of the auction-bidder or offer-maker.
     */
    function depositBid(uint256 listingId, address payer)
        public
        payable
        onlyOwner
    {
        uint256 amount = msg.value;

        /**
         * @dev In the case of an auction, if a @param payer has previously bid on a @param listingId
         * {_bidPlaced} will be incremented with their additional bid-increase.
         * Offer-Makers are not provided functionality to increase their bids.
         *
         * @dev If contract space were to allow, or in a future version utilizing EIP-2535,
         * functionality should be extended to provide offer-makers and offer-receivers
         * the ability to send counter-offers, or simply deny a sale of any amount entirely.
         */
        _bidPlaced[listingId][payer] += amount;

        emit BidPlaced(listingId, payer, amount);
    }

    /**
     * @notice Refunds auction-bid or offer-amount back to the payer address.
     *
     * @dev It is imperative to set the {_bidPlaced} amount of the payee back to 0 prior to refunding the bid.
     *
     * @param listingId The id of the Legend-Auction or Legend-Offer.
     * @param payee The address of the auction-bidder or offer-maker to be refunded.
     */
    function refundBid(uint256 listingId, address payable payee)
        public
        payable
        onlyOwner
    {
        uint256 amount = _bidPlaced[listingId][payee];

        _bidPlaced[listingId][payee] = 0;

        payee.sendValue(amount);

        emit BidRefunded(listingId, msg.sender, amount);
    }

    /**
     * @notice Refunds auction-bid or offer-amount back to the payer address.
     *
     * @dev It is imperative to set the {_bidPlaced} amount of the payee back to 0 prior to refunding the bid.
     *
     * @param listingId The id of the Legend-Auction or Legend-Offer.
     * @param payer The address of the auction-bidder or offer-maker to be refunded.
     */
    function closeBid(
        uint256 listingId,
        address payable payer,
        uint256 marketplaceFee,
        uint256 royaltyFee,
        address payable legendCreator,
        address payable payee
    ) public virtual onlyOwner {
        uint256 price = _bidPlaced[listingId][payer];

        _bidPlaced[listingId][payer] = 0;

        this.depositPayment{value: price}(
            marketplaceFee,
            royaltyFee,
            legendCreator,
            payee
        );
    }

    /**
     * @dev Withdraw accumulated balance for a payee, forwarding all gas to the
     * recipient.
     *
     * WARNING: Forwarding all gas opens the door to reentrancy vulnerabilities.
     * Make sure you trust the recipient, or are either following the
     * checks-effects-interactions pattern or using {ReentrancyGuard}.
     *
     * @param payee The address whose funds will be withdrawn and transferred to.

     // put in how accumulated amount is withdrawn
     */
    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 amount = _paymentPending[payee];

        _paymentPending[payee] = 0;

        payee.sendValue(amount);

        emit PaymentsWithdrawn(payee, amount);
    }

    function withdrawRoyalties(address payable payee) external onlyOwner {
        uint256 amount = _royaltiesAccrued[payee];

        _royaltiesAccrued[payee] = 0;

        payee.sendValue(amount);

        emit RoyaltiesWithdrawn(payee, amount);
    }

    /**
     * @notice Amount returned is the sum of all unclaimed successful sales and auctions.
     *
     * @dev Returns the amount owed to an address through Legend sales and auctions.
     *
     * @param payee Address owed BNB through Legend sales and auctions.
     */
    function fetchPaymentsPending(address payee) public view returns (uint256) {
        return _paymentPending[payee];
    }

    /**
     * @notice Amount returned is the individual bid an address has placed on each unique auction Id.
     *
     * @dev Returns the bid amount an address has placed on a Legend auction.
     *
     * @param listingId Id of the auction.
     * @param bidder Address that placed a bid in BNB on a Legend auction.
     */
    function fetchBidPlaced(uint256 listingId, address bidder)
        public
        view
        returns (uint256)
    {
        return _bidPlaced[listingId][bidder];
    }

    /**
     * @notice Amount returned is the sum of all royalties owed to the Legend-Creator-Address,
     * from all Legends the Creator address has previously Blended.
     *
     * @dev Returns the amount of royalties accumulated through sales and auctions owed to a Legend's creator.
     *
     * @param payee Address owed royalties in BNB.
     */
    function fetchRoyaltiesAccrued(address payee)
        public
        view
        returns (uint256)
    {
        return _royaltiesAccrued[payee];
    }
}
