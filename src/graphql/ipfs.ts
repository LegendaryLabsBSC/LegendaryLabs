// import { gql } from "@apollo/client";

// const ipfsPromo = (pinataReq: any) => gql`
//   mutation{
//   ipfsPromoEvent(pinataReq: "${pinataReq}") {
//     IpfsHash
//     PinSize
//     Timestamp
//     }
//   }
// `;

// export default ipfsPromo;

import { gql } from "@apollo/client";

const IPFS_PROMO = gql`
  mutation IPFS($pinName: String!, $pinContent: String!) {
    pinJSONtoIPFS(pinataReq: { pinName: $pinName, pinContent: $pinContent }) {
      IpfsHash
      PinSize
      Timestamp
      isDuplicate
    }
  }
`;

export default IPFS_PROMO;
