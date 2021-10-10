require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");// need to configure when test are set up
require("@nomiclabs/hardhat-solhint");
require("hardhat-tracer") // need to configure when test are set up
require('hardhat-spdx-license-identifier');
require('hardhat-docgen');
require('hardhat-storage-layout');

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
    artifacts: './frontend/src/artifacts'
  },
  gasReporter: {
    currency: 'BSC',
    gasPrice: 10,
    enabled: (process.env.REPORT_GAS) ? true : false
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/2f043014c2934ebc9a70d822c22f5837",
      accounts: [`0x${PRIVATEKEY}`]
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      accounts: [`0x${process.env.PRIVATEKEY}`]
    }
    // bsctest: {
    //   url: "https://apis-sj.ankr.com/3993586e443942098e59d5b71e4a7e09/7eb7caa0231f32a5cc5bbcb5dbeab631/binance/full/test",
    //   accounts: [`0x${PRIVATEKEY}`]
    // }
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  }
};
