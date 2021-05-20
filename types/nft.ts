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

export type Artist = {
  name: string
  wallet: string
  meta: string
}

export type Character = {
  name: string
  skin?: string
  emotions: {
    angry: string
    worry: string
    normal: string
    rest: string
    happy: string
  }
  artist: Artist
}

export type FavCoinMeta = {
  name: string
  symbol: string
  icon: string
  website: string
  social: string
  other: string
}

export type FavCoin = {
  id: number
  mintPrice: BigNumber // default mint price in ETH
  meta: FavCoinMeta
}

export type LockOption = {
  id: number
  duration: number // in second
  discount: number
  minAmount: BigNumber
  maxAmount: BigNumber
}
