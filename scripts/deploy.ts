import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

interface LaboratoryContracts {
  lab: string;
  nft: string;
  token: string;
  rejuvenation: string;
  marketplace: string;
  matching: string;
}

async function main(): Promise<any> {
  const LegendsLaboratory: ContractFactory = await ethers.getContractFactory(
    "LegendsLaboratory"
  );
  const legendsLaboratory: Contract = await LegendsLaboratory.deploy();

  await legendsLaboratory.deployed();
  console.log("Legendary Labs deployed!");

  const contracts: LaboratoryContracts = {
    lab: legendsLaboratory.address,
    nft: await legendsLaboratory.legendsNFT(),
    token: await legendsLaboratory.legendToken(),
    rejuvenation: await legendsLaboratory.legendRejuvenation(),
    marketplace: await legendsLaboratory.legendsMarketplace(),
    matching: await legendsLaboratory.legendsMatchingBoard(),
  };

  console.log(contracts);

  return contracts;
}

function loadNewContracts(contracts: LaboratoryContracts) {
  const contract_config: string = path.join(
    __dirname,
    "../frontend/src/config/contractAddresses.ts"
  );

  fs.readFile(contract_config, "utf-8", (err, data) => {
    if (err) return console.log(err);

    const new_contracts: string = `const legendsLaboratory: string = "${contracts.lab}"
const legendsNFT: string = "${contracts.nft}"
const legendToken: string = "${contracts.token}"
const legendRejuvenation: string = "${contracts.rejuvenation}"
const legendsMarketplace: string = "${contracts.marketplace}"
const legendsMatchingBoard: string = "${contracts.matching}"

export { legendsLaboratory, legendsNFT, legendToken, legendRejuvenation, legendsMarketplace, legendsMatchingBoard }

`;

    fs.writeFile(contract_config, new_contracts, "utf-8", (err) => {
      if (err) console.log(err);

      console.log("New Addresses Loaded");
    });
  });
}

main()
  .then((contracts: LaboratoryContracts) => {
    loadNewContracts(contracts);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
