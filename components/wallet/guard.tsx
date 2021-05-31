import { FunctionComponent, PropsWithChildren } from 'react'
import { chain } from '../../data/chains'
import useWallet from '../../hooks/useWallet'
import Button from '../button/button'

const WalletGuard: FunctionComponent<PropsWithChildren<any>> = (
  props: PropsWithChildren<any>,
) => {
  const { account, chainId, hasWallet, activate, error } = useWallet()

  if (error)
    return (
      <div className="max-w-4xl mx-auto bg-white border border-purple-100 rounded-2xl shadow-sm p-8">
        <div className="text-base leading-6 font-bold text-purple-900">
          {error.name} {error.message}
        </div>
      </div>
    )

  if (!hasWallet)
    return (
      <div className="max-w-4xl mx-auto bg-white border border-purple-100 rounded-2xl shadow-sm p-8">
        <div className="text-base leading-6 font-bold text-purple-900 mb-4">
          Please install Metamask
        </div>
        <Button target="_blank" href="https://metamask.io/download">
          Download metamask
        </Button>
      </div>
    )
  if (!account)
    return (
      <div className="max-w-4xl mx-auto bg-white border border-purple-100 rounded-2xl shadow-sm p-8">
        <div className="text-base leading-6 font-bold text-purple-900 mb-4">
          Please connect Metamask
        </div>
        <Button onClick={activate}>Activate</Button>
      </div>
    )
  if (chainId !== chain.id)
    return (
      <div className="max-w-4xl mx-auto bg-white border border-purple-100 rounded-2xl shadow-sm p-8">
        <div className="text-base leading-6 font-bold text-purple-900">
          Please select {chain.name}
        </div>
      </div>
    )

  return props.children
}

export default WalletGuard
