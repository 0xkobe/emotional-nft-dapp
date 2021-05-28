import { BigNumber } from '@ethersproject/bignumber'

// define raw types that work in the middle of frontend and contract

// raw NFT data fetched directly from contract
export type RawNFTData = {
  id: number
  characterId: number
  favCoinId: number
  unlockTime: BigNumber
  lockAmount: BigNumber
  createdAt: BigNumber
  withdrawn: boolean
  metaId: number
}
