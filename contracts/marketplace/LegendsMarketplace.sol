// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../control/LegendsLaboratory.sol";
import "./LegendListings.sol";
import "./LegendAuctions.sol";
import "./LegendMatchings.sol";

/** TODO:
 * incorporate royalties
 * add auction functionality
 * let user toggle(enum) listing type
 * add offer functionality (linked with all legends page)
 * FE: sort by listing type
 * evaluate which requires can be moved into abstraction
 * evaulate not using inheritance - LegendListing listing ; listing.createLegendListing
 * reevaluate fetches
 */

contract LegendsMarketplace is
    LegendListings,
    LegendAuctions,
    LegendMatchings,
    ReentrancyGuard
{
    using SafeMath for uint256;

    uint256 public marketplaceFee;

    address payable owner;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        lab = LegendsLaboratory(msg.sender);
    }

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        marketplaceFee = newFee;
    }

    // event ListingStatusChanged(uint256 listingId, ListingStatus status);

    function createLegendListing(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(price > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendListing(nftContract, tokenId, price);

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function buyLegendListing(address nftContract, uint256 listingId)
        public
        payable
        nonReentrant
    {
        LegendListing memory l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        require(msg.value == l.price, "Incorrect price submitted for item");

        // uint256 laboratoryFee = (l.price * marketplaceFee) / 100;

        l.seller.transfer(msg.value);
        // TODO:  include royality payment logic
        // TODO: include Lab fee vv

        IERC721(nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            l.tokenId
        );

        _buyLegendListing(listingId);

        // emit ListingStatusChanged(listingId, TradeStatus.Closed);
    }

    function cancelLegendListing(address nftContract, uint256 listingId)
        public
        payable
        nonReentrant
    {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Open);

        IERC721(nftContract).transferFrom(address(this), l.seller, l.tokenId);
        _cancelLegendListing(listingId);

        // emit ListingStatusChanged(listingId, TradeStatus.Cancelled);
    }

    function createLegendMatching(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(price > 0, "Price can not be 0");
        //TODO: require legend is breedable - wait on NFT rework

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendMatching(nftContract, tokenId, price);

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function matchWithLegend(
        address nftContract,
        uint256 matchId,
        uint256 tokenId
    ) public nonReentrant {
        LegendMatching memory m = legendMatching[matchId];
        require(m.status == MatchingStatus.Open);

        uint256 laboratoryFee = (m.price * matchingPlatformFee) / 100;
        lab.legendToken().matchingBurn(msg.sender, laboratoryFee); // may because liqlock

        // transfer LGND token payment to surrogate token's owner
        lab.legendToken().transferFrom(
            msg.sender,
            m.surrogate,
            m.price - laboratoryFee
        );

        // transfer breeder's token to contract
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        // breed and send offspring to purchaser
        uint256 newItemId = legendsNFT.breed(
            msg.sender,
            m.surrogateToken,
            tokenId,
            false
        );
        _matchWithLegend(matchId, msg.sender, newItemId, tokenId);

        // return the surrogate & breeder tokens to the owners
        legendsNFT.safeTransferFrom(
            address(this),
            m.surrogate,
            m.surrogateToken
        );
        legendsNFT.safeTransferFrom(address(this), msg.sender, tokenId);

        // emit ListingStatusChanged(listingId, TradeStatus.Closed);
    }

    function cancelLegendMatching(address nftContract, uint256 matchId)
        public
        nonReentrant
    {
        LegendMatching memory m = legendMatching[matchId];
        require(msg.sender == m.surrogate);
        require(m.status == MatchingStatus.Open);

        LegendsNFT(nftContract).transferFrom(
            address(this),
            m.surrogate,
            m.surrogateToken
        );
        _cancelLegendMatching(matchId);

        // emit ListingStatusChanged(listingId, TradeStatus.Cancelled);
    }

    function createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantBuy
    ) public payable nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(startingPrice > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendAuction(
            nftContract,
            tokenId,
            duration,
            startingPrice,
            instantBuy
        );

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    // function bid(uint256 auctionId) public payable {
    //     LegendAuction storage a = legendAuction[auctionId];
    //     require(a.status == AuctionStatus.Open);
    //     require(msg.sender != a.seller, "Seller can not bid");
    //     if (a.bidders.length == 0) {
    //         require(msg.value >= a.startingPrice, "Minimum price not met");
    //     }
    //     uint256 newBid = a.bids[msg.sender].add(msg.value);
    //     require(newBid > a.maxBid, "Bid must be higher than current bid");

    //     _bid(auctionId, newBid);

    // a.bids[msg.sender] = newBid;

    // if (!a.exists[msg.sender]) {
    //     a.bidders.push(msg.sender);
    //     a.exists[msg.sender] = true;

    //     // // Adds to the auctions where the user is participating
    //     // auctionsParticipating[msg.sender].push(_auctionId);
    // }

    // a.maxBid = newBid;
    // a.maxBidder = msg.sender;

    // emit LogBid(msg.sender, newBid);
    // }

    // function fetchLegendAuctions(uint256 auctionId)
    //     public
    //     view
    //     returns (LegendAuction calldata)
    // {
    //     return legendAuction[auctionId];
    //     // LegendAuction storage auctions = _fetchLegendAuctions();
    //     // return auctions;
    // }
}
