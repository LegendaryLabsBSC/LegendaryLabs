// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./workers/LegendsAuctioneer.sol";
import "../control/LegendsLaboratory.sol";
// import "../token/LegendToken.sol";
import "../legend/LegendsNFT.sol";
import "./listings/LegendAuction.sol";

// import "./listings/LegendMatchings.sol";

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
 * change lab. ... statements to be handled by the escrow?
 */

contract LegendsMarketplace is
    LegendAuction,
    // LegendMatchings,
    LegendsAuctioneer,
    // LegendsMarketAttendant,
    // IERC721Receiver,
    ReentrancyGuard
{
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    uint256 public marketplaceFee;

    address payable owner;
    LegendsLaboratory lab;

    // mapping(ListingType => mapping(uint256 => mapping(address => uint256)))
    //     public listingsEntered;

    //TODO: try to incorporate this pattern for indexing listings
    // enum ListingType {
    //     Sale,
    //     Auction,
    //     Match
    // }
    // mapping(ListingType => uint256) public _listingId;

    // event ListingStatusChanged(uint256 listingId, ListingStatus status);

    // bytes4 constant ERC721_RECEIVED = 0xf0b9e5ba;

    // function onERC721Received(
    //     address,
    //     address,
    //     uint256,
    //     bytes calldata
    // ) public pure override returns (bytes4) {
    //     return ERC721_RECEIVED;
    // }

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

    // function setMarketplaceFee(uint256 newFee) public onlyLab {
    //     marketplaceFee = newFee;
    // }

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

    function buyLegend(uint256 listingId) public payable nonReentrant {
        LegendListing memory l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        require(msg.value == l.price, "Incorrect price submitted for item");

        // uint256 laboratoryFee = (l.price * marketplaceFee) / 100;
        // TODO:  include royality payment logic
        // TODO: include Lab fee

        //TODO: allow condition for withdraw
        _asyncTransfer(l.seller, msg.value);
        // paymentOwed[saleId][s.seller] += msg.value;

        // legendsOwed[saleId][s]

        _buyLegend(listingId);

        _withdrawAllowed[listingId][l.seller] = true;

        // emit ListingStatusChanged(listingId, TradeStatus.Closed);
    }

    function cancelLegendSale(address nftContract, uint256 listingId)
        public
        payable
        nonReentrant
    {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Open);

        LegendsNFT(nftContract).transferFrom(
            address(this),
            l.seller,
            l.tokenId
        );
        _cancelLegendSale(listingId);

        // emit ListingStatusChanged(listingId, TradeStatus.Cancelled);
    }

    // TODO: take into account cancels

    //
    //
    //
    //

    function createLegendAuction(
        address nftContract,
        uint256 tokenId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantPrice
    ) public payable nonReentrant {
        LegendsNFT legendsNFT = LegendsNFT(nftContract);
        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(startingPrice > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);
        _createLegendAuction(
            nftContract,
            tokenId,
            duration,
            startingPrice,
            instantPrice
        );

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    function placeBid(uint256 listingId) public payable {
        AuctionDetails storage a = auctionDetails[listingId];
        LegendListing storage l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        require(!queryExpiration(listingId), "Auction has expired"); // test if  ..= is needed
        // require(msg.sender != a.seller, "Seller can not bid"); // disabled for testing
        if (a.bidders.length == 0) {
            require(msg.value >= a.startingPrice, "Minimum price not met");
        }

        uint256 newBid = bids[listingId][msg.sender].add(msg.value); // try without SM
        require(newBid > a.highestBid, "Bid must be higher than current bid"); // ! allowing same price bid

        // if bid is in last 10 minutes ..

        // // We're going to do this 'require' only if the auction has no
        // // bids yet.(zed)
        // if(auction.bidders.length == 0) {
        //     require(msg.value >= auction.minimum, "lowerBidThanMinimum");
        // } --TODO: Determine here after wednesday meeting ; ^ startingPrice

        bids[listingId][msg.sender] = newBid;
        // _asyncBid(listingId, l.seller, payable(msg.sender), newBid);
        _asyncTransfer(payable(msg.sender), newBid);

        // this might go up there ^189-193^
        // Allow previous highest bidder to reclaim or increase their bid  !! did we test this??
        _withdrawAllowed[listingId][a.highestBidder] = true; // make sure applied to previous highestbidder not new

        _placeBid(listingId, newBid);
        _withdrawAllowed[listingId][msg.sender] = false;

        // emit LogBid(msg.sender, newBid);
    }

    function closeAuction(uint256 listingId) public payable {
        require(queryExpiration(listingId), "Auction has not expired");
        LegendListing storage l = legendListing[listingId];

        require(
            msg.sender == l.seller ||
                msg.sender == auctionDetails[listingId].highestBidder,
            "Not authorized to close"
        );

        _closeAuction(listingId);
        _withdrawAllowed[listingId][l.seller] = true;
    }

    function withdrawFromAuction(uint256 listingId) external payable {
        LegendListing storage l = legendListing[listingId];
        require(l.status == ListingStatus.Open);
        // require not seller ??

        // make sure highest bidder cant withdraw

        withdrawPayments(listingId, payable(msg.sender)); // escrow not refunding

        bids[listingId][msg.sender] = 0;
        _withdrawAllowed[listingId][msg.sender] = false;
    }

    function claimLegend(uint256 listingId) external payable {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.buyer);
        require(l.status == ListingStatus.Closed);

        uint256 legendOwed = _legendOwed[listingId][l.buyer];
        require(legendOwed != 0);

        _legendOwed[listingId][l.buyer] = 0;

        LegendsNFT(l.nftContract).transferFrom(
            address(this),
            l.buyer,
            legendOwed
        );
    }

    function claimPayment(uint256 listingId) external payable {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Closed);

        //TODO: subtract fees
        uint256 amount;

        if (!l.isAuction) {
            amount = payments(l.seller);
        } else if (l.isAuction) {
            amount = payments(l.buyer);
        }

        require(amount != 0, "Address is owed 0");

        if (!l.isAuction) {
            withdrawPayments(listingId, l.seller);
        } else if (l.isAuction) {
            withdrawHighestBid(listingId, l.buyer, l.seller);
            _closeAuction(listingId);
            _withdrawAllowed[listingId][l.seller] = true;
        }
    }

    function fetchLegendListings()
        public
        view
        returns (LegendListing[] memory)
    {
        uint256 listingCount = _listingIds.current();
        uint256 openListingCount = _listingIds.current() -
            (_listingsClosed.current() + _listingsCancelled.current());
        uint256 currentIndex = 0;

        LegendListing[] memory listings = new LegendListing[](openListingCount);
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

    function fetchAuctionDetails()
        public
        view
        returns (AuctionDetails[] memory)
    {
        uint256 listingCount = _listingIds.current();
        uint256 openListingCount = _listingIds.current() -
            (_listingsClosed.current() + _listingsCancelled.current());
        uint256 currentIndex = 0;

        AuctionDetails[] memory auctions = new AuctionDetails[](
            openListingCount
        );
        for (uint256 i = 0; i < listingCount; i++) {
            if (legendListing[i + 1].buyer == address(0)) {
                if (legendListing[i + 1].isAuction) {
                    uint256 currentId = legendListing[i + 1].listingId;
                    AuctionDetails storage currentAuction = auctionDetails[
                        currentId
                    ];
                    auctions[currentIndex] = currentAuction;
                    currentIndex++;
                }
            }
        }
        return auctions;
    }

    // function fetchLegendListings(uint256 listingType)
    //     public
    //     view
    //     returns (uint256[] memory)
    // {
    //     uint256 listingCount;
    //     uint256 unsoldListingCount;
    //     uint256 currentId;

    //     // if (listingType == 0) {
    //         listingCount = _listingIds.current();
    //         unsoldListingCount =
    //             _listingIds.current() -
    //             (_listingsClosed.current() + _listingsCancelled.current());
    //     // } else if (listingType == 1) {
    //     //     listingCount = listingIds.current();
    //     //     unsoldListingCount =
    //     //         listingIds.current() -
    //     //         (_auctionsClosed.current() + _auctionsCancelled.current());
    //     // }
    //     uint256 currentIndex = 0;
    //     uint256[] memory listings = new uint256[](unsoldListingCount);

    //     for (uint256 i = 0; i < listingCount; i++) {
    //         // if (listingType == 0) {
    //             if (legendListing[i + 1].buyer == address(0)) {
    //                 currentId = legendListing[i + 1].listingId;
    //                 listings[currentIndex] = currentId;
    //                 currentIndex++;
    //             }
    //         // } else if (listingType == 1) {
    //         //     if (legendAuction[i + 1].status == ListingStatus.Open) {
    //         //         currentId = legendAuction[i + 1].auctionId;
    //         //         listings[currentIndex] = currentId;
    //         //         currentIndex++;
    //         //     }
    //         // }
    //     }
    //     return listings;
    // }

    // function claimLegend(uint256 listingId) external payable {
    //     LegendListing memory l = legendListing[listingId];
    //     // require(msg.sender == l.buyer, "bad1");
    //     // require(l.status == ListingStatus.Closed);

    //     uint256 legendOwed = _legendOwed[listingId][l.buyer]; // make sure this is now HB

    //     if (!l.isAuction) {
    //         require(msg.sender == l.buyer, "bad1");
    //         require(l.status == ListingStatus.Closed, "bad3");
    //         require(legendOwed != 0, "bad2");
    //     } else if (l.isAuction) {
    //         require(msg.sender == auctionDetails[listingId].highestBidder, "b");
    //         if (l.status == ListingStatus.Open) {
    //             _closeAuction(listingId);
    //             _withdrawAllowed[listingId][l.seller] = true;
    //         }
    //     }

    //     // require(legendOwed != 0, "bad2");

    //     _legendOwed[listingId][l.buyer] = 0;

    //     // require(l.status == ListingStatus.Closed, "bad3"); // test this out to make sure this even makes sense
    //     LegendsNFT(l.nftContract).transferFrom(
    //         address(this),
    //         l.buyer,
    //         legendOwed
    //     );
    // }

    // function claimPayment(uint256 listingId) external payable {
    //     LegendListing memory l = legendListing[listingId];
    //     require(msg.sender == l.seller, "bad4");
    //     // require(l.status == ListingStatus.Closed);

    //     //TODO: subtract fees
    //     uint256 amount;

    //     if (!l.isAuction) {
    //         require(l.status == ListingStatus.Closed, "bad5");
    //         amount = payments(l.seller);
    //     } else if (l.isAuction) {
    //         if (l.status == ListingStatus.Open) {
    //             _closeAuction(listingId);
    //             _withdrawAllowed[listingId][l.seller] = true;
    //         }
    //         // require(l.status == ListingStatus.Closed, "bad6");
    //         amount = payments(l.buyer);
    //     }

    //     // require(l.status == ListingStatus.Closed, "bad5");
    //     require(amount != 0, "Address is owed 0");

    //     if (!l.isAuction) {
    //         withdrawPayments(listingId, l.seller);
    //     } else if (l.isAuction) {
    //         withdrawHighestBid(listingId, l.buyer, l.seller);
    //     }
    // }

    // claimHighestBid(uint256 listingId) external payable {
    //           LegendListing memory l = legendListing[listingId];
    //     require(msg.sender == l.seller);
    //     require(l.status == ListingStatus.Closed);

    //     //TODO: subtract fees
    //     uint256 amount = payments(l.seller);
    //     require(amount != 0);

    //     withdrawPayments(listingId, payable(msg.sender));
    // }

    // // Debug function, not for production
    // function fetchData() public view returns (Counters.Counter[6] memory) {
    //     Counters.Counter[6] memory counts = [
    //         _saleIds,
    //         _salesClosed,
    //         _salesCancelled,
    //         _auctionIds,
    //         _auctionsClosed,
    //         _auctionsCancelled
    //     ];
    //     return (counts);
    // }

    // just worry about withdraw pattern rn ; make tri-operable later

    // function checkLegendsOwed(uint256 listingType)
    //     public
    //     view
    //     returns (uint256[] memory)
    // {
    //     uint256 listingCount;
    //     uint256 closedListingCount;
    //     uint256 currentId;

    //     if (listingType == 0) {
    //         listingCount = _saleIds.current();
    //         closedListingCount = _salesClosed.current();
    //     } // add auction compatibility

    //     uint256 currentIndex = 0;
    //     uint256[] memory legendsOwed = new uint256[](closedListingCount);

    //     for (uint256 i = 0; i < listingCount; i++) {
    //         if (listingType == 0) {
    //             if (legendSale[i + 1].buyer == msg.sender) {
    //                 currentId = legendSale[i + 1].tokenId;
    //                 legendsOwed[currentIndex] = currentId;
    //                 currentIndex++;
    //             }
    //         }
    //         // else if (listingType == 1) {
    //         //     if (legendMatching[i + 1].breeder == address(0)) {
    //         //         currentId = legendMatching[i + 1].matchId;
    //         //         legendsOwed[currentIndex] = currentId;
    //         //         currentIndex++;
    //         //     }
    //         // } //TODO: add auction compatibility
    //     }
    //     return legendsOwed;
    // }

    //TODO: Can not claim surrogate legend ; not coded yet ;; ? could combine with claim egg
}
