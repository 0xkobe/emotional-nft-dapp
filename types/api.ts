import { BigNumber } from '@ethersproject/bignumber'
import {
  Background,
  Creature,
  DisplayType,
  FavCoinEnum,
  LockPeriod,
  Skin,
  Traits,
} from './metadata'
import { Character, Emotion, FavCoin, LockOption } from './nft'

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
      trait_type: Traits.LockPeriod
      value: LockPeriod
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
      display_type: DisplayType.Date
      trait_type: Traits.CreatedDate
      value: number
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

// Structure used to save the metadata in database
export type MetadataOffChain = {
  author: string
  backgroundId: number
  description: string
  name: string
  chainId: number
  creator: string
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
  metaId: BigNumber
}

export type Metadata = MetadataOffChain & MetadataOnChain

export type HydratedMetadata = Metadata & {
  character: Character
  favCoin: FavCoin
  lockOption: LockOption
  backgroundUrl: string
}
