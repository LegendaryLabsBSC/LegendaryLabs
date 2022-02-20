import React from "react";
import { Button, createStandaloneToast } from "@chakra-ui/react";
import { ethereum, BlockchainNetwork } from "../../../types";

const toast = createStandaloneToast();

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

async function handleConnection(setUserWallet: any) {
  if (!ethereum) {
    toast({
      title: "MetaMask Required!",
      description: "Please install MetaMask to continue",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });

    return;
  }

  console.log(ethereum.chainId);

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: dappNetwork.chainId }],
    });
  } catch (e: any) {
    // If network has not be previously added
    if (e.code === 4902) {
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

  const wallet: string = accounts[0];
  setUserWallet(wallet);
}

const ConnectButton = ({ setUserWallet }: any) => {
  return (
    <>
      <Button
        size="sm"
        color="white"
        fontSize="md"
        borderRadius={30}
        background="blue.600"
        onClick={() => handleConnection(setUserWallet)}
        _hover={{ background: "blue.300" }}
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default ConnectButton;
