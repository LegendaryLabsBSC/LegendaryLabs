// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ILegendMatch.sol";

/**
 * @dev The **LegendMatching** inherits from [**ILegendMatch**](./ILegendMatch) to define a Legend NFT *matching listing*.
 * This contract acts as a ledger for a *matching listing*, recording important data and events during the lifecycle of a *matching listing*.
 * This contract is inherited by the [**LegendsMatchingBoard**](./LegendsMatchingBoard).
 */
abstract contract LegendMatching is ILegendMatch {
    using Counters for Counters.Counter;

    modifier isValidMatching(uint256 matchingId) {
        if (matchingId < _matchingIds.current()) {
            revert("Matching ID Not Valid");
        }
        _;
    }

    Counters.Counter internal _matchingIds;
    Counters.Counter internal _matchingsClosed;
    Counters.Counter internal _matchingsCancelled;

    /* matchingId => matchingDetails */
    mapping(uint256 => LegendMatching) internal _legendMatching;

    /* playerAddress => amount */
    mapping(address => uint256) internal _tokensPending;

    /* matchingId => blenderAddress => childId */
    mapping(uint256 => mapping(address => uint256)) internal _eggPending;

    /**
     * @dev Emitted when a `blending` address has claimed the *child Legend* owed to them from a particular *matching listing*.
     * [`claimEgg`](./LegendsMatchingBoard#claimegg)
     */
    event EggClaimed(
        address indexed recipient,
        uint256 matchingId,
        uint256 childId
    );

    /**
     * @dev Emitted when a `surrogate` address has claimed LGND tokens owed to them from *matching listings*.
     * [`claimTokens`](./LegendsMatchingBoard#claimtokens)
     */
    event TokensClaimed(address indexed payee, uint256 amount);

    /**
     * @dev Emitted when a `surrogateLegend` is relisted on the **LegendsMatchingBoard** rather than immediately returned to the owner.
     * [`decideMatchingRelist`](./LegendsMatchingBoard#decidematchrelist)
     */
    event DecideRelisting(
        uint256 indexed matchingId,
        uint256 indexed legendId,
        bool isRelisted
    );

    /**
     * @dev Creates a new Legend NFT *matching listing*.
     * Called from [**LegendsMatchingBoard**](./LegendsMatchingBoard#createlegendmatching)
     *
     * @param nftContract Address of the ERC721 contract
     * @param legendId ID of Legend being listed for a *matching*.
     * @param price Amount of LGND tokens the `surrogate` request in order for a player to blend with their `surrogateLegend`.
     */
    function _createLegendMatching(
        address nftContract,
        uint256 legendId,
        uint256 price
    ) internal {
        _matchingIds.increment();
        uint256 matchingId = _matchingIds.current();

        LegendMatching storage m = _legendMatching[matchingId];
        m.matchingId = matchingId;
        m.createdAt = block.timestamp;
        m.nftContract = nftContract;
        m.surrogate = msg.sender;
        m.surrogateLegend = legendId;
        m.blender = address(0);
        m.price = price;
        m.status = MatchingStatus.Open;

        emit MatchingStatusChanged(matchingId, MatchingStatus.Open);
    }

    /**
     * @dev Records the details of a successful *matching listing* and changes the state to `Closed`.
     * Called from [**LegendsMatchingBoard**](./LegendsMatchingBoard#cancellegendmatching)
     *
     * :::important
     *
     * This function credits the `surrogate`/seller with their LGND tokens owed and the `blender`/buyer
     * with the *child Legend* owed. These payments are later withdrawn by the player calling the respective function
     * `claimTokens` & `claimEgg`.
     *
     *:::
     *
     *
     * @param matchingId ID of *matching listings*.
     * @param blender Address of player purchasing the *matching listing*.
     * @param blenderLegend ID of Legend NFT the *blender* used to make an offspring via the *matching listing*.
     * @param childId ID of *child Legend* created from *blending* via a *matching listing*.
     * @param matchingPayment The amount of LGND tokens owed to the `surrogate` address that created the *matching listing*.
     */
    function _matchWithLegend(
        uint256 matchingId,
        address blender,
        uint256 blenderLegend,
        uint256 childId,
        uint256 matchingPayment
    ) internal {
        LegendMatching storage m = _legendMatching[matchingId];

        m.blender = blender;
        m.blenderLegend = blenderLegend;
        m.childId = childId;
        m.status = MatchingStatus.Closed;

        _tokensPending[m.surrogate] += matchingPayment;
        _eggPending[matchingId][blender] = childId;

        _matchingsClosed.increment();

        emit MatchingStatusChanged(matchingId, MatchingStatus.Closed);
    }

    /**
     * @dev Changes the state of a *matching listing* to `Cancelled`.
     * Called from [**LegendsMatchingBoard**](./LegendsMatchingBoard#cancellegendmatching)
     *
     * @param matchingId ID of *matching listings*.
     */
    function _cancelLegendMatching(uint256 matchingId) internal {
        _legendMatching[matchingId].status = MatchingStatus.Cancelled;

        _matchingsCancelled.increment();

        emit MatchingStatusChanged(matchingId, MatchingStatus.Cancelled);
    }

    /**
     * @dev Implemented in [**LegendsMatchingBoard**](./LegendsMatchingBoard#fetchmatchingcounts)
     */
    function fetchMatchingCounts()
        public
        view
        virtual
        returns (
            Counters.Counter memory,
            Counters.Counter memory,
            Counters.Counter memory
        );

    /**
     * @dev Implemented in [**LegendsMatchingBoard**](./LegendsMatchingBoard#fetchtokenspending)
     */
    function fetchTokensPending()
        public
        view
        virtual
        returns (uint256);

    /**
     * @dev Implemented in [**LegendsMatchingBoard**](./LegendsMatchingBoard#fetcheggowed)
     */
    function fetchEggOwed(uint256 matchingId)
        public
        view
        virtual
        returns (uint256);
}
