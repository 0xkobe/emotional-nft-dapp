import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'

export const abi = {
  qnft: require('../abi/QNFT.json'),
  qnftSettings: require('../abi/QNFTSettings.json'),
}

// from https://github.com/QuiverCommunity/quiver-contracts/blob/master/scripts/settings.json
// structure is: contract name -> chain id -> contract address
export const deployedAddresses = {
  qstk: {
    3: '0x084d31777d2De81426a83A9Ea90C353d20811113',
    31337: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  },
  qSettings: {
    3: '0x43Fcd66139c3f0FaFDA39E1C7997DC14f8196b01',
    31337: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  },
  qAirdrop: {
    3: '0x7f16851eB79CE793C668f309F65F5D32db4C4cC2',
    31337: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  },
  qnftSettings: {
    3: '0xC3Adb6896870029Ced9244554293519716F68481',
    31337: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
  },
  qnftGov: {
    3: '0x4BF93C82D3522B73ebBEC74980086B8CA58cA8d5',
    31337: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
  },
  qnft: {
    3: '0x88BF476638cfEfbc2c7540e9864A8F6642Cb68B2',
    31337: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
  },
}

export const remoteProviderConfig = {
  urls: {
    1: 'https://eth-mainnet.alchemyapi.io/v2/jte2TvgFm5Uqjz6lYLUfnBsMd7TXS6SW', // dedicated alchemy app to use in prod
    3: 'https://eth-ropsten.alchemyapi.io/v2/j3511RMZjDGkirYD0QPu8nGn1sIY0Y7c', // dedicated alchemy app to use in dev/staging
    31337: 'http://127.0.0.1:8545/', // FIXME: local dev
  },
  defaultChainId: 31337,
}

export const metamaskConnector = new InjectedConnector({})
export const remoteConnector = new NetworkConnector(remoteProviderConfig)
