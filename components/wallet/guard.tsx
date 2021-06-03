import { FunctionComponent, PropsWithChildren, useState } from 'react'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'
import { injectedConnector, walletConnectConnector } from '../../lib/connector'
import Button from '../button/button'
import Metamask from '../metamask/metamask'
import ModalError from '../modal/modal-error'

const WalletGuard: FunctionComponent<PropsWithChildren<any>> = (
  props: PropsWithChildren<any>,
) => {
  const { account, chainId, activate, error: walletError } = useWallet()
  const [error, setError] = useState<Error>()

  const modalError =
    (walletError && (
      <ModalError
        error={walletError}
        isShown
        onRequestClose={() => setError(undefined)}
      ></ModalError>
    )) ||
    (error && (
      <ModalError
        error={error}
        isShown
        onRequestClose={() => setError(undefined)}
      ></ModalError>
    ))
  if (!account)
    return (
      <>
        {modalError}
        <Metamask
          className="bg-white border border-purple-100 rounded-2xl p-8"
          title="Connect Your Wallet"
          content={
            <>
              To use Quiver Emotional NFTs DApp you need to connect your
              Ethereum wallet.
            </>
          }
        >
          <Button onClick={() => activate(injectedConnector).catch(setError)}>
            Metamask
          </Button>
          <Button
            onClick={() => activate(walletConnectConnector).catch(setError)}
          >
            WalletConnect
          </Button>
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
