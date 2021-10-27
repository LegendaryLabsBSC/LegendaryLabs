// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

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

    address payable marketplace;

    /* payeeAddress => paymentsOwed */
    mapping(address => uint256) private _paymentOwed;

    /* legendCreator => royaltiesOwed */
    mapping(address => uint256) private _royaltiesOwed;

    /* listingId => bidderAddress => bidAmount  */
    mapping(uint256 => mapping(address => uint256)) private _pendingBid;

    //TODO: reeval events
    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);
    event BidRefunded(uint256 indexed listingId, address indexed bidder, uint256 bidAmount);

    constructor() {
        marketplace = payable(msg.sender);
    }

    /**
     * @dev Stores the sent amount as credit to be withdrawn.
     * @param _payee The destination address of the funds.
     */
    function deposit(
        address payable _payee,
        uint256 _marketplaceFee,
        uint256 _royaltyFee,
        address payable _legendCreator
    ) public payable virtual onlyOwner {
        // uint256 amount = msg.value;

        marketplace.call{value: _marketplaceFee};

        if (_royaltyFee != 0) {
            _royaltiesOwed[_legendCreator] += _royaltyFee;
        }

        uint256 payment = msg.value - (_marketplaceFee + _royaltyFee);

        _paymentOwed[_payee] += payment;

        // emit Deposited(_payee, amount);
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

    function depositBid(uint256 _listingId, address _payer)
        public
        payable
        virtual
        onlyOwner
    {
        uint256 amount = msg.value;

        _pendingBid[_listingId][_payer] += amount;

        emit Deposited(_payer, amount);
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

    function closeBid(uint256 _listingId, address _buyer)
        public
        virtual
        onlyOwner
    {
        _pendingBid[_listingId][_buyer] = 0;
    }

    function depositRoyalty(address payee) public payable virtual onlyOwner {
        uint256 amount = msg.value;

        _royaltiesOwed[payee] += amount;

        // emit Deposited(payee, amount);
    }

    function withdrawRoyalties(address payable payee) external onlyOwner {
        uint256 payment = _royaltiesOwed[payee];

        _royaltiesOwed[payee] = 0;

        payee.sendValue(payment);

        // emit Withdrawn(payee, payment);
    }

    //TODO: change name; paymentsOwed ?
    function depositsOf(address _payee) public view returns (uint256) {
        return _paymentOwed[_payee];
    }

    //TODO:
    function bidOf(uint256 _listingId, address _payee)
        public
        view
        returns (uint256)
    {
        return _pendingBid[_listingId][_payee];
    }

    function royaltiesOf(address _payee) public view returns (uint256) {
        return _royaltiesOwed[_payee];
    }
}
