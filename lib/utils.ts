import { getAddress, isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers, utils } from 'ethers'
import { VerifyAirdropKeyResponse } from '../types/airdrop'

export function shortenAddress(address: string, chars = 4): string {
  if (!isAddress(address)) return ''
  const parsed = getAddress(address)
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const formatDate = (d: Date): string => d.toLocaleDateString()

export function lockDurationToString(duration: number): string {
  if (duration === 100 * 12 * 30 * 24 * 3600) {
    return '1 Century'
  }
  if (duration === 12 * 30 * 24 * 3600) {
    return '1 Year'
  }
  if (duration === 6 * 30 * 24 * 3600) {
    return '6 Months'
  }

  return duration.toString() + ' seconds'
}

// format number with comma
export function formatNumber(n: number | BigNumber): string {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// format big number to user friendly text
export function bnToText(n: BigNumber): string {
  return utils.formatEther(n).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// format big number to user friendly input - can add comma later if needed
export function bnToInput(n: BigNumber): string {
  return utils.formatEther(n)
}

// format various types of user input to big number
export function inputToBn(s: string): BigNumber {
  return utils.parseEther(s)
}

// verify airdrop key - off chain
export const verifyAirdropKey = (
  verifier: string,
  address: string,
  airdropKey: string
): VerifyAirdropKeyResponse => {
  if (airdropKey.length !== 158 && airdropKey.length !== 162) {
    return {
      isValid: false,
      amount: BigNumber.from(0)
    }
  }

  const keyBuffer = Buffer.from(airdropKey, 'hex')
  const amountBuffer = keyBuffer.slice(0, 16)
  const signature = keyBuffer.slice(16)
  const messageHash = ethers.utils.solidityKeccak256(['address', 'uint256'], [address, `0x${amountBuffer.toString('hex')}`])
  // messageHash starts with '0x'
  const res = ethers.utils.verifyMessage(Buffer.from(messageHash.slice(2), 'hex'), signature)

  return {
    isValid: res === verifier,
    amount: BigNumber.from(amountBuffer)
  }
}
