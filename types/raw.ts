import { BigNumber } from '@ethersproject/bignumber'

// define raw types that work in the middle of frontend and contract

// raw NFT data fetched directly from contract
export type RawNFTData = {
    characterId: BigNumber
    favCoinId: BigNumber
    lockDuration: BigNumber
    lockAmount: BigNumber
    createdAt: BigNumber
    withdrawn: boolean
    metaUrl: string
  }
  
  export type RawNFTDataArray = RawNFTData[]
  