import React, { useState } from 'react'
import { ethers } from 'ethers'
// import './App.css';
// import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
// import Token from './artifacts/contracts/Token.sol/Token.json'
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'

// const greeterAddress = "0xbbd72e3c67D83B99b019fC516FA062E15A7E7C68"
// const tokenAddress = "0xFE1DFAD21F0EdA0e9509dE3B4a4d26525591480d"
const legendAddress = '0x5f30f55aF99B2FBc5ca67d396695612a4Cce1d59'

function App() {
  // const [userAccount, setUserAccount] = useState('')
  // const [amount, setAmount] = useState(0)
  const [id, setID] = useState(0)
  const [prefix, setPrefix] = useState('')
  const [postfix, setPostfix] = useState('')

  // async function requestAccount() {
  //   await window.ethereum.request({ method: 'eth_requestAccounts' })
  // }

  // async function getBalance() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
  //     const balance = await contract.balanceOf(account);
  //     console.log("Balance: ", balance.toString())
  //   }
  // }

  // async function sendCoins() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     await requestAccount()
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
  //     const transaction = await contract.transfer(userAccount, amount);
  //     await transaction.wait();
  //     console.log(`${amount} Coins sent to ${userAccount}`);
  //   }
  // }

  async function fetchIPFS() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
      const ipfsURL = await contract.tokenURI(id)
      console.log('IPFS: ', ipfsURL)
    }
  }

  async function mintRandom() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, signer)
      const mint = async () => {
        await contract.mintRandom(account, prefix, postfix);
      }
      console.log(mint)
    }
  }

  return (
    <div>
      <header>

        <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
        <button type="submit" onClick={fetchIPFS}>
          Fetch IPFS URL
        </button>

        <br /> <br />

        <input type="text" placeholder="Enter Prefix" onChange={(e) => setPrefix(e.target.value)} />
        <input type="text" placeholder="Enter Postfix" onChange={(e) => setPostfix(e.target.value)} />
        <button type="submit" onClick={mintRandom}>
          Mint Random NFT
        </button>

      </header>
    </div>
  )
}

export default App
