import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'
import React, {
  ChangeEvent,
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { tokenMultiplier, verifier } from '../../data/nft'
import {
  bnToInput,
  bnToText,
  inputToBn,
  verifyAirdropKey,
} from '../../lib/utils'
import { QAirdrop } from '../../types/contracts'
import { LockOption } from '../../types/nft'
import IconInformation from '../icon/information'
import Input from '../input/input'
import Select from '../select/select'
import Tooltip from '../tooltip/tooltip'

export type IProps = HTMLAttributes<{}> & {
  qAirdrop?: QAirdrop
  account: string
  availableMintAmount?: BigNumber
  availableFreeAllocation?: BigNumber
  lockOptions: LockOption[]
  lockOptionId: number
  qstkAmount: BigNumber
  freeAllocationAmount: BigNumber
  setLockOptionId: (id: number) => void
  setQstkAmount: (amount: BigNumber) => void
  setAirdropAmount: (amount: BigNumber) => void
  setAirdropSignature: (signature?: string) => void
  setAirdropClaimed: (isClaimed: boolean) => void

  // bulk mint
  bulkMintIsActive?: boolean
  setBulkMintNumber?: (number: number) => void

  // airdrop key
  airdropKey?: string
  setAirdropKey: (key: string) => void
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
  freeAllocationAmount,
  setLockOptionId,
  setQstkAmount,
  setAirdropAmount,
  setAirdropSignature,
  setAirdropClaimed,

  // bulk mint
  bulkMintIsActive,
  setBulkMintNumber,

  // airdrop key
  airdropKey, // e.g. 000000000000003643aa64798604000006ad9f847018909faf08411804c204b32b93530117370faeb41860e1dcb3ed2d24ce720350208bafa2aad3e2ce150daa98bce085b79b5050f69579aa0caa82ce1c
  setAirdropKey,
}: IProps) => {
  const lockOption = lockOptions[lockOptionId]

  const [airdropKeyError, setAirdropKeyError] = useState('')

  const airdropResult = useMemo(() => {
    if (!account) return null
    if (!airdropKey) return null
    return verifyAirdropKey(verifier, account, airdropKey)
  }, [account, airdropKey])

  const qstkAmountError = useMemo(() => {
    if (!qstkAmount) return null
    if (qstkAmount.lt(lockOption.minAmount)) {
      return 'lower than min'
    }
    if (qstkAmount.gt(lockOption.maxAmount)) {
      return 'bigger than max'
    }
    return null
  }, [qstkAmount])

  const qstkAmountInput = useMemo(() => {
    if (!qstkAmount) return ''
    if (qstkAmount.eq(0)) return ''
    return bnToInput(qstkAmount)
  }, [qstkAmount])

  useEffect(() => {
    if (!qAirdrop) return
    if (!airdropResult) return
    if (!airdropResult.isValid) {
      setAirdropAmount(BigNumber.from(0))
      setAirdropKeyError('invalid airdrop key')
      return
    }
    qAirdrop
      .claimed(airdropResult.signature)
      .then((isClaimed) => {
        setAirdropClaimed(isClaimed)
        setAirdropAmount(airdropResult.amount)
        setAirdropSignature(airdropResult.signature)
        setAirdropKeyError('')
      })
      .catch(setAirdropKeyError)
  }, [setAirdropAmount, setAirdropKeyError, qAirdrop, airdropResult])

  return (
    <div className={classNames(className, 'flex flex-col space-y-8')}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-2 text-base leading-6 font-medium text-purple-900">
          <span>QSTK Token Remaining</span>
          <Tooltip
            tooltip="QSTK tokens allocated for NFT sale are restricted and no more tokens will be provided for discounted purchase."
            tooltipClassName="-left-28 w-56"
          >
            <IconInformation />
          </Tooltip>
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
          <div className="text-base leading-6 font-medium text-purple-900">
            Amount to mint
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              className="w-full"
              placeholder="Amount"
              unit="QSTK"
              type="number"
              min={bnToInput(lockOption.minAmount)}
              max={bnToInput(lockOption.maxAmount)}
              value={qstkAmountInput}
              isError={!!qstkAmountError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                try {
                  setQstkAmount(inputToBn(e.target.value))
                } catch (e) {}
              }}
            />
            <div className="flex flex-row justify-between">
              <span className="text-xs leading-4 font-normal text-gray-500">
                Min {bnToText(lockOption.minAmount)} - Max{' '}
                {bnToText(lockOption.maxAmount)}
              </span>
              <a
                className="text-xs leading-4 font-normal text-purple-700 cursor-pointer"
                onClick={() => setQstkAmount(lockOption.maxAmount)}
              >
                MAX
              </a>
            </div>
            {qstkAmountError && (
              <div className="text-red-500 text-xs">{qstkAmountError}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-purple-900">
            Lock Period Discount
          </div>
          <div className="flex flex-col space-y-2">
            <Select
              className="w-full"
              placeholder=""
              options={lockOptions.map((option) => {
                return {
                  text: `${option.description} - ${(
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
      {!bulkMintIsActive && (
        <>
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex flex-row items-center space-x-2 text-base leading-6 font-medium text-purple-900">
              <span>Whitelist key (Airdrop key)</span>
              <Tooltip
                tooltip="Whiltelist key (base64) you receive from the team for your airdrop to get the early access to mint privilege."
                tooltipClassName="-left-28 w-56"
              >
                <IconInformation />
              </Tooltip>
            </div>
            <div className="flex flex-col space-y-2">
              <Input
                className="w-full"
                placeholder="000000000000003..."
                value={airdropKey}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAirdropKey(e.target.value)
                }
                isError={airdropKeyError !== '' && airdropKey !== ''}
              />
              {airdropKeyError === '' && airdropKey && (
                <span className="text-xs leading-4 font-normal text-gray-500">
                  <span className="mr-2">🎉</span>
                  Congratulations, you are eligible to
                  <span className="ml-1 font-semibold">
                    {bnToText(freeAllocationAmount)} QSTK
                  </span>
                </span>
              )}
              {airdropKeyError !== '' && airdropKey && (
                <div className="text-red-500 text-xs">{airdropKeyError}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full p-4 bg-gray-50 rounded-2xl space-y-4">
            <div className="flex flex-row items-center space-x-2 text-base leading-6 font-medium text-purple-900">
              <span>Total Token to Receive</span>
              <Tooltip
                tooltip="The total QSTK amount you receive is defined by “QSTK you purchase + the amount allocated for your whitelist key”."
                tooltipClassName="-left-28 w-56"
              >
                <IconInformation />
              </Tooltip>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <div className="flex w-8 h-8 p-2 bg-white rounded-2xl border border-solid border-gray-200">
                <img src="/quiver.svg" />
              </div>
              <span className="text-sm leading-5 font-semibold text-purple-900">
                {bnToText(qstkAmount.add(freeAllocationAmount))} QSTK
              </span>
            </div>
          </div>
        </>
      )}

      {bulkMintIsActive && (
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex flex-row items-center space-x-2 text-base leading-6 font-medium text-purple-900">
            <span>Number of NFT to mint</span>
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              className="w-full"
              type="number"
              step="1"
              min="1"
              placeholder="1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const number = parseInt(e.target.value)
                if (
                  setBulkMintNumber &&
                  !Number.isNaN(number) &&
                  Number.isInteger(number)
                )
                  setBulkMintNumber(number)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AllocationWizard
