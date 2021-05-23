import { getAddress, isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { VerifyAirdropKeyResponse } from '../types/airdrop'
import { QAirdrop } from '../types/contracts'

export function shortenAddress(address: string, chars = 4): string {
  if (!isAddress(address)) return ''
  const parsed = getAddress(address)
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function capitalize(s: string): string {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function formatDate(d: Date): string {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return `${day}/${month}/${year}`
}

export function lockDurationToString(duration: number): string {
  // TODO: need to be updated
  if (duration === 12 * 30 * 24 * 3600) {
    return '1 Year'
  }
  if (duration === 6 * 30 * 24 * 3600) {
    return '6 months'
  }
  if (duration === 3 * 30 * 24 * 3600) {
    return '3 months'
  }

  return '1 month'
}

export function formatNumber(n: number | BigNumber): string {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// verify airdrop key - off chain
export const verifyAirdropKey = async (
  qairdrop: QAirdrop,
  address: string,
  airdropKey: string
): Promise<VerifyAirdropKeyResponse> => {
  if (airdropKey.length !== 158 && airdropKey.length !== 162) {
    return {
      isValid: false,
      amount: BigNumber.from(0)
    }
  }

  const verifier = await qairdrop.callStatic.verifier()
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
