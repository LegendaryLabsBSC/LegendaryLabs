import { React, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator'
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'

// 0x18d551e95f318955F149A73aEc91B68940312E4a ; 0x0F1aaA64D4A29d6e9165E18e9c7C9852fc92Ff53
// During testing this address will change frequently
const legendAddress = '0xb2ECaa062701bd9a88BB598725090651f1905453'

// TODO: generate map = false temp fix

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

  async function fetchIPFS() {
    if (typeof window.ethereum !== 'undefined') {
      const ipfsURL = await contract.read.tokenURI(id)
      console.log('IPFS: ', ipfsURL)
    }
  }
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

  async function getTokensByOwner() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.read.balanceOf(account).then((balance) => {
        if (balance > 0) {
          const legendsData = []
          for (let i = 0; i < balance; i++) {
            // Testing wallets
            // contract.read.tokenOfOwnerByIndex("0x55f76D8a3AE95944dA55Ea5dBAAa78Da4D29A52", i)
            // contract.read.tokenOfOwnerByIndex("0xDfcada61FD3698F0421d7a3E129de522D8450B38", i)
            // Keep this uncommented if you are using Option 2 to test
            contract.read.tokenOfOwnerByIndex(account, i).then((token) => {
              const ownedToken = token.toString()
              loadLegends(ownedToken).then((res) => {
                legendsData.push(res)
              })
            })
          }
          console.log('test', legendsData)
          console.log('test1', legendsData[1])
          // setLegends(legendsData)
        } else {
          console.log('Account does not own any Legend Tokens')
        }
      })
    }
  }

  async function loadLegends(tokenID) {
    const imgURL = await contract.read.tokenURI(tokenID)
    console.log(`Legend ID: ${tokenID} Image URL: ${imgURL}`)
    return { tokenID, imgURL }
    // Logic for rendering Legend Card Component here from pinata ?
  }

  // Send new NFT DNA to API/Generator
  async function generateImage(newItemId) {
    if (typeof window.ethereum !== 'undefined') {
      const legend = await contract.read.tokenMeta(newItemId)
      // TODO: Make into interface(convert js -> ts)
      const legendInterface = {
        id: `${legend.id}`,
        prefix: legend.prefix,
        postfix: legend.postfix,
        dna: legend.dna,
        parents: `${legend.parents}`,
        birthDay: `${legend.birthDay}`,
        incubationDuration: `${legend.incubationDuration}`,
        breedingCooldown: `${legend.breedingCooldown}`,
        breedingCost: `${legend.breedingCost}`,
        offspringLimit: `${legend.offspringLimit}`,
        season: legend.season,
        isLegendary: legend.isLegendary,
        isDestroyed: legend.isDestroyed,
      }

      // ! recieveing multiple responses in the console
      console.log('test', legendInterface)
      // console.log('test1', legend)

      await axios
        .post('http://localhost:3001/api/mint', { legendInterface }) // Use this if your main host is Windows
        // .post('http://192.168.1.157:3001/api/mint', { legendInterface }) // using my laptop to run the generator API
        .then((res) => {
          const url = res.data
          console.log('New NFT IPFS URL:', url)
          assignIPFS(legend.id, url)
        })
      // .finally(() => {
      //   document.location.reload()
      // })
    }
  }

  async function assignIPFS(newItemId, hash) {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.assignIPFS(newItemId, hash)
    }
  }

  async function breed() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.breed(parent1, parent2).then(
        contract.write.once('createdDNA', (data, event) => {
          const newItemId = data.toString()
          console.log('New Token Created:', newItemId) // Debug logging
          generateImage(newItemId)
        }),
      )
    }
  }

  async function destroy() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.immolate(id)
    }
  }

  // Mints Legend with "random" DNA
  async function mintPromo() {
    if (typeof window.ethereum !== 'undefined') {
      const prefix = uniqueNamesGenerator(prefixConfig) // for testing
      const postfix = uniqueNamesGenerator(postfixConfig) // for testing
      // const level = 1 // for testing
      const isLegendary = false // for testing
      const skipIncubation = true // for testing

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.mintPromo(account, prefix, postfix, isLegendary, skipIncubation).then(
        // ! receiving multiple responses ?
        // ? is .then even needed
        contract.write.once('createdDNA', (data, event) => {
          console.log('New Token Created:', data.toString())
          const newItemId = data.toString()
          generateImage(newItemId)
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
        <button type="submit" onClick={assignIPFS}>
          Correct Token URI
        </button>
      </header>
    </div>
  )
}

export default App
