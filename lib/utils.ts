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

// verify airdrop key - off chain
export const verifyAirdropKey = async (
  qairdrop: QAirdrop,
  address: string,
  airdropKey: string
): Promise<VerifyAirdropKeyResponse> => {
  if (airdropKey.length === 158 || airdropKey.length === 162) {
    const verifier = await qairdrop.callStatic.verifier()
    const keyBuffer = Buffer.from(airdropKey, 'hex')
    const amountBuffer = keyBuffer.slice(0, 16)
    const signature = keyBuffer.slice(16)
    const messageHash = ethers.utils.solidityKeccak256(['address', 'uint256'], [address, `0x${amountBuffer.toString('hex')}`])
    // messageHash starts with '0x'
    const res = ethers.utils.verifyMessage(Buffer.from(messageHash.slice(2), 'hex'), signature)
    if (res === verifier) {
      return {
        isValid: true,
        amount: BigNumber.from(amountBuffer)
      }
    }
  }

  return {
    isValid: false,
    amount: BigNumber.from(0)
  }
}
