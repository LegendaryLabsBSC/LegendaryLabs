import React from "react";
import styled from "styled-components";
import gif from "@/eater.gif";
import { LegendNFTCard } from "../legend-nft-card/LegendNFTCard";
import { useMarketplace } from "@/hooks";

export const Marketplace: React.FC = () => {
  const listings = useMarketplace();

  const NftContainer = styled.div`
    & {
      padding: 25px;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      div {
        margin: 25px;
      }
    }
  `;

  return (
    <NftContainer>
      <h1>Marketplace</h1>
      {listings ? (
        <>
          {JSON.stringify(listings, null, 2)}
          {listings.map((listing: any, idx: number) => (
            <LegendNFTCard legendId="1">
              {JSON.stringify(listing, null, 2)}
              <img src={listing.legendDetails.image} alt="nft" width={600} />
            </LegendNFTCard>
          ))}
        </>
      ) : (
        <img src={gif} alt="eater" />
      )}
      {/* {res && <LegendNFTCard><img src={res.legendNFT.image} alt="nft" width={600} /></LegendNFTCard>} */}
    </NftContainer>
  );
};
