import React, { useState } from 'react'
import { ethers } from 'ethers'
// import './App.css';
// import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
// import Token from './artifacts/contracts/Token.sol/Token.json'
import LegendNFT from '../../artifacts/contracts/LegendNFT.sol/LegendsNFT.json'

// const greeterAddress = "0xbbd72e3c67D83B99b019fC516FA062E15A7E7C68"
// const tokenAddress = "0xFE1DFAD21F0EdA0e9509dE3B4a4d26525591480d"
const legendAddress = '0xBCcA0265B15133E04926a7fE518b1c31a4acDC78'

function App() {
  // const [userAccount, setUserAccount] = useState('')
  // const [amount, setAmount] = useState(0)
  const [id, setID] = useState(0)

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
      const contract = new ethers.Contract(legendAddress, LegendNFT.abi, provider)
      const ipfsURL = await contract.tokenURI(id)
      console.log('IPFS: ', ipfsURL)
    }
  }

  return (
    <div>
      <header>
        <button type="submit" onClick={fetchIPFS}>
          Fetch IPFS URL
        </button>
        <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
      </header>
    </div>
  )
}

export default App
