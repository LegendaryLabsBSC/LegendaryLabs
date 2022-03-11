import { gql } from "@apollo/client";

const NFT_BALANCE = gql`
  query FetchNFTBalance($address: String!) {
    NFTbalanceOf(address: $address) {
      balance
    }
  }
`;


export default NFT_BALANCE;
