import { Background, Creature, FavCoinEnum, Skin } from './metadata'
import { Emotion } from './nft'

export type APIResponseError = {
  error: string
}

export type APINftCreateRequest = {
  author: string
  backgroundId: number
  description: string
  name: string
  creator: string
  signature: string
  chainId: number
  defaultEmotion: Emotion
}

export type APINftCreateResponse = {
  metaId: number
}

export type APINftMetadataResponse = {
  name: string
  author: string
  description: string
  image: string
  external_url: string
  attributes: [
    {
      trait_type: Traits.Creature
      value: Creature
    },
    {
      trait_type: Traits.Skin
      value: Skin
    },
    {
      trait_type: Traits.Background
      value: Background
    },
    {
      trait_type: Traits.FavCoin
      value: FavCoinEnum
    },
    {
      display_type: DisplayType.Date
      trait_type: Traits.UnlockTime
      value: number
    },
    {
      trait_type: Traits.LockAmount
      value: string
    },
    {
      trait_type: Traits.CreatorName
      value: string
    },
    {
      trait_type: Traits.CreatorWallet
      value: string
    },
    {
      trait_type: Traits.Withdrawn
      value: boolean
    },
    {
      trait_type: Traits.DefaultEmotion
      value: Emotion
    },
  ]
}

export enum Traits {
  Creature = 'Creature',
  Skin = 'Skin',
  Background = 'Background',
  FavCoin = 'Favorite Coin',
  LockPeriod = 'Lock Period',
  UnlockTime = 'Unlock Time',
  LockAmount = 'Lock Amount',
  CreatorName = "Creator's Name",
  CreatorWallet = "Creator's Address",
  Withdrawn = 'Withdrawn',
  DefaultEmotion = 'Default Emotion',
}

export enum DisplayType {
  Date = 'date',
  Number = 'number', // can also set optional max_value
  BoostPercentage = 'boost_percentage', // can also set optional max_value
  BoostNumber = 'boost_number', // can also set optional max_value
}
