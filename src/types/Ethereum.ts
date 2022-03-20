export type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: any };

export const ethereum: any = (window as WindowInstanceWithEthereum).ethereum;
