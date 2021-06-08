import { AbstractConnector } from '@web3-react/abstract-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
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
import IconSpinner from '../icon/spinner'
import Metamask from '../metamask/metamask'
import ModalError from '../modal/modal-error'

const WalletGuard: FunctionComponent<PropsWithChildren<any>> = (
  props: PropsWithChildren<any>,
) => {
  const {
    account,
    chainId,
    activate,
    error: walletError,
    hasMetaMask,
    active,
  } = useWallet()
  const [error, setError] = useState<Error>()
  const [isWalletConnectActivating, setIsWalletConnectActivating] =
    useState<boolean>(false)

  // connect walletError to error
  useEffect(() => {
    if (walletError instanceof UserRejectedRequestErrorInjected) return
    if (walletError instanceof UserRejectedRequestErrorWalletConnect) return
    if (walletError) setError(walletError)
  }, [walletError])

  useEffect(() => {
    setIsWalletConnectActivating(false)
    return () => {
      setIsWalletConnectActivating(false)
    }
  }, [active, error])

  function activateWithConnector(connector: AbstractConnector) {
    if (connector instanceof WalletConnectConnector) {
      if (isWalletConnectActivating) return
      setIsWalletConnectActivating(true)
      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      // from issue https://github.com/NoahZinsmeister/web3-react/issues/124
      // let's remove this hack when issue is resolved
      if (connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }
    }
    activate(connector)
      .then(() => setIsWalletConnectActivating(false))
      .catch(setError)
  }

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
          {hasMetaMask ? (
            <SecondaryButton
              onClick={() => activateWithConnector(injectedConnector)}
            >
              <img
                src="/metamask.svg"
                className="w-5 h-5 inline-block mr-4 align-middle"
              />
              Metamask
            </SecondaryButton>
          ) : (
            <SecondaryButton
              target="_blank"
              href="https://metamask.io/download"
            >
              <img
                src="/metamask.svg"
                className="w-5 h-5 inline-block mr-4 align-middle"
              />
              Get MetaMask
            </SecondaryButton>
          )}
          <SecondaryButton
            onClick={() => activateWithConnector(walletConnectConnector)}
            disabled={isWalletConnectActivating}
          >
            {isWalletConnectActivating ? (
              <IconSpinner className="w-5 h-5 inline-block" />
            ) : (
              <>
                <img
                  src="/walletconnect.svg"
                  className="w-5 h-5 inline-block mr-4 align-middle"
                />
                WalletConnect
              </>
            )}
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
