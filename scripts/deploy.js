const fs = require('fs')
const path = require('path')


// TODO: have settable values set on deploy
async function main() {
  const LegendsLaboratory = await hre.ethers.getContractFactory("LegendsLaboratory");
  const legendsLaboratory = await LegendsLaboratory.deploy();
  await legendsLaboratory.deployed();
  console.log("LegendsLaboratory deployed to:", legendsLaboratory.address);
  const contract = legendsLaboratory.attach(legendsLaboratory.address)
  const children = await contract.getChildContracts()
  console.log(children)

  const contract_config = path.join(__dirname, '../frontend/src/contract_config/contract-config.js')
  fs.readFile(contract_config, 'utf-8', (err, data) => {
    if (err)
      return (console.log(err))
    const re = `
    const legendsLaboratory = "${legendsLaboratory.address}"
    const legendsNFT = "${children[0]}"
    const legendsToken = "${children[1]}"
    const legendsRejuvination = "${children[2]}"
    const legendsMarketplace = "${children[3]}"
    const legendsMatchingBoard = "${children[4]}"

    export { legendsLaboratory, legendsNFT, legendsToken, legendsMarketplace, legendsMatchingBoard }
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
