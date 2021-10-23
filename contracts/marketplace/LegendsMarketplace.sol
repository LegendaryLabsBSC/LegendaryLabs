// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../lab/LegendsLaboratory.sol";
import "./escrow/LegendsMarketClerk.sol";
import "./listings/LegendAuction.sol";

contract LegendsMarketplace is
    LegendAuction,
    LegendsMarketClerk,
    ReentrancyGuard
{
    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    // reeval _
    uint256 private _marketplaceFee = 2;
    uint256 private _royaltyFee = 2;

    constructor() {
        lab = LegendsLaboratory(payable(msg.sender));
    }

    function createLegendSale(
        address _nftContract,
        uint256 _legendId,
        uint256 _price
    ) external payable nonReentrant {
        IERC721 legendsNFT = IERC721(_nftContract);

        require(
            lab.fetchIsListable(_legendId)
            //, "Not eligible"
        );
        require(
            _price != 0
            //, "Price can not be 0"
        );

        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        _createLegendSale(_nftContract, _legendId, _price);
    }

    function buyLegend(uint256 _listingId) external payable nonReentrant {
        LegendListing memory l = legendListing[_listingId];

        require(l.status == ListingStatus.Open); // commented out for debugging
        require(
            msg.sender != l.seller
            //, "Seller can not buy"
        ); // commented out for debugging
        require(
            msg.value == l.price
            //, "Incorrect price submitted for item"
        ); // commented out for debugging

        // (
        //     uint256 marketplaceFee,
        //     uint256 royaltyFee,
        //     address payable legendCreator
        // ) = _calculateFees(_listingId);

        // _asyncTransfer(
        //     l.seller,
        //     msg.value,
        //     marketplaceFee,
        //     royaltyFee,
        //     legendCreator
        // );

        // bool sent =
         _transferPayment(_listingId, l.seller);

        // require(sent);

        _buyLegend(_listingId);

        _withdrawAllowed[_listingId][l.seller] = true;
    }

    function makeLegendOffer(address _nftContract, uint256 _legendId)
        external
        payable
        nonReentrant
    {
        IERC721 legendsNFT = IERC721(_nftContract);

        address legendOwner = legendsNFT.ownerOf(_legendId);

        require(msg.sender != legendOwner); // use if room
        require(lab.fetchIsHatched(_legendId), "Not eligible");
        require(msg.value > 0, "Price can not be 0");

        uint256 listingId = _makeLegendOffer(
            _nftContract,
            payable(legendOwner),
            _legendId
        );

        _withdrawAllowed[listingId][msg.sender] = false;

        _asyncTransferBid(listingId, msg.sender, msg.value);
    }

    function decideLegendOffer(uint256 _listingId, bool _isAccepted)
        external
        payable
        nonReentrant
    {
        LegendListing memory l = legendListing[_listingId];

        IERC721 legendsNFT = IERC721(l.nftContract);

        require(l.status == ListingStatus.Open);
        require(
            block.timestamp < offerDetails[_listingId].expirationTime,
            "Offer is expired"
        );
        require(
            legendsNFT.ownerOf(l.legendId) == msg.sender &&
                msg.sender == offerDetails[_listingId].legendOwner, // if token is traded before offer A/D ...
            "Not authorized"
        );

        if (_isAccepted) {
            legendsNFT.transferFrom(msg.sender, address(this), l.legendId);
        } else {
            /**
             * Token owner can also just let the offer expire
             * if they do not wish to pay gas to reject
             */
            _withdrawAllowed[_listingId][l.buyer] = true;
        }

        _decideLegendOffer(_listingId, _isAccepted);

        emit OfferDecided(_listingId, _isAccepted);
    }

    function createLegendAuction(
        address _nftContract,
        uint256 _legendId,
        uint256 _duration,
        uint256 _startingPrice,
        uint256 _instantPrice
    ) external payable nonReentrant {
        IERC721 legendsNFT = IERC721(_nftContract);

        // require(lab.fetchIsListable(_legendId), "Not eligible"); // commented out for debugging
        require(_startingPrice > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        _createLegendAuction(
            _nftContract,
            _legendId,
            _duration,
            _startingPrice,
            _instantPrice
        );
    }

    function placeBid(uint256 _listingId) external payable nonReentrant {
        LegendListing storage l = legendListing[_listingId];
        AuctionDetails storage a = auctionDetails[_listingId];

        require(l.status == ListingStatus.Open);
        require(!isExpired(_listingId), "Auction has expired");
        require(msg.sender != l.seller, "Can not bid");

        uint256 bidAmount = bids[_listingId][msg.sender] + msg.value;

        if (a.bidders.length == 0) {
            require(
                msg.value >= a.startingPrice,
                "Minimum price not met" // test for >= flaws
            );
        } else {
            require(
                bidAmount > auctionDetails[_listingId].highestBid,
                "Bid must be higher than current bid"
            );
        }

        _withdrawAllowed[_listingId][msg.sender] = false;

        _asyncTransferBid(_listingId, payable(msg.sender), msg.value);

        // Allow previous highest bidder to reclaim or increase their bid
        _withdrawAllowed[_listingId][a.highestBidder] = true;

        _placeBid(_listingId, bidAmount);

        if (a.isInstantBuy) {
            if (bidAmount >= instantBuyPrice[_listingId]) {
                _closeAuction(_listingId);
                _withdrawAllowed[_listingId][l.seller] = true;
            }
        }
    }

    function withdrawBid(uint256 _listingId) external payable nonReentrant {
        // require(msg.sender != legendListing[_listingId].seller); // make sure not needed

        if (legendListing[_listingId].isAuction) {
            bids[_listingId][msg.sender] = 0;
        }

        _withdrawBid(_listingId, payable(msg.sender)); // test this being here

        _withdrawAllowed[_listingId][msg.sender] = false;
    }

    function cancelLegendListing(uint256 _listingId) external nonReentrant {
        LegendListing memory l = legendListing[_listingId];

        require(l.status == ListingStatus.Open);

        if (l.isOffer) {
            require(msg.sender == l.buyer);
        } else {
            require(msg.sender == l.seller);
        }

        if (l.isAuction) {
            require(
                auctionDetails[_listingId].bidders.length == 0,
                "Bids already placed"
            );
        }

        if (l.isOffer) {
            _withdrawAllowed[_listingId][msg.sender] = true;
        } else {
            // thoroughly test and check gas cost, due to not using withdraw pattern
            IERC721(l.nftContract).transferFrom(
                address(this),
                l.seller,
                l.legendId
            );
        }

        _cancelLegendListing(_listingId);
    }

    function closeListing(uint256 _listingId) external payable nonReentrant {
        LegendListing storage l = legendListing[_listingId];
        AuctionDetails storage a = auctionDetails[_listingId];

        // no checks for if sale or offer are closed. What happens when seller tries to close before true close

        require(
            msg.sender == l.seller ||
                msg.sender == l.buyer ||
                msg.sender == a.highestBidder,
            "Not authorized to close"
        );

        if (l.isAuction) {
            if (l.status == ListingStatus.Open) {
                require(isExpired(_listingId), "Auction has not expired");

                _closeAuction(_listingId);
            }
        }

        if (l.isAuction || l.isOffer) {
            if (_withdrawAllowed[_listingId][l.seller] == false) {
                // cant be used ; after claim should be flipped back false

                _closeBid(_listingId, l.buyer); // make sure auction buyer set in time for call
                // bool sent =
                 _transferPayment(_listingId, l.seller);

                // require(sent);
                // (
                //     uint256 marketplaceFee,
                //     uint256 royaltyFee,
                //     address payable legendCreator
                // ) = _calculateFees(_listingId);

                // _asyncTransfer(
                //     l.seller,
                //     l.price, // make sure price set in time for call
                //     marketplaceFee,
                //     royaltyFee,
                //     legendCreator
                // );

                _withdrawAllowed[_listingId][l.seller] = true; // never flips false after claim
            }
        }

        if (msg.sender == l.seller) {
            _claimPayment(_listingId);
        } else if (msg.sender == l.buyer) {
            _claimLegend(_listingId);
        }

        emit PaymentClaimed(_listingId, msg.sender);
    }

    function claimRoyalties() external nonReentrant {
        uint256 amount = royalties(msg.sender);
        require(amount != 0, "Royalties are 0");

        _withdrawRoyalties(payable(msg.sender));
    }

    function _calculateFees(uint256 _listingId)
        public
        view
        returns (
            uint256,
            uint256,
            address payable
        )
    {
        LegendListing memory l = legendListing[_listingId];

        uint256 marketplaceFee = (l.price * _marketplaceFee) / 100; // this probably needs adjusting for eth price 0000s can probably do 2.5% is so

        address payable legendCreator = lab.fetchRoyaltyRecipient(l.legendId);

        uint256 royaltyFee;
        if (legendCreator != address(0)) {
            if (legendCreator != l.seller)
                if (legendCreator != l.buyer) {
                    // make sure this works with auction/highestBidder ; create a legend, sell, the win an auction for it ; should not receive royalties
                    royaltyFee = (l.price * _royaltyFee) / 100;
                }
        }

        return (marketplaceFee, royaltyFee, legendCreator);
    }

    function _transferPayment(uint256 _listingId, address payable _payee)
        internal
        // returns (bool)
    {
        (
            uint256 marketplaceFee,
            uint256 royaltyFee,
            address payable legendCreator
        ) = _calculateFees(_listingId);

        _asyncTransfer(
            _payee,
            msg.value,
            marketplaceFee,
            royaltyFee,
            legendCreator
        );

        // return true;
    }

    function _claimLegend(uint256 listingId) internal nonReentrant {
        LegendListing memory l = legendListing[listingId];

        require(msg.sender == l.buyer);
        require(l.status == ListingStatus.Closed);

        uint256 legendOwed = _legendOwed[listingId][l.buyer];
        require(legendOwed != 0);

        _legendOwed[listingId][l.buyer] = 0;

        IERC721(l.nftContract).transferFrom(address(this), l.buyer, legendOwed);
    }

    function _claimPayment(uint256 listingId) internal nonReentrant {
        LegendListing memory l = legendListing[listingId];

        require(msg.sender == l.seller);
        require(l.status == ListingStatus.Closed);

        // uint256 amount;

        // if (l.isAuction) {
        //     amount = payments(l.buyer);
        // } else if (!l.isAuction) {
        uint256 amount = payments(l.seller); // these getters could be cut and fetched directly if more space is needed in contract
        // }

        require(amount != 0, "Address is owed 0");

        _withdrawPayments(listingId, l.seller);
    }

    function fetchListingCounts()
        public
        view
        returns (Counters.Counter[3] memory)
    {
        Counters.Counter[3] memory counts = [
            _listingIds,
            _listingsClosed,
            _listingsCancelled
        ];

        return counts;
    }

    function fetchLegendListing(uint256 listingId)
        public
        view
        returns (LegendListing memory)
    {
        return legendListing[listingId];
    }

    //royalty fee setter ; move royalty handling to lab?
    //royalty on/off toggle / pauseable ?

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        _marketplaceFee = newFee;
    }
}
