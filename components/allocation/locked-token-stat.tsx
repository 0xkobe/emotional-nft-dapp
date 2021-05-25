import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import { formatNumber } from '../../lib/utils'
import LockIcon from '../icon/lock'

export type IProps = HTMLAttributes<{}> & {
  lockAmount: number
}

const LockedTokenStat: FunctionComponent<IProps> = ({
  lockAmount,
  className,
  ...props
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        'flex flex-row w-max p-4 pr-12 space-x-7 border border-gray-200 rounded-2xl',
      )}
    >
      <div className="relative flex w-12 h-12 items-center justify-center rounded-full border border-gray-200">
        <img className="w-6 h-6" src="/quiver.svg" />
        <div className="absolute top-7 left-9 flex w-5 h-5 items-center justify-center rounded-full bg-gray-200 ">
          <LockIcon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="flex flex-col text-gray-500 mr-4">
        <span className="text-sm leading-5 font-medium">Your Locked Token</span>
        <span className="text-xl leading-7 font-semibold">
          {formatNumber(lockAmount)} QSTK
        </span>
      </div>
    </div>
  )
}

export default LockedTokenStat
