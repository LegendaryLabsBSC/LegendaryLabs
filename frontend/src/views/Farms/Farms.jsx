import { React, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import styled from 'styled-components'
import { AddressZero } from 'ethers/constants'
import {
  legendsLaboratory,
  legendsNFT,
  legendsToken,
  legendsMarketplace,
  legendsMatchingBoard,
} from 'contract_config/contract-config'
import LegendsNFT from '../../artifacts/contracts/legend/LegendsNFT.sol/LegendsNFT.json'
import LegendsMarketplace from '../../artifacts/contracts/marketplace/LegendsMarketplace.sol/LegendsMarketplace.json'
import LegendsMatchingBoard from '../../artifacts/contracts/matching/LegendsMatchingBoard.sol/LegendsMatchingBoard.json'
import LegendsLaboratory from '../../artifacts/contracts/lab/LegendsLaboratory.sol/LegendsLaboratory.json'
import LegendToken from '../../artifacts/contracts/token/LegendToken.sol/LegendToken.json'
import { NftCard } from './components/nftCard'
import gif from '../../eater.gif'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const contract = {
  lab: {
    read: new ethers.Contract(legendsLaboratory, LegendsLaboratory.abi, provider),
    write: new ethers.Contract(legendsLaboratory, LegendsLaboratory.abi, signer),
  },
  token: {
    read: new ethers.Contract(legendsToken, LegendToken.abi, provider),
    write: new ethers.Contract(legendsToken, LegendToken.abi, signer),
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

function App() {
  const [id, setID] = useState(0)
  const [sellPrice, setPrice] = useState(0)
  const [parent1, setParent1] = useState(0)
  const [parent2, setParent2] = useState(0)
  const [value, setValue] = useState(0)
  const [season, setSeasonValue] = useState('')
  const [newURI, setURI] = useState('')
  const [legends, setLegends] = useState([])
  const [bidders, setBidders] = useState([])
  const [gettingLegends, setGettingLegends] = useState(false)
  const [_duration, setDuration] = useState(0)
  const [_startingPrice, setStartingPrice] = useState(0)
  const [instantBuy, toggleInstantBuy] = useState(false)
  const [instantPrice, setInstantPrice] = useState(0)
  const [matchingPrice, setMatchingPrice] = useState(0)
  const [breedingToken, setBreedingToken] = useState(0)
  const [bid, setBid] = useState(0)
  const [promoName, setPromoName] = useState('')
  // const [amount, setAmount] = useState(0)

  /**
   * Access Control Start
   */

  const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const LAB_ADMIN = '0xa3c50eadf7191eaea0f91d60683b45bf06671be68100f95bbe6bf79e0f7f49da'
  const LAB_TECH = '0x50cfca4094c55bf42de4c6bab117b8cffa7bc564d44ed30ce3669a40f63c829b'

  async function hasRole() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const role = LAB_ADMIN
      const checkRole = await contract.lab.read.hasRole(role, account)

      console.log(checkRole)
    }
  }

  async function getRoleAdmin() {
    if (typeof window.ethereum !== 'undefined') {
      const role = LAB_TECH
      const checkRole = await contract.lab.read.getRoleAdmin(role)

      console.log(checkRole)
    }
  }

  async function getRoleMember() {
    if (typeof window.ethereum !== 'undefined') {
      const role = DEFAULT_ADMIN_ROLE
      const checkRole = await contract.lab.read.getRoleMember(role, 0)

      console.log(checkRole)
    }
  }

  async function getRoleMemberCount() {
    if (typeof window.ethereum !== 'undefined') {
      const role = DEFAULT_ADMIN_ROLE
      const roleCount = await contract.lab.read.getRoleMemberCount(role)

      console.log(roleCount.toString())
    }
  }

  const bread = '0x55f76D8a23AE95944dA55Ea5dBAAa78Da4D29A52'
  const dug = '0xb60c96b1206B9925666A679fB88745986e58af95'
  const philip = '0x646F9efDf28686ECC95769eB3B95b9a6BF7bf608'

  async function grantRole() {
    if (typeof window.ethereum !== 'undefined') {
      const role = LAB_TECH
      const account = dug
      await contract.lab.write.grantRole(role, account)
    }
  }

  async function revokeRole() {
    if (typeof window.ethereum !== 'undefined') {
      const role = LAB_TECH
      const account = dug
      await contract.lab.write.revokeRole(role, account)
    }
  }

  async function renounceRole() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const role = LAB_TECH
      await contract.lab.write.renounceRole(role, account)
    }
  }

  async function transferLaboratoryAdmin() {
    if (typeof window.ethereum !== 'undefined') {
      const role = LAB_TECH
      const account = philip

      await contract.lab.write.transferLaboratoryAdmin(account)
    }
  }

  /**
   * Access Control End
   */

  /**
   * Admin Start
   */

  async function fetchLabGetters() {
    if (typeof window.ethereum !== 'undefined') {
      const currentSeason = await contract.lab.read.fetchSeason()

      const blendingCount = await contract.lab.read.fetchBlendingCount(1)

      const blendingCost = await contract.lab.read.fetchBlendingCost(1)

      const royaltyRecipient = await contract.lab.read.fetchRoyaltyRecipient(1)

      console.log(`
      currentSeason: ${currentSeason},
      blendingCount: ${blendingCount},
      blendingCost: ${blendingCost},
      royaltyRecipient: ${royaltyRecipient}
        `)
    }
  }

  async function createPromoEvent() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.createPromoEvent(promoName, 86400, true, 0, false)
    }
  }
  async function fetchPromoDetails() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

      const totalPromos = await contract.lab.read.fetchTotalPromoCount()

      for (let i = 1; i <= totalPromos; i++) {
        contract.lab.read.fetchPromoEvent(i).then((p) => {
          console.log(`Promo: ${p.promoName}`)
          console.log(`Start Time: ${p.startTime}`)
          console.log(`Expire Time: ${p.expireTime}`)
          console.log(`Unrestricted: ${p.isUnrestricted}`)
          console.log(`Closed: ${p.promoClosed}`)
          console.log(`Tickets Claimed: ${p.ticketsClaimed}`)
          console.log(`Tickets Redeemed: ${p.ticketsRedeemed}`)
          console.log('')
        })
      }
    }
  }
  async function dispensePromoTicket() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.lab.write.dispensePromoTicket(id, account, 1)
    }
  }
  async function redeemPromoTicket() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.redeemPromoTicket(id)
    }
  }
  async function fetchRedeemableTickets() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

      const totalPromos = await contract.lab.read.fetchTotalPromoCount()
      // const amount = async await contract.lab.read.fetchRedeemableTickets(id, account)
      // console.log(amount)

      for (let i = 1; i <= totalPromos; i++) {
        // contract.lab.read.fetchPromoEvent(i)
        contract.lab.read.fetchRedeemableTickets(i, account).then((p) => {
          // const amount = contract.lab.read.fetchRedeemableTickets(i, account)
          console.log(`Tickets Owned: ${p}`)
          console.log('')
        })
      }
    }
  }
  async function closePromoEvent() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.closePromoEvent(id)
    }
  }

  async function setSeason() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.setSeason(season)
    }
  }

  async function setKinBlendingLevel() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.setKinBlendingLevel(id)
    }
  }

  async function setIncubationViews() {
    if (typeof window.ethereum !== 'undefined') {
      const newViews = ['test1', 'test2', 'test3', 'test4', 'test5']
      await contract.lab.write.setIncubationViews(newViews)
    }
  }

  async function setBlendingLimit() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.setBlendingLimit(season)
    }
  }

  async function setBaseBreedingCost() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.setBaseBreedingCost(value)
    }
  }

  async function setIncubationPeriod() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }
  async function setRoyaltyFee() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }

  async function setMarketplaceFee() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }
  async function setOfferDuration() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.setBreedingCooldown(value)
    }
  }
  async function setAuctionDurations() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.lab.write.setOffspringLimit(value)
    }
  }

  async function setAuctionExtension() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }

  async function setMinimumSecure() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }

  async function setMaxMultiplier() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }

  async function setReJuPerBlock() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }

  async function setReJuNeededPerSlot() {
    if (typeof window.ethereum !== 'undefined') {
      const unixTime = value * 86400
      await contract.lab.write.setIncubationPeriod(unixTime)
    }
  }

  /**
   * Admin End
   */

  /**
   * Legend NFT Start
   */
  async function fetchURI() {
    if (typeof window.ethereum !== 'undefined') {
      const legendURI = await contract.nft.read.fetchLegendURI(id)
      console.log('IPFS URI: ', legendURI)
    }
  }
  async function fetchLegendComposition() {
    if (typeof window.ethereum !== 'undefined') {
      // const legendMeta = await contract.nft.read.legendMetadata(id) // doesn't return parents for some reason
      const legendMeta = await contract.nft.read.fetchLegendMetadata(id)
      // const legendGenetics = await contract.nft.read.legendGenetics(id)
      // const legendStats = await contract.nft.read.legendStats(id)
      console.log('META:')
      console.log(`id: ${legendMeta.id}`)
      console.log(`season: ${legendMeta.season}`)
      console.log(`prefix: ${legendMeta.prefix}`)
      console.log(`postfix: ${legendMeta.postfix}`)
      console.log(`parents: ${legendMeta.parents}`)
      console.log(`birthday: ${legendMeta.birthDay}`)
      console.log(`blending cost: ${legendMeta.blendingCost}`)
      console.log(`blending instances used: ${legendMeta.blendingInstancesUsed}`)
      console.log(`total offspring: ${legendMeta.offspringLimit}`)
      console.log(`legend creator: ${legendMeta.legendCreator}`)
      console.log(`breeding cooldown: ${legendMeta.breedingCooldown}`)
      console.log(`is legendary: ${legendMeta.isLegendary}`)
      console.log(`is hatched: ${legendMeta.isHatched}`)
      // console.log('GENES:')
      // console.log(`CdR1: ${legendGenetics.CdR1}`)
      // console.log(`CdG1: ${legendGenetics.CdG1}`)
      // console.log(`CdB1: ${legendGenetics.CdB1}`)
      // console.log(`CdR2: ${legendGenetics.CdR2}`)
      // console.log(`CdG2: ${legendGenetics.CdG2}`)
      // console.log(`CdB2: ${legendGenetics.CdB2}`)
      // console.log(`CdR3: ${legendGenetics.CdR3}`)
      // console.log(`CdG3: ${legendGenetics.CdG3}`)
      // console.log(`CdB3: ${legendGenetics.CdB3}`)
      // console.log('STATS:')
      // console.log(`level: ${legendStats.level}`)
      // console.log(`health: ${legendStats.health}`)
      // console.log(`strength: ${legendStats.strength}`)
      // console.log(`defense: ${legendStats.defense}`)
      // console.log(`agility: ${legendStats.agility}`)
      // console.log(`speed: ${legendStats.speed}`)
      // console.log(`accuracy: ${legendStats.accuracy}`)
      // console.log(`destruction: ${legendStats.destruction}`)
    }
  }
  async function fetchGenetics() {
    if (typeof window.ethereum !== 'undefined') {
      const legendGenetics = await contract.nft.read.legendGenetics(id)
      console.log(`Genetics: ${legendGenetics}`)
    }
  }
  async function fetchStats() {
    if (typeof window.ethereum !== 'undefined') {
      const legendStats = await contract.nft.read.legendStats(id)
      console.log(`Stats: ${legendStats}`)
    }
  }
  async function isHatchable() {
    if (typeof window.ethereum !== 'undefined') {
      legends.forEach((legend) => {
        contract.nft.read.legendMetadata(legend.tokenID).then((legendMeta) => {
          if (!legendMeta.isHatched) {
            const testToggle = true // hatching test toggle
            contract.nft.read.isHatchable(legendMeta.id, testToggle).then((res) => {
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
      contract.nft.write.hatch(id, hatchedURI)
    })
  }
  async function getAllLegends() {
    if (typeof window.ethereum !== 'undefined') {
      setGettingLegends(true)
      const totalLegends = await contract.nft.read.totalSupply()
      for (let i = 1; i <= totalLegends; i++) {
        contract.nft.read.legendMetadata(i).then((legendMeta) => {
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
      await contract.nft.read.balanceOf(account).then((balance) => {
        if (balance > 0) {
          setGettingLegends(true)
          const legendsData = []
          for (let i = 0; i < balance; i++) {
            contract.nft.read.tokenOfOwnerByIndex(account, i).then((token) => {
              const tokenId = token.toString()
              loadLegends(tokenId).then((res) => {
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
    const imgURL = await contract.nft.read.fetchLegendURI(tokenID)
    console.log(`Legend ID: ${tokenID} Image URL: ${imgURL}`)
    return { tokenID, imgURL }
    // Logic for rendering Legend Card Component here from pinata ?
  }
  // Send new NFT Genetics to API/Generator
  async function generateImage(newItemId) {
    if (typeof window.ethereum !== 'undefined') {
      const legend = await contract.nft.read.tokenMeta(newItemId)
      const legendGenetics = await contract.nft.read.legendGenetics(newItemId)
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
      await contract.nft.write.breed(account, parent1, parent2, skipIncubation).then(
        contract.nft.write.once('NewLegend', (data, event) => {
          const newItemId = data.toString()
          console.log('New Token Created:', newItemId) // Debug logging
          generateImage(newItemId)
        }),
      )
    }
  }
  async function destroy() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.nft.write.destroyLegend(id)
    }
  }
  // Mints Legend with "random" Genetics
  async function mintPromo() {
    if (typeof window.ethereum !== 'undefined') {
      // const level = 1 // for testing
      const isLegendary = false // for testing
      const skipIncubation = false // for testing

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // await contract.nft.write.mintPromo(account, prefix, postfix, isLegendary, skipIncubation).then(
      await contract.nft.write.mintPromo(account, id, isLegendary)
      // .then(
      // // ! receiving multiple responses ?
      // // ? is .then even needed
      //   contract.nft.write.once('NewLegend', (data, event) => {
      //     console.log('New Token Created:', data.toString()) // return token id instead of watching for event
      //     const newItemId = data.toString()
      //     generateImage(newItemId)
      //   }),
      // )
    }
  }
  /**
   * Legend NFT End
   */

  /**
   * Sale Start
   */
  async function createLegendSale() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.nft.write.approve(legendsMarketplace, id)

      const price = ethers.utils.parseUnits(sellPrice, 'ether')
      const transaction = await contract.marketplace.write.createLegendSale(legendsNFT, id, price)
      await transaction.wait
      // await contract.marketplace.write.createLegendListing(legendsNFT, id, price).then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function buyLegend() {
    if (typeof window.ethereum !== 'undefined') {
      const listing = await contract.marketplace.read.legendListing(id)
      const transaction = await contract.marketplace.write.buyLegend(id, {
        value: listing.price,
      })
      await transaction.wait()
      // .then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function cancelLegendSale() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.marketplace.write.cancelLegendListing(id)
      // .then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // }),
      // )
    }
  }
  async function fetchLegendListings() {
    if (typeof window.ethereum !== 'undefined') {
      // const listingCounts = await contract.marketplace.read.fetchListingCounts()
      // const count = listingCounts[0]
      // const b = await contract.marketplace.read.legendListing(1)
      const l = await contract.marketplace.read.legendListing(id)
      const a = await contract.marketplace.read.auctionDetails(id)
      const o = await contract.marketplace.read.offerDetails(id)

      console.log(`Listing ID: ${l.listingId}`)
      console.log(`Created At: ${l.createdAt}`)
      console.log(`Contract: ${l.nftContract}`)
      console.log(`Legend ID: ${l.legendId}`)
      console.log(`Seller: ${l.seller}`)
      console.log(`Buyer: ${l.buyer}`)
      console.log(`Price: ${l.price}`)
      console.log(`is Auction: ${l.isAuction}`)
      console.log(`is Offer: ${l.isOffer}`)
      if (l.status === 0) {
        console.log('Status: Null')
      } else if (l.status === 1) {
        console.log('Status: Open')
      } else if (l.status === 2) {
        console.log('Status: Closed')
      } else if (l.status === 3) {
        console.log('Status: Cancelled')
      }
      console.log('')
      if (l.isAuction) {
        console.log(`Duration: ${a.duration}`)
        console.log(`Starting Price: ${a.startingPrice}`)
        console.log(`Highest Bid: ${a.highestBid}`)
        console.log(`Highest Bidder: ${a.highestBidder}`)
        console.log(`Bidders: ${a.bidders}`)
        console.log(`Instant Buy: ${a.instantBuy}`)
        console.log('')
      }
      if (l.isOffer) {
        console.log(`Expiration Time: ${o.expirationTime}`)
        console.log(`Legend Owner: ${o.legendOwner}`)
        console.log(`Is Accepted: ${o.isAccepted}`)
        console.log('')
      }
    }
  }
  async function checkPaymentAmount() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const payment = await contract.marketplace.read.payments(account)
      console.log(payment.toString())
    }
  }
  async function checkOwedBid() {
    if (typeof window.ethereum !== 'undefined') {
      const auction = await contract.marketplace.read.legendListing(id)
      const payment = await contract.marketplace.read.payments(auction.buyer)
      console.log(payment.toString())
    }
  }
  async function claimPayment() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.marketplace.write.claimPayment(id)
    }
  }
  async function claimLegend() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.marketplace.write.claimLegend(id)
    }
  }
  /**
   * Sale End
   */

  /**
   * Auction Start
   */

  const approveTransaction = async () => {
    await contract.nft.write.approve(legendsMarketplace, id)
  }

  async function createLegendAuction() {
    if (typeof window.ethereum !== 'undefined') {
      // await contract.nft.write.approve(legendsMarketplace, id)

      // const duration = _duration * 86400
      const testDuration = 650 // seconds
      const duration = testDuration
      const startingPrice = ethers.utils.parseUnits(_startingPrice, 'ether')
      const _instantPrice = ethers.utils.parseUnits(instantPrice, 'ether')
      // const instantBuyPrice = ethers.utils.parseUnits(0.005, 'ether') // for testing
      const transaction = await contract.marketplace.write.createLegendAuction(
        legendsNFT,
        id,
        duration,
        startingPrice,
        _instantPrice,
      )
      await transaction.wait()
      // await contract.marketplace.write.createLegendListing(legendsNFT, id, price).then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function bidOnLegend() {
    if (typeof window.ethereum !== 'undefined') {
      const auctionBid = ethers.utils.parseUnits(bid, 'ether')
      const transaction = await contract.marketplace.write.placeBid(id, {
        value: auctionBid,
      })
      await transaction.wait
    }
  }
  async function depositsOf() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const qty = await contract.marketplace.read.payments(account)
      console.log(qty.toString())
    }
  }
  async function withdrawFromAuction() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.marketplace.write.withdrawBid(id)
    }
  }
  async function closeAuction() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.marketplace.write.closeListing(id)
    }
  }
  async function biddys() {
    if (typeof window.ethereum !== 'undefined') {
      const b = await contract.marketplace.read.fetchBidders(id)
      console.log(b)
      console.log(b.length)
    }
  }
  /**
   * Auction End
   */

  /**
   *  Offer Start
   */
  async function makeLegendOffer() {
    if (typeof window.ethereum !== 'undefined') {
      const price = ethers.utils.parseUnits(sellPrice, 'ether')
      // console.log(price)
      const transaction = await contract.marketplace.write.makeLegendOffer(legendsNFT, id, { value: price })
      await transaction.wait

      // const price = ethers.utils.parseUnits(sellPrice, 'ether')
      // const transaction = await contract.marketplace.write.createLegendSale(legendsNFT, id, price)
      // await transaction.wait
      // .then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // }),
      // )
    }
  }
  async function acceptLegendOffer() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.nft.write.approve(legendsMarketplace, id)

      const transaction = await contract.marketplace.write.decideLegendOffer(id, true)
      await transaction.wait
      // await contract.marketplace.write.createLegendListing(legendsNFT, id, price).then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function rejectLegendOffer() {
    if (typeof window.ethereum !== 'undefined') {
      const transaction = await contract.marketplace.write.decideLegendOffer(id, false)
      await transaction.wait
      // await contract.marketplace.write.createLegendListing(legendsNFT, id, price).then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  async function claimRoyalties() {
    if (typeof window.ethereum !== 'undefined') {
      const transaction = await contract.marketplace.write.claimRoyalties()
      await transaction.wait
      // await contract.marketplace.write.createLegendListing(legendsNFT, id, price).then(
      // contract.marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // })
    }
  }
  /**
   *  Offer End
   */

  /**
   * Matching Start
   */
  // const approveTransaction = async () => {
  //   await contract.nft.write.approve(legendsMatchingBoard, id)
  // }

  async function createLegendMatching() {
    if (typeof window.ethereum !== 'undefined') {
      const create = async () => {
        const price = ethers.utils.parseUnits(matchingPrice, 'ether')
        const transaction = await contract.matchingBoard.write.createLegendMatching(legendsNFT, id, price)
        await transaction.wait
      }

      approveTransaction().then(() => {
        create()
      })
    }
  }
  async function matchWithLegend() {
    if (typeof window.ethereum !== 'undefined') {
      // await contract.nft.write.approve(legendsMatchingBoard, breedingToken)

      // await contract.matchingBoard.write.matchWithLegend(id, breedingToken)
      const matching = await contract.matchingBoard.read.legendMatching(id)
      const amount = matching.price.toString()
      await contract.token.write.approve(legendsMatchingBoard, amount)
    }
  }
  async function cancelLegendMatching() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.matchingBoard.write.cancelLegendMatching(legendsNFT, id)
      // .then(
      // marketplace.write.once('ListingStatusChanged', (data, event) => {
      //   console.log(`data: ${data[0]} ${data[1]}`)
      //   console.log(`event: ${event[0]} ${event[1]}`)
      // }),
      // )
    }
  }
  async function fetchLegendMatchings() {
    if (typeof window.ethereum !== 'undefined') {
      const m = await contract.matchingBoard.read.legendMatching(id)
      console.log(`Match ID: ${m.matchingId}`)
      console.log(`Created At: ${m.createdAt}`)
      console.log(`Contract: ${m.nftContract}`)
      console.log(`Surrogate Token: ${m.surrogateToken}`)
      console.log(`Surrogate: ${m.surrogate}`)
      console.log(`Breeder: ${m.breeder}`)
      console.log(`Breeder Token: ${m.breederToken}`)
      console.log(`Child Id: ${m.childId}`)
      console.log(`Price: ${m.price}`)
      if (m.status === 0) {
        console.log('Status: Null')
      } else if (m.status === 1) {
        console.log('Status: Open')
      } else if (m.status === 2) {
        console.log('Status: Closed')
      } else if (m.status === 3) {
        console.log('Status: Cancelled')
      }
      console.log('')
    }
  }
  async function checkOwedTokens() {
    if (typeof window.ethereum !== 'undefined') {
      const tokensOwed = await contract.matchingBoard.read.checkTokensOwed()
      console.log(tokensOwed.toString())
    }
  }
  async function claimTokens() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.matchingBoard.write.claimTokens()
    }
  }
  async function claimEgg() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.matchingBoard.write.claimEgg(id)
    }
  }
  async function withdrawFromMatching() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.matchingBoard.write.withdrawFromMatching(id)
    }
  }
  async function relistInMatching() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.matchingBoard.write.relistInMatching(id)
    }
  }
  /**
   * Matching End
   */

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
          <button type="submit" onClick={hasRole}>
            Has Role
          </button>
          <button type="submit" onClick={getRoleMemberCount}>
            Role Count
          </button>
          <button type="submit" onClick={getRoleAdmin}>
            Get Role Admin
          </button>
          <button type="submit" onClick={getRoleMember}>
            Get Role Member
          </button>
          <button type="submit" onClick={grantRole}>
            Grant Role
          </button>
          <button type="submit" onClick={revokeRole}>
            Revoke Role
          </button>
          <button type="submit" onClick={renounceRole}>
            Renounce Role
          </button>
          <button type="submit" onClick={transferLaboratoryAdmin}>
            Transfer Lab Adminship
          </button>
        </div>
        <br />
        <div>
          <button type="submit" onClick={fetchLabGetters}>
            Fetch Lab Getter Values
          </button>
          <input type="number" placeholder="Value" onChange={(e) => setValue(e.target.value)} />
          <button type="submit" onClick={setIncubationPeriod}>
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
        </div>
        <br />
        <div>
          <input type="text" placeholder="Name" onChange={(e) => setPromoName(e.target.value)} />
          <button type="submit" onClick={createPromoEvent}>
            Create Promo Event
          </button>
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={closePromoEvent}>
            Close Promo Event
          </button>
          <button type="submit" onClick={fetchPromoDetails}>
            Fetch Promo Details
          </button>
          <br />
          <input type="number" placeholder="Promo ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={dispensePromoTicket}>
            Dispense Promo Ticket
          </button>
          <button type="submit" onClick={redeemPromoTicket}>
            Redeem Promo Ticket
          </button>
          <button type="submit" onClick={fetchRedeemableTickets}>
            Fetch Redeemable Tickets
          </button>
        </div>
        <br />
        <div>
          <button type="submit" onClick={getTokensByOwner}>
            Print Owned Legend IDs
          </button>
          <button type="submit" onClick={getAllLegends}>
            Print All Legend Ids
          </button>
          <button type="submit" onClick={mintPromo}>
            Mint Promotional NFT
          </button>
        </div>
        <div>
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={fetchURI}>
            Fetch URI
          </button>
          <button type="submit" onClick={fetchLegendComposition}>
            Fetch Legend Composition
          </button>
          <button type="submit" onClick={fetchGenetics}>
            Fetch IPFS Genetics
          </button>
          <button type="submit" onClick={fetchStats}>
            Fetch Legend Stats
          </button>
        </div>
        <div>
          <input type="number" placeholder="Parent 1 Token ID" onChange={(e) => setParent1(e.target.value)} />
          <input type="number" placeholder="Parent 2 Token ID" onChange={(e) => setParent2(e.target.value)} />
          <button type="submit" onClick={breed}>
            Breed
          </button>
          <br />
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={isHatchable}>
            is Hatchable ?
          </button>
          <button type="submit" onClick={hatch}>
            Hatch Legend
          </button>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={destroy}>
            Destroy Legend
          </button>
        </div>
        <br />
        <div>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Sell Price(BSC)" onChange={(e) => setPrice(e.target.value)} />
          <button type="submit" onClick={createLegendSale}>
            Create Legend Listing
          </button>
          <button type="submit" onClick={makeLegendOffer}>
            Make Legend Offer
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
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={fetchLegendListings}>
            Fetch Legend Listings
          </button>
          <button type="submit" onClick={biddys}>
            Fetch Listing Bids
          </button>
        </div>
        <br />
        <div>
          <br />
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={buyLegend}>
            Buy Legend
          </button>
          <button type="submit" onClick={acceptLegendOffer}>
            Accept Offer
          </button>
          <button type="submit" onClick={rejectLegendOffer}>
            Reject Offer
          </button>
          <button type="submit" onClick={approveTransaction}>
            Approve Transaction
          </button>
          <br />
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Bid Amount(BSC)" onChange={(e) => setBid(e.target.value)} />
          <button type="submit" onClick={bidOnLegend}>
            Bid On Legend
          </button>
          <br />
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={cancelLegendSale}>
            Cancel Listing
          </button>
          <button type="submit" onClick={withdrawFromAuction}>
            Withdraw Bid From Auction
          </button>
          <br />
          {/* <button type="submit" onClick={depositsOf}>
            Deposited Amount
          </button> */}
          <br />
        </div>
        <div>
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={closeAuction}>
            Close Listing & Claim Output
          </button>
          <br />
          <br />
          <button type="submit" onClick={claimRoyalties}>
            Check Royalties
          </button>
          <button type="submit" onClick={claimRoyalties}>
            Claim Royalties
          </button>
          <br />
        </div>
        <br />
        <div>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Matching Price(LGND)" onChange={(e) => setMatchingPrice(e.target.value)} />
          <button type="submit" onClick={createLegendMatching}>
            Create Legend Matching
          </button>
          <br />
          <input type="number" placeholder="Matching ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Breeding Token ID" onChange={(e) => setBreedingToken(e.target.value)} />
          <button type="submit" onClick={matchWithLegend}>
            Match With Legend
          </button>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={fetchLegendMatchings}>
            Fetch Legend Matchings
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
          <button type="submit" onClick={claimTokens}>
            Claim Tokens
          </button>
          <br />
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={cancelLegendMatching}>
            Cancel Matching
          </button>
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
