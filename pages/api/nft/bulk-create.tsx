import { Contract } from '@ethersproject/contracts'
import { recoverTypedSignature_v4 } from 'eth-sig-util'
import { providers as ethersProviders } from 'ethers'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { chain } from '../../../data/chains'
import { abi, deployedAddresses } from '../../../data/smartContract'
import { payloadForSignatureEIP712v4 } from '../../../lib/signature'
import { supabase } from '../../../lib/supabase'
import {
  APINftBulkCreateRequest,
  APINftBulkCreateResponse,
} from '../../../types/api'
import { QSettings } from '../../../types/contracts'
import { NFTOffChain } from '../../../types/nft'

const provider = new ethersProviders.StaticJsonRpcProvider(chain.remoteProvider)

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    // check body
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
    } = req.body as APINftBulkCreateRequest

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
        bulkMintNumber,
      ),
      sig: signature,
    })
    if (recovered.toLowerCase() !== creator.toLowerCase())
      throw new createHttpError.Forbidden('signature verification failed')

    const qSettings = new Contract(
      deployedAddresses.qSettings,
      abi.qSettings,
      provider,
    ) as QSettings
    const manager = await qSettings.getManager()

    if (recovered.toLowerCase() !== manager.toLowerCase())
      throw new createHttpError.Forbidden('sender must be manager')

    const metadatas: NFTOffChain[] = Array.from(
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
    const { data, error } = await supabase.from('nft').insert(metadatas)
    if (error) throw error
    if (!data || data?.length === 0)
      throw new createHttpError.InternalServerError('could not create resource')

    // return response
    const response: APINftBulkCreateResponse = {
      metaIds: data.map((x) => x.id),
    }
    res.status(201).json(response)
  } catch (error) {
    if (isHttpError(error))
      // return error in response if http error
      return res.status(error.status).json({ error: error.message })
    throw error // rethrow error otherwise
  }
}
