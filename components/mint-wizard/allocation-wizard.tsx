import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes, useState, useEffect } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { formatNumber, lockDurationToString, verifyAirdropKey, bnToInput, inputToBn, bnToText } from '../../lib/utils'
import Input from '../input/input'
import Select from '../select/select'
import { LockOption } from '../../types/nft'
import { verifier } from '../../data/nft'

export type IProps = HTMLAttributes<{}> & {
  availableMintAmount: BigNumber
  availableFreeAllocation: BigNumber
  lockOptions: LockOption[]
  lockOptionId: number
  qstkAmount: BigNumber
  airdropAmount: BigNumber
  setLockOptionId: (id: number) => void
  setQstkAmount: (amount: BigNumber) => void
  setAirdropAmount: (amount: BigNumber) => void
}

const AllocationWizard: FunctionComponent<IProps> = ({
  availableMintAmount,
  availableFreeAllocation,
  lockOptions,
  className,
  lockOptionId,
  qstkAmount,
  airdropAmount,
  setLockOptionId,
  setQstkAmount,
  setAirdropAmount,
  ...props
}: IProps) => {
  const [shouldValidate, setShouldValidate] = useState(true)
  const [qstkAmountInput, setQstkAmountInput] = useState('')
  const [qstkAmountError, setQstkAmountError] = useState('')
  // e.g. 000000000000003643aa64798604000006ad9f847018909faf08411804c204b32b93530117370faeb41860e1dcb3ed2d24ce720350208bafa2aad3e2ce150daa98bce085b79b5050f69579aa0caa82ce1c
  const [airdropKey, setAirdropKey] = useState('') 
  const [airdropKeyError, setAirdropKeyError] = useState('')
  const address = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"

  const lockOption = lockOptions[lockOptionId];
  const totalAmount = BigNumber.from("10000").mul(BigNumber.from(10).pow(18))

  // TODO: modify validation steps
  // TODO: already used key validation
  // TODO: totalAmount to sum(qstkAmount, airdropAmount)
  // TODO: pass qstkAmount to parent component

  useEffect(() => {
    try {
      let bn = inputToBn(qstkAmountInput)
      setQstkAmount(bn)
      if (bn.lt(lockOption.minAmount)) {
        setQstkAmountError('lower than min')
      } else if (bn.gt(lockOption.maxAmount)) {
        setQstkAmountError('bigger than max')
      } else {
        setQstkAmountError('')
      }
    } catch(err) {
      setQstkAmountError(err.message)
    }
  }, [qstkAmountInput, lockOptionId])

  useEffect(() => {
    let result = verifyAirdropKey(verifier, address, airdropKey)
    if (!result.isValid) {
      setAirdropAmount(BigNumber.from(0))
      setAirdropKeyError('invalid airdrop key')
    } else {
      setAirdropAmount(result.amount)
      setAirdropKeyError('')
    }
  }, [airdropKey])

  return (
    <div className={classNames(className, "flex flex-col space-y-8")}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">QSTK Token Remaining</div>
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
              placeholder="Enter QSTK amount"
              unit="QSTK"
              value={qstkAmountInput}
              isError={shouldValidate && qstkAmountError != ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setQstkAmountInput(e.target.value)}
            />
            <div className="flex flex-row justify-between">
              <span className="text-xs leading-4 font-normal text-gray-500"> 
                Min {bnToText(lockOption.minAmount)} - Max {bnToText(lockOption.maxAmount)}
              </span>
              <a
                className="text-xs leading-4 font-normal text-black cursor-pointer"
                onClick={() => setQstkAmountInput(bnToInput(lockOption.maxAmount))}
              >
                MAX
              </a>
            </div>
            {shouldValidate && qstkAmountError != '' && (
              <div className="text-red-500 text-xs">
                {qstkAmountError}
              </div>
            )}
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
            placeholder="000000000000003..."
            value={airdropKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAirdropKey(e.target.value)}
            isError={shouldValidate && airdropKeyError != ''}
          />
          {
            shouldValidate && airdropKeyError == '' && (
              <span className="text-xs leading-4 font-normal text-gray-500">
                <span className="mr-2">🎉</span>
                Congratulations, you are eligible to
                <span className="ml-1 font-semibold">{bnToText(airdropAmount)} QSTK</span>
              </span>
            )
          }
          {
            shouldValidate && airdropKeyError != '' && (
              <div className="text-red-500 text-xs">
                {airdropKeyError}
              </div>
            )
          }
        </div>
      </div>
      <div className="flex flex-col w-full p-4 bg-gray-50 rounded-2xl space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Total Token to Receive</div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex w-8 h-8 p-2 bg-white rounded-2xl border border-solid border-gray-200">
            <img src="/quiver.svg"/>
          </div>
          <span className="text-sm leading-5 font-semibold text-gray-500">
            {bnToInput(totalAmount)} QSTK
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllocationWizard