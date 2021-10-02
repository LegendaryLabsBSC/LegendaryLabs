// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

//TODO: make function without implementation ** not neccesarily needed

abstract contract LegendSales {
    using Counters for Counters.Counter;
    Counters.Counter internal _saleIds;
    Counters.Counter internal _salesClosed;
    Counters.Counter internal _salesCancelled;

    mapping(uint256 => mapping(address => uint256)) internal _legendOwed;

    enum ListingStatus {
        Open,
        Closed,
        Cancelled
    }
    struct LegendSale {
        uint256 saleId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable buyer;
        uint256 price;
        ListingStatus status;
    }
    mapping(uint256 => LegendSale) public legendSale;

    function _createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) internal returns (uint256) {
        _saleIds.increment();
        uint256 saleId = _saleIds.current();

        LegendSale storage s = legendSale[saleId];
        s.saleId = saleId;
        s.nftContract = nftContract;
        s.tokenId = tokenId;
        s.seller = payable(msg.sender);
        s.buyer = payable(address(0));
        s.price = price;
        s.status = ListingStatus.Open;

        // emit ListingStatusChanged(saleId, ListingStatus.Open);

        return saleId;
    }

    function _buyLegend(uint256 saleId) internal {
        legendSale[saleId].buyer = payable(msg.sender);
        legendSale[saleId].status = ListingStatus.Closed;

        _legendOwed[saleId][payable(msg.sender)] = legendSale[saleId].tokenId;

        _salesClosed.increment();
    }

    function _cancelLegendSale(uint256 saleId) internal {
        legendSale[saleId].buyer = payable(msg.sender);
        legendSale[saleId].status = ListingStatus.Cancelled;

        _salesCancelled.increment();

        // emit ListingStatusChanged(saleId, SaleStatus.Cancelled);
    }
}
