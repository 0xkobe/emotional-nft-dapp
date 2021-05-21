import {
  Background,
  Creature,
  DisplayType,
  FavCoinEnum,
  LockPeriod,
  Skin,
  Traits,
} from './metadata'

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
}

export type APINftCreateResponse = {
  metaId: number
}

export type APINftMetadataResponse = {
  name: string
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
      trait_type: Traits.LockPeriod
      value: LockPeriod
    },
    {
      trait_type: Traits.LockAmount
      value: number
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
      display_type: DisplayType.Date
      trait_type: Traits.CreatedData
      value: number
    },
    {
      trait_type: Traits.Withdrawn
      value: boolean
    },
  ]
}
