import React, { useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'



// const greeterAddress = "0xbbd72e3c67D83B99b019fC516FA062E15A7E7C68"
// const tokenAddress = "0xFE1DFAD21F0EdA0e9509dE3B4a4d26525591480d"
// const legendAddress = '0xBCcA0265B15133E04926a7fE518b1c31a4acDC78' // Original address, useful for testing
const legendAddress = '0xea9021be20206F802eABd85D45021bfF0E7CDeA8' // Current Test address

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

  async function nextOne(idd) {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legendAddress, LegendsNFT.abi, provider)
      const ipfsDNA = await contract.tokenDATA(idd)
      console.log('nextOne: ', ipfsDNA.toString())
      const ipfss = ipfsDNA.toString()

      const newHash = await axios.post('http://localhost:3001/api/random', { ipfss }).finally(() => {
        // document.location.reload()
      })
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
      const mint = await contract.mintRandom(account, prefix, postfix, _newURI).then(
        contract.on("createdDNA", (data, event) => {
          console.log('good1', data.toString());
          const idd = data.toString()
          nextOne(idd);
        }));
      console.log("test", mint);



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


      // contract.on("createdDNA", (data, event) => {
      //   console.log('good1', data.legendpp);
      //   console.log('good2', data.toString());
      //   console.log('good3', data.newItemId)
      //   console.log('good5', data.dna)
      //   // console.log('good3', dna.legendpp.toString());
      //   const ipfsDNA = async (res, err) => {
      //     await contract.tokenDATA(id);
      //     console.log('IPFS4: ', ipfsDNA.toString());
      //   }
      //   ipfsDNA()

      // })




        // const jsonstr = dna.toString();
        // const jsonstr0 = dna[0].toString();
        // const jsonstr1 = dna[1].toString();
        // const jsonstr2 = dna[2].toString();
        // const jsonstr3 = dna[3].toString();
        // const jsonstr4 = dna[4].toString();
        // const jsonstr5 = dna[5].toString();
        // const jsonstr6 = dna[6].toString();
        // const jsonstr7 = dna[7].toString();
        // const jsonstr8 = dna[8].toString();
        // console.log("dna: ", jsonstr);
        // // console.log("dna[1]: ", JSON.stringify(dna[1].toString()));

        // const jsonobj = {
        //   Name: 1,
        //   CdR1: jsonstr0,
        //   CdG1: jsonstr1,
        //   CdB1: jsonstr2,
        //   CdR2: jsonstr3,
        //   CdG2: jsonstr4,
        //   CdB2: jsonstr5,
        //   CdR3: jsonstr6,
        //   CdG3: jsonstr7,
        //   CdB3: jsonstr8
        // }


        // console.log(jsonobj)
        // console.log(jsonobj.CdB3)

        // const postMint = () => {
        //   axios.post('http://localhost:3001/api/random', { jsonobj }).finally(() => {
        //     // document.location.reload()
        //   })
        // }

        // postMint()