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

const pinPromoToPinata = async (
  promoId: any,
  promoDNA: any,
  eventName: string
) => {
  try {
    promoId = promoId.toString();
    const content = JSON.stringify({ promoId, promoDNA });

    const {
      data: { pinJSONtoIPFS },
    } = await client.mutate({
      mutation: IPFS_PROMO,
      variables: {
        pinName: `${eventName} - Promo Event`,
        pinContent: content,
      },
    });

    console.log(pinJSONtoIPFS);
  } catch (error) {
    console.log(error);
  }
};

export async function createPromoEvent({
  eventName,
  duration,
  isUnrestricted,
  maxTickets,
  skipIncubation,
  promoDNA,
}: CreatePromoEvent) {
  // console.log(
  //   eventName,
  //   duration,
  //   isUnrestricted,
  //   maxTickets,
  //   skipIncubation,
  //   promoDNA
  // );

  duration = `${parseInt(duration) * 86400}`;

  if (maxTickets === undefined) maxTickets = "0";

  const abiCoder = new ethers.utils.AbiCoder();

  try {
    // console.log(
    //   eventName,
    //   duration,
    //   isUnrestricted,
    //   maxTickets,
    //   skipIncubation,
    //   promoDNA
    // );

    const createPromo = await legendLaboratoryContract.createPromoEvent(
      eventName,
      duration,
      isUnrestricted,
      maxTickets,
      skipIncubation
    );

    provider.once(createPromo.hash, (eventId) => {
      let promoId: any = eventId.logs[0].topics[1];

      promoId = abiCoder.decode(["uint"], promoId);

      pinPromoToPinata(promoId, promoDNA, eventName);
    });
  } catch (error) {
    console.log(error);
  }
}
