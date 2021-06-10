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
  timestamp: number
}

export type APINftCreateResponse = {
  metaId: number
}

export type APINftBulkCreateRequest = {
  author: string
  backgroundId: number
  description: string
  name: string
  creator: string
  signature: string
  chainId: number
  defaultEmotion: Emotion
  bulkMintNumber: number
  timestamp: number
}

export type APINftBulkCreateResponse = {
  metaIds: number[]
}

export type APINftMetadataResponse = {
  name: string
  author: string
  description: string
  image: string
  external_url: string
  attributes: {
    trait_type: string
    value: any
    display_type?: DisplayType
  }[]
}
export enum DisplayType {
  Date = 'date',
  Number = 'number', // can also set optional max_value
  BoostPercentage = 'boost_percentage', // can also set optional max_value
  BoostNumber = 'boost_number', // can also set optional max_value
}

export type APINftUpdateRequest = {
  metaId: number
  tokenId: string
  author: string
  backgroundId: number
  description: string
  name: string
  signer: string
  signature: string
  chainId: number
  defaultEmotion: Emotion
  timestamp: number
}
