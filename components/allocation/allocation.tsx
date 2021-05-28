import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { bnToText, formatDate, lockDurationToString } from '../../lib/utils'
import PropertyView from '../mint-summary/property-view'

export type IProps = HTMLAttributes<{}> & {
  lockAmount: BigNumber
  createdAt: Date
  lockDuration: number
}

const Allocation: FunctionComponent<IProps> = ({
  lockAmount,
  createdAt,
  lockDuration,
  className,
}: IProps) => {
  const properties = [
    {
      key: 'Coind',
      value: 'QSTK',
    },
    { key: 'Amount', value: bnToText(lockAmount) },
    { key: 'Subscription', value: formatDate(createdAt) },
    { key: 'Lock period', value: lockDurationToString(lockDuration) },
    {
      key: 'Redemption',
      value: formatDate(new Date(createdAt.getTime() + lockDuration * 1000)),
    },
  ]

  return (
    <>
      <div
        className={classNames(
          className,
          'bg-white shadow border border-purple-100 p-8 rounded-2xl',
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
