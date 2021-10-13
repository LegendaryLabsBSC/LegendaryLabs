// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import ".//LegendMatch.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract LegendMatching is ILegendMatch {
    using Counters for Counters.Counter;

    Counters.Counter internal _matchingIds;
    Counters.Counter internal _matchingsClosed;
    Counters.Counter internal _matchingsCancelled;

    mapping(uint256 => LegendMatching) public legendMatching;

    mapping(address => uint256) internal _tokensOwed;
    mapping(uint256 => mapping(address => uint256)) internal _eggOwed;

    function _createLegendMatching(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) internal {
        _matchingIds.increment();
        uint256 matchingId = _matchingIds.current();

        LegendMatching storage m = legendMatching[matchingId];
        m.matchingId = matchingId;
        m.createdAt = block.timestamp;
        m.nftContract = _nftContract;
        m.surrogateToken = _tokenId;
        m.surrogate = msg.sender;
        m.breeder = address(0);
        m.price = _price;
        m.status = MatchingStatus.Open;

        emit MatchingStatusChanged(matchingId, MatchingStatus.Open);
    }

    function _matchWithLegend(
        uint256 _matchingId,
        address _breeder,
        uint256 _childId,
        uint256 _tokenId,
        uint256 _matchingPayment
    ) internal {
        LegendMatching storage m = legendMatching[_matchingId];

        m.breeder = _breeder;
        m.breederToken = _tokenId;
        m.childId = _childId;
        m.status = MatchingStatus.Closed;

        _tokensOwed[m.surrogate] += _matchingPayment;
        _eggOwed[_matchingId][_breeder] = _childId;

        _matchingsClosed.increment();

        emit MatchMade(_matchingId, _childId, MatchingStatus.Closed);
    }

    function _cancelLegendMatching(uint256 _matchingId) internal {
        legendMatching[_matchingId].status = MatchingStatus.Cancelled;

        _matchingsCancelled.increment();

        emit MatchingStatusChanged(_matchingId, MatchingStatus.Cancelled);
    }
}
