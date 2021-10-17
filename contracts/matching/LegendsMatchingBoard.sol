// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../lab/LegendsLaboratory.sol";
import "../token/LegendToken.sol";
import "./match/LegendMatching.sol";

contract LegendsMatchingBoard is LegendMatching, ReentrancyGuard {
    using Counters for Counters.Counter;

    uint256 private _matchingBoardFee = 10;

    LegendsLaboratory lab;

    modifier onlyLab() {
        require(msg.sender == address(lab), "Not Authorized");
        _;
    }

    event TokensClaimed(address payee, uint256 amount);
    event EggClaimed(uint256 matchingId, address recipient, uint256 childId);
    event Relisting(uint256 matchingId, uint256 legendId, bool isRelisted);

    constructor() {
        lab = LegendsLaboratory(msg.sender);
    }

    function createLegendMatching(
        address _nftContract,
        uint256 _legendId,
        uint256 _price
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(_nftContract);

        require(legendsNFT.ownerOf(_legendId) == msg.sender);
        require(lab.legendsNFT().isBlendable(_legendId));
        require(_price > 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        _createLegendMatching(_nftContract, _legendId, _price);
    }

    function matchWithLegend(uint256 matchingId, uint256 legendId)
        public
        nonReentrant
    {
        LegendMatching memory m = legendMatching[matchingId];
        IERC721 legendsNFT = IERC721(m.nftContract);

        require(m.status == MatchingStatus.Open);
        require(m.surrogate != msg.sender, "Seller not authorized");

        //TODO: require legend is breedable - wait on NFT rework

        uint256 matchingBoardFee = (m.price * _matchingBoardFee) / 100;
        lab.legendToken().matchingBurn(msg.sender, matchingBoardFee); // may become liqlock

        uint256 matchingPayment = m.price - matchingBoardFee;
        lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            matchingPayment
        );

        // transfer breeder's token to contract .. put in natspec
        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        uint256 childId = lab.legendsNFT().blendLegends(
            address(this),
            m.surrogateToken,
            legendId,
            false
        );

        _matchWithLegend(
            matchingId,
            msg.sender,
            childId,
            legendId,
            matchingPayment
        );

        legendsNFT.safeTransferFrom(address(this), msg.sender, legendId);
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
        nonReentrant
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

        emit Relisting(matchingId, m.surrogateToken, isRelisted);
    }

    function claimEgg(uint256 matchingId) external nonReentrant {
        LegendMatching memory m = legendMatching[matchingId];

        require(msg.sender == m.breeder);
        require(m.status == MatchingStatus.Closed);

        uint256 eggOwed = _eggOwed[matchingId][m.breeder];
        require(eggOwed != 0, "No eggs owed");

        _eggOwed[matchingId][m.breeder] = 0;

        lab.legendsNFT().safeTransferFrom(address(this), m.breeder, eggOwed);

        emit EggClaimed(matchingId, m.breeder, eggOwed);
    }

    function checkTokensOwed() public view returns (uint256) {
        return _tokensOwed[msg.sender];
    }

    function claimTokens() external nonReentrant {
        uint256 tokensOwed = _tokensOwed[msg.sender];
        require(tokensOwed != 0, "Address is owed 0");

        _tokensOwed[msg.sender] = 0;

        lab.legendToken().transferFrom(address(this), msg.sender, tokensOwed);

        emit TokensClaimed(msg.sender, tokensOwed);
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

    function setMatchingBoardFee(uint256 newFee) public onlyLab {
        _matchingBoardFee = newFee;
    }
}
