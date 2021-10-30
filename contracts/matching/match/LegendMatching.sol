// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LegendMatch.sol";

abstract contract LegendMatching is ILegendMatch {
    using Counters for Counters.Counter;

    Counters.Counter internal _matchingIds;
    Counters.Counter internal _matchingsClosed;
    Counters.Counter internal _matchingsCancelled;

    /* matchingId => matchingDetails */
    mapping(uint256 => LegendMatching) internal _legendMatching;

    /* playerAddress => amount */
    mapping(address => uint256) internal _tokensPending;

    /* matchingId => playerAddress => childId */
    mapping(uint256 => mapping(address => uint256)) internal _eggPending;

    function _createLegendMatching(
        address _nftContract,
        uint256 _legendId,
        uint256 _price
    ) internal {
        _matchingIds.increment();
        uint256 matchingId = _matchingIds.current();

        LegendMatching storage m = _legendMatching[matchingId];
        m.matchingId = matchingId;
        m.createdAt = block.timestamp;
        m.nftContract = _nftContract;
        m.surrogate = msg.sender;
        m.surrogateToken = _legendId;
        m.breeder = address(0);
        m.price = _price;
        m.status = MatchingStatus.Open;

        emit MatchingStatusChanged(matchingId, MatchingStatus.Open);
    }

    function _matchWithLegend(
        uint256 _matchingId,
        address _breeder,
        uint256 _childId,
        uint256 _legendId,
        uint256 _matchingPayment
    ) internal {
        LegendMatching storage m = _legendMatching[_matchingId];

        m.breeder = _breeder;
        m.breederToken = _legendId;
        m.childId = _childId;
        m.status = MatchingStatus.Closed;

        _tokensPending[m.surrogate] += _matchingPayment;
        _eggPending[_matchingId][_breeder] = _childId;

        _matchingsClosed.increment();

        emit MatchMade(
            _matchingId,
            m.surrogateToken,
            m.breederToken,
            _childId,
            m.price,
            MatchingStatus.Closed
        );
    }

    function _cancelLegendMatching(uint256 _matchingId) internal {
        _legendMatching[_matchingId].status = MatchingStatus.Cancelled;

        _matchingsCancelled.increment();

        emit MatchingStatusChanged(_matchingId, MatchingStatus.Cancelled);
    }

    function fetchLegendMatching(uint256 _matchingId)
        public
        view
        virtual
        returns (LegendMatching memory)
    {}
}
