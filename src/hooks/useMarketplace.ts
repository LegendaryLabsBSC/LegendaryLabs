import { useQuery, gql } from "@apollo/client"

const listingsQuery = gql`{
  allLegendListings(filter: "all") {
    listingId
    createdAt
    nftContract
    legendId
    legendDetails{
      id
      image
    }
  }
}`

const useMarketplace = () => {
    const res = useQuery(listingsQuery).data
  
    const listings = res && res.allLegendListings

    // forEach((listing: any) => {
    //   const image = 
    //   image && setImages([...images, image.legendNFT.image])
    // })
    // useEffect(() => {
    // }, [res])

    // const legend = listings && useQuery(legendById(listings[0].legendId)).data

    return listings
}

export { useMarketplace }