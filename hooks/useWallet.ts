import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect, useState } from 'react'

export default function useWallet(
  connector: InjectedConnector,
): Web3ReactContextInterface<Web3Provider> & { signer?: JsonRpcSigner } {
  const context = useWeb3React<Web3Provider>()
  const { library, activate, account } = context
  const [signer, setSigner] = useState<JsonRpcSigner>()

  // activate wallet if already authorized
  useEffect(() => {
    void connector.isAuthorized().then((isAuthorized) => {
      if (!isAuthorized) return
      return activate(connector, undefined, true)
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // create the signer
  useEffect(() => {
    if (!library) return
    if (!account) return
    setSigner(library.getSigner(account))
  }, [library, account])

  return {
    ...context,
    signer,
  }
}
