export const chains: {
  [key: number]: {
    id: number
    name: string
    remoteProvider: string
    explorerUrlForTx: (txHash: string) => string
  }
} = {
  1: {
    id: 1,
    name: 'Ethereum Mainnet',
    remoteProvider:
      'https://eth-mainnet.alchemyapi.io/v2/jte2TvgFm5Uqjz6lYLUfnBsMd7TXS6SW', // dedicated alchemy app to use in prod
    explorerUrlForTx: (txHash: string): string =>
      `https://etherscan.io/tx/${txHash}`,
  },
  3: {
    id: 3,
    name: 'Ethereum Testnet Ropsten',
    remoteProvider:
      'https://eth-ropsten.alchemyapi.io/v2/j3511RMZjDGkirYD0QPu8nGn1sIY0Y7c', // dedicated alchemy app to use in dev/staging
    explorerUrlForTx: (txHash: string): string =>
      `https://ropsten.etherscan.io/tx/${txHash}`,
  },
}

export const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
  : 3 // default is ropsten

export const chain = chains[chainId]
