import { useEffect, useState } from 'react'
import ModalMetamask from './modal-metamask'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'


export default function MetamaskDetector(): JSX.Element {
  // init wallet
  const {
    account,
    activate,
    chainId: metamaskChainId,
    hasWallet,
  } = useWallet()

  const CONNECTION_OK = 0
  const CONNECTION_INSTALL_METAMASK = 1
  const CONNECTION_CONNECT_METAMASK = 2
  const CONNECTION_WRONG_NETWORK = 3
  const [walletConenction, setWalletConenction] = useState(CONNECTION_OK)

  useEffect(() => {
    if (hasWallet === undefined) return
    if (hasWallet) return
    setWalletConenction(CONNECTION_INSTALL_METAMASK)
    return () => {
      setWalletConenction(CONNECTION_OK)
    }
  }, [hasWallet])

  useEffect(() => {
    if (!hasWallet) return // give priority to hasWallet error
    console.log('account', account)
    if (account) return
    setWalletConenction(CONNECTION_CONNECT_METAMASK)
    return () => {
      setWalletConenction(CONNECTION_OK)
    }
  }, [hasWallet, account, activate])

  useEffect(() => {
    if (!metamaskChainId) return
    if (metamaskChainId !== chain.id) {
      setWalletConenction(CONNECTION_WRONG_NETWORK)
    }

    return () => {
      setWalletConenction(CONNECTION_OK)
    }
  }, [metamaskChainId])

  return (
    <>
      {walletConenction == CONNECTION_INSTALL_METAMASK && 
          <ModalMetamask
            title="You Need an Ethereum Wallet"
            content={<>To use Quiver Emotional NFTs DApp you need to install a MetaMask wallet.</>}
            onRequestClose={() => console.error('cannot close this modal')}
            onModalClose={() => console.error('cannot close this modal')}
            isShown
          >
            <a
              className="text-sm leading-5 font-medium shadow rounded-2xl px-8 py-3 w-full text-center block bg-purple-700 text-white"
              href="https://metamask.io/"
              target="_blank"
            >
              Get MetaMask
            </a>
          </ModalMetamask>
      }
      {walletConenction == CONNECTION_CONNECT_METAMASK && 
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
      }
      {walletConenction == CONNECTION_WRONG_NETWORK && 
          <ModalMetamask
            title="Wrong network"
            content={<>Wrong chain selected. please switch to {chain.name}</>}
            onRequestClose={() => console.error('cannot close this modal')}
            onModalClose={() => console.error('cannot close this modal')}
            isShown
          >
          </ModalMetamask>
      }
    </>
  )
}
