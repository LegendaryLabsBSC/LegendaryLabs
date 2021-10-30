// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

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
    LegendsLaboratory _lab;

    modifier onlyLab() {
        require(msg.sender == address(_lab));
        _;
    }

    uint256 private _royaltyFee = 2;
    uint256 private _marketplaceFee = 2;

    /* listingId => isPaymentTransferred */
    mapping(uint256 => bool) private _paymentTransferred;

    constructor() {
        _lab = LegendsLaboratory(payable(msg.sender));
    }

    function createLegendSale(
        address nftContract,
        uint256 legendId,
        uint256 price
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);

        // require(_lab.isListable(legendId), "Not eligible"); // commented out for testing
        require(
            price != 0
            //, "Price can not be 0"
        );

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        _createLegendSale(nftContract, legendId, price);
    }

    function buyLegend(uint256 listingId) external payable nonReentrant {
        LegendListing memory l = _legendListing[listingId];

        require(
            l.status == ListingStatus.Open
            // , "Listing Closed"
        );
        require(
            msg.sender != l.seller
            // , "Seller can not buy"
        );
        require(
            msg.value == l.price
            // , "Incorrect price submitted for item"
        );

        _transferPayment(listingId, l.seller);

        _buyLegend(listingId);
    }

    function makeLegendOffer(address nftContract, uint256 legendId)
        external
        payable
        nonReentrant
    {
        IERC721 legendsNFT = IERC721(nftContract);

        address legendOwner = legendsNFT.ownerOf(legendId);

        require(
            msg.sender != legendOwner
            // , "Already Owned"
        );
        // require(_lab.isHatched(legendId), "Not eligible"); // commented out for testing
        require(
            msg.value > 0
            // , "Price can not be 0"
        );

        uint256 listingId = _makeLegendOffer(
            nftContract,
            payable(legendOwner),
            legendId
        );

        _canWithdrawBid[listingId][msg.sender] = false;

        _asyncTransferBid(listingId, msg.sender, msg.value);
    }

    function decideLegendOffer(uint256 listingId, bool isAccepted)
        external
        nonReentrant
    {
        // test owner with multiple offers for same legend ; make sure cant accept both
        LegendListing memory l = _legendListing[listingId];

        IERC721 legendsNFT = IERC721(l.nftContract);

        require(
            l.status == ListingStatus.Open
            // , "Listing Closed"
        );
        require(
            block.timestamp < _offerDetails[listingId].expirationTime
            // "Offer is expired"
        );
        require(
            msg.sender == legendsNFT.ownerOf(l.legendId) &&
                msg.sender == _offerDetails[listingId].legendOwner // If token is traded before offer A/D ...
            // "Not authorized"
        );

        _decideLegendOffer(listingId, isAccepted);

        if (isAccepted) {
            legendsNFT.transferFrom(msg.sender, address(this), l.legendId);
        } else {
            /**
             * Token owner can also just let the offer expire
             * if they do not wish to pay gas to reject
             */
            _canWithdrawBid[listingId][l.buyer] = true;
        }
    }

    function createLegendAuction(
        address nftContract,
        uint256 legendId,
        uint256 duration,
        uint256 startingPrice,
        uint256 instantPrice
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);

        // require(_lab.isListable(legendId), "Not eligible"); // commented out for testing
        require(
            startingPrice > 0
            // , "Price can not be 0"
        );
        require(
            instantPrice > startingPrice
            // , "Price can not be 0"
        );

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        _createLegendAuction(
            nftContract,
            legendId,
            duration,
            startingPrice,
            instantPrice
        );
    }

    function placeBid(uint256 listingId) external payable nonReentrant {
        LegendListing storage l = _legendListing[listingId]; // memory uses significant more contract space; check gas usage between memory vs storage
        AuctionDetails storage a = _auctionDetails[listingId];

        require(
            l.status == ListingStatus.Open
            // , "Listing Closed"
        );
        require(
            !isExpired(listingId)
            // , "Auction has expired"
        );
        require(
            msg.sender != l.seller
            // , "Can not bid"
        );

        uint256 bidAmount = _bidPlaced[listingId][msg.sender] + msg.value;

        if (_bidders[listingId].length == 0) {
            require(
                msg.value >= a.startingPrice,
                "Minimum price not met" // test for >= flaws
            );
        } else {
            require(
                bidAmount > _auctionDetails[listingId].highestBid,
                "Bid must be higher than current bid"
            );
        }

        _canWithdrawBid[listingId][msg.sender] = false;

        _asyncTransferBid(listingId, payable(msg.sender), msg.value);

        _canWithdrawBid[listingId][a.highestBidder] = true;

        _placeBid(listingId, bidAmount);

        if (a.isInstantBuy) {
            if (bidAmount >= _instantBuyPrice[listingId]) {
                _closeAuction(listingId);
            }
        }
    }

    function withdrawBid(uint256 listingId) external payable nonReentrant {
        // require(msg.sender != _legendListing[listingId].seller); // make sure not needed

        if (_legendListing[listingId].isAuction) {
            _bidPlaced[listingId][msg.sender] = 0;
        }

        _withdrawBid(listingId, payable(msg.sender)); // test this being here

        _canWithdrawBid[listingId][msg.sender] = false;
    }

    function cancelLegendListing(uint256 listingId) external nonReentrant {
        LegendListing memory l = _legendListing[listingId];

        require(l.status == ListingStatus.Open);

        if (l.isOffer) {
            require(msg.sender == l.buyer);
        } else {
            require(msg.sender == l.seller);
        }

        if (l.isAuction) {
            require(_bidders[listingId].length == 0, "Bids already placed");
        }

        _cancelLegendListing(listingId);

        if (l.isOffer) {
            _canWithdrawBid[listingId][msg.sender] = true;
        } else {
            // thoroughly test and check gas cost, due to not using withdraw pattern
            IERC721(l.nftContract).transferFrom(
                address(this),
                l.seller,
                l.legendId
            );
        }
    }

    function closeListing(uint256 listingId) external payable nonReentrant {
        LegendListing storage l = _legendListing[listingId]; // memory uses significant more contract space; check gas usage between memory vs storage
        AuctionDetails storage a = _auctionDetails[listingId];

        require(
            msg.sender == l.seller ||
                msg.sender == l.buyer ||
                msg.sender == a.highestBidder,
            "Not authorized to close"
        );

        if (l.isAuction) {
            if (l.status == ListingStatus.Open) {
                require(isExpired(listingId), "Auction has not expired");

                _closeAuction(listingId);
            }
        } else {
            require(l.status == ListingStatus.Closed, "Listing Open");
        }

        if (l.isAuction || l.isOffer) {
            if (_paymentTransferred[listingId] == false) {
                _paymentTransferred[listingId] = true;

                _closeBid(listingId, l.buyer); // make sure auction buyer set in time for call

                _transferPayment(listingId, l.seller); // !! reeval this and what calls it ; how does this work for bids/auctions ?
            }
        }

        if (msg.sender == l.seller) {
            _claimPayment(listingId);
        } else if (msg.sender == l.buyer) {
            _claimLegend(listingId);
        }

        emit TradeClaimed(listingId, msg.sender);
    }

    function collectRoyalties() external payable nonReentrant {
        uint256 amount = accruedRoyalties(msg.sender);
        require(amount != 0, "Royalties are 0");


        _withdrawRoyalties(payable(msg.sender));
    }

    function _transferPayment(uint256 listingId, address payable payee)
        internal
    {
        (
            uint256 marketplaceFee,
            address payable legendCreator,
            uint256 royaltyFee
        ) = _calculateFees(listingId);

        _asyncTransfer(
            payee,
            msg.value,
            marketplaceFee,
            royaltyFee,
            legendCreator
        );
    }

    function _claimLegend(uint256 listingId) internal nonReentrant {
        LegendListing memory l = _legendListing[listingId];

        uint256 legendOwed = _legendPending[listingId][l.buyer];
        require(legendOwed != 0, "No Legend Owed"); // make sure can not do again without paying gas to see error

        _legendPending[listingId][l.buyer] = 0;

        IERC721(l.nftContract).transferFrom(address(this), l.buyer, legendOwed);
    }

    function _claimPayment(uint256 _listingId) internal nonReentrant {
        LegendListing memory l = _legendListing[_listingId];

        uint256 amount = payments(l.seller);
        require(amount != 0, "Address is owed 0"); // make sure can not do again without paying gas to see error

        _withdrawPayments(l.seller);
    }

    function _calculateFees(uint256 listingId)
        public
        view
        returns (
            uint256,
            address payable,
            uint256
        )
    {
        LegendListing memory l = _legendListing[listingId];

        uint256 marketplaceFee = (l.price * _marketplaceFee) / 100; // this probably needs adjusting for eth price 0000s can probably do 2.5% is so

        address payable legendCreator = _lab.fetchRoyaltyRecipient(l.legendId);

        uint256 royaltyFee;
        if (legendCreator != address(0)) {
            if (legendCreator != l.seller)
                if (legendCreator != l.buyer) {
                    // make sure this works with auction/highestBidder ; create a legend, sell, the win an auction for it ; should not receive royalties
                    royaltyFee = (l.price * _royaltyFee) / 100; // this probably needs adjusting for eth price 0000s
                }
        }

        return (marketplaceFee, legendCreator, royaltyFee);
    }

    function fetchListingCounts()
        public
        view
        returns (
            Counters.Counter memory,
            Counters.Counter memory,
            Counters.Counter memory
        )
    {
        return (_listingIds, _listingsClosed, _listingsCancelled);
    }

    function fetchLegendListing(uint256 listingId)
        public
        view
        virtual
        override
        returns (LegendListing memory)
    {
        // add require messages if room, for all 3 v v
        require(isValidListing(listingId));

        return _legendListing[listingId];
    }

    function fetchOfferDetails(uint256 listingId)
        public
        view
        virtual
        override
        returns (OfferDetails memory)
    {
        require(_legendListing[listingId].isOffer);

        return _offerDetails[listingId];
    }

    function fetchAuctionDurations()
        public
        view
        virtual
        override
        returns (uint256[3] memory)
    {
        return _auctionDurations;
    }

    function fetchAuctionDetails(uint256 listingId)
        public
        view
        virtual
        override
        returns (AuctionDetails memory)
    {
        require(_legendListing[listingId].isAuction);

        return _auctionDetails[listingId];
    }

    function fetchInstantBuyPrice(uint256 listingId)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(_auctionDetails[listingId].isInstantBuy);

        return _instantBuyPrice[listingId];
    }

    function fetchBidders(uint256 listingId)
        public
        view
        virtual
        override
        returns (address[] memory)
    {
        require(isValidListing(listingId));

        return _bidders[listingId];
    }

    function fetchBidPlaced(uint256 listingId, address bidder)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(_exists[listingId][bidder]);

        return _bidPlaced[listingId][bidder];
    }

    function fetchMarketplaceRules()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (_royaltyFee, _marketplaceFee, _offerDuration, _auctionExtension);
    }

    function setRoyaltyFee(uint256 newRoyaltyFee) public onlyLab {
        _royaltyFee = newRoyaltyFee;
    }

    function setMarketplaceFee(uint256 newMarketplaceFee) public onlyLab {
        _marketplaceFee = newMarketplaceFee;
    }

    function setOfferDuration(uint256 newOfferDuration) public onlyLab {
        _offerDuration = newOfferDuration;
    }

    function setAuctionDurations(uint256[3] calldata newAuctionDurations)
        public
        onlyLab
    {
        _auctionDurations = newAuctionDurations;
    }

    function setAuctionExtension(uint256 newAuctionExtension) public onlyLab {
        _auctionExtension = newAuctionExtension;
    }
}
