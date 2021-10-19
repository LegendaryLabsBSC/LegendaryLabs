// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface ILegendListing {
    enum ListingStatus {
        Null,
        Open,
        Closed,
        Cancelled
    }

    struct LegendListing {
        uint256 listingId;
        uint256 createdAt;
        address nftContract;
        uint256 legendId;
        address payable seller;
        address payable buyer;
        uint256 price;
        bool isAuction;
        bool isOffer;
        ListingStatus status;
    }

    event ListingStatusChanged(uint256 listingId, ListingStatus status);
    event PaymentClaimed(uint256 listingId, address payee);
}
