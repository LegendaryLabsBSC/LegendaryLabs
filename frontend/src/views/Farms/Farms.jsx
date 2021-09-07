import { React, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
// import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

import NftCard from 'views/Nft/components/NftCard'
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'

const legendAddress = '0x19c2912Df779126bb69b63C88020b5c02991Ff4F' // During testing this address will change frequently
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contractRead = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
const contractWrite = new ethers.Contract(legendAddress, LegendsNFT.abi, signer)

// const prefixConfig = {
//   dictionaries: [adjectives],
//   length: 1,
// };

// const postfixConfig = {
//   dictionaries: [animals],
//   length: 1,
// };

function App() {
  const [id, setID] = useState(0)
  const [parent1, setParent1] = useState('')
  const [parent2, setParent2] = useState('')
  const [legends, setLegends] = useState([])

  // Leaving in for easier testing: check if a tokenID has an IPFS URL
  // Not needed for DApp/Demo 
  async function fetchIPFS() {
    if (typeof window.ethereum !== 'undefined') {
      const ipfsURL = await contractRead.tokenURI(id)
      console.log('IPFS: ', ipfsURL)
    }
  }

  // Leaving in for easier testing: check if a tokenID has DNA
  // Not needed for DApp/Demo 
  // Create a fetchMetadata
  async function fetchDNA() {
    if (typeof window.ethereum !== 'undefined') {
      const ipfsDNA = await contractRead.tokenDATA(id)
      console.log('DNA: ', ipfsDNA.toString())
    }
  }

  /* To test this feature do one the following options:
  
    Option 1 : Use my test wallets
      Uncomment either of the testing wallets,
      switch between wallets to demonstrate functionality of only displaying tokens owned by given account wallet

    Option 2 : Create test wallets
      Make sure you have two accounts on your Metamask
      if you need testnet-BSC I can send you some or show you the faucet

      Click 'Mint Promotional NFTs', with API running you should be able to generate new NFTS
      as well as breed new NFTs with tokenIDs your accounts own

      Create new NFTs on both accounts*
      switch between wallets to demonstrate functionality of only displaying tokens owned by given account wallet

      *Currently the API server will need to be manually restarted after each mint

    Clicking 'Print Owned Legends IDs' will print ID and URL owned by given wallet
    logic for rending NFT image should able able to use this output
*/
  async function getTokensByOwner() {
    if (typeof window.ethereum !== 'undefined') {

      // Testing wallet 1: This has Legend Tokens generated on one of my test wallets
      // Uncomment if you are using Option 1 to test ; only uncomment one testing wallet at a time
      // const account = "0x55f76D8a23AE95944dA55Ea5dBAAa78Da4D29A52"

      // Testing wallet 2: This has Legend Tokens generated on one of my test wallets
      // Uncomment if you are using Option 1 to test ; only uncomment one testing wallet at a time
      const account = "0xDfcada61FD3698F0421d7a3E129de522D8450B38"

      // Keep this uncommented if you are using Option 2 to test
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })


      contractRead.balanceOf(account)
        .then(res => {
          const totalLegends = parseInt(res);
          for (let i = 0; i < totalLegends; i++) {
            contractRead.tokenOfOwnerByIndex(account, i)
              .then(result => {
                if (result > 0) {
                  const ownedTokens = result.toString()
                  console.log('Owned Token IDs: ', ownedTokens) // Uncomment for some additional logging
                  loadLegends(ownedTokens)
                }
              })
          }
        })
    }
  }

  async function loadLegends(tokenID) {

    const imgURL = await contractRead.tokenURI(tokenID)
    console.log(`Legend ID: ${tokenID} Image URL: ${imgURL}`)
    setLegends([...legends, { tokenID, imgURL }])

    // Logic for rendering Legend Card Component here from pinata ?

  }

  // Send new NFT DNA to API/Generator
  async function generateImage(newToken) {
    if (typeof window.ethereum !== 'undefined') {

      const _tokenDNA = await contractRead.tokenDATA(newToken)
      const tokenDNA = _tokenDNA.toString()

      await axios
        .post('http://localhost:3001/api/mint', { tokenDNA }) // Use this if your main host is Windows
        // .post('http://192.168.1.157:3001/api/mint', { tokenDNA }) // using my laptop to run the generator API
        .then(res => {
          const hash = res.data
          console.log('New NFT IPFS URL:', hash)
          assignIPFS(newToken, hash)
        })
      // .finally(() => {
      //   document.location.reload()
      // })
    }
  }

  async function assignIPFS(newToken, hash) {
    if (typeof window.ethereum !== 'undefined') {
      await contractWrite.setTokenURI(newToken, hash)
    }
  }

  async function breed() {
    if (typeof window.ethereum !== 'undefined') {
      await contractWrite.breed(parent1, parent2)
        .then(
          contractWrite.once("createdDNA", (data, event) => {
            const newTokenID = data.toString()
            console.log('New Token Created:', newTokenID); // Debug logging
            generateImage(newTokenID);
          }));
    }
  }

  // Mints Legend with "random" DNA
  async function mintPromo() {
    if (typeof window.ethereum !== 'undefined') {

      // const prefix = uniqueNamesGenerator(prefixConfig);
      // const postfix = uniqueNamesGenerator(postfixConfig);

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contractWrite.mintPromo(account, "First", "Last", 'blankURI')
        .then(
          contractWrite.once("createdDNA", (data, event) => {
            console.log('New Token Created:', data.toString());
            const newToken = data.toString()
            generateImage(newToken);
          }));
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

        <button type="submit" onClick={getTokensByOwner}>
          Print Owned Legend IDs
        </button>

        <br /> <br />

        <button type="submit" onClick={mintPromo}>
          Mint Promotional NFT
        </button>

        <br /> <br />

        <input type="number" placeholder="Parent 1 Token ID" onChange={(e) => setParent1(e.target.value)} />
        <input type="number" placeholder="Parent 2 Token ID" onChange={(e) => setParent2(e.target.value)} />
        <button type="submit" onClick={breed}>
          Breed
        </button>

      </header>

      {legends.length > 0 && legends.map((legend) => (
        <NftCard>
          {JSON.stringify(legend)}
        </NftCard>
      ))}

    </div>
  )
}

export default App
