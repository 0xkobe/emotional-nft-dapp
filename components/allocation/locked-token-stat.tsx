import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import { bnToText } from '../../lib/utils'
import LockIcon from '../icon/lock'

export type IProps = HTMLAttributes<{}> & {
  lockAmount: BigNumber
}

const LockedTokenStat: FunctionComponent<IProps> = ({
  lockAmount,
  className,
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        'flex flex-row w-max p-4 pr-12 space-x-7 border border-purple-100 rounded-2xl shadow-sm bg-white',
      )}
    >
      <div className="relative flex w-12 h-12 items-center justify-center rounded-full border border-purple-100">
        <img className="w-6 h-6" src="/quiver.svg" />
        <div className="absolute top-7 left-9 flex w-5 h-5 items-center justify-center rounded-full bg-blue-500 text-white ">
          <LockIcon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="flex flex-col mr-4">
        <span className="text-sm leading-5 font-medium text-gray-500">
          Your Locked Token
        </span>
        <span className="text-xl leading-7 font-semibold text-purple-900">
          {bnToText(lockAmount)} QSTK
        </span>
      </div>
    </div>
  )
}

export default LockedTokenStat
