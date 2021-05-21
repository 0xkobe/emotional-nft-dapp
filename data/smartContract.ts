import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'

export const abi = {
  qnft: require('../abi/QNFT.json'),
  qnftSettings: require('../abi/QNFTSettings.json'),
}

// from https://github.com/QuiverCommunity/quiver-contracts/blob/master/scripts/settings.json
// structure is: contract name -> chain id -> contract address
export const deployedAddresses = {
  qstk: { 3: '0x7b93a8A27117AE5F3FE92852258383891B4BA29D' },
  qSettings: { 3: '0x19e49a2607173Fa68848a7926933922928909949' },
  qAirdrop: { 3: '0x8342926B783954cF6dF167C2D1068C4B387aDB3D' },
  qnftSettings: {
    3: '0x7d539294AC8b1BA8486e7ef42c1638B9243bbeb0',
    31337: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
  },
  qnftGov: { 3: '0x4a9dfAC63bb130f69DE2c1AF9DAb7E0b897B5a7A' },
  qnft: {
    3: '0x29D1B07a302d7CB8d3A78216495a80A86aA9593f',
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
