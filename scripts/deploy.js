// TODO: have settable values set on deploy
async function main() {

  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");
  // await greeter.deployed();
  // console.log("Greeter deployed to:", greeter.address);

  // const Token = await hre.ethers.getContractFactory("Token");
  // const token = await Token.deploy();
  // await token.deployed();
  // console.log("Token deployed to:", token.address);

  const LegendsNFT = await hre.ethers.getContractFactory("LegendsNFT");
  const legendsnft = await LegendsNFT.deploy();
  await legendsnft.deployed();
  console.log("LegendsNFT deployed to:", legendsnft.address);

  // const LegendsNFT = await hre.ethers.getContractFactory("LegendsLabratory");
  // const legendsnft = await LegendsNFT.deploy();
  // await legendsnft.deployed();
  // console.log("LegendsNFT deployed to:", legendsnft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
