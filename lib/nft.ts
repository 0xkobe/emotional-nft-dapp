import { BigNumber } from '@ethersproject/bignumber'
import { favCoins } from '../data/favCoins'
import { backgrounds, characters, lockOptions } from '../data/nft'
import { APINftCreateRequest } from '../types/api'
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

// fetches NFT from on-chain, metadata from off-chain, and fetch related local data
export const fetchNFT = async (
  qnftContract: QNFT,
  tokenId: BigNumber,
): Promise<NFT> => {
  // // fetch info on-chain
  const nftDataOnChain = (await qnftContract.nftData(tokenId)) as NFTOnChain

  // fetch info off-chain from database
  const { data, error } = await supabase
    .from('nft')
    .select('*')
    .eq('id', nftDataOnChain.metaId.toString())
  if (error) throw error
  if (!data || data?.length === 0)
    throw new Error(
      `metadata with id "${nftDataOnChain.metaId.toString()}" not found`,
    )
  const nftDataOffChain = data.pop() as NFTOffChain

  return {
    ...nftDataOnChain,
    ...nftDataOffChain,
    tokenId,
  }
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
): Promise<string> => {
  if (!chainId) throw new Error('chainId is falsy')
  if (!account) throw new Error('account is falsy')

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
  if (!res.ok) {
    const error = (await res.json()).error
    if (error)
      throw new Error(`an error occurred while creating metadata: ${error}`)
    throw new Error(`an unknown error occurred while creating metadata`)
  }
  const metaId = (await res.json()).metaId
  return metaId
}
