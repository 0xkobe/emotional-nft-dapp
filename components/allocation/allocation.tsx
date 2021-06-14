import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { bnToText, formatDate, formatDuration } from '../../lib/utils'
import PropertyView from '../mint-summary/property-view'

export type IProps = HTMLAttributes<{}> & {
  lockAmount: BigNumber
  unlockTime: Date
  withdrawn: boolean
}

const Allocation: FunctionComponent<IProps> = ({
  lockAmount,
  unlockTime,
  className,
  withdrawn,
}: IProps) => {
  const properties = [
    {
      key: 'Coin',
      value: 'QSTK',
    },
    { key: 'Amount', value: bnToText(lockAmount) },
    {
      key: 'Remaining',
      value: formatDuration(unlockTime.getTime() - Date.now()),
    },
    {
      key: 'Redemption',
      value: formatDate(unlockTime),
    },
    {
      key: 'Withdrawn',
      value: withdrawn ? 'Yes' : 'No',
    },
  ]

  return (
    <>
      <div
        className={classNames(
          className,
          'bg-white shadow-sm border border-purple-100 p-8 rounded-2xl',
        )}
      >
        <div className="text-base leading-6 font-bold text-purple-900 mb-8">
          Token Allocated
        </div>
        <PropertyView
          value={{
            title: '',
            keyValues: properties,
          }}
        />
      </div>
    </>
  )
}

export default Allocation
