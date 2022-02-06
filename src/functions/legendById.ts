import { gql } from "@apollo/client";

const legendById = (id: string) => gql`
query {
  legendNFT(id: "${id}") {
    id
    image
    season
    prefix
    postfix
    parent1
    parent2
    birthday
    blendingInstancesUsed
    totalOffspring
    legendCreator
    isLegendary
    isHatched
    isDestroyed
  }
}
`

export {
    legendById
}