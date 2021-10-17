// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract TicketMachine {
    using Counters for Counters.Counter;

    Counters.Counter private _promoIds;
    Counters.Counter private _closedPromos;

    event PromoCreated(uint256 promoId, string promoName, uint256 expireTime);
    event TicketDispensed(uint256 promoId, uint256 currentDispensed);
    event TicketRedeemed(uint256 promoId, uint256 currentRedeemed);
    event PromoClosed(
        uint256 promoId,
        uint256 totalDispensed,
        uint256 totalRedeemed
    );

    //TODO: work in promo id and ticket max, can pick either or both when making event
    struct PromoEvent {
        string promoName;
        uint256 startTime;
        uint256 expireTime;
        bool isUnrestricted; // if unrestricted then one per
        bool promoClosed; // ticket can be redeemed after expire but not after close
        Counters.Counter ticketsClaimed;
        Counters.Counter ticketsRedeemed;
    }

    /* promoId => PromoEvent */
    mapping(uint256 => PromoEvent) internal promoEvent;

    /* promoId => recipient => isClaimed */
    mapping(uint256 => mapping(address => bool)) private claimedPromo;

    /* promoId => recipient => ticketCount */
    mapping(uint256 => mapping(address => uint256)) private promoTicket;

    function fetchTotalPromoCount()
        public
        view
        virtual
        returns (Counters.Counter memory)
    {
        return _promoIds;
    }

    function fetchPromoEvent(uint256 promoId)
        public
        view
        virtual
        returns (PromoEvent memory)
    {
        return promoEvent[promoId];
    }

    function fetchRedeemableTickets(uint256 _promoId, address _recipient)
        public
        view
        virtual
        returns (uint256)
    {
        return promoTicket[_promoId][_recipient];
    }

    function queryIfClaimed(uint256 promoId, address recipient)
        public
        view
        virtual
        returns (bool)
    {
        return claimedPromo[promoId][recipient];
    }

    function _createPromoEvent(
        string memory _name,
        uint256 _duration,
        bool _isUnrestricted
    ) internal returns (uint256) {
        _promoIds.increment();
        uint256 promoId = _promoIds.current();

        uint256 expireTime = block.timestamp + _duration;

        PromoEvent storage p = promoEvent[promoId];
        p.promoName = _name;
        p.startTime = block.timestamp;
        p.expireTime = expireTime;
        p.isUnrestricted = _isUnrestricted;

        if (_isUnrestricted) {
            emit PromoCreated(promoId, _name, expireTime);
        }

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
                queryIfClaimed(_promoId, _recipient) == false,
                "Promo already claimed"
            );
            require(_ticketAmount == 1, "One ticket per address");
        }

        claimedPromo[_promoId][_recipient] = true;

        promoTicket[_promoId][_recipient] += _ticketAmount;

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

        promoTicket[_promoId][_recipient] -= 1;

        p.ticketsRedeemed.increment();

        emit TicketRedeemed(_promoId, p.ticketsRedeemed.current());
    }

    function _closePromoEvent(uint256 _promoId) internal {
        PromoEvent storage p = promoEvent[_promoId];

        require(block.timestamp > p.expireTime, "Promo not expired");
        require(!p.promoClosed, "Promo already closed");

        p.promoClosed = true;

        if (p.isUnrestricted) {
            emit PromoClosed(
                _promoId,
                p.ticketsClaimed.current(),
                p.ticketsRedeemed.current()
            );
        }
    }
}
