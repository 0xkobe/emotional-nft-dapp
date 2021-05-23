import { BigNumber } from '@ethersproject/bignumber'
import { Creature, FavCoinEnum, Skin } from '../types/metadata'

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
  skin: Skin
  emotions: {
    [Emotion.Angry]: string
    [Emotion.Worry]: string
    [Emotion.Normal]: string
    [Emotion.Rest]: string
    [Emotion.Happy]: string
  }
  artist: Artist
  creature: Creature
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

export type KeyValue = {
  key: string
  value: string
}

export type Property = {
  title: string
  keyValues: KeyValue[]
}
