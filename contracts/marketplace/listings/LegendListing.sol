// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILegendListing {
    enum ListingStatus {
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
        ListingStatus status;
    }
}
