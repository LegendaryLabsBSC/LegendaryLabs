import React, { createContext, useState } from "react";
import { BlockchainNetwork, ethereum } from "@/types";
import { BigNumber, ethers } from "ethers";
import {
  legendsNFTContract,
  legendTokenContract,
} from "@/config/legendary-labs-contracts";

export type MetaMaskContextType = {
  wallet: string;
  balances: BalancesType;
  connectWallet: () => void;
  fetchBalances: () => void;
  dappNetwork: BlockchainNetwork;
  provider: ethers.providers.Web3Provider;
};

type BalancesType = {
  nft: string;
  dapp: string;
  native: string;
};

export const MetaMaskContext = createContext<MetaMaskContextType | null>(null);

const MetaMaskProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [wallet, setWallet] = useState<string>("");
  const [balances, setBalances] = useState<BalancesType>({
    nft: "",
    dapp: "",
    native: "",
  });

  ethereum.on("chainChanged", () => {
    window.location.reload();
  });

  const dappNetwork: BlockchainNetwork = {
    chainId: "0x61",
    chainName: "Binance Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-2-s2.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  };

  const provider: ethers.providers.Web3Provider =
    new ethers.providers.Web3Provider(ethereum);

  const connectWallet = async () => {
    if (!ethereum) {
      // toast({
      //   title: "MetaMask Required!",
      //   description: "Please install MetaMask to continue",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-right",
      // });
      return;
    }

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: dappNetwork.chainId }],
      });
    } catch (e: any) {
      if (e.code === 4902) {
        // If network has not be previously added
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [dappNetwork],
          });
        } catch (e) {
          console.log(e);
        }
      }
    }

    const accounts: string[] = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const wallet = accounts[0];
    setWallet(wallet);
  };

  const fetchBalances = async () => {
    const legendNFTBalance = await legendsNFTContract.balanceOf(wallet);
    const legendTokenBalance = await legendTokenContract.balanceOf(wallet);
    const nativeTokenBalance = await provider.getBalance(wallet);

    const formatValue = (value: BigNumber): string => {
      let formattedValue: string = ethers.utils.formatEther(value);

      const splitValue: string[] = formattedValue.split(".");

      formattedValue = `${splitValue[0]}.${splitValue[1].slice(0, 4)}`;

      return formattedValue;
    };

    const userBalances: BalancesType = {
      nft: legendNFTBalance.toString(),
      dapp: formatValue(legendTokenBalance),
      native: formatValue(nativeTokenBalance),
    };

    setBalances(userBalances);
  };

  // todo:
  // async function handleDisconnection(setUserWallet: any) {
  //   const accounts = await ethereum.request({
  //     method: "wallet_requestPermissions",
  //     params: [
  //       {
  //         eth_accounts: {},
  //       },
  //     ],
  //   });

  //   const wallet: string = accounts[0];

  //   setUserWallet(wallet);
  // }

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        balances,
        connectWallet,
        fetchBalances,
        dappNetwork,
        provider,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export default MetaMaskProvider;
