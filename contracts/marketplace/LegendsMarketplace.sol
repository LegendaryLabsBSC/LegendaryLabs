// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "../control/LegendsLaboratory.sol";
import "../legend/LegendsNFT.sol";
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
    LegendAuctions,
    LegendMatchings,
    ReentrancyGuard,
    PullPayment
{
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    uint256 public marketplaceFee;

    address payable owner;

    LegendsLaboratory lab;
    // RefundEscrow escrow;

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

    function claimPayment(uint256 saleId) external payable {
        LegendSale memory s = legendSale[saleId];
        require(msg.sender == s.seller);
        require(s.status == ListingStatus.Closed);

        // subtract fees
        uint256 amount = credits[saleId][s.seller];
        require(amount != 0);
        require(address(this).balance >= amount);

        credits[saleId][s.seller] = 0;

        payable(msg.sender).transfer(amount);

        // _claimPayment();
    }

    function claimLegends() external payable {}

    function claimTokens() external payable {}

    function createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(price > 0, "Price can not be 0");

        // escrow = new RefundEscrow(payable(msg.sender));

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendSale(nftContract, tokenId, price);

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function buyLegend(address nftContract, uint256 saleId)
        public
        payable
        nonReentrant
    {
        LegendSale memory s = legendSale[saleId];
        require(s.status == ListingStatus.Open);
        require(msg.value == s.price, "Incorrect price submitted for item");

        // uint256 laboratoryFee = (l.price * marketplaceFee) / 100;

        _asyncTransfer(s.seller, msg.value);

        // s.seller.transfer(msg.value);
        // TODO:  include royality payment logic
        // TODO: include Lab fee vv

        LegendsNFT(nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            s.tokenId
        );

        // escrow.close();

        _buyLegend(saleId);

        // emit ListingStatusChanged(listingId, TradeStatus.Closed);
    }

    function cancelLegendSale(address nftContract, uint256 saleId)
        public
        payable
        nonReentrant
    {
        LegendSale memory s = legendSale[saleId];
        require(msg.sender == s.seller);
        require(s.status == ListingStatus.Open);

        LegendsNFT(nftContract).transferFrom(
            address(this),
            s.seller,
            s.tokenId
        );
        _cancelLegendSale(saleId);

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
        require(m.status == ListingStatus.Open);

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
        require(m.status == ListingStatus.Open);

        LegendsNFT(nftContract).transferFrom(
            address(this),
            m.surrogate,
            m.surrogateToken
        );
        _cancelLegendMatching(matchId);

        // emit ListingStatusChanged(listingId, TradeStatus.Cancelled);
    }

    // Debug function, not for production
    function fetchData() public view returns (Counters.Counter[6] memory) {
        Counters.Counter[6] memory counts = [
            _saleIds,
            _salesClosed,
            _salesCancelled,
            _matchIds,
            _matchesClosed,
            _matchesCancelled
        ];
        return (counts);
    }

    function fetchLegendListings(uint256 listingType)
        public
        view
        virtual
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
                (_matchesClosed.current() + _matchesCancelled.current());
        } // add auction compatibility

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
            } //TODO: add auction compatibility
        }
        return listings;
    }

    function createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice
    )
        public
        payable
        // uint256 instantBuy
        nonReentrant
    {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(startingPrice > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendAuction(
            nftContract,
            tokenId,
            duration,
            startingPrice
            // instantBuy
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
    // uint256 newBid = a.bids[msg.sender].add(msg.value);
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
