import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useCallback, useEffect, useState } from 'react'

export default function useWallet(connector: InjectedConnector): {
  signer: JsonRpcSigner | undefined
  activate: () => Promise<void>
  deactivate: () => void
  chainId?: number
  account?: null | string
  error?: Error
  signTypedDataV4: (payload: any) => Promise<string>
} {
  const context = useWeb3React<Web3Provider>()
  const { library, activate: activateProvider, account } = context

  const [signer, setSigner] = useState<JsonRpcSigner>()

  // activate wallet if already authorized
  useEffect(() => {
    void connector.isAuthorized().then((isAuthorized) => {
      if (!isAuthorized) return
      return activateProvider(connector, undefined, true)
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // set signer
  useEffect(() => {
    if (!library) return
    if (!account) return
    setSigner(library.getSigner(account))
  }, [account, library])

  const activate = useCallback(() => {
    if (account) return Promise.resolve() // if account is already available, no need to activate metamask again
    console.log('Activate provider...')
    return activateProvider(connector, undefined, true)
  }, [account, activateProvider, connector])

  const signTypedDataV4 = useCallback(
    (payload: any) => {
      if (!library) throw new Error('library is falsy')
      return library.send('eth_signTypedData_v4', [
        account,
        JSON.stringify(payload),
      ])
    },
    [library, account],
  )

  return {
    signer,
    activate,
    chainId: context.chainId,
    account: context.account,
    error: context.error,
    deactivate: context.deactivate,
    signTypedDataV4,
  }
}
