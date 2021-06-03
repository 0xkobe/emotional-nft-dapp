import { BigNumber } from '@ethersproject/bignumber'
import createHttpError from 'http-errors'
import { favCoins } from '../data/favCoins'
import { backgrounds, characters, lockOptions } from '../data/nft'
import {
  APINftBulkCreateRequest,
  APINftBulkCreateResponse,
  APINftCreateRequest,
  APINftCreateResponse,
  APIResponseError,
} from '../types/api'
import { QNFT } from '../types/contracts'
import {
  Character,
  Emotion,
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

      return nftDataOnChain
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
  return nftsDataOnChain.map((nftDataOnChain, i) => ({
    ...nftDataOnChain,
    ...nftsDataOffChain[i],
    tokenId: tokenIds[i],
  }))
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
// TODO: update to a more generic getBackground function. Add a new Background type
export const getBackgroundImage = (backgroundId: number): string => {
  if (!backgrounds[backgroundId])
    throw new Error(`background with id ${backgroundId} not found`)
  return backgrounds[backgroundId].image
}

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
