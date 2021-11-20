import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-solhint";
import "hardhat-contract-sizer";
import "hardhat-docgen";
import "dotenv/config";

const PRIVATEKEY: string = process.env.PRIVATEKEY;

task(
  "accounts",
  "Prints the list of accounts",
  async (args, hre): Promise<void> => {
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners();
    accounts.forEach((account: SignerWithAddress): void => {
      console.log(account.address);
    });
  }
);

export default {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
  gasReporter: {
    currency: "BSC",
    gasPrice: 10,
    enabled: process.env.REPORT_GAS ? true : false,
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },

  networks: {
    hardhat: {
      chainId: 1337,
    },
    ftmtest: {
      url: "https://rpc.testnet.fantom.network/",
      chainId: 0xfa2,
      gasLimit: 25000000,
      accounts: [`0x${PRIVATEKEY}`],
    },
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
      gasLimit: 25000000,
      chainId: 97,
      accounts: [`0x${PRIVATEKEY}`],
    },
    onetest: {
      url: "https://api.s0.b.hmny.io",
      gasLimit: 25000000,
      chainId: 1666700000,
      accounts: [`0x${PRIVATEKEY}`],
    },
  },
  docgen: {
    path: "./scans",
    clear: true,
    runOnCompile: false,
  },
};
