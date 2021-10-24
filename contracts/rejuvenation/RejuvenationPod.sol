// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface IRejuvenationPod {
    enum PodStatus {
        Uninitialized,
        Occupied,
        Unoccupied
    }

    struct PodVisit {
        address depositedBy;
        uint256 depositBlock;
        uint256 offspringCount; // currentOffspringCount?
        uint256 tokenAmountSecured;
        uint256 multiplier;
        // uint256 earnedReJu;
    }

    struct RejuvenationPod {
        // uint256 initializedAt;
        address nftContract;
        // uint256 legendId;
        uint256 remainderReJu; // needs to transfer over after pivkup/remove/increase
        uint256 previousRemovalTime;
        PodVisit visit;
        PodStatus status;
    }

    //TODO: events
}
