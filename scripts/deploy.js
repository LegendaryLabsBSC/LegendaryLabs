
async function main() {

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

  const LegendNFT = await hre.ethers.getContractFactory("LegendNFT");
  const legendnft = await LegendNFT.deploy();
  await legendnft.deployed();
  console.log("LegendNFT deployed to:", legendnft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
