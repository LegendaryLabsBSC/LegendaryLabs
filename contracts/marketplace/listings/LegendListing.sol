// SPDX-License-Identifier: MIT



pragma solidity ^0.8.0;

interface ILegendListing {
    event ListingStatusChanged(uint256 listingId, ListingStatus status);
    event PaymentClaimed(uint256 listingId, address payee);

    enum ListingStatus {
        Null,
        Open,
        Closed,
        Cancelled
    }
    struct LegendListing {
        uint256 listingId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable buyer;
        uint256 price;
        bool isAuction;
        bool isOffer;
        ListingStatus status;
    }
}
