import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import eater from '@/eater.gif'

declare global {
  interface Window {
    ethereum: any
  }
}

const BLENDING_RULES = gql`
  query FetchBlendingRules {
    blendingRules {
      kinBlendingLevel
      blendingLimit
      baseBlendingCost
      incubationPeriod
    }
  }
`

const AllLegends: React.FC = () => {
  const NftContainer = styled.div`
    & {
      padding: 25px;
      display: inline-flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      div {
        margin: 25px;
      }
    }
  `

  const res = useQuery(BLENDING_RULES)

  return <NftContainer>{res.data ? JSON.stringify(res.data) : <img src={eater} />}</NftContainer>
}

export default AllLegends
