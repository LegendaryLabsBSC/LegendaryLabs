// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface IRejuvenationPod {
    enum PodStatus {
        // Uninitialized,
        Unoccupied,
        Occupied
    } // make bool

    struct PodVisit {
        address depositedBy;
        uint256 depositBlock;
        uint256 blendingInstancesUsed;
        uint256 tokenAmountSecured;
        uint256 multiplier;
        // uint256 earnedReJu;
    } // combine v ?

    struct RejuvenationPod {
        address nftContract;
        uint256 previousRemovalTime; // visit removal time ? ^^
        PodVisit visit;
        PodStatus status;
    }

    //TODO: events
}
