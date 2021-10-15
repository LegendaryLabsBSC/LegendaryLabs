// SPDX-License-Identifier: MIT

// tickets can still be redeemed after event is closed
import "../lab/LegendsLaboratory.sol";

pragma solidity ^0.8.4;

abstract contract TicketMachine {
    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab), "Not Lab");
        _;
    }

    struct PromoEvent {
        string promoName;
        uint256 maxTicketCount;
        bool isUnrestricted; // if unrestricted then one per
        bool promoClosed;
        mapping(address => bool) claimed;
    }

    mapping(string => PromoEvent) public promoEvent;

    /* promoName => recipient => ticketCount */
    mapping(string => mapping(address => uint256)) private promoTicket;

    function _createPromoEvent(
        string memory _name,
        uint256 _max,
        bool _isUnrestricted
    ) internal onlyLab {
        PromoEvent storage p = promoEvent[_name];
        p.promoName = _name;
        p.maxTicketCount = _max;
        p.isUnrestricted = _isUnrestricted;

        // emit
    }

    function _dispensePromoTicket(
        string memory _eventName,
        address _recipient,
        uint256 _ticketAmount
    ) internal {
        PromoEvent storage p = promoEvent[_eventName];
        require(!p.promoClosed, "Promo Closed");

        if (p.isUnrestricted == false) {
            require(msg.sender == address(lab));
        } else if (p.isUnrestricted == true) {
            require(p.claimed[_recipient] == false, "Promo already claimed");
            require(_ticketAmount == 1, "One ticket per address");
        }

        p.claimed[_recipient] = true;

        promoTicket[_eventName][_recipient] += _ticketAmount;
    }

    function _closePromoEvent(string memory _name) public {
        PromoEvent storage p = promoEvent[_name];
        require(!p.promoClosed, "Promo already closed");

        p.promoClosed = true;

        // emit
    }

    // //only lab
    // function _dispenseTicket(string memory _promoEvent, address _recipient)
    //     public
    //     returns (uint256)
    // {
    //     _ticketIds.increment();
    //     uint256 ticketId = _ticketIds.current();

    //     PromoTicket storage t = promoTicket[ticketId];
    //     t.ticketId = ticketId;
    //     t.promoEvent = _promoEvent;
    //     t.ticketOwner = _recipient;

    //     return ticketId;
    // }

    //redeem ticket
}
