import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes, useState } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { formatNumber, lockDurationToString } from '../../lib/utils'
import Input from '../input/input'
import Select from '../select/select'
import { LockOption } from '../../types/nft'

export type IProps = HTMLAttributes<{}> & {
  availableMintAmount: BigNumber
  availableFreeAllocation: BigNumber
  lockOptions: LockOption[]
}

const AllocationWizard: FunctionComponent<IProps> = ({
  availableMintAmount,
  availableFreeAllocation,
  lockOptions,
  className,
  ...props
}: IProps) => {
  const [lockOptionId, setLockOptionId] = useState(0);

  const lockOption = lockOptions[lockOptionId];
  const allocatedAmount = BigNumber.from("10000");
  const totalAmount = BigNumber.from("10000");

  return (
    <div className={classNames(className, "flex flex-col space-y-8")}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">QSTK Token Remainig</div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm leading-5 font-normal text-gray-500">
            QSTK to Mint: {formatNumber(availableMintAmount)} QSTK
          </div>
          <div className="text-sm leading-5 font-normal text-gray-500">
            Free allocation: {formatNumber(availableFreeAllocation)} QSTK
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Amount to mint</div>
          <div className="flex flex-col space-y-2">
            <Input
              className="w-full"
              placeholder=""
              unit="QSTK"
            />
            <div className="flex flex-row justify-between">
              <span className="text-xs leading-4 font-normal text-gray-500"> 
                Min {formatNumber(lockOption.minAmount)} - Max {formatNumber(lockOption.maxAmount)}
              </span>
              <a className="text-xs leading-4 font-normal text-black cursor-pointer" onClick={() => {}}>
                MAX
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Lock Period Discount</div>
          <div className="flex flex-col space-y-2">
            <Select
              className="w-full"
              placeholder=""
              options={
                lockOptions.map(option => {
                  return {
                    text: `${lockDurationToString(option.duration)} - ${option.discount}%`
                  };
                })
              }
              selectedIndex={lockOptionId}
              onSelectOption={(option: Option, index: number): void => {
                setLockOptionId(index)
              }}
            />
            <span className="text-xs leading-4 font-normal text-gray-500 text-right"> 
              * QSTK Mint price discount
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <div className="text-base leading-6 font-medium text-gray-500">Free Allocation Key</div>
        <div className="flex flex-col space-y-2">
          <Input
            className="w-full"
            placeholder=""
          />
          <span className="text-xs leading-4 font-normal text-gray-500">
            <span className="mr-2">🎉</span>
            Congratulations, you are eligible to
            <span className="ml-1 font-semibold">{formatNumber(allocatedAmount)} QSTK</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full p-4 bg-gray-50 rounded-2xl space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Total Token to Receive</div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex w-8 h-8 p-2 bg-white rounded-2xl border border-solid border-gray-200">
            <img src="/quiver.svg"/>
          </div>
          <span className="text-sm leading-5 font-semibold text-gray-500">
            {formatNumber(totalAmount)} QSTK
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllocationWizard