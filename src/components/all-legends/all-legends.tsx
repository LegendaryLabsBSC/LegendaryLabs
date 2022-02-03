import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import gif from 'eater.gif'

declare global {
  interface Window {
    ethereum: any
  }
}

const BLENDING_RULES = (id: string) => gql`
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


const AllLegends: React.FC = () => {
  const [legendId, setLegendId] = useState<string>('1')
  const res = useQuery(BLENDING_RULES(legendId)).data

  const NftContainer = styled.div`
    & {
      padding: 25px;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      div {
        margin: 25px;
      }
    }
  `

  return (
    <NftContainer>
      <div>
        <button type='button' onClick={() => setLegendId((Number(legendId) - 1).toString())}>{'< Previous'}</button>
        <button type='button' onClick={() => setLegendId((Number(legendId) + 1).toString())}>{'Next >'}</button>
      </div>
      {res ? JSON.stringify(res, null, 2) : <img src={gif} alt="eater" />}
      {res && <img src={res.legendNFT.image} alt="nft" />}
    </NftContainer>)
}

export default AllLegends
