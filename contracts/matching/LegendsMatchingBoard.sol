// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../lab/LegendsLaboratory.sol";
import "../token/LegendToken.sol";
import "./match/LegendMatching.sol";

contract LegendsMatchingBoard is LegendMatching, ReentrancyGuard {
    using Counters for Counters.Counter;

    LegendsLaboratory _lab;

    modifier onlyLab() {
        require(msg.sender == address(_lab), "Not Called By Lab Admin");
        _;
    }

    event TokensClaimed(address indexed payee, uint256 amount);
    event EggClaimed(
        address indexed recipient,
        uint256 matchingId,
        uint256 childId
    );

    event Relisting(
        uint256 indexed matchingId,
        uint256 indexed legendId,
        bool isRelisted
    );

    constructor() {
        _lab = LegendsLaboratory(msg.sender);
    }

    function createLegendMatching(
        address nftContract,
        uint256 legendId,
        uint256 price
    ) external nonReentrant {
        IERC721 legendsNFT = IERC721(nftContract);

        require(
            _lab.isListable(legendId),
            "Caller Is Not Owner Or Legend Has Not Hatched"
        );
        require(_lab.isBlendable(legendId));
        require(price != 0, "Price Can Not Be 0");

        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        _createLegendMatching(nftContract, legendId, price);
    }

    function matchWithLegend(uint256 matchingId, uint256 legendId)
        external
        nonReentrant
    {
        LegendMatching memory m = _legendMatching[matchingId];
        IERC721 legendsNFT = IERC721(m.nftContract);

        require(m.status == MatchingStatus.Open, "Legend Matching Not Open");
        require(
            m.surrogate != msg.sender,
            "Seller Not Authorized To Purchase Own Matching"
        );

        require(
            _lab.isListable(legendId),
            "Caller Is Not Owner Or Legend Has Not Hatched"
        );
        require(_lab.isBlendable(legendId));

        // transfer breeder's token to contract .. put in natspec
        legendsNFT.transferFrom(msg.sender, address(this), legendId);

        uint256 blendingCost = (_lab.fetchBlendingCost(m.surrogateToken) +
            _lab.fetchBlendingCost(legendId)) / 2;

        // make sure blender has to have enough LGND tokens for payment + blendingCost ; prior to nft transfer
        uint256 matchingPayment = m.price + blendingCost;
        _lab.legendToken().transferFrom(
            msg.sender,
            address(this),
            matchingPayment
        );

        uint256 childId = _lab.legendsNFT().blendLegends(
            address(this),
            m.surrogateToken,
            legendId
            // false
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

    function cancelLegendMatching(uint256 matchingId) external nonReentrant {
        LegendMatching memory m = _legendMatching[matchingId];

        require(msg.sender == m.surrogate, "Caller Did Not List Legend");
        require(m.status == MatchingStatus.Open, "Legend Matching Not Open");

        _cancelLegendMatching(matchingId);

        IERC721(m.nftContract).safeTransferFrom(
            address(this),
            m.surrogate,
            m.surrogateToken
        );
    }

    function decideMatchingRelist(uint256 matchingId, bool _isRelisted)
        external
        nonReentrant
    {
        LegendMatching memory m = _legendMatching[matchingId];

        require(msg.sender == m.surrogate, "Caller Did Not List Legend");
        require(
            m.status == MatchingStatus.Closed,
            "Legend Matching Not Closed"
        );

        /// @notice price will stay the same if relisting legend
        if (_isRelisted) {
            require(_lab.isBlendable(m.surrogateToken));

            _createLegendMatching(m.nftContract, m.surrogateToken, m.price);
        } else {
            IERC721(m.nftContract).safeTransferFrom(
                address(this),
                m.surrogate,
                m.surrogateToken
            );
        }

        emit Relisting(matchingId, m.surrogateToken, _isRelisted);
    }

    function claimEgg(uint256 matchingId) external nonReentrant {
        LegendMatching memory m = _legendMatching[matchingId];

        require(msg.sender == m.breeder, "Caller Did Not Purchase Matching");
        require(
            m.status == MatchingStatus.Closed,
            "Legend Matching Not Closed"
        );

        uint256 eggOwed = _eggPending[matchingId][m.breeder];
        require(eggOwed != 0, "Egg Owed Is Equal To 0");

        _eggPending[matchingId][m.breeder] = 0;

        _lab.legendsNFT().safeTransferFrom(address(this), m.breeder, eggOwed);

        emit EggClaimed(m.breeder, matchingId, eggOwed);
    }

    function claimTokens() external nonReentrant {
        uint256 tokensOwed = fetchTokensPending(msg.sender);
        require(tokensOwed != 0, "Address Is Owed 0 LGND Tokens");

        _tokensPending[msg.sender] = 0;

        _lab.legendToken().transferFrom(address(this), msg.sender, tokensOwed);

        emit TokensClaimed(msg.sender, tokensOwed);
    }

    function fetchMatchingCounts()
        public
        view
        virtual
        override
        returns (
            Counters.Counter memory,
            Counters.Counter memory,
            Counters.Counter memory
        )
    {
        return (_matchingIds, _matchingsClosed, _matchingsCancelled);
    }

    function fetchLegendMatching(uint256 matchingId)
        public
        view
        virtual
        override
        isValidMatching(matchingId)
        returns (LegendMatching memory)
    {
        return _legendMatching[matchingId];
    }

    function fetchTokensPending(address recipient)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _tokensPending[recipient];
    }

    function fetchEggOwed(uint256 matchingId, address breeder)
        public
        view
        virtual
        override
        isValidMatching(matchingId)
        returns (uint256)
    {
        return _eggPending[matchingId][breeder];
    }
}
