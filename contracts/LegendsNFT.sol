// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./LegendsDNA.sol";
import "./LegendsMetadata.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract LegendsNFT is ERC721, Ownable, LegendsDNA, ILegendMetadata {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    using Strings for uint256;
    mapping(uint256 => string) private _tokenURIs;

    mapping(uint256 => LegendMetadata) public legendData;

    event createdDNA(uint256 newItemId);

    constructor() ERC721("Legend", "LEGEND") {}

    // function _setTokenURI(uint256 tokenId, string memory _tokenURI)
    //     internal
    //     virtual
    // {
    //     _tokenURIs[tokenId] = _tokenURI;
    // }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        _setTokenURI(tokenId, _tokenURI);
    }

    // Returns IPFS url associated with Legend as string
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    function tokenDATA(uint256 tokenId)
        public
        view
        virtual
        returns (uint256[10] memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        // legendData[newItemId] = LegendMetadata(newItemId, prefix, postfix, dna);
        LegendMetadata memory _legendData = legendData[tokenId];
        return _legendData.dna;
    }

    // Will need addition security
    // only master check + send to private function (mint to)
    // Will need IPFS URL + set URI
    // Link generator

    function mintRandom(
        address recipient,
        string memory prefix,
        string memory postfix,
        string memory uri
    ) public returns (uint256) {
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);

        uint256[10] memory dna = createDNA(newItemId);

        legendData[newItemId] = LegendMetadata(newItemId, prefix, postfix, dna);

        // LegendMetadata memory legendpp = legendData[newItemId];

        emit createdDNA(newItemId);
    
        _setTokenURI(newItemId, uri); // have this wait for IPFS to finish

        return newItemId;
    }
}
