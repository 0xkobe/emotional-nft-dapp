import { FunctionComponent, PropsWithChildren } from 'react'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'
import Button from '../button/button'
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
        <Button target="_blank" href="https://metamask.io/download">
          Get MetaMask
        </Button>
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
        <Button onClick={() => activate()}>Sign In</Button>
      </Metamask>
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
