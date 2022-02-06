import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import gif from '@/eater.gif'
import { NftCard } from '../nft-card/nft-card'
import { legendById } from '@/functions'

export const AllLegends: React.FC = () => {
  const [legendId, setLegendId] = useState<string>('1')
  const res = useQuery(legendById(legendId)).data

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
      {res && <NftCard><img src={res.legendNFT.image} alt="nft" width={600} /></NftCard>}
    </NftContainer>)
}
