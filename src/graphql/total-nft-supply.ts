import { gql } from "@apollo/client";

const TOTAL_NFT_SUPPLY = gql`
  query{
    totalNFTSupply {
      total
    }
  }
`;

export default TOTAL_NFT_SUPPLY;