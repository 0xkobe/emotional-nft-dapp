import { providers } from '@0xsequence/multicall'
import { chain } from '../data/chains'
import { StaticJsonRpcProvider } from '@ethersproject/providers'

// init ethereum remote provider with multicall
export const remoteProvider = new providers.MulticallProvider(
  new StaticJsonRpcProvider({
    allowGzip: true,
    url: chain.remoteProvider,
  })
)