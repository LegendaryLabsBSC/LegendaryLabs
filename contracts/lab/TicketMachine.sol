// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract TicketMachine {
    using Counters for Counters.Counter;

    Counters.Counter private _promoIds;
    Counters.Counter private _closedPromos;

    struct PromoEvent {
        string promoName;
        uint256 promoId;
        uint256 startTime;
        uint256 expireTime;
        bool isUnrestricted; // if unrestricted then one per
        bool ticketLimit;
        bool promoClosed; // ticket can be redeemed after expire but not after close
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

    event PromoCreated(
        uint256 indexed promoId,
        string indexed promoName,
        uint256 expireTime
    );
    event PromoClosed(
        uint256 indexed promoId,
        uint256 totalDispensed,
        uint256 totalRedeemed
    );

    event TicketDispensed(uint256 indexed promoId, uint256 currentDispensed);
    event TicketRedeemed(uint256 indexed promoId, uint256 currentRedeemed);


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
            p.ticketLimit = true;
            _maxTicketsDispensable[promoId] = maxTickets;
        }

        emit PromoCreated(promoId, name, expireTime);

        return (promoId);
    }

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

        if (p.ticketLimit) {
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
     * @dev
     *
     *
     *
     */
    function _redeemPromoTicket(uint256 promoId, address recipient) internal {
        PromoEvent storage p = _promoEvent[promoId];

        require(!p.promoClosed, "Promo Event Has Already Closed");

        uint256 redeemableTickets = fetchRedeemableTickets(promoId, recipient);
        require(
            redeemableTickets != 0,
            "Address Has No Tickets To Redeem For This Promo Event"
        );

        _promoTickets[promoId][recipient] -= 1;

        p.ticketsRedeemed.increment();

        emit TicketRedeemed(promoId, p.ticketsRedeemed.current());
    }

    function _closePromoEvent(uint256 promoId) internal {
        PromoEvent storage p = _promoEvent[promoId];

        require(block.timestamp > p.expireTime, "Promo Has Not Yet Expired");
        require(!p.promoClosed, "Promo Has Already Closed");

        p.promoClosed = true;

        emit PromoClosed(
            promoId,
            p.ticketsClaimed.current(),
            p.ticketsRedeemed.current()
        );
    }

    function isClaimed(uint256 promoId, address recipient)
        public
        view
        virtual
        returns (bool)
    {
        return _claimedPromo[promoId][recipient];
    }

    function fetchTotalPromoCount()
        public
        view
        returns (Counters.Counter memory, Counters.Counter memory)
    {
        return (_promoIds, _closedPromos);
    }

    function fetchPromoEvent(uint256 promoId)
        public
        view
        returns (PromoEvent memory)
    {
        return _promoEvent[promoId];
    }

    function fetchMaxTicketsDispensable(uint256 promoId)
        public
        view
        returns (uint256)
    {
        require(
            _promoEvent[promoId].ticketLimit,
            "Promo Event Does Not Have A Max Ticket Limit"
        );

        return _maxTicketsDispensable[promoId];
    }

    function fetchRedeemableTickets(uint256 promoId, address recipient)
        public
        view
        returns (uint256)
    {
        return _promoTickets[promoId][recipient];
    }
}
