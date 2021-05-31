import { BigNumber } from '@ethersproject/bignumber'
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'
import { abi, deployedAddresses } from '../../data/smartContract'
import useContract from '../../hooks/useContract'
import { bnToText } from '../../lib/utils'
import { QNFT } from '../../types/contracts'
import IconClose from '../icon/close'

export type IProps = HTMLAttributes<any> & {
  close: () => void
}

const Banner: FunctionComponent<IProps> = (props) => {
  const { contract: qnft } = useContract<QNFT>(deployedAddresses.qnft, abi.qnft)
  const [nftLeft, setNftLeft] = useState<BigNumber>()
  const [nftSupply, setNftSupply] = useState<BigNumber>()
  const [qstkLeft, setQstkLeft] = useState<BigNumber>()
  const [qstkSupply, setQstkSupply] = useState<BigNumber>()

  useEffect(() => {
    if (!qnft) return
    // TODO: get correct values
    qnft.callStatic.remainingQstk().then(setQstkLeft)
    qnft.callStatic.totalSupply().then(setQstkSupply)
    qnft.callStatic.maxSupply().then(setNftSupply)
    qnft.callStatic.totalSupply().then(setNftLeft)
  }, [qnft])

  return (
    <div className="bg-purple-100 text-purple-900 text-xs leading-4 font-normal">
      <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row px-2 sm:px-6 lg:px-8 py-4">
        <div>End of sale in 14d 12h 60mn</div>
        <div className="md:ml-10">
          Remaining NFTs{' '}
          <span className="text-purple-700">
            {nftLeft ? bnToText(nftLeft) : 'n/a'}
          </span>{' '}
          on a supply of{' '}
          <span className="text-purple-700">
            {nftSupply ? bnToText(nftSupply) : 'n/a'}
          </span>
        </div>
        <div className="md:ml-10">
          Remaining QSTK to mint{' '}
          <span className="text-purple-700">
            {qstkLeft ? bnToText(qstkLeft) : ''}
          </span>{' '}
          on a supply of{' '}
          <span className="text-purple-700">
            {qstkSupply ? bnToText(qstkSupply) : ''}
          </span>
        </div>
        <div className="flex-grow"></div>
        <div>
          <a onClick={props.close} className="cursor-pointer">
            <IconClose className="-mt-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Banner
