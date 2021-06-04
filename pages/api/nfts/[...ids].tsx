import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { abi, deployedAddresses } from '../../../data/smartContract'
import { fetchNFT, getCharacter } from '../../../lib/nft'
import { remoteProvider } from '../../../lib/remote-provider'
import { APINftMetadataResponse, DisplayType, Traits } from '../../../types/api'
import { QNFT } from '../../../types/contracts'

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
    // // init smart contract
    const qnft = new Contract(
      deployedAddresses.qnft,
      abi.qnft,
      remoteProvider,
    ) as QNFT
    const nft = await fetchNFT(qnft, tokenId)
    const character = getCharacter(nft.characterId)

    const response: APINftMetadataResponse = {
      author: nft.author,
      description: nft.description,
      external_url: process.env.DEPLOY_PRIME_URL + '/nfts/' + tokenId,
      image: process.env.DEPLOY_PRIME_URL + character.emotions.normal,
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
          display_type: DisplayType.Date,
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
