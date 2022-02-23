import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import gif from "@/eater.gif";
import { NftCard } from "../nft-card/nft-card";
import { legendById } from "@/functions";
import { Legend } from "@/types";
import { BigNumber, ethers } from "ethers";
import {
  legendsMarketplace,
  legendsNFT,
} from "../../config/contract-addresses";
import { LegendsMarketplace, LegendsNFT } from "../../config/contract-ABIs";
import MetaMaskConnection from "../MetaMaskConnection/MetaMaskConnection";
import { Button } from "@chakra-ui/react";
import { ethereum } from "../../types";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

const signer: any = provider.getSigner();

const marketplaceContract = new ethers.Contract(
  legendsMarketplace,
  LegendsMarketplace.abi,
  signer
);

const legendNFTContract = new ethers.Contract(
  legendsNFT,
  LegendsNFT.abi,
  signer
);

const nftContract = legendsNFT; // temp var

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

export const AllLegends: React.FC = () => {
  const [legendId, setLegendId] = useState<string>("1");
  const [listing, setListing] = useState<boolean>(false);
  const [listingPrice, setListingPrice] = useState<string>();
  const [approving, setApproving] = useState(false);
  const res: { legendNFT: Legend } = useQuery(legendById(legendId)).data;
 
  const approveListing = async () => {
    await legendNFTContract.approve(legendsMarketplace, legendId);
    // can probably put a spinner or loading state while approval going through
  };

  const listLegend = async (e: any): Promise<void> => {
    e.preventDefault();

    console.log(res);

    // price needs to be sent through as "eth" units
    const price = ethers.utils.parseEther(listingPrice ?? "");

    // const legendSale = await marketplaceContract.createLegendSale(
    //   res.legendNFT.nftcontract,
    //   legendId,
    //   price
    // );

    // console.log(legendSale);

    const legendOffer = await marketplaceContract.makeLegendOffer(
      nftContract,
      legendId,
      { value: price }
    );

    // const legendAuction = await marketplaceContract.createLegendSale(
    //   nftContract,
    //   legendId,
    //   durationIndex, // Can be added in when more form fields are present
    //   startingPrice, // Can be added in when more form fields are present
    //   instantPrice // Can be added in when more form fields are present
    // );
  };

  return (
    <>
      <MetaMaskConnection />
      <NftContainer>
        <div>
          <button
            type="button"
            onClick={() => setLegendId((Number(legendId) - 1).toString())}
          >
            {"< Previous"}
          </button>
          <button
            type="button"
            onClick={() => setLegendId((Number(legendId) + 1).toString())}
          >
            {"Next >"}
          </button>
        </div>
        {res ? JSON.stringify(res, null, 2) : <img src={gif} alt="eater" />}
        {res && (
          <NftCard>
            <img src={res.legendNFT.image} alt="nft" width={600} />
            {!listing && (
              <button onClick={() => setListing(true)}>List Legend</button>
            )}
            {listing && (
              <form>
                <input
                  value={listingPrice}
                  key="listingPrice"
                  placeholder="price ($ETH)"
                  onChange={(e) => setListingPrice(e.currentTarget.value)}
                />
                <Button
                  onClick={approveListing}
                  disabled={!listingPrice}
                >
                  Approve
                </Button>
                <button
                  type="submit"
                  onClick={listLegend}
                  disabled={!listingPrice}
                >
                  List Legend
                </button>
              </form>
            )}
          </NftCard>
        )}
      </NftContainer>
    </>
  );
};
