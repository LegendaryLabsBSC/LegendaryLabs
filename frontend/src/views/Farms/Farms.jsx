import { React, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import styled from 'styled-components'
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator'
import { legendsLaboratory, legendsNFT, legendsToken, legendsMarketplace } from 'artifacts/config/contract-config'
import LegendsNFT from '../../artifacts/contracts/legend/LegendsNFT.sol/LegendsNFT.json'
import LegendsMarketplace from '../../artifacts/contracts/marketplace/LegendsMarketplace.sol/LegendsMarketplace.json'
import LegendsLaboratory from '../../artifacts/contracts/control/LegendsLaboratory.sol/LegendsLaboratory.json'
import LegendToken from '../../artifacts/contracts/token/LegendToken.sol/LegendToken.json'
import { NftCard } from './components/nftCard'
import gif from '../../eater.gif'

const legendsLaboratoryAddress = legendsLaboratory
const legendsNFTAddress = legendsNFT
const legendTokenAddress = legendsToken
const legendsMarketplaceAddress = legendsMarketplace

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const contract = {
  read: new ethers.Contract(legendsNFTAddress, LegendsNFT.abi, provider),
  write: new ethers.Contract(legendsNFTAddress, LegendsNFT.abi, signer),
}

const tokens = {
  read: new ethers.Contract(legendTokenAddress, LegendToken.abi, provider),
  write: new ethers.Contract(legendTokenAddress, LegendToken.abi, signer),
}

const marketplace = {
  read: new ethers.Contract(legendsMarketplaceAddress, LegendsMarketplace.abi, provider),
  write: new ethers.Contract(legendsMarketplaceAddress, LegendsMarketplace.abi, signer),
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
  const [sellPrice, setPrice] = useState(0)
  const [parent1, setParent1] = useState(0)
  const [parent2, setParent2] = useState(0)
  const [value, setValue] = useState(0)
  const [season, setSeasonValue] = useState('')
  const [newURI, setURI] = useState('')
  const [legends, setLegends] = useState([])
  const [gettingLegends, setGettingLegends] = useState(false)
  const [_duration, setDuration] = useState(0)
  const [_startingPrice, setStartingPrice] = useState(0)
  const [instantBuy, toggleInstantBuy] = useState(false)
  const [instantPrice, setInstantPrice] = useState(0)
  const [matchingPrice, setMatchingPrice] = useState(0)
  const [breedingToken, setBreedingToken] = useState(0)
  const [bid, setBid] = useState(0)
  // const [amount, setAmount] = useState(0)

  async function setIncubationDuration() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const unixTime = value * 86400
      await contract.write.setIncubationDuration(unixTime)
    }
  }
  async function setBreedingCooldown() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBreedingCooldown(value)
    }
  }
  async function setOffspringLimit() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setOffspringLimit(value)
    }
  }
  async function setBaseBreedingCost() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBaseBreedingCost(value)
    }
  }
  async function setBaseHealth() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBaseHealth(value)
    }
  }
  async function setSeason() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setSeason(season)
    }
  }

  async function fetchURI() {
    if (typeof window.ethereum !== 'undefined') {
      const legendURI = await contract.read.tokenURI(id)
      console.log('IPFS URI: ', legendURI)
    }
  }
  async function fetchLegendComposition() {
    if (typeof window.ethereum !== 'undefined') {
      // const legendMeta = await contract.read.legendData(id) // doesn't return parents for some reason
      const legendMeta = await contract.read.tokenMeta(id)
      const legendGenetics = await contract.read.legendGenetics(id)
      const legendStats = await contract.read.legendStats(id)
      console.log('META:')
      console.log(`id: ${legendMeta.id}`)
      console.log(`prefix: ${legendMeta.prefix}`)
      console.log(`postfix: ${legendMeta.postfix}`)
      console.log(`parents: ${legendMeta.parents}`)
      console.log(`birthday: ${legendMeta.birthDay}`)
      console.log(`incubation duration: ${legendMeta.incubationDuration}`)
      console.log(`breeding cooldown: ${legendMeta.breedingCooldown}`)
      console.log(`breeding cost: ${legendMeta.breedingCost}`)
      console.log(`offspring limit: ${legendMeta.offspringLimit}`)
      console.log(`season: ${legendMeta.season}`)
      console.log(`is legendary: ${legendMeta.isLegendary}`)
      console.log(`is hatched: ${legendMeta.isHatched}`)
      console.log(`is destroyed: ${legendMeta.isDestroyed}`)
      console.log('GENES:')
      console.log(`CdR1: ${legendGenetics.CdR1}`)
      console.log(`CdG1: ${legendGenetics.CdG1}`)
      console.log(`CdB1: ${legendGenetics.CdB1}`)
      console.log(`CdR2: ${legendGenetics.CdR2}`)
      console.log(`CdG2: ${legendGenetics.CdG2}`)
      console.log(`CdB2: ${legendGenetics.CdB2}`)
      console.log(`CdR3: ${legendGenetics.CdR3}`)
      console.log(`CdG3: ${legendGenetics.CdG3}`)
      console.log(`CdB3: ${legendGenetics.CdB3}`)
      console.log('STATS:')
      console.log(`level: ${legendStats.level}`)
      console.log(`health: ${legendStats.health}`)
      console.log(`strength: ${legendStats.strength}`)
      console.log(`defense: ${legendStats.defense}`)
      console.log(`agility: ${legendStats.agility}`)
      console.log(`speed: ${legendStats.speed}`)
      console.log(`accuracy: ${legendStats.accuracy}`)
      console.log(`destruction: ${legendStats.destruction}`)
    }
  }
  async function fetchMeta() {
    if (typeof window.ethereum !== 'undefined') {
      // const legendMeta = await contract.read.legendData(id) // doesn't return parents for some reason
      const legendMeta = await contract.read.tokenMeta(id)
      console.log(`Meta: ${legendMeta}`)
    }
  }
  async function fetchGenetics() {
    if (typeof window.ethereum !== 'undefined') {
      const legendGenetics = await contract.read.legendGenetics(id)
      console.log(`Genetics: ${legendGenetics}`)
    }
  }
  async function fetchStats() {
    if (typeof window.ethereum !== 'undefined') {
      const legendStats = await contract.read.legendStats(id)
      console.log(`Stats: ${legendStats}`)
    }
  }

  async function isHatchable() {
    if (typeof window.ethereum !== 'undefined') {
      legends.forEach((legend) => {
        contract.read.legendData(legend.tokenID).then((legendMeta) => {
          if (!legendMeta.isHatched) {
            const testToggle = true // hatching test toggle
            contract.read.isHatchable(legendMeta.id, testToggle).then((res) => {
              console.log(res.toString())
            })
            console.log(`Legend ${legendMeta.id} is hatched: ${legendMeta.isHatched}`)
          }
        })
      })
    }
  }

  async function hatch() {
    await axios.post('http://localhost:3001/api/retrieve', { id }).then((res) => {
      console.log(res.data)
      const hatchedURI = res.data
      contract.write.hatch(id, hatchedURI)
    })
  }

  async function getAllLegends() {
    if (typeof window.ethereum !== 'undefined') {
      setGettingLegends(true)
      const totalLegends = await contract.read.totalSupply()
      for (let i = 1; i <= totalLegends; i++) {
        contract.read.legendData(i).then((legendMeta) => {
          if (!legendMeta.isDestroyed) {
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
          setGettingLegends(true)
          const legendsData = []
          for (let i = 0; i < balance; i++) {
            contract.read.tokenOfOwnerByIndex(account, i).then((token) => {
              const ownedToken = token.toString()
              loadLegends(ownedToken).then((res) => {
                legendsData.push(res)
              })
            })
          }
          setLegends(legendsData)
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

  // Send new NFT Genetics to API/Generator
  async function generateImage(newItemId) {
    if (typeof window.ethereum !== 'undefined') {
      const legend = await contract.read.tokenMeta(newItemId)
      const legendGenetics = await contract.read.legendGenetics(newItemId)
      // TODO: Make into interface(convert js -> ts)
      const legendInterface = {
        id: `${legend.id}`,
        prefix: legend.prefix,
        postfix: legend.postfix,
        genetics: `${legendGenetics}`,
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
      // console.log('test', legendInterface)
      // console.log('test1', legend)

      await axios
        .post('http://localhost:3001/api/mint', { legendInterface }) // Use this if your main host is Windows
        // .post('http://192.168.1.157:3001/api/mint', { legendInterface }) // using my laptop to run the generator API
        .then((res) => {
          const url = res.data
          console.log('New NFT IPFS URL:', url)
        })
      // .finally(() => {
      //   document.location.reload()
      // })
    }
  }

  async function breed() {
    if (typeof window.ethereum !== 'undefined') {
      const skipIncubation = false // for testing ; will be linked to accessories from game
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.breed(account, parent1, parent2, skipIncubation).then(
        contract.write.once('NewLegend', (data, event) => {
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

  // Mints Legend with "random" Genetics
  async function mintPromo() {
    if (typeof window.ethereum !== 'undefined') {
      const prefix = uniqueNamesGenerator(prefixConfig) // for testing
      const postfix = uniqueNamesGenerator(postfixConfig) // for testing
      // const level = 1 // for testing
      const isLegendary = false // for testing
      const skipIncubation = false // for testing

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.mintPromo(account, prefix, postfix, isLegendary, skipIncubation).then(
        // ! receiving multiple responses ?
        // ? is .then even needed
        contract.write.once('NewLegend', (data, event) => {
          console.log('New Token Created:', data.toString())
          const newItemId = data.toString()
          generateImage(newItemId)
        }),
      )
    }
  }

  async function approveTransaction() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.approve(legendsMarketplaceAddress, id)
      // await contract.write.approve('0x94726120565094F1a443eE8abd0fd8c3bd76c555', id)
    }
  }

  // TODO: change to payment owed
  async function checkPaymentAmount() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const payment = await marketplace.read.payments(account)
      console.log(payment.toString())
    }
  }

  async function checkOwedBid() {
    if (typeof window.ethereum !== 'undefined') {
      const auction = await marketplace.read.legendListing(id)
      const payment = await marketplace.read.payments(auction.buyer)
      console.log(payment.toString())
    }
  }

  async function checkLegendsOwed() {
    if (typeof window.ethereum !== 'undefined') {
      const payment = await marketplace.read.checkLegendsOwed(0)
      console.log(payment.toString())
    }
  }

  async function claimPayment() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.claimPayment(id)
    }
  }

  async function claimLegend() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.claimLegend(id)
    }
  }
  async function checkOwedTokens() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const tokensOwed = await marketplace.read.checkTokensOwed(id)
      console.log(tokensOwed.toString())
    }
  }
  async function claimTokens() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.claimTokens(id)
    }
  }
  async function claimEgg() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.claimEgg(id)
    }
  }

  async function withdrawFromMatching() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.withdrawFromMatching(id)
    }
  }
  async function relistInMatching() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.relistInMatching(id)
    }
  }

  // TODO: control aution/non-auction with toggle
  async function createLegendSale() {
    if (typeof window.ethereum !== 'undefined') {
      const price = ethers.utils.parseUnits(sellPrice, 'ether')
      const transaction = await marketplace.write.createLegendSale(legendsNFTAddress, id, price)
      await transaction.wait
      // await marketplace.write.createLegendListing(legendsNFTAddress, id, price).then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function buyLegend() {
    if (typeof window.ethereum !== 'undefined') {
      const listing = await marketplace.read.legendListing(id)
      const transaction = await marketplace.write.buyLegend(id, {
        value: listing.price,
      })
      await transaction.wait()
      // .then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function cancelLegendSale() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.cancelLegendSale(legendsNFTAddress, id)
      // .then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // }),
      // )
    }
  }
  async function fetchLegendListings() {
    if (typeof window.ethereum !== 'undefined') {
      const totalListings = await marketplace.read.fetchLegendListings()
      const auctionDetails = await marketplace.read.fetchAuctionDetails()
      totalListings.forEach((l) => {
        // marketplace.read.legendLisi(sale).then((l) => {
        console.log(`Listing ID: ${l.listingId}`)
        console.log(`Contract: ${l.nftContract}`)
        console.log(`Token ID: ${l.tokenId}`)
        console.log(`Seller: ${l.seller}`)
        console.log(`Buyer: ${l.buyer}`)
        console.log(`Price: ${l.price}`)
        console.log(`is Auction: ${l.isAuction}`)
        console.log(`Status: ${l.status}`)
        console.log('')
        if (l.isAuction) {
          auctionDetails.forEach((a) => {
            // const a = await marketplace.read.auctionDetails(id)
            // const a = marketplace.read.fetchAuctionDetails()
            console.log(`Created At: ${a.createdAt}`)
            console.log(`Duration: ${a.duration}`)
            console.log(`Starting Price: ${a.startingPrice}`)
            console.log(`Highest Bid: ${a.highestBid}`)
            console.log(`Highest Bidder: ${a.highestBidder}`)
            console.log(`Bidders: ${a.bidders}`)
            console.log(`Instant Buy: ${a.instantBuy}`)
            console.log('')
          })
        }
      })
    }
  }
  // debug function to see status of closed listings
  async function fetchListingData() {
    if (typeof window.ethereum !== 'undefined') {
      const auctionDetails = await marketplace.read.fetchAuctionDetails()
      // const itemCount = itemData[0]
      // const unsoldItemCount = itemData[0] - itemData[1]
      const currentIndex = 0
      const l = await marketplace.read.legendListing(id)
      //
      // for (let i = 0; i < itemCount; i++) {
      console.log(`Listing ID: ${l.listingId}`)
      console.log(`Contract: ${l.nftContract}`)
      console.log(`Token ID: ${l.tokenId}`)
      console.log(`Seller: ${l.seller}`)
      console.log(`Buyer: ${l.buyer}`)
      console.log(`Price: ${l.price}`)
      console.log(`is Auction: ${l.isAuction}`)
      console.log(`Status: ${l.status}`)
      console.log('')
      if (l.isAuction) {
        const a = await marketplace.read.auctionDetails(id)
        console.log(`Created At: ${a.createdAt}`)
        console.log(`Duration: ${a.duration}`)
        console.log(`Starting Price: ${a.startingPrice}`)
        console.log(`Highest Bid: ${a.highestBid}`)
        console.log(`Highest Bidder: ${a.highestBidder}`)
        console.log(`Bidders: ${a.bidders}`)
        console.log(`Instant Buy: ${a.instantBuy}`)
        console.log('')
      }
      // console.log(legendListing.buyer)
      // if (legendListing(i+1).buyer == )
      // }
    }
  }

  async function createLegendAuction() {
    if (typeof window.ethereum !== 'undefined') {
      // const duration = _duration * 86400
      const testDuration = 80 // seconds
      const duration = testDuration
      const startingPrice = ethers.utils.parseUnits(_startingPrice, 'ether')
      const _instantPrice = ethers.utils.parseUnits(instantPrice, 'ether')
      // const instantBuyPrice = ethers.utils.parseUnits(0.005, 'ether') // for testing
      const transaction = await marketplace.write.createLegendAuction(
        legendsNFTAddress,
        id,
        duration,
        startingPrice,
        _instantPrice,
      )
      await transaction.wait()
      // await marketplace.write.createLegendListing(legendsNFTAddress, id, price).then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function bidOnLegend() {
    if (typeof window.ethereum !== 'undefined') {
      const auctionBid = ethers.utils.parseUnits(bid, 'ether')
      await marketplace.write.placeBid(id, {
        value: auctionBid,
      })
    }
  }
  async function increaseBid() {
    if (typeof window.ethereum !== 'undefined') {
      const auctionBid = ethers.utils.parseUnits(bid, 'ether')
      await marketplace.write.bid(id, {
        value: auctionBid,
      })
    }
  }
  async function depositsOf() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const qty = await marketplace.read.payments(account)
      console.log(qty.toString())
    }
  }
  async function withdrawFromAuction() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.withdrawFromAuction(id)
    }
  }
  async function closeAuction() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.closeAuction(id)
    }
  }
  // increase bid ; can use same logic as bid , just change FE logic
  async function fetchLegendAuctions() {
    if (typeof window.ethereum !== 'undefined') {
      const totalAuctions = await marketplace.read.fetchLegendListings(2)
      totalAuctions.forEach((auction) => {
        marketplace.read.legendAuction(auction).then((a) => {
          console.log(`Listing ID: ${a.auctionId}`)
          console.log(`Contract: ${a.nftContract}`)
          console.log(`Token ID: ${a.tokenId}`)
          console.log(`Duration: ${a.duration}`)
          console.log(`Created At: ${a.createdAt}`)
          console.log(`Starting Price: ${a.startingPrice}`)
          console.log(`Seller: ${a.seller}`)
          console.log(`Highest Bid: ${a.highestBid}`)
          console.log(`Highest Bidder: ${a.highestBidder}`)
          console.log(`Bidders: ${a.bidders}`)
          console.log(`Status: ${a.status}`)
          console.log('')
        })
      })
    }
  }

  // debug function to see status of closed listings
  async function fetchAuctionData() {
    if (typeof window.ethereum !== 'undefined') {
      const a = await marketplace.read.legendAuction(id)
      console.log(`Listing ID: ${a.auctionId}`)
      console.log(`Contract: ${a.nftContract}`)
      console.log(`Token ID: ${a.tokenId}`)
      console.log(`Duration: ${a.duration}`)
      console.log(`Created At: ${a.createdAt}`)
      console.log(`Starting Price: ${a.startingPrice}`)
      console.log(`Seller: ${a.seller}`)
      console.log(`Highest Bid: ${a.highestBid}`)
      console.log(`Highest Bidder: ${a.highestBidder}`)
      console.log(`Bidders: ${a.bidders}`)
      console.log(`Status: ${a.status}`)
      console.log('')
    }
  }

  // TODO: bundle and turn into a single function in smart contract; check matching id exist
  async function approveMatching() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.approve(legendsMarketplaceAddress, breedingToken)
      const matching = await marketplace.read.legendMatching(id)
      const amount = matching.price.toString()
      console.log(amount)
      await tokens.write.approve(legendsMarketplace, amount)
    }
  }
  async function createLegendMatching() {
    if (typeof window.ethereum !== 'undefined') {
      const price = ethers.utils.parseUnits(matchingPrice, 'ether')
      const transaction = await marketplace.write.createLegendMatching(legendsNFTAddress, id, price)
      await transaction.wait
      // await marketplace.write.createLegendListing(legendsNFTAddress, id, price).then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function matchWithLegend() {
    if (typeof window.ethereum !== 'undefined') {
      // const listing = await marketplace.read.legendMatching(id)
      await marketplace.write.matchWithLegend(legendsNFTAddress, id, breedingToken)
      // , {
      // value: listing.price,
      // })
      // await transaction.wait()
      // .then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function cancelLegendMatching() {
    if (typeof window.ethereum !== 'undefined') {
      await marketplace.write.cancelLegendMatching(legendsNFTAddress, id)
      // .then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // }),
      // )
    }
  }
  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const d = await marketplace.read.fetchData()
      console.log(`Listings: ${d[0]}`)
      console.log(`Closed Listings: ${d[1]}`)
      console.log(`Cancelled Listings: ${d[2]}`)
      console.log(`Matchings: ${d[3]}`)
      console.log(`Closed Matchings: ${d[4]}`)
      console.log(`Cancelled Matchings: ${d[5]}`)
      console.log(`Auctions: ${d[6]}`)
      console.log(`Closed Auctions: ${d[7]}`)
      console.log(`Cancelled Auctions: ${d[8]}`)
      console.log('')
    }
  }
  async function fetchLegendMatchings() {
    if (typeof window.ethereum !== 'undefined') {
      const totalMatchings = await marketplace.read.fetchLegendListings(1)
      console.log(totalMatchings.toString())
      totalMatchings.forEach((matching) => {
        marketplace.read.legendMatching(matching).then((m) => {
          console.log(`Match ID: ${m.matchId}`)
          console.log(`Contract: ${m.nftContract}`)
          console.log(`Surrogate Token: ${m.surrogateToken}`)
          console.log(`Surrogate: ${m.surrogate}`)
          console.log(`Breeder: ${m.breeder}`)
          console.log(`Breeder Token: ${m.breederToken}`)
          console.log(`Child Id: ${m.childId}`)
          console.log(`Price: ${m.price}`)
          console.log(`Status: ${m.status}`)
          console.log('')
        })
      })
    }
  }

  // debug function to see status of closed matchings
  async function fetchMatchingData() {
    if (typeof window.ethereum !== 'undefined') {
      const m = await marketplace.read.legendMatching(id)
      console.log(`Match ID: ${m.matchId}`)
      console.log(`Contract: ${m.nftContract}`)
      console.log(`Surrogate Token: ${m.surrogateToken}`)
      console.log(`Surrogate: ${m.surrogate}`)
      console.log(`Breeder: ${m.breeder}`)
      console.log(`Breeder Token: ${m.breederToken}`)
      console.log(`Child Id: ${m.childId}`)
      console.log(`Price: ${m.price}`)
      console.log(`Status: ${m.status}`)
      console.log('')
    }
  }

  // const NftContainer = styled.div`
  //   & {
  //     padding: 25px;
  //     display: inline-flex;
  //     flex-wrap: wrap;
  //     width: 100%;
  //     justify-content: center;
  //     div {
  //       margin: 25px;
  //     }
  //   }
  // `

  // const pinataGeteway = 'https://gateway.pinata.cloud/ipfs/'

  // const cidToUrl = (cid) => {
  //   return pinataGeteway + cid.split('//')[1]
  // }

  return (
    <div>
      <header>
        <div>
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={fetchURI}>
            Fetch URI
          </button>
          <button type="submit" onClick={fetchLegendComposition}>
            Fetch Legend Composition
          </button>
          <button type="submit" onClick={fetchMeta}>
            Fetch Legend Metadata
          </button>
          <button type="submit" onClick={fetchGenetics}>
            Fetch IPFS Genetics
          </button>
          <button type="submit" onClick={fetchStats}>
            Fetch Legend Stats
          </button>
          <button type="submit" onClick={isHatchable}>
            is Hatchable ?
          </button>
          <br /> <br />
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
          <button type="submit" onClick={setBaseHealth}>
            Set Base Health
          </button>
          <br />
          <input type="text" placeholder="Season" onChange={(e) => setSeasonValue(e.target.value)} />
          <button type="submit" onClick={setSeason}>
            Set Season
          </button>
          <br /> <br />
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
          <button type="submit" onClick={hatch}>
            Hatch Legend
          </button>
        </div>
        <br />
        <br />
        <div>
          <button type="submit" onClick={approveTransaction}>
            Approve Transaction
          </button>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Sell Price(BSC)" onChange={(e) => setPrice(e.target.value)} />
          <button type="submit" onClick={createLegendSale}>
            Create Legend Listing
          </button>
          <br />
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={buyLegend}>
            Buy Legend
          </button>
          <button type="submit" onClick={cancelLegendSale}>
            Cancel Listing
          </button>
          <br />
          <button type="submit" onClick={fetchLegendListings}>
            Fetch Legend Listings
          </button>
          <button type="submit" onClick={fetchListingData}>
            Fetch Listing Data
          </button>
        </div>
        <br />
        <div>
          <button type="submit" onClick={approveTransaction}>
            Approve Transaction
          </button>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          {/* <input type="number" placeholder="Duration Days" onChange={(e) => setPrice(e.target.value)} /> */}
          <select onChange={(e) => setDuration(e.target.value)}>
            <option>Select Duration</option>
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
          </select>
          <input type="number" placeholder="Starting Price(BSC)" onChange={(e) => setStartingPrice(e.target.value)} />
          <select onChange={(e) => toggleInstantBuy(e.target.value)}>
            <option>Allow Instant Buy?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <input type="number" placeholder="Instant Buy Price" onChange={(e) => setInstantPrice(e.target.value)} />
          <button type="submit" onClick={createLegendAuction}>
            Create Legend Auction
          </button>
          <br />
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Bid Amount(BSC)" onChange={(e) => setBid(e.target.value)} />
          <button type="submit" onClick={bidOnLegend}>
            Bid On Legend
          </button>
          <button type="submit" onClick={increaseBid}>
            Increase Bid
          </button>
          <button type="submit" onClick={withdrawFromAuction}>
            Withdraw From Auction
          </button>
          <button type="submit" onClick={closeAuction}>
            Close Auction
          </button>
          <button type="submit" onClick={cancelLegendSale}>
            Cancel Auction
          </button>
          <br />
          <button type="submit" onClick={fetchLegendAuctions}>
            Fetch Legend Auctions
          </button>
          <button type="submit" onClick={fetchAuctionData}>
            Fetch Auction Data
          </button>
          <button type="submit" onClick={depositsOf}>
            Deposited Amount
          </button>
          <br />
          <br />
          <button type="submit" onClick={checkPaymentAmount}>
            Check Owed Payment
          </button>
          <button type="submit" onClick={checkOwedBid}>
            Check Owed Bid
          </button>
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={claimPayment}>
            Claim Payment
          </button>
          <br />
          <button type="submit" onClick={checkLegendsOwed}>
            Check Owed Legends
          </button>
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={claimLegend}>
            Claim Legend
          </button>
          <br />
          <br />
        </div>
        <br />
        <div>
          <button type="submit" onClick={approveTransaction}>
            Approve Transaction
          </button>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Matching Price(LGND)" onChange={(e) => setMatchingPrice(e.target.value)} />
          <button type="submit" onClick={createLegendMatching}>
            Create Legend Matching
          </button>
          <br />
          <input type="number" placeholder="Matching ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Breeding Token ID" onChange={(e) => setBreedingToken(e.target.value)} />
          <button type="submit" onClick={approveMatching}>
            Approve Matching
          </button>
          <button type="submit" onClick={matchWithLegend}>
            Match With Legend
          </button>
          <button type="submit" onClick={cancelLegendMatching}>
            Cancel Matching
          </button>
          <br />
          <button type="submit" onClick={fetchLegendMatchings}>
            Fetch Legend Matchings
          </button>
          <button type="submit" onClick={fetchMatchingData}>
            Fetch Matching Data
          </button>
          <br />
          <button type="submit" onClick={fetchData}>
            Fetch Data
          </button>
        </div>
        <br />
        <div>
          <button type="submit" onClick={checkPaymentAmount}>
            Check Owed Eggs
          </button>
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={claimEgg}>
            Claim Egg
          </button>
          <br />
          <button type="submit" onClick={checkOwedTokens}>
            Check Owed Tokens
          </button>
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={claimTokens}>
            Claim Tokens
          </button>
          <br />
          <button type="submit" onClick={checkPaymentAmount}>
            Check Reclaimable Legends
          </button>
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={withdrawFromMatching}>
            Withdraw From Matching
          </button>
          <button type="submit" onClick={relistInMatching}>
            Relist In Matching
          </button>
        </div>
      </header>
      {/* <NftContainer>
        {gettingLegends &&
          (legends.length > 0 ? (
            legends.map((legend) => {
              console.log(legends)
              return (
                <NftCard>
                  <h3>Legend ID: {legend.tokenID}</h3>
                  <img alt="legend" src={cidToUrl(legend.imgURL)} />
                </NftCard>
              )
            })
          ) : (
            <img alt="eater" src={gif} />
          ))}
      </NftContainer> */}
    </div>
  )
}

export default App
