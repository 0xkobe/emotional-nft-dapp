import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes, useState } from 'react'
import { tokenMultiplier, verifier } from '../../data/nft'
import {
  bnToInput,
  bnToText,
  inputToBn,
  lockDurationToString,
  verifyAirdropKey,
} from '../../lib/utils'
import { VerifyAirdropKeyResponse } from '../../types/airdrop'
import { QAirdrop } from '../../types/contracts'
import { LockOption } from '../../types/nft'
import Input from '../input/input'
import Select from '../select/select'

export type IProps = HTMLAttributes<{}> & {
  qAirdrop?: QAirdrop
  account: string
  availableMintAmount?: BigNumber
  availableFreeAllocation?: BigNumber
  lockOptions: LockOption[]
  lockOptionId: number
  qstkAmount: BigNumber
  airdropAmount: BigNumber
  setLockOptionId: (id: number) => void
  setQstkAmount: (amount: BigNumber) => void
  setAirdropAmount: (amount: BigNumber) => void
  setAirdropSignature: (signature?: string) => void
}

const AllocationWizard: FunctionComponent<IProps> = ({
  qAirdrop,
  account,
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
  setAirdropSignature,
}: IProps) => {
  const lockOption = lockOptions[lockOptionId]

  const [qstkAmountInput, setQstkAmountInput] = useState('')
  const [qstkAmountError, setQstkAmountError] = useState('')
  // e.g. 000000000000003643aa64798604000006ad9f847018909faf08411804c204b32b93530117370faeb41860e1dcb3ed2d24ce720350208bafa2aad3e2ce150daa98bce085b79b5050f69579aa0caa82ce1c
  const [airdropKey, setAirdropKey] = useState('')
  const [airdropKeyError, setAirdropKeyError] = useState('')

  const validateAirdropKeyOnChain = async (
    result: VerifyAirdropKeyResponse,
  ) => {
    if (!qAirdrop) return
    const isUsed = await qAirdrop.claimed(result.signature)
    if (isUsed) {
      setAirdropAmount(BigNumber.from(0))
      setAirdropSignature(undefined)
      setAirdropKeyError('the airdrop key was already used')
    }
    setAirdropAmount(result.amount)
    setAirdropSignature(result.signature)
    setAirdropKeyError('')
  }

  const onChangeQstkAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQstkAmountInput(e.target.value)
    try {
      const bn = inputToBn(e.target.value)
      if (bn.lt(lockOption.minAmount)) {
        setQstkAmountError('lower than min')
      } else if (bn.gt(lockOption.maxAmount)) {
        setQstkAmountError('bigger than max')
      } else {
        setQstkAmountError('')
        setQstkAmount(bn)
      }
    } catch (err) {
      setQstkAmountError(err.message)
    }
  }

  const onChangeAirdropKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAirdropKey(e.target.value)
    if (!account) return
    const result = verifyAirdropKey(verifier, account, e.target.value)
    if (!result.isValid) {
      setAirdropAmount(BigNumber.from(0))
      setAirdropKeyError('invalid airdrop key')
    } else {
      void validateAirdropKeyOnChain(result)
    }
  }

  return (
    <div className={classNames(className, 'flex flex-col space-y-8')}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">
          QSTK Token Remaining
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm leading-5 font-normal text-gray-500">
            QSTK to Mint:{' '}
            {availableMintAmount ? bnToText(availableMintAmount) : 'unknown'}{' '}
            QSTK
          </div>
          <div className="text-sm leading-5 font-normal text-gray-500">
            Free allocation:{' '}
            {availableFreeAllocation
              ? bnToText(availableFreeAllocation)
              : 'unknown'}{' '}
            QSTK
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">
            Amount to mint
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              className="w-full"
              placeholder="Amount"
              unit="QSTK"
              value={qstkAmountInput}
              isError={qstkAmountError != ''}
              onChange={onChangeQstkAmountInput}
            />
            <div className="flex flex-row justify-between">
              <span className="text-xs leading-4 font-normal text-gray-500">
                Min {bnToText(lockOption.minAmount)} - Max{' '}
                {bnToText(lockOption.maxAmount)}
              </span>
              <a
                className="text-xs leading-4 font-normal text-black cursor-pointer"
                onClick={() =>
                  setQstkAmountInput(bnToInput(lockOption.maxAmount))
                }
              >
                MAX
              </a>
            </div>
            {qstkAmountError != '' && (
              <div className="text-red-500 text-xs">{qstkAmountError}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">
            Lock Period Discount
          </div>
          <div className="flex flex-col space-y-2">
            <Select
              className="w-full"
              placeholder=""
              options={lockOptions.map((option) => {
                return {
                  text: `${lockDurationToString(option.duration)} - ${(
                    100 -
                    ((100 - option.discount) * tokenMultiplier) / 100
                  ).toFixed(0)}%`,
                }
              })}
              selectedIndex={lockOptionId}
              onSelectOption={(_, index: number): void => {
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
        <div className="text-base leading-6 font-medium text-gray-500">
          Free Allocation Key
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            className="w-full"
            placeholder="000000000000003..."
            value={airdropKey}
            onChange={onChangeAirdropKey}
            isError={airdropKeyError !== '' && airdropKey !== ''}
          />
          {airdropKeyError === '' && airdropKey && (
            <span className="text-xs leading-4 font-normal text-gray-500">
              <span className="mr-2">🎉</span>
              Congratulations, you are eligible to
              <span className="ml-1 font-semibold">
                {bnToText(airdropAmount)} QSTK
              </span>
            </span>
          )}
          {airdropKeyError !== '' && airdropKey && (
            <div className="text-red-500 text-xs">{airdropKeyError}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full p-4 bg-gray-50 rounded-2xl space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">
          Total Token to Receive
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex w-8 h-8 p-2 bg-white rounded-2xl border border-solid border-gray-200">
            <img src="/quiver.svg" />
          </div>
          <span className="text-sm leading-5 font-semibold text-gray-500">
            {bnToInput(qstkAmount.add(airdropAmount))} QSTK
          </span>
        </div>
      </div>
    </div>
  )
}

export default AllocationWizard
