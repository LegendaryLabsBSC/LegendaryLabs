import { legendsNFTContract } from "@/config/legendary-labs-contracts";

export async function hatchLegend(legendId: string) {
  console.log(legendId, "good");

  try {
    const ipfsHash: string = "";

    await legendsNFTContract.hatchLegend(legendId, ipfsHash);
  } catch (error) {
    console.log(error)
  }
}
