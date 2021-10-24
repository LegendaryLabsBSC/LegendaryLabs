// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../lab/LegendsLaboratory.sol";
// import "../legend/LegendsNFT.sol";
import "./RejuvenationPod.sol";

pragma solidity 0.8.4;

contract LegendRejuvenation is IRejuvenationPod, ReentrancyGuard {
    using Counters for Counters.Counter;

    LegendsLaboratory lab;
    // LegendsNFT nft;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    //TODO: no-loss-lottery extension support

    uint256 public minimumSecure; // what if min is raised and amount in pod is lower than min ?

    uint256 private reJuNeededPerSlot = 300000;

    // BSC blocks-per-day: ~28750 ; Matic blocks-per-day: ~43200
    // uint256 internal ReJuPerBlock;// commented for testing
    uint256 private reJuPerBlock = 1; // testing with BSC count in mind ~10 days per slot

    uint256 private multiplyEvery = 1000; // will be same var as minimum ?

    uint256 private maxMultiplier = 5;

    uint256 private maxBlendingSlots = 4; // testing variable

    mapping(uint256 => RejuvenationPod) public rejuvenationPod;

    //TODO: 'must be initialized' modifier

    constructor() {
        lab = LegendsLaboratory(msg.sender);
    }

    function enterRejuvenationPod(
        address _nftContract,
        uint256 _legendId,
        uint256 _tokensToSecure
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(_nftContract);
        RejuvenationPod storage r = rejuvenationPod[_legendId];

        // require(lab.fetchIsListable(_legendId), "Not eligible"); // commented out for testing
        require(r.status != PodStatus.Occupied, "Legend in pod");
        require(
            _tokensToSecure >= minimumSecure,
            "amount must be minimum or greater"
        ); // can put in more than max multiplier but will not increase reju, will raise odds of no-loss-lottery win

        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        // if (r.status == PodStatus.Uninitialized) {
        //     _initializePod(_legendId, _nftContract);
        // }

        r.nftContract = _nftContract;

        r.visit.depositedBy = msg.sender;
        r.visit.depositBlock = block.number;
        r.visit.offspringCount = lab.fetchBlendingCount(_legendId);
        // r.visit.offspringCount = nft
        //     .fetchLegendMetadata(_legendId)
        //     .blendingInstancesUsed;
        r.visit.multiplier = _calculateMultiplier(_tokensToSecure);

        lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            _tokensToSecure
        );
        r.visit.tokenAmountSecured = _tokensToSecure;

        r.status = PodStatus.Occupied;

        // emit
    }

    function leaveRejuvenationPod(uint256 _legendId) public {
        RejuvenationPod storage r = rejuvenationPod[_legendId];

        require(r.visit.depositedBy == msg.sender);
        require(r.status == PodStatus.Occupied, "Legend not in pod");

        r.previousRemovalTime = block.timestamp;
        r.status = PodStatus.Unoccupied;

        // return tokens
        removeSecuredTokens(_legendId, r.visit.tokenAmountSecured);

        // return legend
        IERC721(r.nftContract).transferFrom(
            address(this),
            r.visit.depositedBy,
            _legendId
        );
    }

    // needs reentrancy ?
    function removeSecuredTokens(uint256 tokenId, uint256 amountToRemove)
        public
    {
        RejuvenationPod storage r = rejuvenationPod[tokenId];

        require(msg.sender == r.visit.depositedBy, "Not authorized");
        require(
            amountToRemove != 0 && amountToRemove <= r.visit.tokenAmountSecured,
            "Invalid amount"
        );

        _restoreBlendingSlots(tokenId);

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
        RejuvenationPod storage r = rejuvenationPod[tokenId];

        require(msg.sender == r.visit.depositedBy, "Not authorized");
        require(r.status == PodStatus.Occupied);

        _restoreBlendingSlots(tokenId);

        lab.legendToken().transferFrom( // ? lab or this contract
            msg.sender,
            address(this),
            amountToSecure
        );

        uint256 newAmount = r.visit.tokenAmountSecured + amountToSecure;

        r.visit.tokenAmountSecured = newAmount;
        r.visit.multiplier = _calculateMultiplier(newAmount);
    }

    // function _initializePod(uint256 _legendId, address _nftContract) internal {
    //     RejuvenationPod storage r = rejuvenationPod[_legendId];

    //     r.initializedAt = block.timestamp;
    //     r.nftContract = _nftContract;
    //     r.legendId = _legendId;
    // }

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

    function _calculateRejuvenation(uint256 tokenId)
        private
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        RejuvenationPod storage r = rejuvenationPod[tokenId]; // remove if no other logic added requires

        uint256 maxReJu = (reJuNeededPerSlot * maxBlendingSlots);

        uint256 earnedReJu = ((reJuPerBlock * r.visit.multiplier) *
            (block.number - r.visit.depositBlock)) + r.remainderReJu;

        if (earnedReJu > maxReJu) {
            earnedReJu = maxReJu;
        }

        uint256 regainedSlots = earnedReJu / reJuNeededPerSlot;

        // ReJu carries over if nft withdrawn before max rejuvenation
        uint256 remainderReJu = earnedReJu -
            (regainedSlots * reJuNeededPerSlot);

        return (earnedReJu, regainedSlots, remainderReJu);
    }

    function _restoreBlendingSlots(uint256 _tokenId)
        private
    //only LRejuvenation
    {
        (
            uint256 earnedReJu, // needed to return ?
            uint256 regainedSlots,
            uint256 remainderReJu
        ) = _calculateRejuvenation(_tokenId);

        uint256 currentOffspringCount = lab.fetchBlendingCount(_tokenId);
        // uint256 currentOffspringCount = nft
        //     .fetchLegendMetadata(_tokenId)
        //     .blendingInstancesUsed;
        uint256 newOffspringCount = currentOffspringCount - regainedSlots;

        // lab.restoreBreedingSlots(_tokenId) = newOffspringCount; // inside nft.sol ; only reju

        rejuvenationPod[_tokenId].remainderReJu = remainderReJu;
    }

    //TODO:FE: Alert user when max is reach rejuvenation will stop
    function fetchRejuvenationProgress(uint256 tokenId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (_calculateRejuvenation(tokenId));
    }

    //TODO: setters
}
