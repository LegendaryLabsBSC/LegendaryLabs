import { legendById } from "@/functions"
import { useQuery, gql } from "@apollo/client"
import { useEffect, useState } from "react"

const listings = gql`{
  allLegendListings(filter: "all") {
    listingId
    createdAt
    nftContract
    legendId
    seller
    buyer
    price
    isOffer
    isAuction
    status
    auctionDetails {
      duration
      startingPrice
      highestBid
      highestBidder
      isInstantBuy
      durationInDays
      instantBuyPrice
      bidders
      isExpired
    }
    offerDetails {
      expirationTime
      legendOwner
      isAccepted
    }
  }
}`

const useMarketplace = () => {
    const [images, setImages] = useState<string[]>([])
    const res = useQuery(listings).data
  
    useEffect(() => {
      res && res.allLegendListings.forEach((listing: any) => {
        const image = useQuery(legendById(listing.legendId)).data
        image && setImages([...images, image.legendNFT.image])
      })
    }, [res])

    return 'hello form ump hook'
}

export { useMarketplace }