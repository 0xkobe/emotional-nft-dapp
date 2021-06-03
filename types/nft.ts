import { BigNumber } from '@ethersproject/bignumber'
import { Creature, FavCoinEnum, Skin } from './metadata'

export enum Emotion {
  Angry = 'angry',
  Worry = 'worry',
  Normal = 'normal',
  Rest = 'rest',
  Happy = 'happy',
}

export type Artist = {
  name: string
  wallet: string
  meta: string
}

export type Character = {
  id: number // https://github.com/QuiverCommunity/quiver-contracts/blob/master/data.md#character-id
  name: string
  creature: Creature
  skin: Skin // TODO: should be an object with image and not just the enum
  emotions: {
    [Emotion.Angry]: string
    [Emotion.Worry]: string
    [Emotion.Normal]: string
    [Emotion.Rest]: string
    [Emotion.Happy]: string
  }
  artist: Artist
  mintPrice: BigNumber
}

export type FavCoinMeta = {
  name: string
  symbol: string
  icon: string
  coingeckoId?: string
  website?: string
  social?: string
  other?: string
}

export type FavCoin = {
  id: FavCoinEnum
  mintPrice: BigNumber // default mint price in ETH
  meta: FavCoinMeta
}

export type LockOption = {
  id: number
  description: string // used to display on the mint page
  duration: number // in second
  discount: number
  minAmount: BigNumber
  maxAmount: BigNumber
}

// Structure used to save the nft data in database
export type CreateNFTOffChain = {
  author: string // author name
  backgroundId: number
  description: string
  name: string // nft name
  chainId: number
  creator: string // creator wallet
  defaultEmotion: Emotion
}

// Structure used to save the nft data in database
export type NFTOffChain = CreateNFTOffChain & {
  id: number
  createdAt: Date
  updatedAt: Date
}

// Structure of the nft data onchain
export type NFTOnChain = {
  characterId: number
  favCoinId: number
  unlockTime: number
  lockAmount: BigNumber
  withdrawn: boolean
  metaId: number
}

export type NFT = NFTOffChain &
  NFTOnChain & {
    tokenId: BigNumber
  }
