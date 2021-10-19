// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
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

        require(lab.fetchIsListable(_legendId), "Not eligible");
        require(_price != 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        _createLegendSale(_nftContract, _legendId, _price);
    }

    function buyLegend(uint256 _listingId) external payable nonReentrant {
        LegendListing memory l = legendListing[_listingId];

        require(l.status == ListingStatus.Open);
        require(msg.sender != l.seller, "Seller can not buy");
        require(msg.value == l.price, "Incorrect price submitted for item");

        (
            uint256 marketFee,
            uint256 royaltyFee,
            address legendCreator
        ) = _calculateFees(_listingId); // put in withdraw to reduce duplication?

        if (royaltyFee != 0) {
            _asyncTransferRoyalty(legendCreator, royaltyFee); // put in withdraw to reduce duplication?
        }

        address(this).call{value: marketFee}; // test !!

        _asyncTransfer(l.seller, (msg.value - (marketFee + royaltyFee)));

        _buyLegend(_listingId);

        _withdrawAllowed[_listingId][l.seller] = true;
    }

    function createLegendAuction(
        address _nftContract,
        uint256 _legendId,
        uint256 _duration,
        uint256 _startingPrice,
        uint256 _instantPrice
    ) public payable nonReentrant {
        IERC721 legendsNFT = IERC721(_nftContract);

        require(lab.fetchIsListable(_legendId), "Not eligible");
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

    //TODO: ? look at making more modular ;; needs non reentrant
    function placeBid(uint256 listingId) public payable {
        AuctionDetails storage a = auctionDetails[listingId];
        LegendListing storage l = legendListing[listingId];

        require(l.status == ListingStatus.Open);
        require(!isExpired(listingId), "Auction has expired");
        require(msg.sender != l.seller, "Seller can not bid");

        if (a.bidders.length == 0) {
            require(msg.value >= a.startingPrice, "Minimum price not met");
        }

        uint256 newBid = bids[listingId][msg.sender] += (msg.value);
        require(newBid > a.highestBid, "Bid must be higher than current bid");

        _withdrawAllowed[listingId][msg.sender] = false;

        // bids[listingId][msg.sender] = newBid; // redundant LAuction.sol ~70
        _asyncTransferBid(listingId, payable(msg.sender), newBid);

        // Allow previous highest bidder to reclaim or increase their bid
        _withdrawAllowed[listingId][a.highestBidder] = true; // ! does not allow for bid increase

        _placeBid(listingId, newBid);

        if (a.instantBuy) {
            if (newBid >= instantBuyPrice[listingId]) {
                //TODO: do not allow user input over IB-price on FE
                _closeAuction(listingId);
                _withdrawAllowed[listingId][l.seller] = true;
            }
        }
    }

    function withdrawBid(uint256 listingId) external payable {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender != l.seller);

        _withdrawBid(listingId, payable(msg.sender));

        if (legendListing[listingId].isAuction) {
            bids[listingId][msg.sender] = 0;
        }

        _withdrawAllowed[listingId][msg.sender] = false;
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
        OfferDetails memory o = offerDetails[_listingId];

        IERC721 legendsNFT = IERC721(l.nftContract);

        require(l.status == ListingStatus.Open);
        require(block.timestamp < o.expirationTime, "Offer is expired");
        require(
            legendsNFT.ownerOf(l.legendId) == msg.sender &&
                msg.sender == o.legendOwner, // if token is traded before offer A/D ...
            "Not authorized"
        );

        if (_isAccepted) {
            legendsNFT.transferFrom(msg.sender, address(this), l.legendId);
            // _acceptLegendOffer(_listingId);

            // (
            //     uint256 marketFee,
            //     uint256 royaltyFee,
            //     address legendCreator
            // ) = _calculateFees(_listingId);

            // _obligateBid(
            //     _listingId,
            //     l.buyer,
            //     msg.sender,
            //     marketFee,
            //     royaltyFee,
            //     legendCreator
            // ); // ? move into closeListing

            // _withdrawAllowed[_listingId][msg.sender] = true; // ? move into closeListing
        } else {
            /**
             * Token owner can also just let the offer expire
             * if they do not wish to pay gas to reject
             */

            // _rejectLegendOffer(_listingId);
            _withdrawAllowed[_listingId][l.buyer] = true;
        }

        _decideLegendOffer(_listingId, _isAccepted);

        emit OfferDecided(_listingId, _isAccepted);
    }

    function cancelLegendListing(uint256 listingId) external nonReentrant {
        LegendListing memory l = legendListing[listingId];
        require(l.status == ListingStatus.Open);

        if (l.isOffer) {
            require(msg.sender == l.buyer);
        } else {
            require(msg.sender == l.seller);
        }

        if (l.isAuction) {
            require(
                auctionDetails[listingId].bidders.length == 0,
                "Bids already placed"
            );
        }

        if (l.isOffer) {
            _withdrawAllowed[listingId][msg.sender] = true;
        } else {
            // ! this must be reworked if we use ierc721 escrow
            IERC721(l.nftContract).transferFrom(
                address(this),
                l.seller,
                l.legendId
            );
        }

        _cancelLegendListing(listingId);
    }

    function closeListing(uint256 _listingId) external payable {
        LegendListing storage l = legendListing[_listingId];
        AuctionDetails storage a = auctionDetails[_listingId];

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
            (
                uint256 marketFee,
                uint256 royaltyFee,
                address legendCreator
            ) = _calculateFees(_listingId);

            address payable payer;

            if (l.isAuction) {
                payer = a.highestBidder;
            } else if (l.isOffer) {
                payer = l.buyer;
            }

            _obligateBid(
                _listingId,
                payer,
                l.seller,
                marketFee,
                royaltyFee,
                legendCreator
            );

            _withdrawAllowed[_listingId][l.seller] = true;
        }

        if (msg.sender == l.seller) {
            _claimPayment(_listingId);
        } else if (msg.sender == l.buyer) {
            _claimLegend(_listingId);
        }

        emit PaymentClaimed(_listingId, msg.sender);
    }

    function _claimLegend(uint256 listingId) internal {
        LegendListing memory l = legendListing[listingId];

        require(msg.sender == l.buyer);
        require(l.status == ListingStatus.Closed);

        uint256 legendOwed = _legendOwed[listingId][l.buyer];
        require(legendOwed != 0);

        _legendOwed[listingId][l.buyer] = 0;

        IERC721(l.nftContract).transferFrom(address(this), l.buyer, legendOwed);
    }

    function _claimPayment(uint256 listingId) internal {
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

        _withdrawPayments(listingId, l.seller);
    }

    function claimRoyalties() external {
        uint256 amount = royalties(msg.sender);
        require(amount != 0, "Royalties are 0");

        _withdrawRoyalties(payable(msg.sender));
    }

    function _calculateFees(uint256 listingId)
        internal
        view
        returns (
            uint256,
            uint256,
            address
        )
    {
        LegendListing memory l = legendListing[listingId];

        uint256 marketFee = (l.price * _marketplaceFee) / 100;

        // redo how this is fetched
        uint256 royaltyFee;
        address legendCreator = lab.fetchRoyaltyRecipient(l.legendId);

        // ? no fees if buyer is creator ;; royalty blacklist probably needed
        if (legendCreator != address(0)) {
            if (legendCreator != l.seller)
                royaltyFee = (l.price * _royaltyFee) / 100;
        }

        return (marketFee, royaltyFee, legendCreator);
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

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        _marketplaceFee = newFee;
    }
}
