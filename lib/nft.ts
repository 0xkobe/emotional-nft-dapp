import { BigNumber } from '@ethersproject/bignumber'
import createHttpError from 'http-errors'
import { join } from 'path'
import { favCoins } from '../data/favCoins'
import { backgrounds, characters, emotions, lockOptions } from '../data/nft'
import {
  APINftBulkCreateRequest,
  APINftBulkCreateResponse,
  APINftCreateRequest,
  APINftCreateResponse,
  APINftUpdateRequest,
  APIResponseError,
} from '../types/api'
import { QNFT } from '../types/contracts'
import { BackgroundData } from '../types/metadata'
import {
  Character,
  Emotion,
  EmotionData,
  FavCoin,
  LockOption,
  NFT,
  NFTOffChain,
  NFTOnChain,
} from '../types/nft'
import { supabase } from './supabase'

// fetches NFTs from on-chain, metadata from off-chain, and fetch related local data
export const fetchNFTs = async (
  qnftContract: QNFT,
  tokenIds: BigNumber[],
): Promise<NFT[]> => {
  // // fetch info on-chain
  const nftsDataOnChain = await Promise.all(
    tokenIds.map(async (tokenId) => {
      const nftDataOnChain = (await qnftContract.nftData(tokenId)) as NFTOnChain

      if (nftDataOnChain.unlockTime === 0)
        throw new createHttpError.NotFound(`nft with id "${tokenId}" not found`)

      return {
        ...nftDataOnChain,
        tokenId,
      }
    }),
  )

  // fetch info off-chain from database
  const { data: nftsDataOffChain, error } = await supabase
    .from<NFTOffChain>('nft')
    .select('*')
    .in(
      'id',
      nftsDataOnChain.map((x) => x.metaId.toString()),
    )
  if (error) throw error
  if (!nftsDataOffChain) throw new createHttpError.NotFound(`no nft not found`)
  if (nftsDataOffChain.length !== nftsDataOnChain.length)
    throw new createHttpError.BadRequest(`some nft have not been found`)

  // return data
  return nftsDataOnChain
    .map((onChain) => {
      const offChain = nftsDataOffChain.find(
        (offChain) => offChain.id === onChain.metaId,
      )
      if (!offChain)
        throw new Error(`meta with id "${onChain.metaId}" not found`)
      return {
        ...onChain,
        ...offChain,
        tokenId: onChain.tokenId,
      }
    })
    .sort((a, b) => a.tokenId.sub(b.tokenId).toNumber())
}

export const fetchNFT = async (
  qnftContract: QNFT,
  tokenId: BigNumber,
): Promise<NFT> => {
  const nfts = await fetchNFTs(qnftContract, [tokenId])
  if (nfts.length === 0)
    throw new createHttpError.NotFound(`nft with id "${tokenId}" not found`)
  return nfts[0]
}

// character
export const getCharacter = (characterId: number): Character => {
  const character = characters[characterId]
  if (!character) throw new Error(`character with id ${characterId} not found`)
  return character
}

// favCoin
export const getFavCoin = (favCoinId: number): FavCoin => {
  const favCoin = favCoins[favCoinId]
  if (!favCoin) throw new Error(`favCoin with id ${favCoinId} not found`)
  return favCoin
}

// lockOption
export const getLockOption = (lockDuration: BigNumber): LockOption => {
  const lockOption = lockOptions.find((x) => lockDuration.eq(x.duration))
  if (!lockOption)
    throw new Error(`lockOption with duration ${lockDuration} not found`)
  return lockOption
}

// background
// TODO: replace getBackgroundImage by getBackground
export const getBackgroundImage = (backgroundId: number): string => {
  if (!backgrounds[backgroundId])
    throw new Error(`background with id ${backgroundId} not found`)
  return backgrounds[backgroundId].image
}
export const getBackground = (backgroundId: number): BackgroundData => {
  if (!backgrounds[backgroundId])
    throw new Error(`background with id ${backgroundId} not found`)
  return backgrounds[backgroundId]
}

// emotion
export const getEmotion = (emotion: Emotion): EmotionData => {
  const e = emotions.find((e) => e.emotion === emotion)
  if (!e) throw new Error(`data of emotion ${emotion} not found`)
  return e
}

// return the path to the generated image combining the character and the background
export const getNftImagePath = (
  character: Character,
  background: BackgroundData,
  emotion: Emotion,
): string =>
  join(
    'nft',
    'composite',
    `${character.name.toLowerCase().replace(/ /g, '_')}-${character.skin
      .toLowerCase()
      .replace(/ /g, '_')}-${emotion
      .toLocaleLowerCase()
      .replace(/ /g, '_')}-${background.name
      .toLowerCase()
      .replace(/ /g, '_')}.png`,
  )

// create a new metadata on the API. Returns the created metadata id.
export const createNFTOffChain = async (
  signature: string,
  chainId: number,
  account: string,
  author: string,
  backgroundId: number,
  description: string,
  name: string,
  emotion: Emotion,
  timestamp: number,
): Promise<number> => {
  const data: APINftCreateRequest = {
    author,
    backgroundId,
    description,
    name,
    creator: account,
    signature,
    chainId,
    defaultEmotion: emotion,
    timestamp,
  }
  const res = await fetch('/api/nft/create', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  })
  let body
  try {
    body = (await res.json()) as APINftCreateResponse | APIResponseError
  } catch (error) {
    throw new Error(`an unknown error occurred while creating metadata`)
  }
  if ('error' in body)
    throw new Error(`an error occurred while creating metadata: ${body.error}`)
  if (!res.ok)
    throw new Error(`an unknown error occurred while creating metadata`)
  return body.metaId
}

// create a bulk of metadata on the API. Returns the created metadata ids.
export const createBulkNFTOffChain = async (
  signature: string,
  chainId: number,
  account: string,
  author: string,
  backgroundId: number,
  description: string,
  name: string,
  emotion: Emotion,
  timestamp: number,
  bulkMintNumber: number,
): Promise<number[]> => {
  const data: APINftBulkCreateRequest = {
    author,
    backgroundId,
    description,
    name,
    creator: account,
    signature,
    chainId,
    defaultEmotion: emotion,
    timestamp,
    bulkMintNumber,
  }
  const res = await fetch('/api/nft/bulk-create', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  })
  let body
  try {
    body = (await res.json()) as APINftBulkCreateResponse | APIResponseError
  } catch (error) {
    throw new Error(`an unknown error occurred while creating metadata`)
  }
  if ('error' in body)
    throw new Error(`an error occurred while creating metadata: ${body.error}`)
  if (!res.ok)
    throw new Error(`an unknown error occurred while creating metadata`)
  return body.metaIds
}

// update metadata on the API
export const updateNFTOffChain = async (
  data: APINftUpdateRequest,
): Promise<void> => {
  const res = await fetch('/api/nft/update', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  })
  let body
  try {
    body = (await res.json()) as APIResponseError
  } catch (error) {
    throw new Error(`an unknown error occurred while updating metadata`)
  }
  if ('error' in body)
    throw new Error(`an error occurred while updating metadata: ${body.error}`)
  if (!res.ok)
    throw new Error(`an unknown error occurred while updating metadata`)
}
