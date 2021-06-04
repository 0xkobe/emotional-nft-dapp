import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { abi, deployedAddresses } from '../../../data/smartContract'
import {
  fetchNFT,
  getBackground,
  getCharacter,
  getFavCoin,
} from '../../../lib/nft'
import { remoteProvider } from '../../../lib/remote-provider'
import { APINftMetadataResponse, DisplayType } from '../../../types/api'
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
          trait_type: 'Creature',
          value: character.creature,
        },
        {
          trait_type: 'Skin',
          value: character.skin,
        },
        {
          trait_type: 'Background',
          value: getBackground(nft.backgroundId).name,
        },
        {
          trait_type: 'Favorite Coin',
          value: getFavCoin(nft.favCoinId).meta.name,
        },
        {
          display_type: DisplayType.Date,
          trait_type: 'Unlock Date',
          value: nft.unlockTime,
        },
        {
          trait_type: 'Locked Amount',
          value: formatUnits(nft.lockAmount) + ' QSTK',
        },
        {
          trait_type: "Minter's Name",
          value: nft.author,
        },
        {
          trait_type: "Minter's Wallet",
          value: nft.creator,
        },
        {
          trait_type: 'Withdrawn',
          value: nft.withdrawn.valueOf(),
        },
        {
          trait_type: 'Default Emotion',
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
