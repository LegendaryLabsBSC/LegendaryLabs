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
    mapping(uint256 => PromoEvent) internal promoEvent;

    /* promoId => maxTicketAmount */
    mapping(uint256 => uint256) internal maxTicketsDispensable;

    /* promoId => recipient => isClaimed */
    mapping(uint256 => mapping(address => bool)) private claimedPromo;

    /* promoId => recipient => ticketCount */
    mapping(uint256 => mapping(address => uint256)) private promoTickets;

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
        string calldata _name,
        uint256 _duration,
        bool _isUnrestricted,
        uint256 _maxTickets
    ) internal returns (uint256) {
        _promoIds.increment();
        uint256 promoId = _promoIds.current();

        uint256 expireTime = block.timestamp + _duration;

        PromoEvent storage p = promoEvent[promoId];
        p.promoName = _name;
        p.promoId = promoId;
        p.startTime = block.timestamp;
        p.expireTime = expireTime;
        p.isUnrestricted = _isUnrestricted;

        if (_maxTickets != 0) {
            p.ticketLimit = true;
            maxTicketsDispensable[promoId] = _maxTickets;
        }

        emit PromoCreated(promoId, _name, expireTime);

        return (promoId);
    }

    function _dispensePromoTicket(
        uint256 _promoId,
        address _recipient,
        uint256 _ticketAmount
    ) internal {
        PromoEvent storage p = promoEvent[_promoId];
        
        require(block.timestamp < p.expireTime, "Promo Expired");

        if (p.isUnrestricted) {
            require(
                isClaimed(_promoId, _recipient) == false,
                "Promo already claimed"
            );
            require(_ticketAmount == 1, "One ticket per address");
        }

        if (p.ticketLimit) {
            uint256 currentTicketCount = p.ticketsClaimed.current();
            require(currentTicketCount < maxTicketsDispensable[_promoId]);
        }

        claimedPromo[_promoId][_recipient] = true;

        promoTickets[_promoId][_recipient] += _ticketAmount;

        p.ticketsClaimed.increment();

        emit TicketDispensed(_promoId, p.ticketsClaimed.current());
    }

    function _redeemPromoTicket(uint256 _promoId, address _recipient) internal {
        PromoEvent storage p = promoEvent[_promoId];

        require(!p.promoClosed, "Promo Closed");

        uint256 redeemableTickets = fetchRedeemableTickets(
            _promoId,
            _recipient
        );
        require(redeemableTickets != 0, "No tickets to redeem");

        promoTickets[_promoId][_recipient] -= 1;

        p.ticketsRedeemed.increment();

        emit TicketRedeemed(_promoId, p.ticketsRedeemed.current());
    }

    function _closePromoEvent(uint256 _promoId) internal {
        PromoEvent storage p = promoEvent[_promoId];

        require(block.timestamp > p.expireTime, "Promo not expired");
        require(!p.promoClosed, "Promo already closed");

        p.promoClosed = true;

        emit PromoClosed(
            _promoId,
            p.ticketsClaimed.current(),
            p.ticketsRedeemed.current()
        );
    }

    function isClaimed(uint256 _promoId, address _recipient)
        public
        view
        virtual
        returns (bool)
    {
        return claimedPromo[_promoId][_recipient];
    }

    function fetchTotalPromoCount()
        public
        view
        virtual
        returns (Counters.Counter memory, Counters.Counter memory)
    {
        return (_promoIds, _closedPromos);
    }

    function fetchPromoEvent(uint256 _promoId)
        public
        view
        virtual
        returns (PromoEvent memory)
    {
        return promoEvent[_promoId];
    }

    function fetchMaxTicketsDispensable(uint256 _promoId)
        public
        view
        virtual
        returns (uint256)
    {
        require(promoEvent[_promoId].ticketLimit, "No Ticket Limit Set");

        return maxTicketsDispensable[_promoId];
    }

    function fetchRedeemableTickets(uint256 _promoId, address _recipient)
        public
        view
        virtual
        returns (uint256)
    {
        return promoTickets[_promoId][_recipient];
    }
}
