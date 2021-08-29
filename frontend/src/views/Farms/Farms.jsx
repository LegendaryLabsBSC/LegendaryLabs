import React, { useState } from 'react'
import { ethers } from 'ethers'
// import { ethers } from 'ethers';
// import './App.css';
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'


// const greeterAddress = "0xbbd72e3c67D83B99b019fC516FA062E15A7E7C68"
// const tokenAddress = "0xFE1DFAD21F0EdA0e9509dE3B4a4d26525591480d"
// const legendAddress = '0xBCcA0265B15133E04926a7fE518b1c31a4acDC78' // Original address, useful for testing
// const legendAddress = '0x5f30f55aF99B2FBc5ca67d396695612a4Cce1d59' // Previous test address -- mintRandom
const legendAddress = '0x94665Ac2875d820c104F067A36e013Ec37896245' // Current Test address

function App() {
  // const [userAccount, setUserAccount] = useState('')
  // const [amount, setAmount] = useState(0)
  const [id, setID] = useState(0)
  const [prefix, setPrefix] = useState('')
  const [postfix, setPostfix] = useState('')
  const [_newURI, setURI] = useState('')


  async function fetchIPFS() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
      const ipfsURL = await contract.tokenURI(id)
      console.log('IPFS: ', ipfsURL)
    }
  }

  async function fetchDNA() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
      const ipfsDNA = await contract.tokenDATA(id)
      console.log('IPFS: ', ipfsDNA.toString())
    }
  }


  async function newURI() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, signer)
      await contract.setTokenURI(id, _newURI)
    }
  }

  // left off: integrate generator and more complete dna structure
  async function mintRandom() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, signer)

      /* 
        Cryptofield Breeding Notes:
          New NFT image is generated through api call (Zed run uses extremely basic NFTs, just the same horse with a random color)
          Metadata/Image-data is returned and uploaded to IPFS resulting in new IPFS-URL-hash
          id = Male IPFS URL-hash ; this.state.selectedFemaleHorse = Female IPFS URL-hash
          image-ipfs-hash is sent to contract
          image-ipfs is added to metadata interface as horseHash(though they do not use an interface)
      */

      /*
        Legend Breeding Flow:
          'Breed' onClick => fetch legend.parent1.dna + legend.parent2.dna => contract.mix
            LegendsNFT/mix:
              return struct dna : Mix DNA of legend.parent1 + legend.parent2
            Send dna to API:
              Send dna to generator (find out solution for 'Name', currently using off-chain counter, non-id corresponding):



      */

      // left off: having dna generated, piped to generator, pinned to ipfs, returned to contract, minted
      const mint = await contract.mintRandom(account, prefix, postfix, _newURI)
      console.log("test", mint);
      contract.on("createdDNA", (dna, event) => {
        // console.log("event createdDNA fired");
        console.log("dna: ", JSON.stringify(dna.toString())); 
        // console.log("Event object: ", event); 
      })
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

        <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
        <button type="submit" onClick={fetchDNA}>
          Fetch IPFS DNA
        </button>

        <br /> <br />

        <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
        <input type="text" placeholder="New IPFS URL" onChange={(e) => setURI(e.target.value)} />
        <button type="submit" onClick={newURI}>
          New URI
        </button>

        <br /> <br />

        <input type="text" placeholder="Enter Prefix" onChange={(e) => setPrefix(e.target.value)} />
        <input type="text" placeholder="Enter Postfix" onChange={(e) => setPostfix(e.target.value)} />
        <input type="text" placeholder="New IPFS URL" onChange={(e) => setURI(e.target.value)} />
        <button type="submit" onClick={mintRandom}>
          Mint Random NFT
        </button>
      </header>
    </div>
  )
}

export default App
