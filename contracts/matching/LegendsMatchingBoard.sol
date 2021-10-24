// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

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

        require(lab.fetchIsListable(_legendId), "Not Eligible");
        require(lab.legendsNFT().isBlendable(_legendId));
        require(_price != 0, "Price can not be 0");

        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        _createLegendMatching(_nftContract, _legendId, _price);
    }

    function matchWithLegend(uint256 _matchingId, uint256 _legendId)
        external
        nonReentrant
    {
        LegendMatching memory m = legendMatching[_matchingId];
        IERC721 legendsNFT = IERC721(m.nftContract);

        require(m.status == MatchingStatus.Open);
        require(m.surrogate != msg.sender, "Seller not authorized");
        // make sure blender has to have enough LGND tokens for payment + blendingCost

        require(lab.fetchIsListable(_legendId), "Not Eligible");
        require(lab.fetchIsBlendable(_legendId)); // shouldnt be needed but double check

        // uint256 blendingCost = (lab.fetchBlendingCost(m.surrogateToken) +
        //     lab.fetchBlendingCost(_legendId)) / 2;

        // uint256 matchingBoardFee = (m.price * _matchingBoardFee) / 100; // ?? should there be a fee here theres already payment and blendburn
        // lab.legendToken().matchingBurn(msg.sender, matchingBoardFee); // may become liqlock

        // uint256 matchingPayment = m.price + blendingCost;
        uint256 matchingPayment = m.price; // blending function should still pull tokens from msg.sender/blender
        lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            matchingPayment
        );

        // transfer breeder's token to contract .. put in natspec
        legendsNFT.transferFrom(msg.sender, address(this), _legendId);

        uint256 childId = lab.legendsNFT().blendLegends(
            address(this),
            m.surrogateToken,
            _legendId,
            false
        );

        _matchWithLegend(
            _matchingId,
            msg.sender,
            childId,
            _legendId,
            matchingPayment
        );

        legendsNFT.safeTransferFrom(address(this), msg.sender, _legendId);
    }

    function cancelLegendMatching(uint256 _matchingId) external nonReentrant {
        LegendMatching memory m = legendMatching[_matchingId];

        require(msg.sender == m.surrogate);
        require(m.status == MatchingStatus.Open);

        IERC721(m.nftContract).safeTransferFrom(
            address(this),
            m.surrogate,
            m.surrogateToken
        );

        _cancelLegendMatching(_matchingId);
    }

    function decideMatchingRelist(uint256 _matchingId, bool _isRelisted)
        external
        nonReentrant
    {
        LegendMatching memory m = legendMatching[_matchingId];

        require(msg.sender == m.surrogate);
        require(m.status == MatchingStatus.Closed);

        /// @notice price will stay the same if relisting legend
        if (_isRelisted) {
            require(lab.legendsNFT().isBlendable(m.surrogateToken));

            _createLegendMatching(m.nftContract, m.surrogateToken, m.price);
        } else {
            IERC721(m.nftContract).safeTransferFrom(
                address(this),
                m.surrogate,
                m.surrogateToken
            );
        }

        emit Relisting(_matchingId, m.surrogateToken, _isRelisted);
    }

    function claimEgg(uint256 _matchingId) external nonReentrant {
        LegendMatching memory m = legendMatching[_matchingId];

        require(msg.sender == m.breeder);
        require(m.status == MatchingStatus.Closed);

        uint256 eggOwed = _eggOwed[_matchingId][m.breeder];
        require(eggOwed != 0, "No eggs owed");

        _eggOwed[_matchingId][m.breeder] = 0;

        lab.legendsNFT().safeTransferFrom(address(this), m.breeder, eggOwed);

        emit EggClaimed(_matchingId, m.breeder, eggOwed);
    }

    function claimTokens() external nonReentrant {
        uint256 tokensOwed = fetchTokensOwed();
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

    function fetchTokensOwed() public view returns (uint256) {
        return _tokensOwed[msg.sender];
    }

    function setMatchingBoardFee(uint256 newFee) public onlyLab {
        _matchingBoardFee = newFee;
    }
}
