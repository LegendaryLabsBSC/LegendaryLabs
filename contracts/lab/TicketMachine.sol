// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/Counters.sol";

pragma solidity ^0.8.4;

abstract contract TicketMachine {
    using Counters for Counters.Counter;

    Counters.Counter private _ticketIds;
    Counters.Counter private _ticketsRedeemed;

    struct PromoTicket {
        uint256 ticketId;
        string promoEvent;
        address ticketOwner;
        bool ticketRedeemed;
    }

    mapping(uint256 => PromoTicket) public promoTicket;

    //only lab
    function _dispenseTicket(string memory _promoEvent, address _recipient)
        public
        returns (uint256)
    {
        _ticketIds.increment();
        uint256 ticketId = _ticketIds.current();

        PromoTicket storage t = promoTicket[ticketId];
        t.ticketId = ticketId;
        t.promoEvent = _promoEvent;
        t.ticketOwner = _recipient;

        return ticketId;
    }

    //redeem ticket
}
