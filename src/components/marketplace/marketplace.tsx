import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import gif from '@/eater.gif'
import { NftCard } from '../nft-card/nft-card'
import { legendById } from '@/functions'
import { useMarketplace } from '@/hooks'


export const Marketplace: React.FC = () => {
  console.log(useMarketplace())


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
      <h1>Marketplace</h1>
      {/* {res 
        ? (
            <>
              {JSON.stringify(res, null, 2)}
              {
                res.allLegendListings.map((listing: any, idx: number) => (
                  <NftCard>
                    {JSON.stringify(listing, null, 2)}
                    <img src={images[idx]} alt="nft"/>
                  </NftCard>
                ))
              }
            </>
          )
        : <img src={gif} alt="eater" />
      } */}
      {/* {res && <NftCard><img src={res.legendNFT.image} alt="nft" width={600} /></NftCard>} */}
    </NftContainer>
  )
}
