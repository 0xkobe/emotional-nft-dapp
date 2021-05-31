import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { chain } from '../../../data/chains'
import { abi, deployedAddresses } from '../../../data/smartContract'
import { fetchNFT, getCharacter } from '../../../lib/nft'
import { APINftMetadataResponse, DisplayType, Traits } from '../../../types/api'
import { QNFT } from '../../../types/contracts'

// init ethereum provider
const provider = new StaticJsonRpcProvider({
  allowGzip: true,
  url: chain.remoteProvider,
})

// // init smart contract
const qnft = new Contract(deployedAddresses.qnft, abi.qnft, provider) as QNFT

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    // parse request
    const ids = req.query.ids
    if (!Array.isArray(ids) || ids.length === 0)
      throw new createHttpError.BadRequest(
        'ids is not an array or has zero length',
      )
    const tokenId = BigNumber.from(ids[0])

    // fetch nft
    const nft = await fetchNFT(qnft, tokenId)
    const character = getCharacter(nft.characterId)

    const response: APINftMetadataResponse = {
      author: nft.author,
      description: nft.description,
      external_url: 'https://openseacreatures.io/' + tokenId, // TODO: replace URL
      image: character.emotions.normal, // TODO: load from default emotion??
      name: nft.name,
      // background_color // TODO: could be nice to implement using nft.backgroundId
      attributes: [
        {
          trait_type: Traits.Creature,
          value: character.creature,
        },
        {
          trait_type: Traits.Skin,
          value: character.skin,
        },
        {
          trait_type: Traits.Background,
          value: nft.backgroundId,
        },
        {
          trait_type: Traits.FavCoin,
          value: nft.favCoinId,
        },
        {
          trait_type: Traits.UnlockTime,
          value: nft.unlockTime,
        },
        {
          trait_type: Traits.LockAmount,
          value: nft.lockAmount.toString(),
        },
        {
          trait_type: Traits.CreatorName,
          value: nft.author,
        },
        {
          trait_type: Traits.CreatorWallet,
          value: nft.creator,
        },
        {
          trait_type: Traits.Withdrawn,
          value: nft.withdrawn,
        },
        {
          trait_type: Traits.DefaultEmotion,
          value: nft.defaultEmotion,
        },
      ],
    }

    // return response
    return res.status(200).json(response)
  } catch (error) {
    if (isHttpError(error))
      // return error in response if http error
      return res.status(error.status).json({ error: error.message })
    throw error // rethrow error otherwise
  }
}
