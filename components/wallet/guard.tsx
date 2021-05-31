import { FunctionComponent, PropsWithChildren } from 'react'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'
import ModalMetamask from '../modal/modal-metamask'

const WalletGuard: FunctionComponent<PropsWithChildren<any>> = (
  props: PropsWithChildren<any>,
) => {
  const { account, chainId, hasWallet, activate, error } = useWallet()

  if (error)
    return (
      <ModalMetamask
        title={error.name}
        content={<>{error.message}</>}
        onRequestClose={() => console.error('cannot close this modal')}
        onModalClose={() => console.error('cannot close this modal')}
        isShown
      >
      </ModalMetamask>
    )

  if (!hasWallet)
    return (
      <ModalMetamask
        title="You Need an Ethereum Wallet"
        content={<>To use Quiver Emotional NFTs DApp you need to install a MetaMask wallet.</>}
        onRequestClose={() => console.error('cannot close this modal')}
        onModalClose={() => console.error('cannot close this modal')}
        isShown
      >
        <a
          className="text-sm leading-5 font-medium shadow rounded-2xl px-8 py-3 w-full text-center block bg-purple-700 text-white"
          target="_blank"
          href="https://metamask.io/download"
        >
          Get MetaMask
        </a>
      </ModalMetamask>
    )
  if (!account)
    return (
      <ModalMetamask
        title="Connect to Your Wallet"
        content={<>To use Quiver Emotional NFTs DApp you need to sign in to your MetaMask wallet.</>}
        onRequestClose={() => console.error('cannot close this modal')}
        onModalClose={() => console.error('cannot close this modal')}
        isShown
      >
        <a
          onClick={() => activate()}
          className="text-sm leading-5 font-medium shadow rounded-2xl px-8 py-3 w-full text-center block bg-purple-700 text-white"
        >
          Sign In
        </a>
      </ModalMetamask>
    )
  if (chainId !== chain.id)
    return (
      <ModalMetamask
        title="Wrong network"
        content={<>Wrong chain selected. please switch to {chain.name}</>}
        onRequestClose={() => console.error('cannot close this modal')}
        onModalClose={() => console.error('cannot close this modal')}
        isShown
      >
      </ModalMetamask>
    )

  return props.children
}

export default WalletGuard
