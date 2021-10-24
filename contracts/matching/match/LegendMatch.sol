// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface ILegendMatch {
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
        address surrogate;
        uint256 surrogateToken;
        address breeder;
        uint256 breederToken;
        uint256 childId;
        uint256 price;
        MatchingStatus status;
    }

    event MatchingStatusChanged(uint256 matchingId, MatchingStatus status);
    event MatchMade(
        uint256 matchingId,
        uint256 childId,
        uint256 price,
        MatchingStatus status
    );
}
