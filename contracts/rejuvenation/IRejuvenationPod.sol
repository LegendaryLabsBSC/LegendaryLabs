// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

/**
 * @dev Interface used by [**LegendsRejuvenation*](./LegendsRejuvenation). Outlines the *Rejuvenation Pod* functionality. 
 */
interface IRejuvenationPod {
    /**
     * :::note Info
     *
     * * `nftContract` &rarr; Address of the ERC721 contract
     * * `depositedBy` &rarr; Address that entered the Legend into its *rejuvenation pod*
     * * `checkpointBlock` &rarr; -!- 
     * * `blendingInstancesUsed` &rarr; Current number of *blending slots* a Legend has used
     * * `tokenAmountSecured` &rarr; Number of LGND secured with the Legend in its *rejuvenation pod*
     * * `multiplier` &rarr; `totalAmountSecured / minimumSecure = multiplier`
     * * `occupied` &rarr; Indicates if a Legend NFT is currently in its * rejuvenation pod* or not
     *
     * :::
     *
     */
    struct RejuvenationPod {
        address nftContract;
        address depositedBy;
        uint256 checkpointBlock;
        uint256 blendingInstancesUsed;
        uint256 tokenAmountSecured;
        uint256 multiplier;
        uint256 rolloverReju;
        bool occupied;
    }

    /**
     * @dev Implemented in [**LegendsRejuvenation**](./LegendsRejuvenation#fetchpoddetails)
     */
    function fetchPodDetails(uint256 legendId)
        external
        view
        returns (RejuvenationPod memory);

    /**
     * @dev Emitted when a Legend either enters or leaves its *rejuvenation pod*. [[`enterRejuvenationPod`](./LegendsRejuvenation#enterrejuvenationpod),[`leaveRejuvenationPod`](./LegendsRejuvenation#leaverejuvenationpod)]
     */
    event PodStatusChanged(uint256 indexed legendId, bool occupied);

    /**
     * @dev @dev Emitted when LGND tokens are removed from a Legend's *rejuvenation pod*. [`removeSecuredTokens`](./LegendsRejuvenation#removesecuredtokens)
     */
    event PodTokensDecreased(uint256 indexed legendId, uint256 newAmount);

    /**
     * @dev Emitted when additional LGND tokens are added to a Legend's *rejuvenation pod*. [`increaseSecuredTokens`](./LegendsRejuvenation#increasesecuredtokens)
     */
    event PodTokensIncreased(uint256 indexed legendId, uint256 newAmount);

    /**
     * @dev Emitted when a Legend has its `blendingInstancesUsed` value decreased. [`_restoreBlendingSlots`](./LegendsRejuvenation#_restoreblendingslot)
     */
    event BlendingSlotsRestored(
        uint256 indexed legendId,
        uint256 slotsRestored
    );
}
