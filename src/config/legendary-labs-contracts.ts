import { ethers } from "ethers";
import {
  legendsNFT,
  legendToken,
  legendsLaboratory,
} from "@/config/contract-addresses";
import {
  LegendsNFT,
  LegendToken,
  LegendsLaboratory,
} from "@/config/contract-ABIs";
import { ethereum } from "@/types";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

const signer: any = provider.getSigner();

export const legendLaboratoryContract = new ethers.Contract(
  legendsLaboratory,
  LegendsLaboratory.abi,
  signer
);

export const legendsNFTContract = new ethers.Contract(
  legendsNFT,
  LegendsNFT.abi,
  signer
);

export const legendTokenContract = new ethers.Contract(
  legendToken,
  LegendToken.abi,
  signer
);
