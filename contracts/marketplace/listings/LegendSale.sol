// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LegendListing.sol";

abstract contract LegendSale is ILegendListing {
    using Counters for Counters.Counter;
    Counters.Counter internal _listingIds;
    Counters.Counter internal _listingsClosed;
    Counters.Counter internal _listingsCancelled;

    mapping(uint256 => LegendListing) public legendListing;
    mapping(uint256 => mapping(address => uint256)) internal _legendOwed;

    function _createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) internal {
        _listingIds.increment();
        uint256 _listingId = _listingIds.current();

        LegendListing storage l = legendListing[_listingId];
        l.listingId = _listingId;
        l.nftContract = nftContract;
        l.tokenId = tokenId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.price = price;
        l.isAuction = false;
        l.status = ListingStatus.Open;

        emit ListingStatusChanged(_listingId, ListingStatus.Open);
    }

    function _buyLegend(uint256 listingId) internal {
        LegendListing storage l = legendListing[listingId];
        l.buyer = payable(msg.sender);
        l.status = ListingStatus.Closed;

        _legendOwed[listingId][payable(msg.sender)] = l.tokenId;

        _listingsClosed.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Closed); // try with l.status, on all
    }

    function _cancelLegendListing(uint256 listingId) internal {
        LegendListing storage l = legendListing[listingId];

        l.status = ListingStatus.Cancelled;

        // _legendOwed[listingId][l.seller] = l.tokenId; // see parent comment

        _listingsCancelled.increment();

        emit ListingStatusChanged(listingId, ListingStatus.Cancelled);
    }
}
