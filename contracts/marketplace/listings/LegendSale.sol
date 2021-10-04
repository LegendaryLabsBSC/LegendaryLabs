// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./LegendListing.sol";

//TODO: make function without implementation ** not neccesarily needed

abstract contract LegendSale is ILegendListing {
    using Counters for Counters.Counter;
    Counters.Counter internal _listingIds;
    Counters.Counter internal _listingsClosed;
    Counters.Counter internal _listingsCancelled;
    // mapping(string => Counters.Counter) internal _listingIds;
    // mapping(string => Counters.Counter) internal _listingsClosed;
    // mapping(string => Counters.Counter) internal _listingsCancelled;

    mapping(uint256 => mapping(address => uint256)) internal _legendOwed;

    mapping(uint256 => LegendListing) public legendListing;

    function _createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) internal returns (uint256) {
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

        // emit ListingStatusChanged(saleId, ListingStatus.Open);

        return _listingId;
    }

    // USE this method if it works entirely ; uses less contract size
    function _buyLegend(uint256 listingId) internal {
        LegendListing storage l = legendListing[listingId];
        l.buyer = payable(msg.sender);
        l.status = ListingStatus.Closed;

        _legendOwed[listingId][payable(msg.sender)] = l.tokenId;

        _listingsClosed.increment();
    }

    // function _buyLegend(uint256 saleId) internal {
    //     legendSale[saleId].buyer = payable(msg.sender);
    //     legendSale[saleId].status = ListingStatus.Closed;

    //     _legendOwed[saleId][payable(msg.sender)] = legendSale[saleId].tokenId;

    //     _salesClosed.increment();
    // }

    // Have no reworked cancellations yet to account for withdraw pattern
    function _cancelLegendSale(uint256 saleId) internal {
        legendListing[saleId].buyer = payable(msg.sender); // ? does this even make sense? keep 0 address ?
        legendListing[saleId].status = ListingStatus.Cancelled;

        _listingsCancelled.increment();

        // emit ListingStatusChanged(saleId, SaleStatus.Cancelled);
    }
}
