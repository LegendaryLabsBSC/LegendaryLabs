// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../lab/LegendsLaboratory.sol";
import "../token/LegendToken.sol";
import "./match/LegendMatching.sol";

/**
 * @dev The **LegendMatching** inherits from [**ILegendMatch**](./ILegendMatch) to define a Legend NFT *matching listing*.
 * This contract acts as a ledger for a *matching listing*, recording important data and events during the lifecycle of a *matching listing*.
 * This contract is inherited by the [**LegendsMatchingBoard**](./LegendsMatchingBoard).
 */
contract LegendsMatchingBoard is LegendMatching, ReentrancyGuard {
    using Counters for Counters.Counter;

    LegendsLaboratory _lab;

    modifier onlyLab() {
        require(msg.sender == address(_lab), "Not Called By Lab Admin");
        _;
    }

    constructor() {
        _lab = LegendsLaboratory(msg.sender);
    }

    /**
     * @notice List Your Legend NFT On The Matching Board
     *
     * @dev Creates a new Legend *matching listing*. Calls `_createLegendMatching` from [**LegendMatching**](./matching/LegendMatching#_createlegendmatching).
     *
     *
     * :::caution Requirements:
     *
     * * Legend must be considered [*listable*](../lab/LegendsLaboratory#islistable)
     * * Legend must be considered [*blendable*](../lab/LegendsLaboratory#isblendable)
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
     * @param legendId ID of Legend being listed for a *matching*.
     * @param price Amount of LGND tokens the `surrogate` request in order for a player to blend with their `surrogateLegend`.
     */
    function createLegendMatching(
        address nftContract,
        uint256 legendId,
        uint256 price
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);

        require(
            _lab.isListable(legendId),
            "Caller Is Not Owner Or Legend Has Not Hatched"
        );
        require(_lab.isBlendable(legendId));
        require(price != 0, "Price Can Not Be 0");

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        _createLegendMatching(nftContract, legendId, price);
    }

    /**
     * @notice Blend Your Legend NFT With The Listed Legend NFT
     *
     * @dev Completes a *matching listing* by creating a new *child Legend* using the `surrogateLegend` and the `blendingLegend`.
     *  Calls `_matchWithLegend` from [**LegendMatching**](./matching/LegendMatching#_matchwithlegend).
     *
     * :::caution Requirements:
     *
     * * Listing must be `Open`
     * * `msg.sender` can not be the same address that placed the listing
     * * `blenderLegend` must be considered [*listable*](../lab/LegendsLaboratory#islistable)
     * * `blenderLegend` must be considered [*blendable*](../lab/LegendsLaboratory#isblendable)
     *
     * :::
     *
     * :::important
     *
     * The cost to purchase a *matching listing* is: `_legendMatching.price` + the `blendingCost` for the (2) Legend NFTs being blended.
     *
     * :::
     *
     * :::important
     *
     * This function will transfer the `blendingLegend` to the contract in order to successfully call `blendLegends`
     * from [**LegendsNFT**](../legend/LegendsNFT#_blendlegends), as `blendLegends` requires both *parent Legends* to be owned
     * by the `msg.sender`.
     *
     * :::
     *
     * :::important
     *
     * After the *blending* process completes the `blendingLegend` will be returned to the `blender` while the *child Legend*
     * will be sent to this contract. In order to claim the *child Legend*, the `blender` will need to call `claimEgg`.
     *
     * :::
     *
     * @param matchingId ID of *matching listing*
     * @param legendId ID of Legend that is to *blend* with the `surrogateLegend`.
     */
    function matchWithLegend(uint256 matchingId, uint256 legendId)
        external
        nonReentrant
    {
        LegendMatching memory m = _legendMatching[matchingId];
        IERC721 legendsNFT = IERC721(m.nftContract);

        require(m.status == MatchingStatus.Open, "Legend Matching Not Open");
        require(
            m.surrogate != msg.sender,
            "Seller Not Authorized To Purchase Own Matching"
        );

        require(
            _lab.isListable(legendId),
            "Caller Is Not Owner Or Legend Has Not Hatched"
        );
        require(_lab.isBlendable(legendId));

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        uint256 blendingCost = (_lab.fetchBlendingCost(m.surrogateLegend) +
            _lab.fetchBlendingCost(legendId)) / 2;

        //test: make sure blender has to have enough LGND tokens for payment + blendingCost ; prior to nft transfer
        uint256 matchingPayment = m.price + blendingCost;
        _lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            matchingPayment
        );

        uint256 childId = _lab.legendsNFT().blendLegends(
            address(this),
            m.surrogateLegend,
            legendId
            // false
        );

        _matchWithLegend(
            matchingId,
            msg.sender,
            legendId,
            childId,
            matchingPayment
        );

        legendsNFT.safeTransferFrom(address(this), msg.sender, legendId);

        emit MatchMade(
            matchingId,
            m.surrogateLegend,
            m.blenderLegend,
            childId,
            m.price
        );
    }

    /**
     * @notice Cancel Your Matching Listing
     *
     * @dev Cancels a *matching listing* and returns the `surrogateLegend` to the `surrogate` address.
     *  Calls `_cancelLegendMatching` from [**LegendMatching**](./matching/LegendMatching#_cancellegendmatchng).
     *
     *
     * :::caution Requirements:
     *
     * * `msg.sender` must be the same address that placed the listing
     * * Listing must be `Open`
     *
     * :::
     *
     * @param matchingId ID of *matching listing*
     */
    function cancelLegendMatching(uint256 matchingId) external nonReentrant {
        LegendMatching memory m = _legendMatching[matchingId];

        require(msg.sender == m.surrogate, "Caller Did Not List Legend");
        require(m.status == MatchingStatus.Open, "Legend Matching Not Open");

        _cancelLegendMatching(matchingId);

        IERC721(m.nftContract).safeTransferFrom(
            address(this),
            m.surrogate,
            m.surrogateLegend
        );
    }

    /**
     * @notice Decide Whether To Relist Your Legend NFT On The Matching Board
     *
     * @dev Gives the `surrogate`/seller address the opportunity to easily relist their Legend NFT.
     * Rather than requiring the Legend owner to withdraw the Legend and then manually create a new listing
     * if they had wished to relist the Legend NFT.
     *
     *
     * :::caution Requirements:
     *
     * * `msg.sender` must be the same address that placed the listing
     * * Listing must be `Closed`
     * * `surrogateLegend` must still be considered [*blendable*](../lab/LegendsLaboratory#isblendable)
     *
     * :::
     *
     * :::tip Note
     *
     * If Legend NFT is relisted the LGND token price will remain the same as the prior listing.
     *
     * :::
     *
     * :::tip Note
     *
     * If the player decides to not relist their Legend NFT, the NFT will be returned to them.
     *
     * :::
     *
     *
     * @param matchingId ID of *matching listing*.
     * @param isRelisted Indicates whether the `surrogateLegend` is to be relisted or not.
     */
    function decideMatchingRelist(uint256 matchingId, bool isRelisted)
        external
        nonReentrant
    {
        LegendMatching memory m = _legendMatching[matchingId];

        require(msg.sender == m.surrogate, "Caller Did Not List Legend");
        require(
            m.status == MatchingStatus.Closed,
            "Legend Matching Not Closed"
        );

        if (isRelisted) {
            require(_lab.isBlendable(m.surrogateLegend));

            _createLegendMatching(m.nftContract, m.surrogateLegend, m.price);
        } else {
            IERC721(m.nftContract).safeTransferFrom(
                address(this),
                m.surrogate,
                m.surrogateLegend
            );
        }

        emit Relisting(matchingId, m.surrogateLegend, isRelisted);
    }

    /**
     * @notice Claim Your New Child Legend NFT!
     *
     * @dev Allows the `blender` of a given *matching listing* to claim the *child Legend* that was created.
     *
     *
     * :::caution Requirements:
     *
     * * `msg.sender` must be the same address that purchased the listing
     * * Listing must be `Closed`
     * * The *Child Legend* must not already be claimed
     *
     * :::
     *
     *
     * @param matchingId ID of *matching listing*.
     */
    function claimEgg(uint256 matchingId) external nonReentrant {
        LegendMatching memory m = _legendMatching[matchingId];

        require(msg.sender == m.blender, "Caller Did Not Purchase Matching");
        require(
            m.status == MatchingStatus.Closed,
            "Legend Matching Not Closed"
        );

        uint256 eggOwed = _eggPending[matchingId][m.blender];
        require(eggOwed != 0, "Egg Already Claimed");

        _eggPending[matchingId][m.blender] = 0;

        _lab.legendsNFT().safeTransferFrom(address(this), m.blender, eggOwed);

        emit EggClaimed(m.blender, matchingId, eggOwed);
    }

    /**
     * @notice Claim Your Pending LGND Tokens!
     *
     * @dev Transfers any pending LGND tokens, earned from *matching listings8, to the caller.
     *
     * :::caution Requirements:
     *
     * * The amount of LGND tokens owed to the `msg.sender` must not be `(0)`.
     *
     * :::
     *
     *
     */
    function claimTokens() external nonReentrant {
        uint256 tokensOwed = fetchTokensPending();
        require(tokensOwed != 0, "Address Is Owed 0 LGND Tokens");

        _tokensPending[msg.sender] = 0;

        _lab.legendToken().transferFrom(address(this), msg.sender, tokensOwed);

        emit TokensClaimed(msg.sender, tokensOwed);
    }

    /**
     * @dev Returns the counts for `_matchingIds`, `_matchingsClosed`, & `_matchingsCancelled`.
     */
    function fetchMatchingCounts()
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
        return (_matchingIds, _matchingsClosed, _matchingsCancelled);
    }

    /**
     * @dev Returns the details for a given *Legend Matching*.
     *
     * @param matchingId ID of *matching listing* being queried.
     */
    function fetchLegendMatching(uint256 matchingId)
        public
        view
        virtual
        override
        isValidMatching(matchingId)
        returns (LegendMatching memory)
    {
        return _legendMatching[matchingId];
    }

    /**
     * @dev Returns the amount of LGND tokens owned to the caller.
     */
    function fetchTokensPending()
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _tokensPending[msg.sender];
    }

    /**
     * @dev Returns the ID of the *child Legend* owed from a given *matching listing* to the `blender`.
     *
     * @param matchingId ID of *matching listing* being queried.
     */
    function fetchEggOwed(uint256 matchingId)
        public
        view
        virtual
        override
        isValidMatching(matchingId)
        returns (uint256)
    {
        require(
            _legendMatching[matchingId].blender == msg.sender,
            "Caller Did Not Purchase Listing"
        );
        return _eggPending[matchingId][msg.sender];
    }
}
