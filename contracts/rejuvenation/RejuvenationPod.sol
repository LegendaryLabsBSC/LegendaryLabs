// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface IRejuvenationPod {
    struct RejuvenationPod {
        address nftContract;
        address depositedBy;
        uint256 depositBlock;
        uint256 blendingInstancesUsed;
        uint256 tokenAmountSecured;
        uint256 multiplier;
        bool occupied;
    }

    event PodStatusChanged(uint256 indexed legendId, bool occupied);
    event PodTokensChanged(uint256 indexed legendId, uint256 newAmount);
    event BlendingSlotsRestored(
        uint256 indexed legendId,
        uint256 slotsRestored
    );
    // event PodTokensDecreased(uint256 indexed legendId, uint256 newAmount);
    // event PodTokensIncreased(uint256 indexed legendId, uint256 newAmount);
}
