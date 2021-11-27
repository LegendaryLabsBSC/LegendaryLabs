import { ethers, Contract } from "ethers";

import {
  LegendsLaboratory,
  LegendsNFT,
  LegendToken,
  LegendRejuvenation,
  LegendsMarketplace,
  LegendsMatchingBoard,
} from "./contractInterfaces";

import {
  legendsLaboratory,
  legendsNFT,
  legendToken,
  legendRejuvenation,
  legendsMarketplace,
  legendsMatchingBoard,
} from "./contractAddresses";

// export default {

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface ContractInterface {
  read: Contract;
  write: Contract;
}

interface LegendaryLabs {
  lab: ContractInterface;
  nft: ContractInterface;
  token: ContractInterface;
  rejuvenation: ContractInterface;
  marketplace: ContractInterface;
  matching: ContractInterface;
  // provider: any;
  // signer: any;
}

const provider: any = new ethers.providers.Web3Provider(window.ethereum);
const signer: any = provider.getSigner();

const lab: ContractInterface = {
  read: new ethers.Contract(legendsLaboratory, LegendsLaboratory.abi, provider),
  write: new ethers.Contract(legendsLaboratory, LegendsLaboratory.abi, signer),
};

const nft: ContractInterface = {
  read: new ethers.Contract(legendsNFT, LegendsNFT.abi, provider),
  write: new ethers.Contract(legendsNFT, LegendsNFT.abi, signer),
};

const token: ContractInterface = {
  read: new ethers.Contract(legendToken, LegendToken.abi, provider),
  write: new ethers.Contract(legendToken, LegendToken.abi, signer),
};

const rejuvenation: ContractInterface = {
  read: new ethers.Contract(
    legendRejuvenation,
    LegendRejuvenation.abi,
    provider
  ),
  write: new ethers.Contract(
    legendRejuvenation,
    LegendRejuvenation.abi,
    signer
  ),
};

const marketplace: ContractInterface = {
  read: new ethers.Contract(
    legendsMarketplace,
    LegendsMarketplace.abi,
    provider
  ),
  write: new ethers.Contract(
    legendsMarketplace,
    LegendsMarketplace.abi,
    signer
  ),
};

const matching: ContractInterface = {
  read: new ethers.Contract(
    legendsMatchingBoard,
    LegendsMatchingBoard.abi,
    provider
  ),
  write: new ethers.Contract(
    legendsMatchingBoard,
    LegendsMatchingBoard.abi,
    signer
  ),
};

const legendaryLabs: LegendaryLabs = {
  lab: lab,
  nft: nft,
  token: token,
  rejuvenation: rejuvenation,
  marketplace: marketplace,
  matching: matching,
  // provider: provider,
  // signer: signer,
};

export { legendaryLabs };
