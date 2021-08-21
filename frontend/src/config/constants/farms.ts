import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'BLZD-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xE9C53B5Ab0C9cDBd72A03151a628863C28c55A6A',
    },
    tokenSymbol: 'BLZD',
    tokenAddresses: {
      97: '',
      56: '0x57067A6BD75c0E95a6A5f158455926e43E79BeB0',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    lpSymbol: 'BLZD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x27A5a5c1fF96447F2a0c4baDcF26E7c65C040E3C',
    },
    tokenSymbol: 'BLZD',
    tokenAddresses: {
      97: '',
      56: '0x57067A6BD75c0E95a6A5f158455926e43E79BeB0',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x1B96B92314C44b159149f7E0303511fB2Fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7561eee90e24f3b348e1087a005f78b4c8453524',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x70d8929d04b60af4fb9b58713ebcf18765ade422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 11,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c',
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'CAKE-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  // caves
  {
    pid: 0,
    isTokenOnly: true,
    lpSymbol: 'BLZD',
    lpAddresses: {
      97: '',
      56: '0xE9C53B5Ab0C9cDBd72A03151a628863C28c55A6A', // BLZD-BUSD LP
    },
    tokenSymbol: 'BLZD',
    tokenAddresses: {
      97: '',
      56: '0x57067A6BD75c0E95a6A5f158455926e43E79BeB0',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 8,
    isTokenOnly: true,
    lpSymbol: 'ALLOY',
    lpAddresses: {
      97: '',
      56: '0x4bE10283b2183032BE35E6537C9737DF5a3F6C4A', // ALLOY-BNB LP
    },
    tokenSymbol: 'ALLOY',
    tokenAddresses: {
      97: '',
      56: '0x5eF5994fA33FF4eB6c82d51ee1DC145c546065Bd',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 9,
    isTokenOnly: true,
    lpSymbol: 'BIFI',
    lpAddresses: {
      97: '',
      56: '0xd132D2C24F29EE8ABb64a66559d1b7aa627Bd7fD', // BIFI-BNB LP
    },
    tokenSymbol: 'BIFI',
    tokenAddresses: {
      97: '',
      56: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 10,
    isTokenOnly: true,
    lpSymbol: 'vBSWAP',
    lpAddresses: {
      97: '',
      56: '0x8DD39f0a49160cDa5ef1E2a2fA7396EEc7DA8267', // vBSWAP-BNB LP
    },
    tokenSymbol: 'vBSWAP',
    tokenAddresses: {
      97: '',
      56: '0x4f0ed527e8A95ecAA132Af214dFd41F30b361600',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 12,
    isTokenOnly: true,
    lpSymbol: 'WATCH',
    lpAddresses: {
      97: '',
      56: '0xdC6C130299E53ACD2CC2D291fa10552CA2198a6b', // WATCH-BNB LP
    },
    tokenSymbol: 'WATCH',
    tokenAddresses: {
      97: '',
      56: '0x7A9f28EB62C791422Aa23CeAE1dA9C847cBeC9b0',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
