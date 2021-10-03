// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "../listings/LegendAuctions.sol";
import "../listings/LegendMatchings.sol";

abstract contract LegendsMarketAttendant is LegendAuctions, LegendMatchings {
    using Counters for Counters.Counter;

    // function fetchData() public view returns (Counters.Counter[9] memory) {
    //     Counters.Counter[9] memory counts = [
    //         _saleIds,
    //         _salesClosed,
    //         _salesCancelled,
    //         _matchIds,
    //         _matchingsClosed,
    //         _matchingsCancelled,
    //         _auctionIds,
    //         _auctionsClosed,
    //         _auctionsCancelled
    //     ];
    //     return (counts);
    // }

    function fetchLegendListings(uint256 listingType)
        public
        view
        returns (uint256[] memory)
    {
        uint256 listingCount;
        uint256 unsoldListingCount;
        uint256 currentId;

        if (listingType == 0) {
            listingCount = _saleIds.current();
            unsoldListingCount =
                _saleIds.current() -
                (_salesClosed.current() + _salesCancelled.current());
        } else if (listingType == 1) {
            listingCount = _matchIds.current();
            unsoldListingCount =
                _matchIds.current() -
                (_matchingsClosed.current() + _matchingsCancelled.current());
        } else if (listingType == 2) {
            listingCount = _auctionIds.current();
            unsoldListingCount =
                _auctionIds.current() -
                (_auctionsClosed.current() + _auctionsCancelled.current());
        }
        uint256 currentIndex = 0;
        uint256[] memory listings = new uint256[](unsoldListingCount);

        for (uint256 i = 0; i < listingCount; i++) {
            if (listingType == 0) {
                if (legendSale[i + 1].buyer == address(0)) {
                    currentId = legendSale[i + 1].saleId;
                    listings[currentIndex] = currentId;
                    currentIndex++;
                }
            } else if (listingType == 1) {
                if (legendMatching[i + 1].breeder == address(0)) {
                    currentId = legendMatching[i + 1].matchId;
                    listings[currentIndex] = currentId;
                    currentIndex++;
                }
            } else if (listingType == 2) {
                if (legendAuction[i + 1].status == ListingStatus.Open) {
                    currentId = legendAuction[i + 1].auctionId;
                    listings[currentIndex] = currentId;
                    currentIndex++;
                }
            }
        }
        return listings;
    }

    function checkLegendsOwed(uint256 listingType)
        public
        view
        returns (uint256[] memory)
    {
        uint256 listingCount;
        uint256 closedListingCount;
        uint256 currentId;

        if (listingType == 0) {
            listingCount = _saleIds.current();
            closedListingCount = _salesClosed.current();
        } else if (listingType == 1) {
            listingCount = _matchIds.current();
            closedListingCount = _matchingsClosed.current();
        } // add auction compatibility

        uint256 currentIndex = 0;
        uint256[] memory legendsOwed = new uint256[](closedListingCount);

        for (uint256 i = 0; i < listingCount; i++) {
            if (listingType == 0) {
                if (legendSale[i + 1].buyer == msg.sender) {
                    currentId = legendSale[i + 1].tokenId;
                    legendsOwed[currentIndex] = currentId;
                    currentIndex++;
                }
            }
            // else if (listingType == 1) {
            //     if (legendMatching[i + 1].breeder == address(0)) {
            //         currentId = legendMatching[i + 1].matchId;
            //         legendsOwed[currentIndex] = currentId;
            //         currentIndex++;
            //     }
            // } //TODO: add auction compatibility
        }
        return legendsOwed;
    }
}
