const fs = require('fs')
const path = require('path')


// TODO: have settable values set on deploy
async function main() {
  const LegendsLaboratory = await hre.ethers.getContractFactory("LegendsLaboratory");
  const legendsLaboratory = await LegendsLaboratory.deploy();
  await legendsLaboratory.deployed();
  console.log("LegendsLaboratory deployed to:", legendsLaboratory.address);
  const contract = legendsLaboratory.attach(legendsLaboratory.address)
  // const children = await contract.getChildContracts()

  // const LaboratoryGovernor = await hre.ethers.getContractFactory("LaboratoryGovernor");
  // const laboratoryGovernor = await LaboratoryGovernor.deploy(legendsLaboratory.legendsToken);
  // await laboratoryGovernor.deployed();
  // console.log("LaboratoryGovernor deployed to:", laboratoryGovernor.address);

  const legendsNFT = await contract.legendsNFT()
  const legendToken = await contract.legendToken()
  const legendRejuvenation = await contract.legendRejuvenation()
  const legendsMarketplace = await contract.legendsMarketplace()
  const legendsMatchingBoard = await contract.legendsMatchingBoard()

  console.log(`
  legendsNFT: ${legendsNFT},
  legendToken: ${legendToken},
  legendRejuvenation: ${legendRejuvenation},
  legendsMarketplace: ${legendsMarketplace},
  legendsMatchingBoard: ${legendsMatchingBoard}
  `)

  const contract_config = path.join(__dirname, '../frontend/src/contract_config/contract-config.js')
  fs.readFile(contract_config, 'utf-8', (err, data) => {
    if (err)
      return (console.log(err))
    const re = `
    const legendsLaboratory = "${legendsLaboratory.address}"
    const legendsNFT = "${legendsNFT}"
    const legendToken = "${legendToken}"
    const legendRejuvenation = "${legendRejuvenation}"
    const legendsMarketplace = "${legendsMarketplace}"
    const legendsMatchingBoard = "${legendsMatchingBoard}"

    export { legendsLaboratory, legendsNFT, legendToken, legendRejuvenation, legendsMarketplace, legendsMatchingBoard }
    
    `

    fs.writeFile(contract_config, re, 'utf-8', (err) => {
      if (err) console.log(err)

      console.log('New Addresses Loaded')
    })

  })
}

main()
  // .then(res => {
  // loadNewAddresses(res)
  // })
  // .then(() => process.exit(0))
  // .catch((error) => {
    // console.error(error);
    // process.exit(1);
  // });
