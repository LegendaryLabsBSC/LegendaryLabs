import React, { useState, useEffect } from "react";
import ConnectButton from "./components/ConnectButton";
import ConnectedMenu from "./components/ConnectedMenu";
import { ethereum } from "../../common/types";

async function checkCorrectNetwork(chainId: string) {
  await ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x61" }],
  }); //todo: if not connected add network

  ethereum.on("chainChanged", () => {
    window.location.reload();
  }); // ? remove listener
}

async function checkWalletConnection(setUserWallet: any) {
  if (ethereum) {
    const accounts: string[] = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      await checkCorrectNetwork(ethereum.chainId);

      const wallet = accounts[0];
      setUserWallet(wallet);

      return;
    }
  }
}

const MetaMaskConnection = () => {
  const [userWallet, setUserWallet] = useState<string | undefined>();

  useEffect(() => {
    checkWalletConnection(setUserWallet);
  }, []);

  return userWallet ? (
    <ConnectedMenu walletAddress={userWallet} setUserWallet={setUserWallet} />
  ) : (
    <ConnectButton setUserWallet={setUserWallet} />
  );
};

export default MetaMaskConnection;

//todo: ensure connection switch occurs(bnb-main wasnt triggering when it should be bnb-test)
// ;; doesnt switch on check connection
// todo: export types that can be exported ;; add types where needed
// spooky swap & this tried to switch networks on others dapps, but not pancake
//todo: accounts changed event listener
