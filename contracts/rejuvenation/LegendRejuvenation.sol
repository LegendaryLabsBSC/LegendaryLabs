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
    uint256 private rejuNeededPerSlot = 300000;
    // BSC blocks-per-day: ~28750 ; Matic blocks-per-day: ~43200
    // uint256 internal ReJuPerBlock;// commented for testing
    uint256 private ReJuPerBlock = 1; // testing with BSC count in mind ~10 days per slot
    uint256 private multiplyEvery = 1000; // will be same var as minimum ?
    uint256 private maxMultiplier = 5;
    uint256 private maxBreedableSlots = 4; // testing variable

    LegendsLaboratory lab;
    LegendsNFT nft;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    //TODO: 'must be initialized' modifier

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
        // r.visit.offspringCount = lab.fetchOffspringCount(tokenId);
        r.visit.offspringCount = nft.tokenMeta(tokenId).offspringCount;
        r.visit.multiplier = _calculateMultiplier(tokensToSecure);

        // make more secure, modifer-function in token contract ?
        lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            tokensToSecure
        );
        r.visit.tokenAmountSecured = tokensToSecure;

        r.status = PoolStatus.Occupied;

        // emit
    }

    function pickUpFromPool(uint256 tokenId) public {
        RejuvenationPool storage r = rejuvenationPool[tokenId];

        require(r.visit.depositedBy == msg.sender);
        require(r.status == PoolStatus.Occupied, "Legend not in pool");

        r.previousRemovalTime = block.timestamp;
        r.status = PoolStatus.Unoccupied;

        // return tokens
        removeSecuredTokens(tokenId, r.visit.tokenAmountSecured);

        // return legend
        IERC721(r.nftContract).transferFrom(
            address(this),
            r.visit.depositedBy,
            r.tokenId
        );
    }

    function removeSecuredTokens(uint256 tokenId, uint256 amountToRemove)
        public
    {
        RejuvenationPool storage r = rejuvenationPool[tokenId];

        require(msg.sender == r.visit.depositedBy, "Not authorized");
        require(
            amountToRemove != 0 && amountToRemove <= r.visit.tokenAmountSecured,
            "Invalid amount"
        );

        _restoreBreedingSlots(tokenId);

        uint256 newAmount = r.visit.tokenAmountSecured - amountToRemove;

        r.visit.tokenAmountSecured = newAmount;
        r.visit.multiplier = _calculateMultiplier(newAmount);

        lab.legendToken().transferFrom(
            address(this),
            msg.sender,
            amountToRemove
        );
    }

    function increaseSecuredTokens(uint256 tokenId, uint256 amountToSecure)
        external
    {
        RejuvenationPool storage r = rejuvenationPool[tokenId];

        require(msg.sender == r.visit.depositedBy, "Not authorized");
        require(r.status == PoolStatus.Occupied);

        _restoreBreedingSlots(tokenId);

        lab.legendToken().transferFrom( // ? lab or this contract
            msg.sender,
            address(this),
            amountToSecure
        );

        uint256 newAmount = r.visit.tokenAmountSecured + amountToSecure;

        r.visit.tokenAmountSecured = newAmount;
        r.visit.multiplier = _calculateMultiplier(newAmount);
    }

    function _calculateMultiplier(uint256 amount)
        private
        view
        returns (uint256)
    {
        uint256 multiplier = amount / multiplyEvery;
        if (multiplier > maxMultiplier) {
            multiplier = maxMultiplier;
        }

        return (multiplier);
    }

    //TODO:FE: Alert user when max is reach rejuvenation will stop
    function fetchRejuvenationProgress(uint256 tokenId)
        public
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (_calculateRejuvenation(tokenId));
    }

    function _calculateRejuvenation(uint256 tokenId)
        private
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        RejuvenationPool storage r = rejuvenationPool[tokenId]; // remove if no other logic added requires

        uint256 maxReJu = (rejuNeededPerSlot * maxBreedableSlots);

        uint256 earnedReJu = ((ReJuPerBlock * r.visit.multiplier) *
            (block.number - r.visit.depositBlock)) + r.remainderReJu;

        if (earnedReJu > maxReJu) {
            earnedReJu = maxReJu;
        }

        uint256 regainedSlots = earnedReJu / rejuNeededPerSlot;

        // ReJu carries over if nft withdrawn before max rejuvenation
        uint256 remainderReJu = earnedReJu -
            (regainedSlots * rejuNeededPerSlot);

        return (earnedReJu, regainedSlots, remainderReJu);
    }

    function _restoreBreedingSlots(uint256 _tokenId)
        private
    //only LRejuvenation
    {
        (
            uint256 earnedReJu, // needed to return ?
            uint256 regainedSlots,
            uint256 remainderReJu
        ) = _calculateRejuvenation(_tokenId);

        // uint256 currentOffspringCount = lab.fetchOffspringCount(_tokenId);
        uint256 currentOffspringCount = nft.tokenMeta(_tokenId).offspringCount; // do for royalties ?
        uint256 newOffspringCount = currentOffspringCount - regainedSlots;

        // lab.restoreBreedingSlots(_tokenId) = newOffspringCount; // inside nft.sol ; only reju

        rejuvenationPool[_tokenId].remainderReJu = remainderReJu;
    }
}
