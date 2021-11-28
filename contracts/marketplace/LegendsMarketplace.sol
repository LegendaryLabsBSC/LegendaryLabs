// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../lab/LegendsLaboratory.sol";
import "./escrow/LegendsMarketClerk.sol";
import "./listings/LegendAuction.sol";

/**
 * The **LegendMarketplace** contract establishes a marketplace for Legend NFTs which utilizes various *listing* types.
 * This contracts inherits [**LegendAuction**](./listings/LegendAuction) to implement marketplace *listings*.
 * This contract also inherits [**LegendsMarketClerk**](./escrow/LegendsMarketplaceClerk), which deploys and
 * manages the [**LegendsEscrow**](./escrow/LegendsEscrow) contract separate from the rest of the *Legendary Labs contracts*.
 * talk about how escrow works, important addmentions ; regular transfers and bid tranfers
 */
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

    /** listingId => isPaymentTransferred */
    mapping(uint256 => bool) private _paymentTransferred;

    constructor() {
        _lab = LegendsLaboratory(payable(msg.sender));
    }

    /**
     * @notice List Your Legend NFT On The Marketplace
     *
     * @dev Creates a new *sale listing*. Calls `_createLegendSale` from [**LegendSale**](./listings/LegendSale#_createlegendsale).
     *
     *
     * :::caution Requirements:
     *
     * * Legend must be considered [*listable*](../lab/LegendsLaboratory#islistable)
     * * `price` can not be `(0)`
     *
     * :::
     *
     *
     * :::tip Note
     *
     * Calling this function will transfer the listed Legend NFT to this contract.
     *
     * :::
     *
     *
     * @param nftContract Address of the ERC721 contract.
     * @param legendId ID of Legend being listed for a *sale*.
     * @param price Amount the seller is requesting.
     */
    function createLegendSale(
        address nftContract,
        uint256 legendId,
        uint256 price
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);

        require(
            _lab.isListable(legendId)
            // , "Not eligible"
        );
        require(
            price != 0
            // , "Price can not be 0"
        );

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        _createLegendSale(nftContract, legendId, price);
    }

    /**
     * @notice Buy A Legend NFT From The Marketplace
     *
     * @dev Purchases a *sale listing*. Calls `_buyLegend` from [**LegendSale**](./listings/LegendSale#_buylegend).
     *
     *
     * :::caution Requirements:
     *
     * * Listing must be `Open`
     * * `msg.sender` must not be the seller
     * * `msg.value` must be the correct price
     *
     * :::
     *
     *
     * @param listingId ID of the *sale listing*.
     */
    function buyLegend(uint256 listingId) external payable nonReentrant {
        LegendListing memory l = _legendListing[listingId];

        require(
            l.status == ListingStatus.Open
            // , "Listing Closed"
        );
        require(
            msg.sender != l.seller
            // , "Seller Can Not Buy Own Listing"
        );
        require(msg.value == l.price, "Incorrect Price Submitted For Listing");

        _transferPayment(
            listingId,
            // l.seller,
            false
        );

        _buyLegend(listingId);
    }

    /**
     * @notice Make An Offer On A Legend NFT
     *
     * @dev Creates a new *offer listing*. Calls `_makeLegendOffer` from [**LegendSale**](./listings/LegendSale#_makelegendoffer).
     *
     *
     * :::caution Requirements:
     *
     * * `msg.sender` must not be owner of Legend NFT
     * * Legend must be considered [*hatched*](../lab/LegendsLaboratory#ishatched)
     * * `price` must not be `(0)`
     *
     * :::
     *
     *
     * :::tip Note
     *
     * Payment is stored in the **LegendsEscrow** contract as a bid, until a decision has been made on the *offer* or it expires.
     *
     * :::
     *
     *
     * @param nftContract Address of the ERC721 contract.
     * @param legendId ID of Legend having a *offer* made for.
     */
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
        require(
            _lab.isHatched(legendId)
            // , "Not eligible"
        ); // commented out for testing
        require(
            msg.value != 0
            // , "Price can not be 0"
        );

        uint256 listingId = _makeLegendOffer(
            nftContract,
            payable(legendOwner),
            legendId
        );

        _isBidRefundable[listingId][msg.sender] = false;

        _asyncTransferBid(msg.value, listingId, payable(msg.sender));

        emit OfferMade(listingId, msg.value);
    }

    /**
     * @notice Accept Or Reject An Offer For Your Legend NFT
     *
     * @dev Allows the owner of an Legend NFT to accept or reject an *offer* made on their NFT. Calls `_decideLegendOffer` from
     * [**LegendSale**](./listings/LegendSale#_decidelegendoffer).
     *
     * :::caution Requirements:
     *
     * * Listing must be `Open`
     * * Offer must not be expired
     * * Legend NFT owner must be the same address the offer was originally made for
     *
     * :::
     *
     * :::tip Note
     *
     * If the *offer* is accepted the Legend NFT will be transferred to *this* contract.
     *
     * :::
     *
     * :::tip Note
     *
     * If the *offer* is rejected the address which placed the *offer* will be allowed to withdraw their bid.
     *
     * If the Legend NFT owner does not wish to pay any gas in order to reject the *offer*, they can just simply
     * allow it to expire. The address which placed the *offer* will be permitted to withdraw their bid once the *offer*
     * has expired.
     *
     * :::
     *
     *
     * @param listingId ID of *offer listing*
     * @param isAccepted Indicates if an *offer listing* is accepted or not.
     */
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
            block.timestamp < _offerDetails[listingId].expirationTime,
            "Offer Has Already Expired"
        );
        require(
            msg.sender == legendsNFT.ownerOf(l.legendId) &&
                msg.sender == _offerDetails[listingId].legendOwner, // If token is traded before offer A/D ...
            "Legend Owner Has Changed"
        );

        _decideLegendOffer(listingId, isAccepted);

        if (isAccepted) {
            legendsNFT.transferFrom(msg.sender, address(this), l.legendId);
        } else {
            /**
             * Token owner can also just let the offer expire
             * if they do not wish to pay gas to reject
             */
            _isBidRefundable[listingId][l.buyer] = true;
        }

        emit OfferDecided(listingId, isAccepted);
    }

    /**
     * @notice Create An Auction For Your Legend NFT On The Marketplace
     *
     * @dev Creates a new *auction listing*. Calls `_createLegendAuction` from [**LegendAuction**](./listings/LegendAuction#_createlegendauction).
     *
     *
     * :::caution Requirements:
     *
     * * Legend must be considered [*listable*](../lab/LegendsLaboratory#islistable)
     * * `startingPrice` must not be `(0)`
     * * IF `instantPrice` is not `(0)`, `instantPrice` must be greater than `startingPrice`
     * * `durationIndex` must not be outside of the allowed parameters
     *
     * :::
     *
     *
     * :::tip Note
     *
     * Calling this function will transfer the listed Legend NFT to *this* contract.
     *
     * :::
     *
     *
     * @param nftContract Address of the ERC721 contract
     * @param legendId ID of Legend being listed for an *auction*.
     * @param durationIndex Index of `_auctionDurations` seller wishes the *auction listing* to run for.
     * @param startingPrice  Minimum price seller will start the auction for.
     * @param instantPrice Price the seller will allow the auction to instantly be purchased for.
     */
    function createLegendAuction(
        address nftContract,
        uint256 legendId,
        uint256 durationIndex,
        uint256 startingPrice,
        uint256 instantPrice
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);

        require(
            _lab.isListable(legendId)
            // , "Not eligible"
        );

        require(
            startingPrice != 0
            // , "Price can not be 0"
        );

        if (instantPrice != 0) {
            require(instantPrice > startingPrice);
        }

        if (durationIndex > _auctionDurations.length) {
            revert("Duration Index Is Invalid");
        }
        uint256 duration = _auctionDurations[durationIndex];

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        _createLegendAuction(
            nftContract,
            legendId,
            duration,
            startingPrice,
            instantPrice
        );
    }

    /**
     * @notice Bid On A Legend NFT Auction
     *
     * @dev Places a bid on an *auction listing*. Calls `_placeBid` from [**LegendAuction**](./listings/LegendAuction#_placebid).
     *
     *
     * :::caution Requirements:
     *
     * * Listing must be `Open`
     * * Listing must not be expired
     * * `msg.sender` must not be seller
     * * IF there have been (0) previous bids, bid must not be less than `starting price ; ELSE
     * the bid must be greater then the current highest bid
     *
     * :::
     *
     * :::important
     *
     * When a new bid is placed on an *auction*, the bidder is assigned as the `highestBidder` and the
     * previous `highestBidder` is permitted to withdraw their funds.
     *
     * :::
     *
     * :::tip Note
     *
     * If an address is outbid, they are able to submit a additional bid that will increment their exisiting bid total.
     * Any address that is not the current `highestBidder` is permitted to withdraw their bids at any time.
     *
     * :::
     *
     * :::tip Note
     *
     * If *instant buying* is permitted for the given *auction* and the bid placed meets or exceeds the `instantBuyPrice`
     * the *auction* will be closed, regardless of remaining duration, and the bidder will win the *auction*.
     *
     * :::
     *
     *
     * @param listingId ID of *auction listing*.
     */
    function placeBid(uint256 listingId) external payable nonReentrant {
        LegendListing storage l = _legendListing[listingId]; // memory uses significant more contract space; check gas usage between memory vs storage
        AuctionDetails storage a = _auctionDetails[listingId];

        require(
            l.status == ListingStatus.Open
            // , "Listing Closed"
        );
        require(!isExpired(listingId), "Auction Has Already Expired");
        require(msg.sender != l.seller, "Seller Can Not Bid On Own Listing");

        // uint256 bidAmount = _bidPlaced[listingId][msg.sender] + msg.value;
        uint256 bidAmount = fetchBidPlaced(listingId, msg.sender);

        if (_bidders[listingId].length == 0) {
            if (msg.value < a.startingPrice) {
                revert("Starting Bid Not Met");
            }
        } else {
            require(
                bidAmount > _auctionDetails[listingId].highestBid,
                "Bid must be higher than current bid"
            );
        }

        _isBidRefundable[listingId][msg.sender] = false;

        _asyncTransferBid(msg.value, listingId, payable(msg.sender));

        _isBidRefundable[listingId][a.highestBidder] = true;

        _placeBid(listingId, bidAmount);

        if (a.isInstantBuy) {
            if (bidAmount >= _instantBuyPrice[listingId]) {
                _closeAuction(listingId);
            }
        }
    }

    /**
     * @notice Withdraw A Bid Made On The Marketplace
     *
     * @dev Withdraws a bid placed on an *auction* or *offer listing*. Calls `_refundBid` from
     * [**LegendsMarketClerk**](./escrow/LegendsMarketClerk#_refundbid).
     *
     *
     * :::caution Requirements:
     *
     * * Caller must be authorized to withdraw the bid
     *
     * :::
     *
     *
     * @param listingId Address of the ERC721 contract.
     */
    function refundBid(uint256 listingId) external payable nonReentrant {
        require(
            _isBidRefundable[listingId][msg.sender]
            // , "Not authorized"
        );

        _refundBid(listingId, payable(msg.sender));
    }

    /**
     * @notice Cancel Your Marketplace Listing
     *
     * @dev Cancels a marketplace *listing*, of any type. Calls `_cancelLegendListing` from [**LegendSale**](./listings/LegendSale#_cancellegendlisting).
     *
     *
     * :::caution Requirements:
     *
     * * Listing must be `Open`
     * * IF *listing* is an *offer*, `msg.sender` must be buyer; ELSE `msg.sender` must be seller.
     * * IF *listing* is an *auction*, there must be (0) bids placed on the *listing*.
     *
     * :::
     *
     *
     * :::tip Note
     *
     * Cancelling a *sale* or *auction* will transfer the NFT back to the owner.
     * *Offer listings*  will need to call `refundBid` to transfer back their bid.
     *
     * :::
     *
     *
     * @param listingId ID of marketplace *listing*.
     */
    function cancelLegendListing(uint256 listingId) external nonReentrant {
        LegendListing memory l = _legendListing[listingId];

        require(l.status == ListingStatus.Open);

        if (l.isOffer) {
            require(msg.sender == l.buyer);
        } else {
            require(msg.sender == l.seller);
        }

        if (l.isAuction) {
            require(
                _bidders[listingId].length == 0
                // , "Bids already placed"
            );
        }

        _cancelLegendListing(listingId);

        if (l.isOffer) {
            _isBidRefundable[listingId][msg.sender] = true;
        } else {
            // thoroughly test and check gas cost, due to not using withdraw pattern
            IERC721(l.nftContract).transferFrom(
                address(this),
                l.seller,
                l.legendId
            );
        }
    }

    /**
     * @notice Close A Marketplace Listing And Claim Your NFT or Payment
     *
     * @dev Closes a marketplace *listing*.
     *
     *
     * :::caution Requirements:
     *
     * * `msg.sender` must be either the `seller`, `buyer`, or `highestBidder`
     * * IF *listing* is an *auction, IF the *auction* is `Open`, *auction* must be expired; ELSE the *listing* must be `Closed`
     *
     * :::
     *
     * :::tip Note
     *
     * If the *listing* being closed is an *auction*, [`_closeAuction`](./listings/LegendAuction#_closeauction).
     *
     * :::
     *
     * :::tip Note
     *
     * If the *listing* being closed is an *auction* or *offer, the `highestBidder` or `buyer` bid will be transferred to
     * the Legend NFT `seller` via [`_transferPayment`](#_transferpayment). This action can only occur once per *listing*,
     * but will occur regardless of which party (`seller, `buyer`, `highestBidder`) is the first to call `closeListing`.
     *
     * :::
     *
     * :::tip Note
     *
     * If the `msg.sender` is the seller, [`_withdrawPayments`](./escrow/LegendsMarketClerk#_withdrawpayments) will be called. If the `msg.sender` is the buyer, [`_claimLegend`](#_claimlegend) will be called.
     *
     * :::
     *
     *
     * @param listingId ID of marketplace *listing*.
     */
    function closeListing(uint256 listingId) external payable nonReentrant {
        LegendListing storage l = _legendListing[listingId]; // memory uses significant more contract space; check gas usage between memory vs storage
        AuctionDetails storage a = _auctionDetails[listingId];

        require(
            msg.sender == l.seller ||
                msg.sender == l.buyer ||
                msg.sender == a.highestBidder,
            "Caller Can Not Close Listing"
        );

        if (l.isAuction) {
            if (l.status == ListingStatus.Open) {
                require(isExpired(listingId), "Auction Has Not Yet Expired");

                _closeAuction(listingId);
            }
        } else {
            require(
                l.status == ListingStatus.Closed
                // , "Listing Open"
            );
        }

        if (l.isAuction || l.isOffer) {
            if (_paymentTransferred[listingId] == false) {
                _paymentTransferred[listingId] = true;

                // _closeBid(listingId, l.buyer); // make sure auction buyer set in time for call

                _transferPayment(
                    listingId,
                    // l.seller,
                    true
                );
            }
        }

        if (msg.sender == l.seller) {
            // _claimPayment(listingId);
            _withdrawPayments(l.seller);
        } else if (msg.sender == l.buyer) {
            _claimLegend(listingId);
        }

        emit TradeClaimed(listingId, msg.sender);
    }

    /**
     * @notice Withdraw Your Accumulated Royalties
     *
     * @dev Checks if *royalties* can be collected, if so calls `_withdrawRoyalties` from [**LegendsMarketClerk**](./escrow/LegendsMarketClerk#_withdrawroyalties).
     *
     *
     * :::caution Requirements:
     *
     * * Royalties accrued must not be (0)
     *
     * :::
     *
     *
     */
    function collectRoyalties() external payable nonReentrant {
        uint256 amount = fetchRoyaltiesAccrued(msg.sender);
        require(
            amount != 0
            // , "Royalties are 0"
        );

        _withdrawRoyalties(payable(msg.sender));
    }

    /**
     * @dev Routes a payment or winning-bid made on a marketplace *listing* to the appropriate escrow call.
     *
     *
     * :::tip Note
     *
     * Any applicable marketplace and royalty fees will be calculated during this call, via [`_calculateFees`](#_calculatefees).
     *
     * :::
     *
     *
     * @param listingId ID of marketplace *listing*.
     * @param isBid Indicates whether payment is a bid or not.
     */
    function _transferPayment(
        uint256 listingId,
        // address payable payee,
        bool isBid
    ) internal {
        LegendListing storage l = _legendListing[listingId];

        (
            uint256 marketplaceFee,
            address payable legendCreator,
            uint256 royaltyFee
        ) = _calculateFees(listingId);

        if (isBid) {
            _closeBid(
                listingId,
                l.buyer,
                marketplaceFee,
                royaltyFee,
                legendCreator,
                l.seller
            ); // make sure auction buyer set in time for call
        } else {
            _asyncTransfer(
                msg.value,
                marketplaceFee,
                royaltyFee,
                legendCreator,
                l.seller
            );
        }
    }

    // /**
    //  * @dev Calls `_cancelLegendListing` from [**LegendSale**](./listings/LegendSale#_cancellegendlisting).
    //  *
    //  * @param listingId ID of marketplace *listing*.
    //  */
    // function _claimPayment(
    //     uint256 listingId //  nonReentrant
    // ) internal {
    //     // LegendListing memory l = _legendListing[listingId];

    //     // uint256 amount = fetchPaymentsPending(l.seller);
    //     // require(
    //     //     amount != 0
    //     //     // , "Address is owed 0"
    //     // ); // make sure can not do again without paying gas to see error

    //     _withdrawPayments(l.seller);
    // }

    /**
     * @dev Transfers the purchased Legend NFT to the buyer.
     *
     *
     * :::caution Requirements:
     *
     * * Legend NFT must not already be claimed
     *
     * :::
     *
     *
     * @param listingId ID of marketplace *listing*.
     */
    function _claimLegend(
        uint256 listingId // nonReentrant
    ) internal {
        LegendListing memory l = _legendListing[listingId];

        uint256 legendOwed = _legendPending[listingId][l.buyer];
        require(
            legendOwed != 0
            // , "No Legend Owed"
        ); // make sure can not do again without paying gas to see error

        _legendPending[listingId][l.buyer] = 0;

        IERC721(l.nftContract).transferFrom(address(this), l.buyer, legendOwed);
    }

    /**
     * @dev Returns any applicable marketplace fee amount, original Legend NFT creator address, and royalties fee amount.
     *
     *
     * :::important
     *
     * Fees are deducted from total price payed.
     *
     * :::
     *
     * :::tip
     *
     * If Legend NFT was not created via *blending*, royalties will not be deducted.
     *
     * Additionally, if the buyer is the original creator of the Legend NFT, royalties will not be deducted
     * and sent to the buyer address.
     *
     * :::
     *
     *
     * @param listingId ID of marketplace *listing*
     */
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

    /**
     * @dev Queries whether a bidder is permitted to withdraw their bid or not
     *
     * @param listingId ID of *auction* or *offer listing*
     * @param bidder Address of bidder
     */
    function isBidWithdrawable(uint256 listingId, address bidder)
        public
        view
        returns (bool)
    {
        return _isBidRefundable[listingId][bidder];
    }

    /**
     * @dev Returns the counts for `_listingIds`, `_listingsClosed`, & `_listingsCancelled`.
     */
    function fetchListingCounts()
        public
        view
        virtual
        override
        returns (
            Counters.Counter memory,
            Counters.Counter memory,
            Counters.Counter memory
        )
    {
        return (_listingIds, _listingsClosed, _listingsCancelled);
    }

    /**
     * @dev Returns the details of a marketplace *listing*.
     *
     * @param listingId ID of *listing* being queried
     */
    function fetchLegendListing(uint256 listingId)
        public
        view
        virtual
        override
        isValidListing(listingId)
        returns (LegendListing memory)
    {
        return _legendListing[listingId];
    }

    /**
     * @dev Returns an *offer's* additional *listing* details.
     *
     *
     * :::caution Requirements:
     *
     * * Must be an *offer listing*
     *
     * :::
     *
     * @param listingId ID of *offer listing* being queried
     */
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

    // /**
    //  * @dev Returns the metadata of a given Legend NFT
    //  *
    //  */
    // function fetchAuctionDurations()
    //     public
    //     view
    //     virtual
    //     override
    //     returns (uint256[3] memory)
    // {
    //     return _auctionDurations;
    // }

    /**
     * @dev Returns an *auction's* additional *listing* details.
     *
     *
     * :::caution Requirements:
     *
     * * Must be an *auction listing*
     *
     * :::
     *
     * @param listingId ID of *auction listing* being queried
     */
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

    /**
     * @dev Returns an *auction listing's* instant buy price.
     *
     *
     * :::caution Requirements:
     *
     * * *Auction* must permit *instant buying*
     *
     * :::
     *
     * @param listingId ID of *listing* being queried
     */
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

    /**
     * @dev Returns an array of addresses that have bid on a given *auction listing*.
     *
     *
     * :::caution Requirements:
     *
     * * Must be an *auction listing*
     *
     * :::
     *
     * @param listingId ID of *listing* being queried
     */
    function fetchBidders(uint256 listingId)
        public
        view
        virtual
        override
        returns (
            // isValidListing(listingId)
            address[] memory
        )
    {
        require(_legendListing[listingId].isAuction);

        return _bidders[listingId];
    }

    /**
     * @dev Returns the values of the (5) *marketplace rules*
     *
     * :::note Marketplace Rules:
     *
     * * [`_royaltyFee`](/docs/info#kinBlendingLevel)
     * * [`_marketplaceFee`](/docs/info#blendingLimit)
     * * [`_baseBlendingCost`](/docs/info#baseBlendingCost)
     * * [`_auctionExtension`](/docs/info#incubationPeriod)
     * * [`_auctionDurations`](/docs/info#_auctionDurations)
     *
     * :::
     *
     */
    function fetchMarketplaceRules()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256[3] memory
        )
    {
        return (
            _royaltyFee,
            _marketplaceFee,
            _offerDuration,
            _auctionExtension,
            _auctionDurations
        );
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setmarketplacerule).
     */
    function setMarketplaceRule(uint256 marketplaceRule, uint256 newRuleData)
        public
        onlyLab
    {
        if (marketplaceRule == 0) {
            _royaltyFee = newRuleData;
        } else if (marketplaceRule == 1) {
            _marketplaceFee = newRuleData;
        } else if (marketplaceRule == 2) {
            _offerDuration = newRuleData;
        } else if (marketplaceRule == 3) {
            _auctionExtension = newRuleData;
        }
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#setauctiondurations).
     */
    function setAuctionDurations(uint256[3] calldata newAuctionDurations)
        public
        onlyLab
    {
        _auctionDurations = newAuctionDurations;
    }

    /**
     * @dev Function only callable by [**LegendsLaboratory**](../lab/LegendsLaboratory#withdrawmarketplacefees).
     */
    function withdrawMarketplaceFees() public onlyLab {
        _withdrawPayments(payable(address(this)));
    }
}
