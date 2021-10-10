// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendMatch {
    event MatchingStatusChanged(uint256 matchingId, MatchingStatus status);
    event MatchMade(uint256 matchingId, uint256 childId, MatchingStatus status);

    enum MatchingStatus {
        Null,
        Open,
        Closed,
        Cancelled
    }
    struct LegendMatching {
        uint256 matchingId;
        uint256 createdAt;
        address nftContract;
        uint256 surrogateToken;
        address surrogate;
        address breeder;
        uint256 breederToken;
        uint256 childId;
        uint256 price;
        MatchingStatus status;
    }
}
