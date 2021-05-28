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

export const formatDuration = (duration: number): string => {
  const minute = 60
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 12 * month
  if (duration > year) { // more than 1 year
    return `${Math.floor(duration/year)} Years ${Math.floor((duration%year)/month)} Months`
  }
  if (duration > month) { // more than 1 month
    return `${Math.floor(duration/month)} Months ${Math.floor((duration%month)/day)} Days`
  }
  if (duration > day) { // more than 1 day
    return `${Math.floor(duration/day)} Days`
  }
  if (duration > hour) { // more than 1 hour
    return `${Math.floor(duration/hour)} Hours`
  }
  return `${Math.floor(duration/minute)} Minutes`
}

export function lockDurationToString(duration: number): string {
  if (duration === 100 * 12 * 30 * 24 * 3600) {
    return '1 Decade'
  }
  if (duration === 12 * 30 * 24 * 3600) {
    return '1 Year'
  }
  if (duration === 6 * 30 * 24 * 3600) {
    return '6 Months'
  }
  if (duration === 1800) {
    return '30 Minutes'
  }
  throw new Error('Invalid Lock Duration')
}

// format number with comma
export function formatNumber(n: number | BigNumber): string {
  return n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

// format big number to user friendly text
export function bnToText(n: BigNumber): string {
  return utils.formatEther(n).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
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
  try {
    const keyBuffer = Buffer.from(airdropKey, 'base64')
    if (keyBuffer.length !== 80 && keyBuffer.length !== 81) {
      return {
        isValid: false,
        amount: BigNumber.from(0),
        signature: ''
      }
    }

    const amountBuffer = keyBuffer.slice(0, 16)
    const signature = keyBuffer.slice(16)
    const messageHash = ethers.utils.solidityKeccak256(['address', 'uint256'], [address, `0x${amountBuffer.toString('hex')}`])
    // messageHash starts with '0x'
    const res = ethers.utils.verifyMessage(Buffer.from(messageHash.slice(2), 'hex'), signature)

    return {
      isValid: res === verifier,
      amount: BigNumber.from(amountBuffer),
      signature: '0x' + signature.toString('hex')
    }
  } catch (e) {
    return {
      isValid: false,
      amount: BigNumber.from(0),
      signature: ''
    }
  }
}
