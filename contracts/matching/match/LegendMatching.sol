// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LegendMatch.sol";

abstract contract LegendMatching is ILegendMatch {
    using Counters for Counters.Counter;

    modifier isValidMatching(uint256 matchingId) {
        require(matchingId >= _matchingIds.current(), 'Matching ID Not Valid');
        _;
    }

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
        address nftContract,
        uint256 legendId,
        uint256 price
    ) internal {
        _matchingIds.increment();
        uint256 matchingId = _matchingIds.current();

        LegendMatching storage m = _legendMatching[matchingId];
        m.matchingId = matchingId;
        m.createdAt = block.timestamp;
        m.nftContract = nftContract;
        m.surrogate = msg.sender;
        m.surrogateToken = legendId;
        m.breeder = address(0);
        m.price = price;
        m.status = MatchingStatus.Open;

        emit MatchingStatusChanged(matchingId, MatchingStatus.Open);
    }

    function _matchWithLegend(
        uint256 matchingId,
        address breeder,
        uint256 childId,
        uint256 legendId,
        uint256 matchingPayment
    ) internal {
        LegendMatching storage m = _legendMatching[matchingId];

        m.breeder = breeder;
        m.breederToken = legendId;
        m.childId = childId;
        m.status = MatchingStatus.Closed;

        _tokensPending[m.surrogate] += matchingPayment;
        _eggPending[matchingId][breeder] = childId;

        _matchingsClosed.increment();

        emit MatchMade(
            matchingId,
            m.surrogateToken,
            m.breederToken,
            childId,
            m.price,
            MatchingStatus.Closed
        );
    }

    function _cancelLegendMatching(uint256 matchingId) internal {
        _legendMatching[matchingId].status = MatchingStatus.Cancelled;

        _matchingsCancelled.increment();

        emit MatchingStatusChanged(matchingId, MatchingStatus.Cancelled);
    }

    function fetchMatchingCounts()
        public
        view
        virtual
        returns (
            Counters.Counter memory,
            Counters.Counter memory,
            Counters.Counter memory
        );

    function fetchTokensPending(address recipient)
        public
        view
        virtual
        returns (uint256);

    function fetchEggOwed(uint256 matchingId, address breeder)
        public
        view
        virtual
        returns (uint256);
}
