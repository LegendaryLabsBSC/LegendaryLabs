import { React, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator'
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'

// 0x18d551e95f318955F149A73aEc91B68940312E4a ; 0x0F1aaA64D4A29d6e9165E18e9c7C9852fc92Ff53
const legendAddress = '0xc872a00F219b1a0e43247c4b1c228025325ffF3D' // During testing this address will change frequently

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const contract = {
  read: new ethers.Contract(legendAddress, LegendsNFT.abi, provider),
  write: new ethers.Contract(legendAddress, LegendsNFT.abi, signer),
}

const prefixConfig = {
  dictionaries: [adjectives],
  length: 1,
}

const postfixConfig = {
  dictionaries: [animals],
  length: 1,
}

function App() {
  const [id, setID] = useState(0)
  const [parent1, setParent1] = useState(0)
  const [parent2, setParent2] = useState(0)
  const [value, setValue] = useState(0)
  const [season, setSeasonValue] = useState('')
  const [newURI, setURI] = useState('')

  // Leaving in for easier testing: check if a tokenID has an IPFS URL
  // Not needed for DApp/Demo
  async function fetchIPFS() {
    if (typeof window.ethereum !== 'undefined') {
      const ipfsURL = await contract.read.tokenURI(id)
      console.log('IPFS: ', ipfsURL)
    }
  }

  // Leaving in for easier testing: check if a tokenID has DNA
  // Not needed for DApp/Demo
  // Create a fetchMetadata
  async function fetchDNA() {
    if (typeof window.ethereum !== 'undefined') {
      const ipfsDNA = await contract.read.tokenDATA(id)
      console.log('DNA: ', ipfsDNA.toString())
    }
  }

  async function fetchMeta() {
    if (typeof window.ethereum !== 'undefined') {
      // const legendMeta = await contract.read.legendData(id) // doesn't return parents for some reason
      const legendMeta = await contract.read.tokenMeta(id)
      console.log(`Meta: ${legendMeta}`)
      console.log(`id: ${legendMeta.id}`)
      console.log(`prefix: ${legendMeta.prefix}`)
      console.log(`postfix: ${legendMeta.postfix}`)
      console.log(`dna: ${legendMeta.dna}`)
      console.log(`parents: ${legendMeta.parents}`)
      console.log(`birthday: ${legendMeta.birthDay}`)
      console.log(`incubation duration: ${legendMeta.incubationDuration}`)
      console.log(`breeding cooldown: ${legendMeta.breedingCooldown}`)
      console.log(`breeding cost: ${legendMeta.breedingCost}`)
      console.log(`offspring limit: ${legendMeta.offspringLimit}`)
      console.log(`season: ${legendMeta.season}`)
      console.log(`is legendary: ${legendMeta.isLegendary}`)
      console.log(`is destroyed: ${legendMeta.isDestroyed}`)
    }
  }

  async function setIncubationDuration() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setIncubationDuration(value)
    }
  }
  async function setBreedingCooldown() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBreedingCooldown(value)
    }
  }
  async function setOffspringLimit() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setOffspringLimit(value)
    }
  }
  async function setBaseBreedingCost() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBaseBreedingCost(value)
    }
  }
  async function setSeason() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setSeason(season)
    }
  }

  async function getAllLegends() {
    if (typeof window.ethereum !== 'undefined') {
      const totalLegends = await contract.read.totalLegends()
      for (let i = 1; i <= totalLegends; i++) {
        contract.read.legendData(i).then((legendMeta) => {
          if (!legendMeta.isDestroyed === true) {
            loadLegends(legendMeta.id.toString())
          }
        })
      }
    }
  }

  // async function getAllLegends() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const totalLegends = await contract.read.totalLegends()

  //     function loopLoop(totalLegends,printAll)
  //     for (let i = 1; i <= totalLegends; i++) {
  //       contract.read.legendData(i)
  //         .then(legendMeta => {
  //           if (!legendMeta.isDestroyed === true) {
  //             loadLegends(legendMeta.id)
  //           }
  //         })
  //     }
  //   }
  // }

  // async function getAllLegends() {
  //   if (typeof window.ethereum !== 'undefined') {

  //     const allLegends = []

  //     const totalLegends = await contract.read.totalLegends()

  //     const getLegend = async (i) => {
  //       await contract.read.legendData(i)
  //         .then(res => {
  //           // console.log('then', res.id.toString())
  //           if (!res.isDestroyed === true) {
  //             allLegends.push(res.id.toString())
  //             console.log(res.id.toString())
  //             // loadLegends(res.id)
  //           }
  //         })
  //       // console.log(allLegends)
  //     }

  //     for (let i = 1; i <= totalLegends; i++) {
  //       getLegend(i)
  //     }
  //     Promise.all(allLegends)
  //       .then(results => {
  //         console.log('gg', results)
  //       })
  //   }
  // }

  // async function getAllLegends() {
  //   const allLegends = []

  //   const totalLegends = 5

  //   const legendData = i => {
  //     return new Promise(resolve => {
  //       setTimeout(() => {
  //         console.log(i)
  //         resolve(i)
  //       }, 3000)
  //     })
  //   }

  //   for (let i = 0; i < totalLegends; i++) {
  //     const legend = legendData(i)
  //     if (i !== 3)
  //       allLegends.push(i)
  //   }
  //   Promise.all(allLegends)
  //     .then(result => {
  //       console.log(result)
  //       console.log(result.length)
  //     })
  // }

  /* To test this feature do one the falling options:
   
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
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.read.balanceOf(account).then((res) => {
        // const totalLegends = parseInt(res);
        for (let i = 0; i < res; i++) {
          // Testing wallet 1: This has Legend Tokens generated on one of my test wallets
          // Uncomment if you are using Option 1 to test ; only uncomment one testing wallet at a time
          // contract.read.tokenOfOwnerByIndex("0x55f76D8a23AE95944dA55Ea5dBAAa78Da4D29A52", i)

          // Testing wallet 2: This has Legend Tokens generated on one of my test wallets
          // Uncomment if you are using Option 1 to test ; only uncomment one testing wallet at a time
          // contract.read.tokenOfOwnerByIndex("0xDfcada61FD3698F0421d7a3E129de522D8450B38", i)

          // Keep this uncommented if you are using Option 2 to test
          contract.read.tokenOfOwnerByIndex(account, i).then((result) => {
            if (result > 0) {
              const ownedTokens = result.toString()
              // console.log('Owned Token IDs: ', ownedTokens) // Uncomment for some additional logging
              loadLegends(ownedTokens)
            }
          })
        }
      })
    }
  }

  async function loadLegends(tokenID) {
    console.log(tokenID)

    // const imgURL = await contract.read.tokenURI(tokenID)
    // console.log(`Legend ID: ${tokenID} Image URL: ${imgURL}`)

    // Logic for rendering Legend Card Component here from pinata ?
  }

  // Send new NFT DNA to API/Generator // TODO: refactor the entire FE breeding flow
  async function generateImage(newToken) {
    if (typeof window.ethereum !== 'undefined') {
      const _tokenDNA = await contract.read.tokenDATA(newToken)
      const tokenDNA = _tokenDNA.toString()

      await axios
        // .post('http://localhost:3001/api/mint', { tokenDNA }) // Use this if your main host is Windows
        .post('http://192.168.1.157:3001/api/mint', { tokenDNA }) // using my laptop to run the generator API
        .then((res) => {
          const url = res.data
          console.log('New NFT IPFS URL:', url)
          setImageURL(newToken, url)
        })
      // .finally(() => {
      //   document.location.reload()
      // })
    }
  }

  /**
   * TODO: Create temp-url in contract ; assign at mint time
   * this vvv will be used for hatching functionality
   * */
  async function setImageURL(newToken, hash) {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.setTokenURI(newToken, hash)
    }
  }

  // async function assignIPFS(newToken, hash) {
  //   if (typeof window.ethereum !== 'undefined') {
  //     await contract.write.setTokenURI(newToken, hash)
  //   } // TODO: change set token uri ?????? make work for both/////////////////////////////
  // }

  async function breed() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.breed(parent1, parent2).then(
        contract.write.once('createdDNA', (data, event) => {
          const newTokenID = data.toString()
          console.log('New Token Created:', newTokenID) // Debug logging
          generateImage(newTokenID)
        }),
      )
    }
  }

  async function destroy() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.immolate(id)
    }
  }

  async function correctTokenURI() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.correctTokenURI(id, newURI)
    }
  }

  // Mints Legend with "random" DNA
  async function mintPromo() {
    if (typeof window.ethereum !== 'undefined') {
      const prefix = uniqueNamesGenerator(prefixConfig) // for testing
      const postfix = uniqueNamesGenerator(postfixConfig) // for testing
      const level = 1 // for testing
      const isLegendary = false // for testing
      const skipIncubation = true // for testing

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.mintPromo(account, prefix, postfix, 'blankURI', level, isLegendary, skipIncubation).then(
        contract.write.once('createdDNA', (data, event) => {
          console.log('New Token Created:', data.toString())
          const newToken = data.toString()
          generateImage(newToken)
        }),
      )
    }
  }

  return (
    <div>
      <header>
        <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
        <button type="submit" onClick={fetchIPFS}>
          Fetch IPFS URL
        </button>
        <button type="submit" onClick={fetchDNA}>
          Fetch IPFS DNA
        </button>
        <button type="submit" onClick={fetchMeta}>
          Fetch Legend Metadata
        </button>
        <br /> <br /> <br />
        <input type="number" placeholder="Value" onChange={(e) => setValue(e.target.value)} />
        <button type="submit" onClick={setIncubationDuration}>
          Set Base Incubation Duration
        </button>
        <button type="submit" onClick={setBreedingCooldown}>
          Set Base Breeding Cooldown
        </button>
        <button type="submit" onClick={setOffspringLimit}>
          Set Offspring Limit
        </button>
        <button type="submit" onClick={setBaseBreedingCost}>
          Set Base Breeding Cost
        </button>
        <br />
        <input type="text" placeholder="Season" onChange={(e) => setSeasonValue(e.target.value)} />
        <button type="submit" onClick={setSeason}>
          Set Season
        </button>
        <br /> <br /> <br />
        <button type="submit" onClick={getTokensByOwner}>
          Print Owned Legend IDs
        </button>
        <button type="submit" onClick={getAllLegends}>
          Print All Legend Ids
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
        <br /> <br />
        <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
        <button type="submit" onClick={destroy}>
          Destroy Legend
        </button>
        <br />
        <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
        <input type="text" placeholder="IPFS URL" onChange={(e) => setURI(e.target.value)} />
        <button type="submit" onClick={correctTokenURI}>
          Correct Token URI
        </button>
      </header>
    </div>
  )
}

export default App
