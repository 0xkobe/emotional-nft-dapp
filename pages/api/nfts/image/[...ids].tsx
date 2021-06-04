import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import createHttpError, { isHttpError } from 'http-errors'
import Jimp from 'jimp/es'
import { NextApiRequest, NextApiResponse } from 'next'
import { abi, deployedAddresses } from '../../../../data/smartContract'
import { fetchNFT, getBackground, getCharacter } from '../../../../lib/nft'
import { remoteProvider } from '../../../../lib/remote-provider'
import { QNFT } from '../../../../types/contracts'

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

    // load images
    const backgroundImg = await Jimp.read(
      process.env.DEPLOY_PRIME_URL + getBackground(nft.backgroundId).image,
    )
    const characterImg = await Jimp.read(
      process.env.DEPLOY_PRIME_URL + character.emotions.normal,
    )

    // merge the image
    const buffer = await backgroundImg
      .composite(characterImg, 0, 0)
      .getBufferAsync(Jimp.MIME_PNG)

    // return merged image
    res.setHeader('Content-Type', Jimp.MIME_JPEG)
    return res.send(buffer)
  } catch (error) {
    if (isHttpError(error))
      // return error in response if http error
      return res.status(error.status).json({ error: error.message })
    throw error // rethrow error otherwise
  }
}
