import { BigNumber } from '@ethersproject/bignumber'

export enum Emotion {
  Angry = 0,
  Worry,
  Normal,
  Rest,
  Happy,
}

// NFT Data parsed from RawNFTData
export type NFTData = {
  characterId: number
  favCoinId: number
  lockDuration: number
  lockAmount: BigNumber
  createdAt: Date
  withdrawn: boolean
  metaUrl: string
}

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

export type NFTCreator = {
  name: string
  address: string
  other: string
}

export type NFTMeta = {
  name: string
  bgImageId: number
  defaultEmotion: Emotion
  color: string // NFT character color (skin)
  story: string // story that NFT minter want to put for the NFT
  creator: NFTCreator // nft creator info
}
