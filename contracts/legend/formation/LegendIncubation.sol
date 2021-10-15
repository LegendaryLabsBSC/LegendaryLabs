// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract LegendIncubation {
    uint256 public incubationDuration;

    // TODO: fix in incubation rework
    // function isHatchable(uint256 tokenId, bool testToggle)
    //     public
    //     view
    //     returns (
    //         bool,
    //         uint256,
    //         uint256
    //     )
    // {
    //     bool hatchable;
    //     uint256 hatchableWhen;
    //     LegendMetadata memory l = legendMetadata[tokenId];
    //     if (!testToggle) {
    //         hatchableWhen = incubationDuration + l.birthDay;
    //     } else {
    //         hatchableWhen = block.timestamp;
    //     }
    //     if (hatchableWhen <= block.timestamp) {
    //         hatchable = true;
    //     }

    //     return (hatchable, hatchableWhen, block.timestamp);
    // }

    // function hatch(uint256 tokenId, string memory _tokenURI) public {
    //     // require(isHatchable(tokenId, false) === true); // can grab the struct elements before teh requie (nader dabit)
    //     _setTokenURI(tokenId, _tokenURI);
    //     // LegendMetadata memory legend = legendMetadata[tokenId];
    //     legendMetadata[tokenId].isHatched = true;
    // }
}
