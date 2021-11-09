// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @dev The **Ticket Machine** contract is used primarily to create *Legendary Labs Promo Events*. Promo Events are the
 * only other method in which new Legend NFTs can be created, when not being create from *blending*, as science intended.
 *
 *
 * :::important
 *
 * **Promo Events* are required to have a duration imposed on them. Once this duration is reached, the *promo event* will
 *  be consider *expired*. While an *expired promo event* will no longer have to ability to dispense new tickets, addresses
 *  that are still credited *promo tickets* can redeem those tickets for a Legend NFT.
 *
 * **Promo Events* that have been closed via a `LAB_TECH` manually calling [`closePromoEvent`](docs/contracts/lab/LegendsLaboratory#closePromoEvent)
 * will be unable to dispense new ticker or redeem existing tickets.
 *
 * :::
 *
 *
 * :::note
 *
 * While we will initially use this contract to mint new Legends through *promo events*, the concept of being able to issue
 * and redeem a "ticket" of sorts to grant access, can certainly be repurposed through new features we may come up with.
 *
 * :::
 *
 */
abstract contract TicketMachine {
    using Counters for Counters.Counter;

    Counters.Counter private _promoIds;
    Counters.Counter private _closedPromos;

    /**
     *
     * :::note Promo Event:
     *
     * * `promoName` => Non-numerical ID of a Legendary Labs *promo event*
     * * `promoId` => Numerical ID of a Legendary Labs *promo event*
     * * `startTime` => Block/UNIX time the *promo event* starts
     * * `expireTime` => `promoEvent.startTime' + 'duration`
     * * `isUnrestricted` => Indicates if a *promo event* can have tickets dispensed by any address or not
     * * `isTicketLimit` => Indicates if a *promo event* has set a max number of *tickets* to be dispensed or not
     * * `isPromoClosed` => Indicates if a *promo event* has closed or not
     * * `ticketsClaimed` => Number of *promo tickets* that have been *dispensed* from the associated *promo event*
     * * `ticketsRedeemed` => Number of *promo tickets* that have been *redeemed* from the associated *promo event*
     *
     * :::
     *
     */
    struct PromoEvent {
        string promoName;
        uint256 promoId;
        uint256 startTime;
        uint256 expireTime;
        bool isUnrestricted;
        bool isTicketLimit;
        bool isPromoClosed;
        Counters.Counter ticketsClaimed;
        Counters.Counter ticketsRedeemed;
    }

    /* promoId => PromoEvent */
    mapping(uint256 => PromoEvent) internal _promoEvent;

    /* promoId => maxTicketAmount */
    mapping(uint256 => uint256) internal _maxTicketsDispensable;

    /* promoId => recipient => isClaimed */
    mapping(uint256 => mapping(address => bool)) private _claimedPromo;

    /* promoId => recipient => ticketCount */
    mapping(uint256 => mapping(address => uint256)) private _promoTickets;

    /**
     * @dev Emitted when a new *promo event* is created.
     */
    event PromoCreated(
        uint256 indexed promoId,
        string indexed promoName,
        uint256 expireTime
    );

    /**
     * @dev Emitted when a *promo event* is closed.
     */
    event PromoClosed(
        uint256 indexed promoId,
        uint256 totalDispensed,
        uint256 totalRedeemed
    );

    /**
     * @dev Emitted when a *promo ticket* is dispensed.
     */
    event TicketDispensed(uint256 indexed promoId, uint256 currentDispensed);

    /**
     * @dev Emitted when a *promo ticket* is redeemed.
     */
    event TicketRedeemed(uint256 indexed promoId, uint256 currentRedeemed);

    /**
     * @dev Creates a new *promo event* which is able to dispense and redeem *promo tickets*.
     *
     * :::important
     *
     * A *promo event* must have a valid `duration` in order to function correctly, however,
     * a *max ticket limit* is not required. Passing (0) for `maxTickets` will result in a
     * *promo event* with no *max ticket limit*.
     *
     * :::
     *
     * @param name Non-numerical *promo event* identifier
     * @param duration Length of time, in seconds, that addresses will have to claim a promo ticket
     * @param isUnrestricted Determines who can dispense promo tickets
     * @param maxTickets Specifies the max amount of tickets that can be claimed
     */
    function _createPromoEvent(
        string calldata name,
        uint256 duration,
        bool isUnrestricted,
        uint256 maxTickets
    ) internal returns (uint256) {
        _promoIds.increment();
        uint256 promoId = _promoIds.current();

        uint256 expireTime = block.timestamp + duration;

        PromoEvent storage p = _promoEvent[promoId];
        p.promoName = name;
        p.promoId = promoId;
        p.startTime = block.timestamp;
        p.expireTime = expireTime;
        p.isUnrestricted = isUnrestricted;

        if (maxTickets != 0) {
            p.isTicketLimit = true;
            _maxTicketsDispensable[promoId] = maxTickets;
        }

        emit PromoCreated(promoId, name, expireTime);

        return (promoId);
    }

    /**
     * @dev Dispenses a *promo ticket* that can then be redeemed to mint a Legend NFT.
     *
     *
     * :::important
     *
     * *Unrestricted promo events* will reject any value other than (1) for `ticketAmount`
     *
     * :::
     *
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     * @param recipient Address that will receive the *promo tickets*
     * @param ticketAmount Number of *promo tickets* to dispense
     */
    function _dispensePromoTicket(
        uint256 promoId,
        address recipient,
        uint256 ticketAmount
    ) internal {
        PromoEvent storage p = _promoEvent[promoId];

        require(
            block.timestamp < p.expireTime,
            "Promo Event Has Already Expired"
        );

        if (p.isUnrestricted) {
            require(
                isClaimed(promoId, recipient) == false,
                "Promo Event Has Already Been Claimed"
            );
            require(ticketAmount == 1, "Amount Must Equal 1");
        }

        if (p.isTicketLimit) {
            uint256 currentTicketCount = p.ticketsClaimed.current();
            require(
                currentTicketCount < _maxTicketsDispensable[promoId],
                "Max Ticket Limit Has Been Reached"
            );
        }

        _claimedPromo[promoId][recipient] = true;

        _promoTickets[promoId][recipient] += ticketAmount;

        p.ticketsClaimed.increment();

        emit TicketDispensed(promoId, p.ticketsClaimed.current());
    }

    /**
     * @dev Redeems (1) *promo ticket* dispensed from a *promo event*
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     * @param recipient Address redeeming *promo ticket*
     */
    function _redeemPromoTicket(uint256 promoId, address recipient) internal {
        PromoEvent storage p = _promoEvent[promoId];

        require(!p.isPromoClosed, "Promo Event Has Already Closed");

        uint256 redeemableTickets = fetchRedeemableTickets(promoId, recipient);
        require(
            redeemableTickets != 0,
            "Address Has No Tickets To Redeem For This Promo Event"
        );

        _promoTickets[promoId][recipient] -= 1;

        p.ticketsRedeemed.increment();

        emit TicketRedeemed(promoId, p.ticketsRedeemed.current());
    }

    /**
     * @dev Closes an expired *promo event*.
     *
     * :::warning
     *
     * Any addresses with unredeemed *promo tickets* will be unable to
     * redeem once the *promo event* has been closed
     *
     * :::
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     */
    function _closePromoEvent(uint256 promoId) internal {
        PromoEvent storage p = _promoEvent[promoId];

        require(block.timestamp > p.expireTime, "Promo Has Not Yet Expired");
        require(!p.isPromoClosed, "Promo Has Already Closed");

        p.isPromoClosed = true;

        emit PromoClosed(
            promoId,
            p.ticketsClaimed.current(),
            p.ticketsRedeemed.current()
        );
    }

    /**
     * @dev Returns if a given address has *dispensed* a ticket from a given *promo event* or not
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     * @param recipient Address being queried
     */
    function isClaimed(uint256 promoId, address recipient)
        public
        view
        virtual
        returns (bool)
    {
        return _claimedPromo[promoId][recipient];
    }

    /**
     * @dev Returns the counts for `_promoIds` and `_closedPromos`
     */
    function fetchPromoCounts()
        public
        view
        returns (Counters.Counter memory, Counters.Counter memory)
    {
        return (_promoIds, _closedPromos);
    }

    /**
     * @dev Returns details pertaining to a given `PromoEvent`
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     */
    function fetchPromoEvent(uint256 promoId)
        public
        view
        returns (PromoEvent memory)
    {
        return _promoEvent[promoId];
    }

    /**
     * @dev Returns, if any, the *max ticket limit* of a `PromoEvent`
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     */
    function fetchMaxTicketsDispensable(uint256 promoId)
        public
        view
        returns (uint256)
    {
        require(
            _promoEvent[promoId].isTicketLimit,
            "Promo Event Does Not Have A Max Ticket Limit"
        );

        return _maxTicketsDispensable[promoId];
    }

    /**
     * @dev Returns the quantity of *promo tickets* a given address has for a given *promo event*
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     * @param recipient Address being queried
     */
    function fetchRedeemableTickets(uint256 promoId, address recipient)
        public
        view
        returns (uint256)
    {
        require(!_promoEvent[promoId].isPromoClosed, "Promo Event Has Closed");
        return _promoTickets[promoId][recipient];
    }
}
