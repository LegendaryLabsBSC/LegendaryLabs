// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../legend/LegendsNFT.sol";
import "../token/LegendToken.sol";
import "../rejuvenation/LegendRejuvenation.sol";
import "../marketplace/LegendsMarketplace.sol";
import "../matching/LegendsMatchingBoard.sol";
import "./TicketMachine.sol";

/**
 * @dev Primary controller contract for the Legendary Labs Project
 *
 *
 *
 *
 */
contract LegendsLaboratory is AccessControlEnumerable, TicketMachine {
    LegendsNFT public legendsNFT = new LegendsNFT();
    LegendToken public legendToken = new LegendToken(msg.sender);
    LegendRejuvenation public legendRejuvenation = new LegendRejuvenation();
    LegendsMarketplace public legendsMarketplace = new LegendsMarketplace();
    LegendsMatchingBoard public legendsMatchingBoard =
        new LegendsMatchingBoard();


    bytes32 public constant LAB_ADMIN = keccak256("LAB_ADMIN");
    bytes32 public constant LAB_TECH = keccak256("LAB_TECH");

    string private _season = "Phoenix";

    /** promoId => skipIncubation */
    mapping(uint256 => bool) private _promoIncubated;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, address(this));
        _setupRole(LAB_ADMIN, msg.sender);
        _setupRole(LAB_TECH, msg.sender); // maybe dont give both ACs ?

        _setRoleAdmin(LAB_TECH, LAB_ADMIN);
    }

    /**
     * @notice Create A New Legendary Labs Promo Event
     *
     * @dev Calls `_createPromoEvent` from [`TicketMachine`](/docs/TicketMachine). Can only be called by a `LAB_TECH`.
     *
     * **Promo Events** can be created (1) of (2) ways:
     *  1. Unrestricted Promo Event => @param isUnrestricted == true
     *  2. Restricted Promo Event => @param isUnrestricted == false
     *
     * [`TicketMachine`](/docs/TicketMachine) had been extended by this contract with `_promoIncubated`. Which allows
     * the Promo creator to specify whether Legends minted from that particular event are required to undergo incubation
     * prior to being hatched. If `skipIncubation` is passed (true), all Legend NFTs created via that *Promo Event* will
     * be allowed to bypass the incubation duration and have [`hatchLegend`](/docs/LegendNFT) called immediately after being minted.
     *
     * :::note
     *
     * The only addresses that should be able to call this function is one approved with the `LAB_TECH` **Access Control Role**.
     * To check if an address is approved to use this function `hasRole(LAB_TECH, account)` can be called.
     *
     * :::
     *
     * :::note
     *
     * If `maxTickets` is set to (0) no *maximum ticket count* will be applied to the event, only a duration.
     * If `maxTickets` is passed a number greater than (0) a *maximum ticket count* will be applied, and will override the remaining duration if met.
     *
     * :::
     *
     * :::caution
     *
     * For **Legendary Labs** purposes it is generally NOT recommended to include a `maxTicket` value greater
     * than (0) for *Unrestricted* Promo Events. This is due to the fact that there is no way to prevent an individual
     * from using multiple addresses to claim multiple tickets. While this still holds true regardless of a ticket limit
     * existing, by only limiting a Promo Event with `duration` we remove the possibility of one individual claiming **all**
     * of an event's tickets, and ruining the fun for every one else.
     *
     * The `maxTickets` functionality could be used to create *Promo Events* in a more centralized/organized environment
     * where the organizers can verify one address per individual.
     *
     * However, we will primarily use `maxTickets` alongside *Restricted* events, and more likely gear it towards internal accountability.
     *
     * :::
     *
     * @param eventName Non-numerical Promo Event identifier
     * @param duration Length of time, in seconds, that addresses will have to claim a promo ticket
     * @param isUnrestricted Determines who can dispense promo tickets
     * @param maxTickets Specifies the max amount of tickets that can be claimed
     * @param skipIncubation Determines whether Legends created from a particular promo event must be incubated
     *
     */
    function createPromoEvent(
        string calldata eventName,
        uint256 duration,
        bool isUnrestricted,
        uint256 maxTickets,
        bool skipIncubation
    ) external onlyRole(LAB_TECH) {
        uint256 promoId = _createPromoEvent(
            eventName,
            duration,
            isUnrestricted,
            maxTickets
        );

        _promoIncubated[promoId] = skipIncubation;
    }

    /**
     * @notice Dispenses Tickets For A Legendary Labs Promo Event
     *
     * @dev Calls `_dispensePromoTicket` from [`TicketMachine`](/docs/TicketMachine).
     *
     * :::important
     *
     * ## In an *Unrestricted* **Promo Event**:
     *
     *  * Players have the opportunity to call `dispensePromoTicket` without having admin access.
     *  * Tickets can only be dispensed to the calling address, as `_recipient` is automatically set to `msg.sender`
     *  * Each address is permitted to claim (1) ticket from the **Ticket Dispenser**.
     *
     * ## In an *Restricted* **Promo Event**:
     *
     *  * Only addresses with `LAB_TECH` access are allowed to dispense tickets.
     *  * The admin-caller has the ability to dispense a ticket and specify a receiving address other than their own.
     *  * More than (1) ticket can be dispensed per call, however, the recieveing address must stay the same.
     * :::
     *
     * :::caution
     *
     *  Promo tickets are non-transferable
     *
     * :::
     *
     *
     * @param promoId Numerical ID of the Legendary Labs *promoEvent*
     * @param recipient Address of player receiving promo ticket
     * @param ticketAmount Number of tickets to be dispensed
     */
    function dispensePromoTicket(
        uint256 promoId,
        address recipient,
        uint256 ticketAmount
    ) public {
        address _recipient;

        if (_promoEvent[promoId].isUnrestricted == false) {
            _checkRole(LAB_TECH, msg.sender);

            _recipient = recipient;
        } else {
            _recipient = msg.sender;
        }

        _dispensePromoTicket(promoId, _recipient, ticketAmount);
    }

    /**
     * @notice Redeems (1) Legendary Labs' Promo Event Tickets For A Brand Spankin New Legend NFT
     *
     * @dev Calls `_redeemPromoTicket` from [`TicketMachine`](/docs/TicketMachine). Once a ticket has been successfully redeemed, `createLegend` is called
     * from [LegendsNFT](/docs/LegendsNFT). Which mints and issues a new Legend NFT token to the ticket redeemer.
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     */
    function redeemPromoTicket(uint256 promoId) public {
        _redeemPromoTicket(promoId, msg.sender);

        legendsNFT.createLegend(msg.sender, promoId, false);
    }

    /**
     * @notice Close Promo Event
     *
     * @dev Calls `_closePromoEvent` from [`TicketMachine`](/docs/TicketMachine).
     *
     * :::note
     *
     * Promo Event must be expired to call, only callable by a `LAB_TECH`
     *
     * :::
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     */
    function closePromoEvent(uint256 promoId) public onlyRole(LAB_TECH) {
        _closePromoEvent(promoId);
    }

    /**
     * @dev Function only callable by [`LegendsRejuvenation`](/docs/LegendRejuvenation)
     */
    function restoreBlendingSlots(uint256 legendId, uint256 regainedSlots)
        public
    {
        require(
            msg.sender == address(legendRejuvenation),
            "Not Called By Rejuvenation Contract"
        );

        legendsNFT.restoreBlendingSlots(legendId, regainedSlots);
    }

    /**
     * @notice A True Legend Is Born..
     *
     * @dev This function is the only way a *Legendary* Legend NFT can be minted. Only *the* `LAB_ADMIN` can
     * create a *Legendary*. Calls [`createLegend`](/docs/LegendsNFT#createLegend) with the `isLegendary` bool
     * switched to (true).
     *
     * :::note
     *
     * In order to create a Legendary, a valid **Promo Event** must first have a ticket redeemed by the calling address
     *
     * :::
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     * @param recipient Address of *Legendary* Legend NFT recipient
     */
    function mintLegendaryLegend(uint256 promoId, address recipient)
        public
        onlyRole(LAB_ADMIN)
    {
        _redeemPromoTicket(promoId, recipient);

        legendsNFT.createLegend(recipient, promoId, true);
    }

    /**
     * @notice Destroy LGND Tokens PERMANENTLY
     *
     * @dev Generic function allowing the lab to burn LGND tokens owed by this contract. Only callable by *the* `LAB_ADMIN`.
     *
     * :::note
     *
     * Could be used to extend functionality prior to a full v2 launch if a concept was thought of
     *
     * :::
     *
     * @param amount Quantity of LGND tokens to burn
     */
    function labBurn(uint256 amount) public onlyRole(LAB_ADMIN) {
        legendToken.labBurn(amount);
    }

    /**
     * @dev Allows `LAB_ADMIN` to collect accumulated marketplace fees.
     *
     *
     * :::important
     *
     * Prior to deploying for MVP, a dedicated address for handling funds acquired through the
     * project, and to only be used for the project, could be added in for further project transparency.
     *
     * :::
     *
     *
     */
    function withdrawMarketplaceFees() public onlyRole(LAB_ADMIN) {
        legendsMarketplace.withdrawMarketplaceFees();
    }

    /**
     * @notice There Can Only Be One..
     *
     * @dev Only callable by *the* `LAB_ADMIN`. Function calls *this* contract to revoke the current `LAB_ADMIN`'s
     * authorization and grant authorization to the incoming admin in the same block.
     *
     * :::note
     *
     * Many of the functions the `LAB_ADMIN` has authorization to call should only be called rarely, if ever.
     * In order to prevent more than (1) `LAB_ADMIN` existing at one time, *this* contract is given sole ability
     * to revoke and grant `LAB_ADMIN` access. This should be the only way a `LAB_ADMIN` role can be granted.
     *
     * :::
     *
     * :::warning
     *
     * By calling this function you will give up you privileges as `Lab_ADMIN`. If the `newAdmin`is supplied the *0 address*,
     * a burn address, or any otherwise inaccessible address, full control over the Legendary Labs project would be renounced.
     *
     * :::
     *
     *
     * @param newAdmin Address of incoming `LAB_ADMIN`
     */
    function transferLaboratoryAdmin(address newAdmin)
        public
        onlyRole(LAB_ADMIN)
    {
        this.revokeRole(LAB_ADMIN, msg.sender);
        this.grantRole(LAB_ADMIN, newAdmin);

        // work in black list
    }

    /**
     * @dev Queries whether a PromoEvent permits a Legend to bypass incubation
     *
     * @param promoId Numerical ID of the Legendary Labs *promo event*
     */
    function isPromoIncubated(uint256 promoId) public view returns (bool) {
        return _promoIncubated[promoId];
    }

    /**
     * @dev Queries whether a Legend is blendable or not, [`isBlendable`](/docs/LegendsNFT#isBlendable).
     *
     * @param legendId ID of Legend being queried
     */
    function isBlendable(uint256 legendId) public view returns (bool) {
        return legendsNFT.isBlendable(legendId);
    }

    /**
     * @dev Queries whether a Legend has *hatched* or not, [`isHatched`](/docs/LegendsNFT#isHatched).
     *
     * @param legendId ID of Legend being queried
     */
    function isHatched(uint256 legendId) public view returns (bool) {
        return legendsNFT.isHatched(legendId);
    }

    /**
     * @dev Queries whether a Legend is listable or not, [`isListable`](/docs/LegendsNFT#isListable).
     *
     * @param legendId ID of Legend being queried
     */
    function isListable(uint256 legendId) public view returns (bool) {
        return legendsNFT.isListable(legendId);
    }

    /**
     * @dev Returns the current **Legendary Labs** Season
     */
    function fetchSeason() public view returns (string memory) {
        return _season;
    }

    /**
     * @dev Returns a given Legend's `blendingInstancesUsed`
     *
     *
     * :::info
     *
     * A Legend has (2) variables that are tracked via **Blending*: `blendingInstancesUsed` and `totalOffspringCount`
     * `blendingInstancesUsed` is utilized when determining whether a `isBlendable` or not by
     * comparing against the [`_blendingLimit`](/docs/LegendsNFT). Whereas `totalOffspring` is utilized
     * when determining [`_blendingCost`](/docs/LegendsNFT#blendLegends).
     *
     * :::
     *
     * @param legendId ID of Legend being queried
     */
    function fetchBlendingCount(uint256 legendId)
        public
        view
        returns (uint256)
    {
        return legendsNFT.fetchLegendMetadata(legendId).blendingInstancesUsed;
    }

    /**
     * @dev Returns the cost to blend a particular Legend
     *
     * @param legendId ID of Legend being queried
     */
    function fetchBlendingCost(uint256 legendId) public view returns (uint256) {
        return legendsNFT.fetchBlendingCost(legendId);
    }

    /**
     * @dev Returns the original creator of a particular Legend
     *
     * :::note
     *
     * Only Legends created via `[blendLegends`](/docs/LegendsNFT#blendLegends) are eligible to pay royalties to the *creator address*.
     * Legends created via `[createLegend`](/docs/LegendsNFT#createLegend) should return the *0 address*.
     *
     * :::
     *
     * @param legendId ID of Legend being queried
     */
    function fetchRoyaltyRecipient(uint256 legendId)
        public
        view
        returns (address payable)
    {
        return legendsNFT.fetchLegendMetadata(legendId).legendCreator;
    }

    /**
     * @notice A New Season Begins..
     *
     * @dev Sets a new season. Only callable by *the* `LAB_ADMIN`.
     *
     * @param newSeason Name of the Legendary Labs `_season`
     */
    function setSeason(string calldata newSeason) public onlyRole(LAB_ADMIN) {
        _season = newSeason;
    }

    /**
     * @notice Set New Kin Blending Level
     *
     * @dev Resets the [`_kinBlendingLevel`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.
     *
     * :::info Kin Blending Level Codes:
     *
     * * 0 => **None** Legend can **not** *blend* with either siblings or parents
     * * 1 => **Parents** Legend can *blend* with parent Legends but not siblings
     * * 2 => **Siblings** Legend has no restrictions on other Legends it can *blend* with
     *
     * :::
     *
     *
     * @param newKinBlendingLevel integer between (0) and (2)
     */
    function setKinBlendingLevel(uint256 newKinBlendingLevel)
        public
        onlyRole(LAB_ADMIN)
    {
        require(newKinBlendingLevel < 3, "Kin Blending Level Does Not Exist"); // less than 2 or 3 ?

        legendsNFT.setBlendingRule(0, newKinBlendingLevel);
    }

    /**
     * @notice Set New IPFS URLs For The Incubation Chambers
     *
     * @dev Allows the resetting of the "randomly" chosen IPFS URLs assigned to a pre-hatched Legend. Only callable by *the* `LAB_TECH`.
     *
     * @param newIncubationViews Array of (5) IPFS URLs
     */
    function setIncubationViews(string[5] calldata newIncubationViews)
        public
        onlyRole(LAB_TECH)
    {
        legendsNFT.setIncubationViews(newIncubationViews);
    }

    /**
     * @notice Set New Blending Limit
     *
     * @dev Resets the [`_blendingLimit`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.
     *
     * @param newBlendingLimit Max number `legendMetadata.blendingInstancesUses` can equal
     */
    function setBlendingLimit(uint256 newBlendingLimit)
        public
        onlyRole(LAB_ADMIN)
    {
        legendsNFT.setBlendingRule(1, newBlendingLimit);
    }

    /**
     * @notice Set New Base Blending Cost
     *
     * @dev Resets the [`_baseBlendingCost`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.
     *
     * @param newBaseBlendingCost Amount in LGND tokens
     */
    function setBaseBlendingCost(uint256 newBaseBlendingCost)
        public
        onlyRole(LAB_ADMIN)
    {
        legendsNFT.setBlendingRule(2, newBaseBlendingCost);
    }

    /**
     * @notice Set New Incubation Period
     *
     * @dev Resets the [`_incubationPeriod`](docs/LegendsNFT/#setBlendingRule). Only callable by *the* `LAB_ADMIN`.
     *
     * @param newIncubationPeriod Duration in seconds
     */
    function setIncubationPeriod(uint256 newIncubationPeriod)
        public
        onlyRole(LAB_ADMIN)
    {
        legendsNFT.setBlendingRule(3, newIncubationPeriod);
    }

    /**
     * @notice Set New Marketplace Royalty Fee
     *
     * @dev Resets the [`_royaltyFee`](docs/LegendsMarketplace/#setMarketplaceRule). Only callable by *the* `LAB_ADMIN`.
     *
     * @param newRoyaltyFee An integer to be used as a percentage
     */
    function setRoyaltyFee(uint256 newRoyaltyFee) public onlyRole(LAB_ADMIN) {
        legendsMarketplace.setMarketplaceRule(0, newRoyaltyFee);
    }

    /**
     * @notice Set New Marketplace Fee
     *
     * @dev Resets the [`_marketplaceFee`](docs/LegendsMarketplace/#setMarketplaceRule). Only callable by *the* `LAB_ADMIN`.
     *
     * @param newMarketplaceFee An integer to be used as a percentage
     */
    function setMarketplaceFee(uint256 newMarketplaceFee)
        public
        onlyRole(LAB_ADMIN)
    {
        legendsMarketplace.setMarketplaceRule(1, newMarketplaceFee);
    }

    /**
     * @notice Set New Marketplace Offer Duration
     *
     * @dev Resets the [`_offerDuration`](docs/LegendsMarketplace/#setMarketplaceRule). Only callable by a `LAB_TECH`.
     *
     * @param newOfferDuration Amount in seconds
     */
    function setOfferDuration(uint256 newOfferDuration)
        public
        onlyRole(LAB_TECH)
    {
        legendsMarketplace.setMarketplaceRule(2, newOfferDuration);
    }

    /**
     * @notice Set New Marketplace Auction Durations
     *
     * @dev Resets the [`_auctionDurations`](docs/LegendsMarketplace/#setMarketplaceRule) array. Only callable by *the* `LAB_ADMIN`.
     *
     * @param newAuctionDurations Amount in seconds, array of (3)
     */
    function setAuctionDurations(uint256[3] calldata newAuctionDurations)
        public
        onlyRole(LAB_TECH)
    {
        legendsMarketplace.setAuctionDurations(newAuctionDurations);
    }

    /**
     * @notice Set New Marketplace Auction Extension Duration
     *
     * @dev Resets the [`_auctionExtension`](docs/LegendsMarketplace/#setMarketplaceRule) duration. Only callable by *the* `LAB_ADMIN`.
     *
     * @param newAuctionExtension Amount in seconds
     */
    function setAuctionExtension(uint256 newAuctionExtension)
        public
        onlyRole(LAB_TECH)
    {
        legendsMarketplace.setMarketplaceRule(3, newAuctionExtension);
    }

    /**
     * @notice Set New Rejuvenation Minimum Secure
     *
     * @dev Resets the [`_minimumSecure`](docs/LegendsRejuvenation#setMinimumSecure) amount. Only callable by *the* `LAB_ADMIN`.
     *
     * @param newMinimumSecure Amount in LGND tokens
     */
    function setMinimumSecure(uint256 newMinimumSecure)
        public
        onlyRole(LAB_TECH)
    {
        legendRejuvenation.setMinimumSecure(newMinimumSecure);
    }

    /**
     * @notice Set New Rejuvenation Max Multiplier
     *
     * @dev Resets the [`_maxMultiplier`](docs/LegendsRejuvenation#setMaxMultiplier). Only callable by *the* `LAB_ADMIN`.
     *
     * @param newMaxMultiplier Integer to multiply *reJu* emission rate
     */
    function setMaxMultiplier(uint256 newMaxMultiplier)
        public
        onlyRole(LAB_ADMIN)
    {
        legendRejuvenation.setMaxMultiplier(newMaxMultiplier);
    }

    /**
     * @notice Set New Rejuvenation ReJu Emission Rate
     *
     * @dev Resets the [`_reJuPerBlock`](docs/LegendsRejuvenation#setReJuPerBlock) rate. Only callable by *the* `LAB_ADMIN`.
     *
     * @param newReJuEmissionRate Amount of *reJu* a Legend gains per block while in their `_rejuvenationPod`
     */
    function setReJuPerBlock(uint256 newReJuEmissionRate)
        public
        onlyRole(LAB_ADMIN)
    {
        legendRejuvenation.setReJuPerBlock(newReJuEmissionRate);
    }

    /**
     * @notice Set New Rejuvenation Slot Threshold
     *
     * @dev Resets the [`_ReJuNeededPerSlot`](docs/LegendsRejuvenation#setReJuNeededPerSlot) to restore a *blending instance*. Only callable by *the* `LAB_ADMIN`.
     *
     * @param newReJuNeededPerSlot Amount of *reJu* needed to rejuvenate (1) blending slot
     */
    function setReJuNeededPerSlot(uint256 newReJuNeededPerSlot)
        public
        onlyRole(LAB_ADMIN)
    {
        legendRejuvenation.setReJuNeededPerSlot(newReJuNeededPerSlot);
    }

    /**
     * @dev Admin Override Functions
     *
     * :::caution
     *
     * Any functionality that would fall into an override of a players asset should be used **extremely** sparingly, if ever.
     * The smart-contracts should be designed well enough to prevent unwanted player behavior prior to deploying.
     *
     * :::
     *
     * :::note
     *
     * Unfortunately, due to the minor [naming vulnerability](docs/vulnerabilities#naming) the ability to reset a Legend's name,
     * with the permission of the community, was included.
     *
     * :::
     *
     */
    uint256 private _reportThreshold = 5;

    /* legendId => reportCount */
    mapping(uint256 => uint256) private _reportCount;

    /* legendId => reporterAddress => hasReported */
    mapping(uint256 => mapping(address => bool)) private _hasReported;

    event NameReported(uint256 indexed legendId, uint256 reportCount);

    /**
     * @notice Report A Legend ONLY Because It's Name Is Vulgar
     *
     * @dev Allows a user to report a Legend with an offensive name, and put the power in the community to
     * determine what they find offensive. `LAB_TECH`s and *the* `LAB_ADMIN` should **never** report a `legendId`.
     *
     * :::note
     *
     * Once an address has reported a `legendId`, they will ot be able to report that Legend again; even after the name reset.
     * After a Legend has it's name reset, it's `_reportCount` will reset to (0),
     *
     * :::
     *
     * @param legendId ID of Legend being reported
     */
    function reportVulgarLegend(uint256 legendId) public {
        require(
            !_hasReported[legendId][msg.sender],
            "You Have Already Reported This Legend's Name"
        );

        // require(_checkRole(_, msg.sender));

        _hasReported[legendId][msg.sender] = true;

        _reportCount[legendId] += 1;

        emit NameReported(legendId, _reportCount[legendId]);
    }

    /**
     * @notice Reset A Legend's Name
     *
     * @dev If a Legend's name has been reported enough times to reach the `_reportThreshold` a `LAB_TECH` is given
     * authorization to reset the Legend's name to the base name. Calls `resetLegendName` in [**LegendsNFT**](docs/legend/LegendsNFT#resetLegendName)
     *
     * @param legendId ID of Legend having it's name reset
     */
    function resetLegendName(uint256 legendId) public onlyRole(LAB_TECH) {
        if (_reportCount[legendId] < _reportThreshold) {
            revert("Threshold Not Reached For Admin To Call");
        }

        legendsNFT.resetLegendName(legendId);

        _reportCount[legendId] = 0;
    }

    /**
     * @notice Set New Vulgar-Name Report Threshold
     *
     * @dev Resets the `_reportThreshold`. Only callable by a `LAB_TECH`.
     *
     * @param newReportThreshold Number of times a Legend must be reported before a `LAB_TECH` can reset the Legend's name.
     */
    function setReportThreshold(uint256 newReportThreshold)
        public
        onlyRole(LAB_ADMIN)
    {
        _reportThreshold = newReportThreshold;
    }
}
