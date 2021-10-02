// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "../control/LegendsLaboratory.sol";
import "../token/LegendToken.sol";
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
 * can not buy,bid,match, with own listing
 * add require error messages
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

    // mapping(ListingType => mapping(uint256 => mapping(address => uint256)))
    //     public listingsEntered;

    // event ListingStatusChanged(uint256 listingId, ListingStatus status);

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    // struct LegendListing {
    //     LegendSale _sale;
    //     LegendMatching _match;
    //     LegendAuctions _auction;
    // }
    // mapping(uint256 => LegendListing) public legendListing;

    constructor() {
        owner = payable(msg.sender);
        lab = LegendsLaboratory(msg.sender);
    }

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        marketplaceFee = newFee;
    }

    // just worry about withdraw pattern rn ; make tri-operable later
    function claimPayment(uint256 listingId) external payable {
        // if (listingType == 0) {
        //     LegendSale memory l = legendSale[listingId];
        // } else if (listingType == 1) {
        //     LegendMatching memory l = legendMatching[listingId];
        // } else if (listingType == 2) {
        //     LegendMatching memory l = legendAuction[listingId];
        // }

        LegendSale memory l = legendSale[listingId];
        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Closed);

        //TODO: subtract fees
        uint256 amount = payments(l.seller);
        require(amount != 0);

        withdrawPayments(payable(msg.sender));
    }

    // function checkLegendsOwed() public view returns () {}

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

    //TODO: Can not claim surrogate legend ; not coded yet
    function claimLegend(uint256 listingId) external payable {
        LegendSale memory l = legendSale[listingId];
        require(msg.sender == l.buyer);
        require(l.status == ListingStatus.Closed);

        uint256 legendOwed = _legendOwed[listingId][l.buyer];
        require(legendOwed != 0);

        _legendOwed[listingId][l.buyer] = 0;

        lab.legendsNFT().safeTransferFrom(address(this), l.buyer, legendOwed);
    }

    function checkTokensOwed(uint256 matchId) public view returns (uint256) {
        uint256 tokensOwed = _tokensOwed[matchId][msg.sender];
        return tokensOwed;
    }

    function claimTokens(uint256 matchingId) external payable {
        LegendMatching memory m = legendMatching[matchingId];
        require(msg.sender == m.surrogate);
        require(m.status == ListingStatus.Closed);

        uint256 tokensOwed = _tokensOwed[matchingId][m.surrogate];
        require(tokensOwed != 0);

        _tokensOwed[matchingId][m.surrogate] = 0;

        //TODO: add security and/or modifier
        // LegendToken(tokenContract).transfer(m.surrogate, tokensOwed);
        lab.legendToken().transfer(m.surrogate, tokensOwed);
    }

    function claimEgg(uint256 matchingId) external payable {
        LegendMatching memory m = legendMatching[matchingId];
        require(msg.sender == m.breeder);
        require(m.status == ListingStatus.Closed);

        uint256 eggOwed = _eggOwed[matchingId][m.breeder];
        require(eggOwed != 0);

        _eggOwed[matchingId][m.breeder] = 0;

        //TODO: add security and/or modifier
        lab.legendsNFT().safeTransferFrom(address(this), m.breeder, eggOwed);
    }

    function withdrawFromMatching(uint256 matchingId) external payable {
        LegendMatching memory m = legendMatching[matchingId];
        require(msg.sender == m.surrogate);
        require(m.status == ListingStatus.Closed);

        uint256 canWithdraw = _legendOwed[matchingId][m.surrogate];
        require(canWithdraw != 0); 

        _legendOwed[matchingId][m.surrogate] = 0;

        //TODO: add security and/or modifier
        lab.legendsNFT().safeTransferFrom(
            address(this),
            m.surrogate,
            canWithdraw
        );
    }

    function relistInMatching(uint256 matchingId)
        external
        payable
    {
        LegendMatching memory m = legendMatching[matchingId];
        require(msg.sender == m.surrogate, "bad1");
        require(m.status == ListingStatus.Closed, "bad2");

        _createLegendMatching(m.nftContract, m.surrogateToken, m.price);

        // uint256 canWithdraw = _legendOwed[matchingId][m.surrogate];
        // require(canWithdraw != 0);

        // _legendOwed[matchingId][m.surrogate] = 0;

        //TODO: add security and/or modifier
        // lab.legendsNFT().safeTransferFrom(
        //     address(this),
        //     m.surrogate,
        //     canWithdraw
        // );
    }

    // claim royalties -- weekend

    // for surrogate account removing legend from matching market ; TODO: take into account cancels
    function removeLegend() external payable {}

    function createLegendSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract); // ? can use lab for these
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(price > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendSale(nftContract, tokenId, price);

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function buyLegend(uint256 saleId) public payable nonReentrant {
        LegendSale memory s = legendSale[saleId];
        require(s.status == ListingStatus.Open);
        require(msg.value == s.price, "Incorrect price submitted for item");

        // uint256 laboratoryFee = (l.price * marketplaceFee) / 100;
        // TODO:  include royality payment logic
        // TODO: include Lab fee

        _asyncTransfer(s.seller, msg.value);
        // paymentOwed[saleId][s.seller] += msg.value;

        // legendsOwed[saleId][s]

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
        lab.legendToken().matchingBurn(msg.sender, laboratoryFee); // may become liqlock

        uint256 tokensOwed = m.price - laboratoryFee;
        // transfer LGND token payment to escrow
        lab.legendToken().transferFrom(msg.sender, address(this), tokensOwed);

        // transfer breeder's token to contract
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        // breed and send offspring to purchaser ;; change for withdraw pattern
        uint256 newItemId = legendsNFT.breed(
            // msg.sender,
            address(this),
            m.surrogateToken,
            tokenId,
            false
        );
        _matchWithLegend(matchId, msg.sender, newItemId, tokenId, tokensOwed);

        // return the surrogate & breeder tokens to the owners
        // legendsNFT.safeTransferFrom(
        //     address(this),
        //     m.surrogate,
        //     m.surrogateToken
        // );
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
            _matchingsClosed,
            _matchingsCancelled
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
                (_matchingsClosed.current() + _matchingsCancelled.current());
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
