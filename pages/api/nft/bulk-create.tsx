import { Contract } from '@ethersproject/contracts'
import { recoverTypedSignature_v4 } from 'eth-sig-util'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { abi, deployedAddresses } from '../../../data/smartContract'
import { remoteProvider } from '../../../lib/remote-provider'
import { payloadForSignatureEIP712v4 } from '../../../lib/signature'
import { supabase } from '../../../lib/supabase'
import {
  APINftBulkCreateRequest,
  APINftBulkCreateResponse,
} from '../../../types/api'
import { QSettings } from '../../../types/contracts'
import { CreateNFTOffChain, NFTOffChain } from '../../../types/nft'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const {
      author,
      backgroundId,
      description,
      name,
      creator,
      signature,
      chainId,
      defaultEmotion,
      bulkMintNumber,
      timestamp,
    } = req.body as APINftBulkCreateRequest

    // check body
    const reqError = []
    if (!signature) reqError.push('signature is empty')
    if (!chainId) reqError.push('chainId is empty')
    if (!author) reqError.push('author is empty')
    if (!description) reqError.push('description is empty')
    if (!name) reqError.push('name is empty')
    if (!creator) reqError.push('creator is empty')
    if (!defaultEmotion) reqError.push('defaultEmotion is empty')
    if (!Number.isInteger(backgroundId))
      reqError.push('backgroundId is not set or not a integer')
    if (!Number.isInteger(bulkMintNumber))
      reqError.push('bulkMintNumber is not set or not a integer')
    if (!Number.isInteger(timestamp))
      reqError.push('timestamp is not set or not a integer')
    if (Math.floor(Date.now() / 1000) > timestamp + 10 * 60)
      // timestamp is valid for 10min
      reqError.push('signature is expired')

    if (reqError.length > 0)
      throw new createHttpError.BadRequest(reqError.join(', '))

    // check signature
    const recovered = recoverTypedSignature_v4({
      data: payloadForSignatureEIP712v4(
        chainId,
        author,
        backgroundId,
        description,
        name,
        timestamp,
        bulkMintNumber,
      ),
      sig: signature,
    })
    if (recovered.toLowerCase() !== creator.toLowerCase())
      throw new createHttpError.Forbidden('signature verification failed')

    // check is manager
    const qSettings = new Contract(
      deployedAddresses.qSettings,
      abi.qSettings,
      remoteProvider,
    ) as QSettings
    const manager = await qSettings.getManager()
    if (recovered.toLowerCase() !== manager.toLowerCase())
      throw new createHttpError.Forbidden('sender must be manager')

    // prepare metadata
    const metadatas: CreateNFTOffChain[] = Array.from(
      Array(bulkMintNumber).keys(),
    ).map(() => ({
      author,
      backgroundId,
      description,
      name,
      chainId,
      creator: creator.toLowerCase(),
      defaultEmotion,
    }))

    // create data
    const { data: nfts, error } = await supabase
      .from<NFTOffChain>('nft')
      .insert(metadatas)
    if (error) throw error
    if (!nfts || nfts?.length === 0)
      throw new createHttpError.InternalServerError('could not create resource')

    // return response
    const response: APINftBulkCreateResponse = {
      metaIds: nfts.map((x) => x.id),
    }
    res.status(201).json(response)
  } catch (error) {
    if (isHttpError(error))
      // return error in response if http error
      return res.status(error.status).json({ error: error.message })
    throw error // rethrow error otherwise
  }
}
