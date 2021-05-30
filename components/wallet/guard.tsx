import { FunctionComponent, PropsWithChildren } from 'react'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'
import Button from '../button/button'

const WalletGuard: FunctionComponent<PropsWithChildren<any>> = (
  props: PropsWithChildren<any>,
) => {
  const { account, chainId, hasWallet, activate } = useWallet()

  if (!hasWallet)
    return (
      <div>
        Please install Metamask
        <Button href="https://metamask.io/download">Download metamask</Button>
      </div>
    )
  if (!account)
    return (
      <div>
        Please connect Metamask
        <Button onClick={activate}>Activate</Button>
      </div>
    )
  if (chainId !== chain.id) return <>Please select {chain.name}</>

  return props.children
}

export default WalletGuard
