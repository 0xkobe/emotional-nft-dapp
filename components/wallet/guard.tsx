import { FunctionComponent, PropsWithChildren } from 'react'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'
import Metamask from '../metamask/metamask'

const WalletGuard: FunctionComponent<PropsWithChildren<any>> = (
  props: PropsWithChildren<any>,
) => {
  const { account, chainId, hasWallet, activate, error } = useWallet()

  if (error)
    return (
      <Metamask
        className="bg-white border border-purple-100 rounded-2xl p-8"
        title={error.name}
        content={<>{error.message}</>}
      ></Metamask>
    )

  if (!hasWallet)
    return (
      <Metamask
        className="bg-white border border-purple-100 rounded-2xl p-8"
        title="You Need an Ethereum Wallet"
        content={
          <>
            To use Quiver Emotional NFTs DApp you need to install a MetaMask
            wallet.
          </>
        }
      >
        <a
          className="text-sm leading-5 font-medium shadow rounded-2xl px-8 py-3 w-full text-center block bg-purple-700 text-white"
          target="_blank"
          href="https://metamask.io/download"
        >
          Get MetaMask
        </a>
      </Metamask>
    )
  if (!account)
    return (
      <Metamask
        className="bg-white border border-purple-100 rounded-2xl p-8"
        title="Connect to Your Wallet"
        content={
          <>
            To use Quiver Emotional NFTs DApp you need to sign in to your
            MetaMask wallet.
          </>
        }
      >
        <a
          onClick={() => activate()}
          className="text-sm leading-5 font-medium shadow rounded-2xl px-8 py-3 w-full text-center block bg-purple-700 text-white"
        >
          Sign In
        </a>
      </Metamask>
    )
  if (chainId !== chain.id)
    return (
      <Metamask
        className="bg-white border border-purple-100 rounded-2xl p-8"
        title="Wrong network"
        content={<>Wrong chain selected. please switch to {chain.name}</>}
      ></Metamask>
    )

  return props.children
}

export default WalletGuard
