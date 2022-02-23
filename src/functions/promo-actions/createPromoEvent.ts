import { client } from "@/components/apollo-client/apollo-client";
import { legendLaboratoryContract } from "@/config/legendary-labs-contracts";
import IPFS_PROMO from "@/graphql/ipfs";
import ipfsPromo from "@/graphql/ipfs";
import { ethereum } from "@/types";
import { BigNumber, ethers, providers } from "ethers";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

type CreatePromoEvent = {
  eventName: string;
  duration: string;
  isUnrestricted: boolean;
  maxTickets: string;
  skipIncubation: boolean;
  promoDNA?: string;
};

export async function createPromoEvent({
  eventName,
  duration,
  isUnrestricted,
  maxTickets,
  skipIncubation,
  promoDNA,
}: CreatePromoEvent) {
  console.log(
    eventName,
    duration,
    isUnrestricted,
    maxTickets,
    skipIncubation,
    promoDNA
  );

  duration = `${parseInt(duration) * 86400}`;

  if (maxTickets === undefined) maxTickets = "0";
  const gdf =
    "0x000000000000000000000000000000000000000000000000000000000000000b";

  const abiCoder = new ethers.utils.AbiCoder();

  try {
    console.log(
      eventName,
      duration,
      isUnrestricted,
      maxTickets,
      skipIncubation,
      promoDNA
    );
    //contract call
    //todo: contract needs to return promoId
    const ff = await legendLaboratoryContract.createPromoEvent(
      eventName,
      duration,
      isUnrestricted,
      maxTickets,
      skipIncubation
    );
    // console.log(ff);

    // legendLaboratoryContract.once("PromoCreated", (eventId) => {
    //   console.log(eventId.toString());
    // });

    provider.on(ff.hash, (eventId) => {
      console.log(eventId.logs[0].topics[1].toString(), "gsgdg");

      const promoId: any = eventId.logs[0].topics[1];
      const tt = abiCoder.decode(["uint"], promoId);

      console.log(tt.toString(), "tt");

      // console.log(promoId);
      // console.log(promoId.toString());


      
    });

    // const promoId: string = "1";
    // // const cc = { promoId, promoDNA };

const gg = async (promoId) =>{

  
  const content = JSON.stringify({ promoId, promoDNA });
  
  // //backend call to create event on IPFS
  const {
    data: { pinJSONtoIPFS },
  } = await client.mutate({
    mutation: IPFS_PROMO,
    variables: { pinName: `${eventName} - Promo Event`, pinContent: content },
  });
  
  console.log(pinJSONtoIPFS);
} catch (error) {
  }
    console.log(error);
  }
}
