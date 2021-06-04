import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { chain } from '../data/chains'

export const injectedConnector = new InjectedConnector({})
export const walletConnectConnector = new WalletConnectConnector({
  rpc: { [chain.id]: chain.remoteProvider },
})
