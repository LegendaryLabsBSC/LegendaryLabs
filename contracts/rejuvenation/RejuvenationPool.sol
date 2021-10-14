// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IRejuvenationPool {
    enum PoolStatus {
        Uninitialized,
        Occupied,
        Unoccupied
    }

    struct PoolVisit {
        address depositedBy;
        uint256 depositBlock;
        uint256 offspringCount;
        uint256 tokenAmountSecured;
        uint256 multiplier;
        // uint256 earnedReJu;
    }

    struct RejuvenationPool {
        uint256 poolId; // needed?
        uint256 initializedAt;
        address nftContract;
        uint256 tokenId;
        uint256 remainderReJu; // needs to transfer over after pivkup/remove/increase
        uint256 previousRemovalTime;
        PoolVisit visit;
        PoolStatus status;
    }
}
