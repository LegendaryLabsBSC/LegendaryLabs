// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//TODO: make function without implementation

abstract contract LegendListings {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;
    Counters.Counter private _listingsClosed;
    Counters.Counter private _listingsCancelled;

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
        ListingStatus status;
    }

    mapping(uint256 => LegendListing) public legendListing; // look more into private/internal

    function _createLegendListing(
        address nftContract,
        uint256 tokenId,
        uint256 price // uint256 listingId
    ) internal {
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        LegendListing storage l = legendListing[listingId];
        l.listingId = listingId;
        l.nftContract = nftContract;
        l.tokenId = tokenId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.price = price;
        l.status = ListingStatus.Open;

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function _buyLegendListing(uint256 listingId) internal {
        legendListing[listingId].buyer = payable(msg.sender);
        legendListing[listingId].status = ListingStatus.Closed;

        _listingsClosed.increment();
    }

    function _cancelLegendListing(uint256 listingId) internal {
        // LegendListing memory l = legendListing[listingId];
        // require(msg.sender == l.seller);
        // require(l.status == ListingStatus.Open);

        // IERC721(nftContract).transferFrom(address(this), l.seller, l.tokenId);
        legendListing[listingId].buyer = payable(msg.sender);
        legendListing[listingId].status = ListingStatus.Cancelled;

        _listingsCancelled.increment();

        // emit ListingStatusChanged(listingId, ListingStatus.Cancelled);
    }

    function fetchLegendListings()
        public
        view
        virtual
        returns (LegendListing[] memory)
    {
        uint256 listingCount = _listingIds.current();
        uint256 unsoldListingCount = _listingIds.current() -
            (_listingsClosed.current() + _listingsCancelled.current());
        uint256 currentIndex = 0;

        LegendListing[] memory listings = new LegendListing[](
            unsoldListingCount
        );
        for (uint256 i = 0; i < listingCount; i++) {
            if (legendListing[i + 1].buyer == address(0)) {
                uint256 currentId = legendListing[i + 1].listingId;
                LegendListing storage currentListing = legendListing[currentId];
                listings[currentIndex] = currentListing;
                currentIndex++;
            }
        }
        return listings;
    }
}
