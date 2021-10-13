// SPDX-License-Identifier: MIT

import "./RejuvenationPool.sol";
import "../control/LegendsLaboratory.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../legend/LegendsNFT.sol";

pragma solidity ^0.8.4;

contract LegendRejuvenation is IRejuvenationPool {
    using Counters for Counters.Counter;
    // Counters.Counter private _poolIds;

    uint256 public minimumSecure;
    // uint256 internal rejuNeededPerSlot; // commented for testing
    uint256 internal rejuNeededPerSlot = 300000;
    // BSC blocks-per-day: ~28750 ; Matic blocks-per-day: ~43200
    // uint256 internal ReJuPerBlock;// commented for testing
    uint256 internal ReJuPerBlock = 1; // testing with BSC count in mind

    LegendsLaboratory lab;
    LegendsNFT nft;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    constructor() {
        lab = LegendsLaboratory(msg.sender);
    }

    mapping(uint256 => RejuvenationPool) public rejuvenationPool;

    function dropOffAtPool(
        address nftContract,
        uint256 tokenId,
        uint256 tokensToSecure
    ) public {
        IERC721 legendsNFT = IERC721(nftContract);
        RejuvenationPool storage r = rejuvenationPool[tokenId];

        require(legendsNFT.ownerOf(tokenId) == msg.sender); // ? reworkable; to modifier?
        require(r.status != PoolStatus.Occupied, "Legend in pool");
        require(
            tokensToSecure < minimumSecure,
            "secure must be minimum or greater"
        );
        // require legend does not have 0 used breeding instances

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        if (r.status == PoolStatus.Uninitialized) {
            r.initializedAt = block.timestamp;
            r.nftContract = nftContract;
            r.tokenId = tokenId;
        }

        r.visit.depositedBy = msg.sender;
        r.visit.depositBlock = block.number;
        r.visit.offspringCount = nft.legendData[tokenId].offspringCount; // do this for marketplace:royalties ? or have lab control it

        r.tokenAmountSecured = tokensToSecure;

        r.status = PoolStatus.Occupied;

        // emit
    }

    function pickUpFromPool(uint256 tokenId, bool withdrawSecuredTokens)
        public
    {
        RejuvenationPool storage r = rejuvenationPool[tokenId];
        IERC721 legendsNFT = IERC721(r.nftContract);

        require(r.visit.depositedBy == msg.sender);
        require(r.status == PoolStatus.Occupied, "Legend not in pool");

        // modify legend state
        (
            uint256 earnedReJu, // needed to return ?
            uint256 regainedSlots,
            uint256 _remainderReJu
        ) = _calculateRejuvenation(tokenId);

        _restoreBreedingSlots(tokenId, regainedSlots);

        // modify pool state
        r.remainderReJu = _remainderReJu;
        r.previousRemovalTime = block.timestamp;
        r.status = PoolVisit.Unoccupied;

        // return legend
        IERC721(r.nftContract).transferFrom(
            address(this),
            r.depositedBy,
            r.tokenId
        );
    }

    function _calculateRejuvenation(uint256 tokenId)
        private
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        RejuvenationPool storage r = rejuvenationPool[tokenId]; // remove if no other logic added requires

        uint256 earnedReJu = ReJuPerBlock *
            (block.number - r.visit.depositBlock);

        uint256 regainedSlots = earnedReJu / rejuNeededPerSlot;

        uint256 remainderReJu = earnedReJu -
            (regainedSlots * rejuNeededPerSlot);

        return (earnedReJu, regainedSlots, remainderReJu);
    }

    function _restoreBreedingSlots(uint256 _tokenId, uint256 _regainedSlots)
        private
    //only LRejuvenation
    {
        uint256 currentOffspringCount = nft.legendData[_tokenId].offspringCount;
        uint256 newOffspringCount = nft.legendData[_tokenId].offspringCount -
            _regainedSlots;

        nft.legendData[_tokenId].offspringCount = newOffspringCount;
    }
}
