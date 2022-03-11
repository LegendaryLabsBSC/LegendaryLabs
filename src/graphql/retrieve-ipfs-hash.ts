import { gql } from "@apollo/client";

const RETRIEVE_IPFS_HASH = gql`
  mutation RETRIEVE_IPFS_HASH($legendId: String!) {
    generateHatchedLegend(id: $legendId) {
      IpfsHash
      PinSize
      Timestamp
      isDuplicate
    }
  }
`;

export default RETRIEVE_IPFS_HASH;