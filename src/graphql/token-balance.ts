import { gql } from "@apollo/client";

const TOKEN_BALANCE = gql`
  query FetchTokenBalance($address: String!) {
    LGNDbalanceOf(address: $address) {
      balance
    }
  }
`;

export default TOKEN_BALANCE;
