import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { injectedConnector } from '../lib/connector'

export default function useWallet(): {
  signer: JsonRpcSigner | undefined
  activate: (connector: AbstractConnector) => void
  deactivate: () => void
  account?: null | string
  error?: Error
  signTypedDataV4: (payload: any) => Promise<string>
  chainId?: number
} {
  const context = useWeb3React<Web3Provider>()
  const { library, activate: activateProvider, account, chainId } = context

  const [signer, setSigner] = useState<JsonRpcSigner>()

  // activate wallet if already authorized
  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized) return activateProvider(injectedConnector)
      })
      .catch(console.error)
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // set signer
  useEffect(() => {
    if (!library) return
    if (!account) return
    setSigner(library.getSigner(account))
  }, [account, library])

  const activate = useCallback(
    (connector: AbstractConnector) => {
      if (account) return Promise.resolve() // if account is already available, no need to activate again
      console.log('Activate provider...')
      void activateProvider(connector) // error is throw in context.error
    },
    [account, activateProvider],
  )

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
    account: context.account,
    error: context.error,
    deactivate: context.deactivate,
    signTypedDataV4,
    chainId,
  }
}
