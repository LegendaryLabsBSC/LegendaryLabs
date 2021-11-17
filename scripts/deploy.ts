import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import "fs";
import "path";

async function main(): Promise<any> {
  const LegendsLaboratory: ContractFactory = await ethers.getContractFactory(
    "LegendsLaboratory"
  );
  const legendsLaboratory: Contract = await LegendsLaboratory.deploy();

  await legendsLaboratory.deployed();
  console.log(`LegendsLaboratory deployed to: ${legendsLaboratory.address}`);
}

main()
  .then(())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // () => process.exit(0)