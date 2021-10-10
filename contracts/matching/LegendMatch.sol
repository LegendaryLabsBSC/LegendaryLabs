// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendMatch {
    // event ListingStatusChanged(uint256 listingId, ListingStatus status);
    // event PaymentClaimed(uint256 listingId, address payee);

    enum MatchingStatus {
        Null,
        Open,
        Closed,
        Cancelled
    }
    struct LegendMatching {
        uint256 matchId;
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
