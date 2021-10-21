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

    function placeBid(uint256 _listingId) public payable nonReentrant {
        LegendListing storage l = legendListing[_listingId];
        AuctionDetails storage a = auctionDetails[_listingId];

        require(l.status == ListingStatus.Open);
        require(!isExpired(_listingId), "Auction has expired");

        require(msg.sender != l.seller, "Can not bid");
        require(msg.sender != a.highestBidder, "Can not bid");

        // uint256 bidAmount = (bids[msg.sender] + msg.value); // this is the issue

        // bids[_listingId][msg.sender] += msg.value;

        // uint256 bidAmount = bids[_listingId][msg.sender];

        uint256 bidAmount = msg.value;

        bids[_listingId][msg.sender] += bidAmount;

        if (a.bidders.length == 0) {
            require(
                msg.value >= a.startingPrice //, "Minimum price not met" // test for >= flaws
            );
        } else {
            require(
                bids[_listingId][msg.sender] >
                    auctionDetails[_listingId].highestBid,
                "b"
                //,            "Bid must be higher than current bid"
            );
        }

        _withdrawAllowed[_listingId][msg.sender] = false;

        _asyncTransferBid(_listingId, payable(msg.sender), bidAmount);

        // Allow previous highest bidder to reclaim or increase their bid
        _withdrawAllowed[_listingId][a.highestBidder] = true;

        _placeBid(_listingId, bids[_listingId][msg.sender]);

        if (a.instantBuy) {
            if (bidAmount >= instantBuyPrice[_listingId]) {
                _closeAuction(_listingId);
                _withdrawAllowed[_listingId][l.seller] = true;
            }
        }
    }

    function withdrawBid(uint256 listingId) external payable nonReentrant {
        LegendListing memory l = legendListing[listingId];
        require(msg.sender != l.seller);

        _withdrawBid(listingId, payable(msg.sender));

        if (legendListing[listingId].isAuction) {
            // bids[listingId][msg.sender] = 0;
            bids[listingId][msg.sender] = 0;
        }

        _withdrawAllowed[listingId][msg.sender] = false;
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

        // thoroughly test and check gas cost, due to not using withdraw pattern
        if (l.isOffer) {
            _withdrawAllowed[_listingId][msg.sender] = true;
        } else {
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

    function claimRoyalties() external nonReentrant {
        uint256 amount = royalties(msg.sender);
        require(amount != 0, "Royalties are 0");

        _withdrawRoyalties(payable(msg.sender));
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

    //royalty fee setter ; move royalty handling to lab?
    //royalty on/off toggle / pauseable ?

    function setMarketplaceFee(uint256 newFee) public onlyLab {
        _marketplaceFee = newFee;
    }
}
