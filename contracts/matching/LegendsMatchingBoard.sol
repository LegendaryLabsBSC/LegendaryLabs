// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../control/LegendsLaboratory.sol";
import "../token/LegendToken.sol";
import "./LegendMatching.sol";

contract LegendsMatchingBoard is LegendMatching, ReentrancyGuard {
    using Counters for Counters.Counter;

    // uint256 public _matingBoardFee; // commented for testing
    uint256 public _matchingBoardFee = 10;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab));
        _;
    }

    constructor() {
        lab = LegendsLaboratory(msg.sender);
    }

    function fetchMatchingCounts()
        public
        view
        returns (Counters.Counter[3] memory)
    {
        Counters.Counter[3] memory counts = [
            _matchingIds,
            _matchingsClosed,
            _matchingsCancelled
        ];

        return counts;
    }

    function createLegendMatching(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public nonReentrant {
        IERC721 legendsNFT = LegendsNFT(nftContract);

        require(legendsNFT.ownerOf(tokenId) == msg.sender);
        require(price > 0, "Price can not be 0");

        //TODO: require legend is breedable - wait on NFT rework

        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        _createLegendMatching(nftContract, tokenId, price);
    }

    function matchWithLegend(uint256 matchingId, uint256 tokenId)
        public
        nonReentrant
    {
        LegendMatching memory m = legendMatching[matchingId];
        IERC721 legendsNFT = LegendsNFT(m.nftContract);

        require(m.status == MatchingStatus.Open);
        require(m.surrogate != msg.sender);

        uint256 matchingBoardFee = (m.price * _matchingBoardFee) / 100;
        lab.legendToken().matchingBurn(msg.sender, matchingBoardFee); // may become liqlock

        uint256 matchingPayment = m.price - matchingBoardFee;
        lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            matchingPayment
        );

        // transfer breeder's token to contract
        legendsNFT.transferFrom(msg.sender, address(this), tokenId);

        uint256 childId = lab.legendsNFT().breed(
            address(this),
            m.surrogateToken,
            tokenId,
            false
        );

        _matchWithLegend(
            matchingId,
            msg.sender,
            childId,
            tokenId,
            matchingPayment
        );

        // return the  breeder token to the owner
        legendsNFT.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function cancelLegendMatching(uint256 matchingId) public nonReentrant {
        LegendMatching memory m = legendMatching[matchingId];

        require(msg.sender == m.surrogate);
        require(m.status == MatchingStatus.Open);

        IERC721(m.nftContract).safeTransferFrom(
            address(this),
            m.surrogate,
            m.surrogateToken
        );

        _cancelLegendMatching(matchingId);
    }

    function decideMatchingRelist(uint256 matchingId, bool isRelisted)
        external
        payable
    {
        LegendMatching memory m = legendMatching[matchingId];

        require(msg.sender == m.surrogate);
        require(m.status == MatchingStatus.Closed);

        /// @notice price can not be changed if relisting legend
        if (isRelisted) {
            _createLegendMatching(m.nftContract, m.surrogateToken, m.price);
        } else {
            IERC721(m.nftContract).safeTransferFrom(
                address(this),
                m.surrogate,
                m.surrogateToken
            );
        }
    }

    function claimEgg(uint256 matchingId) external {
        LegendMatching memory m = legendMatching[matchingId];

        require(msg.sender == m.breeder);
        require(m.status == MatchingStatus.Closed);

        uint256 eggOwed = _eggOwed[matchingId][m.breeder];
        require(eggOwed != 0, "No eggs owed");

        _eggOwed[matchingId][m.breeder] = 0;

        lab.legendsNFT().safeTransferFrom(address(this), m.breeder, eggOwed);
    }

    function checkTokensOwed() public view returns (uint256) {
        return _tokensOwed[msg.sender];
    }

    function claimTokens() external payable {
        uint256 tokensOwed = _tokensOwed[msg.sender];
        require(tokensOwed != 0, "Address is owed 0");

        _tokensOwed[msg.sender] = 0;

        lab.legendToken().transferFrom(address(this), msg.sender, tokensOwed);
    }

    function setMatchingBoardFee(uint256 newFee) public onlyLab {
        _matchingBoardFee = newFee;
    }
}
