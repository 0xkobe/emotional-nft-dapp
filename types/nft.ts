import { BigNumber } from '@ethersproject/bignumber'
import { Creature, FavCoinEnum, Skin } from './metadata'

export enum Emotion {
  Happy = 'happy',
  Rest = 'rest',
  Normal = 'normal',
  Worry = 'worry',
  Angry = 'angry',
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

// Structure used to save the metadata in database
export type MetadataOffChain = {
  author: string // author name
  backgroundId: number
  description: string
  name: string // nft name
  chainId: number
  creator: string // creator wallet
  defaultEmotion: Emotion
}

// Structure of the nft data onchain
export type MetadataOnChain = {
  characterId: number
  favCoinId: number
  lockDuration: BigNumber
  lockAmount: BigNumber
  createdAt: BigNumber
  withdrawn: boolean
  metaId: number
}

export type Metadata = MetadataOffChain & MetadataOnChain

export type HydratedMetadata = Metadata & {
  character: Character
  favCoin: FavCoin
  lockOption: LockOption
  backgroundUrl: string // TODO: should load the whole background object. not just the url
}
