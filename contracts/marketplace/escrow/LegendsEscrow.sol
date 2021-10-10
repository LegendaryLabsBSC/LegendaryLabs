// SPDX-License-Identifier: MIT



pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

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

    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);
    event BidRefunded(uint256 listingId, address bidder, uint256 bidAmount);

    mapping(address => uint256) private _paymentOwed;
    mapping(address => uint256) private _royaltiesOwed;
    mapping(uint256 => mapping(address => uint256)) private _pendingBid;

    //TODO: change name; paymentsOwed ?
    function depositsOf(address payee) public view returns (uint256) {
        return _paymentOwed[payee];
    }

    //TODO:
    // function bidsOf(uint256 listingId, address payee)
    //     public
    //     view
    //     returns (uint256)
    // {
    //     return _paymentOwed[payee];
    // }

    function royaltiesOf(address payee) public view returns (uint256) {
        return _royaltiesOwed[payee];
    }

    /**
     * @dev Stores the sent amount as credit to be withdrawn.
     * @param payee The destination address of the funds.
     */
    function deposit(address payee) public payable virtual onlyOwner {
        uint256 amount = msg.value;

        _paymentOwed[payee] += amount;

        // emit Deposited(payee, amount);
    }

    function depositBid(uint256 listingId, address payer)
        public
        payable
        virtual
        onlyOwner
    {
        uint256 amount = msg.value;

        _pendingBid[listingId][payer] = amount; // try without + for increase bid issue

        // emit Deposited(payer, amount);
    }

    function depositRoyalty(address payee) public payable virtual onlyOwner {
        uint256 amount = msg.value;

        _royaltiesOwed[payee] += amount;

        // emit Deposited(payee, amount);
    }

    function obligateBid(
        uint256 listingId,
        address buyer,
        address payable seller,
        uint256 marketFee,
        uint256 royaltyFee,
        address payable tokenCreator
    ) public payable virtual onlyOwner {
        uint256 amount = _pendingBid[listingId][buyer];

        //marketplace fee

        if (royaltyFee != 0) {
            _royaltiesOwed[tokenCreator] += royaltyFee;
        }

        uint256 finalAmount = amount - (marketFee + royaltyFee);

        _pendingBid[listingId][buyer] = 0;

        _paymentOwed[seller] += finalAmount;
    }

    function refundBid(uint256 listingId, address payable bidder)
        public
        payable
        virtual
        onlyOwner
    {
        uint256 amount = _pendingBid[listingId][bidder];

        _pendingBid[listingId][bidder] = 0;

        bidder.sendValue(amount);

        emit BidRefunded(listingId, msg.sender, amount); // ! will show 0 payments not set up for bidders
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
     */
    function withdraw(address payable payee) external onlyOwner {
        uint256 payment = _paymentOwed[payee];

        _paymentOwed[payee] = 0;

        payee.sendValue(payment);

        // emit Withdrawn(payee, payment);
    }

    function withdrawRoyalties(address payable payee) external onlyOwner {
        uint256 payment = _royaltiesOwed[payee];

        _royaltiesOwed[payee] = 0;

        payee.sendValue(payment);

        // emit Withdrawn(payee, payment);
    }
}
