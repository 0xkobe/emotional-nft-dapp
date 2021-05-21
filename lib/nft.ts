import { BigNumber } from '@ethersproject/bignumber'
import {
  animals,
  backgrounds,
  characters,
  favCoins,
  lockOptions,
  skins,
} from '../data/nft'
import { APINftMetadataResponse } from '../types/api'
import { QNFT, QNFTSettings } from '../types/contracts'
import {
  Creature,
  HydratedMetadata,
  Metadata,
  MetadataOffChain,
  MetadataOnChain,
  Skin,
  Traits,
} from '../types/metadata'
import { Character } from '../types/nft'
import { RawMintPrices } from '../types/raw'
import { supabase } from './supabase'

export const attribute = (
  metadata: APINftMetadataResponse,
  trait: Traits,
): any => {
  const attr = metadata.attributes.find((x) => x.trait_type === trait)
  if (!attr) throw new Error(`Cannot find trait ${trait} in metadata`)
  return attr.value
}

export const getCreature = (
  animal: Creature,
  skin: Skin,
): Character | undefined => {
  const animalIndex = animals.findIndex((x) => x.name === animal)
  const skinIndex = skins.findIndex((x) => x === skin)
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
  const backgroundUrl = backgrounds[metadata.backgroundId]
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


// get mint price
export const getMintPrice = async (
  qnftSettingsContract: QNFTSettings,
  characterId: number,
  favCoinId: number,
  lockOptionId: number,
  lockAmount: number,
  freeAmount: number,
): Promise<RawMintPrices> => {
  const mintPrices = (await qnftSettingsContract.callStatic.calcMintPrice(
    characterId,
    favCoinId,
    lockOptionId,
    lockAmount,
    freeAmount,
  )) as RawMintPrices

  return mintPrices
}

// mint nft
export const mintNFT = async (
  qnft: QNFT,
  characterId: number,
  favCoinId: number,
  lockOptionId: number,
  lockAmount: BigNumber,
  metaId: BigNumber,
): Promise<void> => {
  await qnft.callStatic.mintNft(
    characterId,
    favCoinId,
    lockOptionId,
    lockAmount,
    metaId
  )
}

// mint nft for airdrop users
export const mintNFTForAirdropUser = async (
  qnft: QNFT,
  characterId: number,
  favCoinId: number,
  lockOptionId: number,
  lockAmount: BigNumber,
  metaId: BigNumber,
  airdropAmount: BigNumber,
  signature: string
): Promise<void> => {
  await qnft.callStatic.mintNftForAirdropUser(
    characterId,
    favCoinId,
    lockOptionId,
    lockAmount,
    metaId,
    airdropAmount,
    signature
  )
}
