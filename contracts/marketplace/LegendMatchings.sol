// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol"; // could be inherited from listing
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // could be inherited from listing
import "../legend/LegendsNFT.sol";

//TODO: make function without implementation
//TODO: add in a closing fee that is either burned or added to liquidity
// ? make LegendListing the most derived

abstract contract LegendMatchings {
    using Counters for Counters.Counter; // could be inherited from listing
    Counters.Counter private _matchIds;
    Counters.Counter private _matchesClosed;
    Counters.Counter private _matchesCancelled;

    // uint256 public matchingPlatformFee; //TODO: make setter function
    uint256 public matchingPlatformFee = 10;

    enum MatchingStatus {
        // could be inherited from listing
        Open,
        Closed,
        Cancelled
    }
    struct LegendMatching {
        uint256 matchId;
        address nftContract;
        uint256 surrogateToken;
        address surrogate;
        address breeder;
        uint256 breederToken;
        uint256 childId;
        uint256 price;
        MatchingStatus status;
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
        m.surrogate = (msg.sender);
        m.breeder = (address(0));
        m.price = _price;
        m.status = MatchingStatus.Open;

        // emit ListingStatusChanged(listingId, ListingStatus.Open);
    }

    //TODO: standardize private/public naming scheme
    function _matchWithLegend(
        uint256 matchId,
        address _breeder,
        uint256 _childId,
        uint256 _tokenId
    ) internal {
        legendMatching[matchId].breeder = _breeder;
        legendMatching[matchId].breederToken = _tokenId;
        legendMatching[matchId].childId = _childId; 
        legendMatching[matchId].status = MatchingStatus.Closed;

        _matchesClosed.increment();
    }

    function _cancelLegendMatching(uint256 matchId) internal {
        legendMatching[matchId].status = MatchingStatus.Cancelled;

        _matchesCancelled.increment();

        // emit ListingStatusChanged(listingId, ListingStatus.Cancelled);
    }

    function fetchLegendMatchings()
        public
        view
        virtual
        returns (LegendMatching[] memory)
    {
        uint256 matchingCount = _matchIds.current();
        uint256 unclaimedMatchesCount = _matchIds.current() -
            (_matchesClosed.current() + _matchesCancelled.current());
        uint256 currentIndex = 0;

        LegendMatching[] memory matchings = new LegendMatching[](
            unclaimedMatchesCount
        );
        for (uint256 i = 0; i < matchingCount; i++) {
            if (legendMatching[i + 1].breeder == address(0)) {
                uint256 currentId = legendMatching[i + 1].matchId;
                LegendMatching storage currentListing = legendMatching[
                    currentId
                ];
                matchings[currentIndex] = currentListing;
                currentIndex++;
            }
        }
        return matchings;
    }
}
