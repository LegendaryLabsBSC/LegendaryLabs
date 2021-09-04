import { React, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'

const legendAddress = '0xe4fB686B4d62F5405871FF6Afb059E4391b9bE8A' // During testing this address will change frequently

function App() {
  const [id, setID] = useState(0)
  const [prefix, setPrefix] = useState('') // remove in place of name generator
  const [postfix, setPostfix] = useState('') // remove in place of name generator
  const [parent1, setParent1] = useState('')
  const [parent2, setParent2] = useState('')

  async function fetchIPFS() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
      const ipfsURL = await contract.tokenURI(id)
      console.log('IPFS: ', ipfsURL)
    }
  }

  async function fetchDNA() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
      const ipfsDNA = await contract.tokenDATA(id)
      console.log('IPFS: ', ipfsDNA.toString())
    }
  }

  async function generateImage(newToken) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
      const _tokenDNA = await contract.tokenDATA(newToken)
      const tokenDNA = _tokenDNA.toString()

      await axios
        .post('http://localhost:3001/api/mint', { tokenDNA })
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
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, signer)
      await contract.setTokenURI(newToken, hash)
    }
  }

  async function breed() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, signer)
      await contract.breed(parent1, parent2)
        .then( // Truncate
          contract.on("createdDNA", (data, event) => {
            console.log('New Token Created:', data.toString());
            const newToken = data.toString()
            generateImage(newToken);
          }));
    }
  }

  async function mintPromo() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, signer)
      await contract.mintRandom(account, prefix, postfix, 'blankURI')
        .then(
          contract.on("createdDNA", (data, event) => {
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

        <input type="text" placeholder="Enter Prefix" onChange={(e) => setPrefix(e.target.value)} />
        <input type="text" placeholder="Enter Postfix" onChange={(e) => setPostfix(e.target.value)} />
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
    </div>
  )
}

export default App