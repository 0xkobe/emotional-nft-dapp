import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'

export const abi = {
  erc721: require('../abi/erc721.json'),
}
export const deployedAddresses = {
  31337: '0x5fbdb2315678afecb367f032d93f642f64180aa3', // FIXME: local dev
}

export const metamaskConnector = new InjectedConnector({})
export const remoteConnector = new NetworkConnector({
  urls: {
    1: 'https://eth-mainnet.alchemyapi.io/v2/jte2TvgFm5Uqjz6lYLUfnBsMd7TXS6SW', // dedicated alchemy app to use in prod
    3: 'https://eth-ropsten.alchemyapi.io/v2/j3511RMZjDGkirYD0QPu8nGn1sIY0Y7c', // dedicated alchemy app to use in dev/staging
    31337: 'http://127.0.0.1:8545/', // FIXME: local dev
  },
  defaultChainId: 31337,
})
