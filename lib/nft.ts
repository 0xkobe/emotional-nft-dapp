import { BigNumber } from '@ethersproject/bignumber'
import {
  animals,
  backgrounds,
  characters,
  favCoins,
  lockOptions,
  skins,
} from '../data/nft'
import {
  APINftCreateRequest,
  APINftMetadataResponse,
  HydratedMetadata,
  Metadata,
  MetadataOffChain,
  MetadataOnChain,
} from '../types/api'
import { QNFT, QNFTSettings } from '../types/contracts'
import { Creature, Skin, Traits } from '../types/metadata'
import { Character, Emotion } from '../types/nft'
import { supabase } from './supabase'

export const attribute = (metadata: APINftMetadataResponse, trait: Traits): string | number | BigNumber | boolean => {
  if (!metadata) throw new Error(`Metadata is empty`)
  if (!metadata.attributes) throw new Error(`Attribute is empty`)
  const attr = metadata.attributes.find((x) => x.trait_type === trait)
  if (!attr) throw new Error(`Cannot find trait ${trait} in metadata`)
  return attr.value
}

export const getCreature = (
  animal: Creature,
  skin: Skin,
): Character | undefined => {
  const animalIndex = animals.findIndex((x) => x.name === animal)
  const skinIndex = skins.findIndex((x) => x.skin === skin)
  const id = animalIndex * skins.length + skinIndex
  return characters.find((x) => x.id === id)
}

// fetches metadata from on-chain and off-chain
export const fetchMetadata = async (
  qnftContract: QNFT,
  tokenId: number,
): Promise<Metadata> => {
  // // fetch info on-chain
  const nftDataOnChain = (await qnftContract.nftData(
    tokenId,
  )) as MetadataOnChain

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
  const nftDataOffChain = data.pop() as MetadataOffChain

  return {
    ...nftDataOnChain,
    ...nftDataOffChain,
  }
}

// put all related structure into the metadata
export const hydrateMetadata = (metadata: Metadata): HydratedMetadata => {
  // character
  const character = characters[metadata.characterId]
  if (!character)
    throw new Error(`character with id ${metadata.characterId} not found`)

  // favCoin
  const favCoin = favCoins[metadata.favCoinId]
  if (!favCoin)
    throw new Error(`favCoin with id ${metadata.favCoinId} not found`)

  // lockOption
  const lockOption = lockOptions.find((x) =>
    metadata.lockDuration.eq(x.duration),
  )
  if (!lockOption)
    throw new Error(
      `lockOption with duration ${metadata.lockDuration} not found`,
    )

  // backgroundUrl
  const backgroundUrl = backgrounds[metadata.backgroundId].image
  if (!backgroundUrl)
    throw new Error(`background with id ${metadata.backgroundId} not found`)

  // finally
  return {
    ...metadata,
    character: characters[metadata.characterId],
    favCoin,
    lockOption,
    backgroundUrl,
  }
}

// create a new metadata on the API. Returns the created metadata id.
export const createMetadata = async (
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

// get mint price
export const getMintPrice = async (
  qnftSettingsContract: QNFTSettings,
  characterId: number,
  favCoinId: number,
  lockOptionId: number,
  lockAmount: number,
  freeAmount: number,
): Promise<BigNumber> => (await qnftSettingsContract.callStatic.calcMintPrice(
  characterId,
  favCoinId,
  lockOptionId,
  lockAmount,
  freeAmount,
)).totalPrice
