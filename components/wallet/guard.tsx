import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'
import { injectedConnector, walletConnectConnector } from '../../lib/connector'
import SecondaryButton from '../button/secondary-button'
import Metamask from '../metamask/metamask'
import ModalError from '../modal/modal-error'

const WalletGuard: FunctionComponent<PropsWithChildren<any>> = (
  props: PropsWithChildren<any>,
) => {
  const { account, chainId, activate, error: walletError } = useWallet()
  const [error, setError] = useState<Error>()

  // connect walletError to error
  useEffect(() => {
    if (walletError instanceof UserRejectedRequestErrorInjected) return
    if (walletError instanceof UserRejectedRequestErrorWalletConnect) return
    if (walletError) setError(walletError)
  }, [walletError])

  if (!account)
    return (
      <>
        {error && (
          <ModalError
            error={error}
            isShown
            onRequestClose={() => setError(undefined)}
          ></ModalError>
        )}
        <Metamask
          className="bg-white border border-purple-100 rounded-2xl p-8"
          title="Connect to a Wallet"
          content={
            <>
              To use Quiver Emotional NFTs DApp you need to connect to an
              Ethereum wallet.
            </>
          }
        >
          <SecondaryButton onClick={() => activate(injectedConnector)}>
            Metamask
          </SecondaryButton>
          <SecondaryButton onClick={() => activate(walletConnectConnector)}>
            WalletConnect
          </SecondaryButton>
        </Metamask>
      </>
    )
  if (chainId !== chain.id)
    return (
      <Metamask
        className="bg-white border border-purple-100 rounded-2xl p-8"
        title="Wrong network"
        content={<>Wrong chain selected. Please switch to {chain.name}</>}
      ></Metamask>
    )

  return props.children
}

export default WalletGuard
