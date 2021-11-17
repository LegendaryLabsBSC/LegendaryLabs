const fs = require('fs')
const path = require('path')


// TODO: have settable values set on deploy
async function main() {
  const LegendsLaboratory = await hre.ethers.getContractFactory("LegendsLaboratory");
  const legendsLaboratory = await LegendsLaboratory.deploy();

  await legendsLaboratory.deployed();
  console.log("LegendsLaboratory deployed to:", legendsLaboratory.address);

  const contracts = {
    lab: legendsLaboratory.address,
    nft: await legendsLaboratory.legendsNFT(),
    token: await legendsLaboratory.legendToken(),
    rejuvenation: await legendsLaboratory.legendRejuvenation(),
    marketplace: await legendsLaboratory.legendsMarketplace(),
    matching: await legendsLaboratory.legendsMatchingBoard()
  }

  console.log(`
  legendsNFT: ${contracts.nft},
  legendToken: ${contracts.token},
  legendRejuvenation: ${contracts.rejuvenation},
  legendsMarketplace: ${contracts.marketplace},
  legendsMatchingBoard: ${contracts.matching}
  `)

  return { contracts };
}

function loadNewAddresses(contracts) {
  const contract_config = path.join(__dirname, '../frontend/src/contract_config/contract-config.js')
  fs.readFile(contract_config, 'utf-8', (err, data) => {
    if (err)
      return (console.log(err))
    const re = `
    const legendsLaboratory = "${contracts.lab}"
    const legends1NFT = "${contracts.nft}"
    const legendToken = "${contracts.token}"
    const legendRejuvenation = "${contracts.rejuvenation}"
    const legendsMarketplace = "${contracts.marketplace}"
    const legendsMatchingBoard = "${contracts.matching}"

    export { legendsLaboratory, legendsNFT, legendToken, legendRejuvenation, legendsMarketplace, legendsMatchingBoard }
    
    `

    fs.writeFile(contract_config, re, 'utf-8', (err) => {
      if (err) console.log(err)

      console.log('New Addresses Loaded')
    })

  })
}


main()
  .then((res) => {
    loadNewAddresses(res.contracts)
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
