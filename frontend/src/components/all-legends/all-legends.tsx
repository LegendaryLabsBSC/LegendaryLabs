import React, { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import styled from 'styled-components'
import { AddressZero } from 'ethers/constants'
import {
  legendsLaboratory,
  legendsNFT,
  legendToken,
  legendsMarketplace,
  legendsMatchingBoard,
} from 'contract_config/contract-config'
import { NftCard } from 'components/nft-card/nft-card'
import LegendsNFT from 'artifacts/contracts/legend/LegendsNFT.sol/LegendsNFT.json'
import LegendsMarketplace from 'artifacts/contracts/marketplace/LegendsMarketplace.sol/LegendsMarketplace.json'
import LegendsMatchingBoard from 'artifacts/contracts/matching/LegendsMatchingBoard.sol/LegendsMatchingBoard.json'
import LegendsLaboratory from 'artifacts/contracts/lab/LegendsLaboratory.sol/LegendsLaboratory.json'
import LegendToken from 'artifacts/contracts/token/LegendToken.sol/LegendToken.json'
import gif from 'eater.gif'

declare global {
  interface Window {
    ethereum: any
  }
}

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const contract = {
  lab: {
    read: new ethers.Contract(legendsLaboratory, LegendsLaboratory.abi, provider),
    write: new ethers.Contract(legendsLaboratory, LegendsLaboratory.abi, signer),
  },
  token: {
    read: new ethers.Contract(legendToken, LegendToken.abi, provider),
    write: new ethers.Contract(legendToken, LegendToken.abi, signer),
  },
  nft: {
    read: new ethers.Contract(legendsNFT, LegendsNFT.abi, provider),
    write: new ethers.Contract(legendsNFT, LegendsNFT.abi, signer),
  },
  marketplace: {
    read: new ethers.Contract(legendsMarketplace, LegendsMarketplace.abi, provider),
    write: new ethers.Contract(legendsMarketplace, LegendsMarketplace.abi, signer),
  },
  matchingBoard: {
    read: new ethers.Contract(legendsMatchingBoard, LegendsMatchingBoard.abi, provider),
    write: new ethers.Contract(legendsMatchingBoard, LegendsMatchingBoard.abi, signer),
  },
}

const AllLegends: React.FC = () => {
  const [legends, setLegends] = useState<any[]>()
  const [gettingLegends, setGettingLegends] = useState(false)

  async function loadLegends(tokenID) {
    const imgURL = await contract.nft.read.fetchLegendURI(tokenID)
    console.log(`Legend ID: ${tokenID} Image URL: ${imgURL}`)
    return { tokenID, imgURL }
    // Logic for rendering Legend Card Component here from pinata ?
  }

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

  const pinataGeteway = 'https://gateway.pinata.cloud/ipfs/'

  const cidToUrl = (cid) => {
    return pinataGeteway + cid.split('//')[1].split(',')[0]
  }

  useEffect(() => {
    const getTokensByOwner = async () => {
      setGettingLegends(true)
      if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const legendsData = []
        const balance = await contract.nft.read.balanceOf(account)
        console.log(balance);
        
          // .then((balance) => {
        if (balance) {
          // for (let i = 0; i < balance; i++) {
            const token = await contract.nft.read.tokenOfOwnerByIndex(account, 0)
            console.log(token);
            
            // .then((token) => {
            const tokenId = token.toString()
            const res = await loadLegends(tokenId)
            console.log(res);
            
            // then((res) => {
            legendsData.push(res)
            // })
            // })
          // }
        } else {
          console.log('Account does not own any Legend Tokens')
          setGettingLegends(false)
        }
          // })
        setLegends(legendsData)
      }
      setGettingLegends(false)
    }
    getTokensByOwner()
  }, [])
            console.log(legends);

  const legendsModule =
    legends ? (
      legends.map((legend) => {
        console.log(legends)
        return (
          <NftCard key={legend}>
            <h3>Legend ID: {legend.tokenID}</h3>
            <img width="200px" alt="legend" src={cidToUrl(legend.imgURL)} />
          </NftCard>
        )
      })
    ) : (
      <div>Account does not own any Legend Tokens</div>
    )

  return (
    <NftContainer>
      {
        legends && legends.map((legend) => {
          console.log(legends)
          return (
            <NftCard key={legend}>
              <h3>Legend ID: {legend.tokenID}</h3>
              <img width="200px" alt="legend" src={cidToUrl(legend.imgURL)} />
            </NftCard>
          )
        })
      }
    </NftContainer>
)}

export default AllLegends
