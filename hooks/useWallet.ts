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

  // activate the connector on init
  // TODO: maybe this can be moved outside of this hook to give more flexibility to the page when to connect
  useEffect(() => {
    // FIXME: this throw an error if metamask is not injected into the page
    void activate(connector, console.error, true)
  }, [activate, connector])

  // activate wallet if already authorized
  useEffect(() => {
    void connector.isAuthorized().then((isAuthorized) => {
      if (!isAuthorized) return
      return activate(connector, console.error, true)
    })
  }, [connector, activate])

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
