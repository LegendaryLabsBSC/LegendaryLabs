import { gql } from "@apollo/client";

const isHatchable = (id: string) => gql`
  query{
  isHatchable(id: "${id}") {
      hatchable
      unableReason
    }
  }
`;

export default isHatchable;
