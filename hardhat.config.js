require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const PRIVATEKEY = process.env.PRIVATEKEY

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    // artifacts: './src/artifacts'
    artifacts: './frontend/src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/2f043014c2934ebc9a70d822c22f5837",
      accounts: [`0x${PRIVATEKEY}`]
    },
    // bsctest: {
    //   url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
    //   accounts: [`0x${process.env.PRIVATEKEY}`]
    // }
    bsctest: {
      url: "https://apis-sj.ankr.com/3993586e443942098e59d5b71e4a7e09/7eb7caa0231f32a5cc5bbcb5dbeab631/binance/full/test",
      accounts: [`0x${PRIVATEKEY}`]
    }
  }
};
