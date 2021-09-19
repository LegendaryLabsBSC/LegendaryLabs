// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./LegendsLaboratory.sol";

/** TODO:
 * incorporate royalties
 * add auction functionality
 * let user toggle(enum) listing type
 * add offer functionality (linked with all legends page)
 * FE: sort by listing type
 */

contract LegendsMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;
    Counters.Counter private _itemsSold;

    uint256 public marketplaceFee;

    // address payable lab;

    LegendsLaboratory lab;
    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    constructor() {
        lab = LegendsLaboratory(msg.sender);
    }

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        marketplaceFee = newFee;
    }

    enum TradeStatus {
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
        TradeStatus status; // ? change to bool for simplicity
    }

    mapping(uint256 => LegendListing) public legendListing;

    event ListingStatusChanged(uint256 listingId, TradeStatus status);

    function createMarketListing(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(price > 0, "Price can not be 0");

        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        LegendListing memory l;
        l.listingId = listingId;
        l.nftContract = nftContract;
        l.tokenId = tokenId;
        l.seller = payable(msg.sender);
        l.buyer = payable(address(0));
        l.price = price;
        l.status = TradeStatus.Open;

        legendListing[listingId] = l;

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        emit ListingStatusChanged(listingId, TradeStatus.Open);
    }

    function buyMarketListing(address nftContract, uint256 listingId)
        public
        payable
        nonReentrant
    {
        LegendListing memory l = legendListing[listingId];
        uint price = l.price;
        require(l.status == TradeStatus.Open);
        require(msg.value == price, "Incorrect price submitted for item"); // replace with check owner has enough 

        uint256 laboratoryFee = (l.price * marketplaceFee) / 100;

        l.seller.transfer(msg.value);
        // TODO:  include royality payment logic
        // TODO: include Lab fee vv

        IERC721(nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            l.tokenId
        );

        l.buyer = payable(msg.sender);
        l.status = TradeStatus.Closed;

        _itemsSold.increment();
        // lab.transfer(marketplaceFee); //^^

        emit ListingStatusChanged(listingId, l.status);
    }

    function cancelMarketListing(uint256 listingId)
        public
        payable
        nonReentrant
    {
        // TODO: decide to pass on contract as parameter or not
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.seller);
        require(l.status == TradeStatus.Open);
        IERC721 legendsNFT = IERC721(l.nftContract); // ? change to match other, may be dependant of FE calling location
        legendsNFT.transferFrom(address(this), l.seller, l.tokenId);

        l.status = TradeStatus.Cancelled;
        emit ListingStatusChanged(listingId, l.status);
    }

    function fetchMarketListings()
        public
        view
        returns (LegendListing[] memory)
    {
        uint256 itemCount = _listingIds.current();
        uint256 unsoldItemCount = _listingIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        LegendListing[] memory items = new LegendListing[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (legendListing[i + 1].buyer == address(0)) {
                uint256 currentId = legendListing[i + 1].listingId;
                LegendListing storage currentItem = legendListing[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    // TODO: retool to show all legends user owns
    function fetchMyNFTs() public view returns (LegendListing[] memory) {
        uint256 totalItemCount = _listingIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (legendListing[i + 1].buyer == msg.sender) {
                itemCount += 1;
            }
        }

        LegendListing[] memory items = new LegendListing[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (legendListing[i + 1].buyer == msg.sender) {
                uint256 currentId = i + 1;
                LegendListing storage currentItem = legendListing[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // TODO: retool to show legends user has breed/"hatched"
    function fetchItemsCreated() public view returns (LegendListing[] memory) {
        uint256 totalItemCount = _listingIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (legendListing[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        LegendListing[] memory items = new LegendListing[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (legendListing[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                LegendListing storage currentItem = legendListing[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
