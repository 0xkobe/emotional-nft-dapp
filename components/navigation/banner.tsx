import { BigNumber } from '@ethersproject/bignumber'
import { XIcon } from '@heroicons/react/outline'
import {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { abi, deployedAddresses } from '../../data/smartContract'
import useContract from '../../hooks/useContract'
import { bnToText, formatNumber } from '../../lib/utils'
import { QNFT } from '../../types/contracts'

export type IProps = HTMLAttributes<any> & {
  close: () => void
}

const Banner: FunctionComponent<IProps> = (props) => {
  const { contract: qnft } = useContract<QNFT>(deployedAddresses.qnft, abi.qnft)
  const [nftSupply, setNftSupply] = useState<BigNumber>()
  const [nftMaxSupply, setNftMaxSupply] = useState<BigNumber>()
  const [qstkLeft, setQstkLeft] = useState<BigNumber>()
  const [dd, setDD] = useState(0)
  const [hh, setHH] = useState(0)
  const [mm, setMM] = useState(0)
  const [ss, setSS] = useState(0)

  useEffect(() => {
    if (!qnft) return
    qnft.remainingQstk().then(setQstkLeft).catch(console.error)
    qnft.maxSupply().then(setNftMaxSupply).catch(console.error)
    qnft.totalSupply().then(setNftSupply).catch(console.error)
  }, [qnft])

  const updateTimeCounter = useCallback(() => {
    let msec = 1624021200000 - Date.now() // June 18th 1pm GMT
    const dd = Math.floor(msec / 1000 / 60 / 60 / 24)
    msec -= dd * 1000 * 60 * 60 * 24
    const hh = Math.floor(msec / 1000 / 60 / 60)
    msec -= hh * 1000 * 60 * 60
    const mm = Math.floor(msec / 1000 / 60)
    msec -= mm * 1000 * 60
    const ss = Math.floor(msec / 1000)
    setDD(dd)
    setHH(hh)
    setMM(mm)
    setSS(ss)
    setTimeout(() => {
      updateTimeCounter()
    }, 1000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      updateTimeCounter()
    }, 1000)
  }, [updateTimeCounter])

  return (
    <div className="bg-purple-100 text-purple-900 text-xs leading-4 font-normal">
      <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row px-2 sm:px-6 lg:px-8 py-4">
        <div className="relative flex flex-row">
          <div>End of sale in</div>
          <div className="ml-3 -mt-1">
            <span className="relative bg-purple-50 p-1 rounded-md w-6 text-center inline-block">
              {dd}
              <span
                className="absolute -bottom-3.5 left-0 right-0 text-center"
                style={{ fontSize: '6px' }}
              >
                Days
              </span>
            </span>{' '}
            :{' '}
            <span className="relative bg-purple-50 p-1 rounded-md w-6 text-center inline-block">
              {`0${hh}`.slice(-2)}
              <span
                className="absolute -bottom-3.5 left-0 right-0 text-center"
                style={{ fontSize: '6px' }}
              >
                Hours
              </span>
            </span>{' '}
            :{' '}
            <span className="relative bg-purple-50 p-1 rounded-md w-6 text-center inline-block">
              {`0${mm}`.slice(-2)}
              <span
                className="absolute -bottom-3.5 left-0 right-0 text-center"
                style={{ fontSize: '6px' }}
              >
                Min
              </span>
            </span>{' '}
            :{' '}
            <span className="relative bg-purple-50 p-1 rounded-md w-6 text-center inline-block">
              {`0${ss}`.slice(-2)}
              <span
                className="absolute -bottom-3.5 left-0 right-0 text-center"
                style={{ fontSize: '6px' }}
              >
                Sec
              </span>
            </span>
          </div>
          <div className="flex-grow"></div>
          <div className="md:hidden">
            <a onClick={props.close} className="cursor-pointer">
              <XIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-10">
          Remaining NFTs{' '}
          <span className="text-purple-700">
            {nftMaxSupply && nftSupply
              ? formatNumber(nftMaxSupply.sub(nftSupply))
              : 'n/a'}
          </span>{' '}
          on a supply of{' '}
          <span className="text-purple-700">
            {nftMaxSupply ? formatNumber(nftMaxSupply) : 'n/a'}
          </span>
        </div>
        <div className="md:ml-10">
          Remaining QSTK to mint{' '}
          <span className="text-purple-700">
            {qstkLeft ? bnToText(qstkLeft) : ''}
          </span>
        </div>
        <div className="flex-grow"></div>
        <div className="hidden md:block">
          <a onClick={props.close} className="cursor-pointer">
            <XIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Banner
