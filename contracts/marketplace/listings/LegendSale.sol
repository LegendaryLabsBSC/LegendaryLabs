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
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) internal {
        _listingIds.increment();
        uint256 _listingId = _listingIds.current();

        LegendListing storage l = legendListing[_listingId];
        l.listingId = _listingId;
        l.nftContract = _nftContract;
        l.tokenId = _tokenId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.price = _price;
        l.status = ListingStatus.Open;

        emit ListingStatusChanged(_listingId, ListingStatus.Open);
    }

    function _buyLegend(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.buyer = payable(msg.sender);
        l.status = ListingStatus.Closed;

        _legendOwed[_listingId][payable(msg.sender)] = l.tokenId;

        _listingsClosed.increment();

        emit ListingStatusChanged(_listingId, ListingStatus.Closed);
    }

    function _cancelLegendListing(uint256 _listingId) internal {
        LegendListing storage l = legendListing[_listingId];

        l.status = ListingStatus.Cancelled;

        // _legendOwed[listingId][l.seller] = l.tokenId; // see parent comment

        _listingsCancelled.increment();

        emit ListingStatusChanged(_listingId, ListingStatus.Cancelled);
    }
}
