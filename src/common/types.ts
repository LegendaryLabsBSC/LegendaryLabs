type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: any };

export const ethereum: any = (window as WindowInstanceWithEthereum).ethereum;

export type BlockchainNetwork = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
};
