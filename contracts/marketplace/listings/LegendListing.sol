// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

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

    function fetchLegendListing(uint256 listingId)
        external
        view
        returns (LegendListing memory);

    event ListingStatusChanged(uint256 indexed listingId, ListingStatus status);
    event TradeClaimed(uint256 indexed listingId, address indexed payee);
}
