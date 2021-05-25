import { Contract } from '@ethersproject/contracts'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  abi,
  deployedAddresses,
  remoteProviderConfig,
} from '../../../data/smartContract'
import { fetchMetadata, hydrateMetadata } from '../../../lib/nft'
import { APINftMetadataResponse } from '../../../types/api'
import { QNFT } from '../../../types/contracts'
import { DisplayType, Traits } from '../../../types/metadata'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // parse request
  const ids = req.query.ids
  if (!Array.isArray(ids) || ids.length === 0)
    throw new Error('ids is not an array or has zero length')
  const tokenId = parseInt(ids[0])
  if (Number.isNaN(tokenId)) throw new Error('tokenId is not a number')

  // init ethereum provider
  const provider = new StaticJsonRpcProvider({
    allowGzip: true,
    url: remoteProviderConfig.urls[remoteProviderConfig.defaultChainId],
  })

  // // init smart contract
  const qnft = new Contract(
    deployedAddresses.qnft[remoteProviderConfig.defaultChainId],
    abi.qnft,
    provider,
  ) as QNFT

  // fetch metadata
  const metadata = hydrateMetadata(await fetchMetadata(qnft, tokenId))

  const response: APINftMetadataResponse = {
    description: metadata.description,
    external_url: 'https://openseacreatures.io/' + tokenId, // TODO: replace URL
    image: metadata.character.emotions.normal, // TODO: load from default emotion??
    name: metadata.name,
    // background_color // TODO: could be nice to implement using metadata.backgroundId
    attributes: [
      {
        trait_type: Traits.Creature,
        value: metadata.character.creature,
      },
      {
        trait_type: Traits.Skin,
        value: metadata.character.skin,
      },
      {
        trait_type: Traits.Background,
        value: metadata.backgroundId,
      },
      {
        trait_type: Traits.FavCoin,
        value: metadata.favCoinId,
      },
      {
        trait_type: Traits.LockPeriod,
        value: metadata.lockDuration.toNumber(),
      },
      {
        trait_type: Traits.LockAmount,
        value: metadata.lockAmount,
      },
      {
        trait_type: Traits.CreatorName,
        value: metadata.author,
      },
      {
        trait_type: Traits.CreatorWallet,
        value: metadata.creator,
      },
      {
        display_type: DisplayType.Date,
        trait_type: Traits.CreatedDate,
        value: metadata.createdAt.toNumber(),
      },
      {
        trait_type: Traits.Withdrawn,
        value: metadata.withdrawn,
      },
      {
        trait_type: Traits.DefaultEmotion,
        value: metadata.defaultEmotion,
      },
    ],
  }

  // return response
  res.status(200).json(response)
}
