import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect } from 'react'

export default function useWallet(
  connector: InjectedConnector,
): Web3ReactContextInterface<Web3Provider> & {
  getSigner: () => Promise<JsonRpcSigner>
} {
  const context = useWeb3React<Web3Provider>()
  const { library, activate } = context

  // activate wallet if already authorized
  useEffect(() => {
    void connector.isAuthorized().then((isAuthorized) => {
      if (!isAuthorized) return
      return activate(connector, undefined, true)
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // FIXME: this logic should be done use state modification instead of blocking with promises
  const getSigner = async () => {
    if (!library) throw new Error('library is falsy')
    await activate(connector, undefined, true)
    const account = await connector.getAccount()
    if (!account) throw new Error('account is falsy')
    return library.getSigner(account)
  }

  return {
    ...context,
    getSigner,
  }
}
