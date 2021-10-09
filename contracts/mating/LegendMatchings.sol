// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../marketplace/listings/LegendSale.sol";

//TODO: make function without implementation
//TODO: add in a closing fee that is either burned or added to liquidity
// ? make LegendListing the most derived

abstract contract LegendMatchings is LegendSale {
    using Counters for Counters.Counter;
    Counters.Counter internal _matchIds;
    Counters.Counter internal _matchingsClosed;
    Counters.Counter internal _matchingsCancelled;

    uint256 public matchingPlatformFee = 10; //TODO: make setter function

    mapping(uint256 => mapping(address => uint256)) internal _tokensOwed; 
    mapping(uint256 => mapping(address => uint256)) internal _eggOwed;

    struct LegendMatching {
        uint256 matchId;
        address nftContract;
        uint256 surrogateToken;
        address surrogate;
        address breeder;
        uint256 breederToken;
        uint256 childId;
        uint256 price;
        ListingStatus status;
    }
    mapping(uint256 => LegendMatching) public legendMatching;

    function _createLegendMatching(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) internal {
        _matchIds.increment();
        uint256 matchId = _matchIds.current();

        LegendMatching storage m = legendMatching[matchId];
        m.matchId = matchId;
        m.nftContract = _nftContract;
        m.surrogateToken = _tokenId;
        m.surrogate = msg.sender;
        m.breeder = address(0);
        m.price = _price;
        m.status = ListingStatus.Open;

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    //TODO: standardize private/public naming scheme
    function _matchWithLegend(
        uint256 matchId,
        address _breeder,
        uint256 _childId,
        uint256 _tokenId,
        uint256 tokensOwed
    ) internal {
        legendMatching[matchId].breeder = _breeder;
        legendMatching[matchId].breederToken = _tokenId;
        legendMatching[matchId].childId = _childId;
        legendMatching[matchId].status = ListingStatus.Closed;

        _legendOwed[matchId][legendMatching[matchId].surrogate] = legendMatching[
            matchId
        ].surrogateToken;
        _tokensOwed[matchId][legendMatching[matchId].surrogate] += tokensOwed;

        _eggOwed[matchId][_breeder] = _childId;

        _matchingsClosed.increment();
    }

    function _cancelLegendMatching(uint256 matchId) internal {
        legendMatching[matchId].status = ListingStatus.Cancelled;

        _matchingsCancelled.increment();

        // emit ListingStatusChanged(listingId, ListingStatus.Cancelled);
    }
}
