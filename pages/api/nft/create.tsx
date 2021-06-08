import { recoverTypedSignature_v4 } from 'eth-sig-util'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { payloadForSignatureEIP712v4 } from '../../../lib/signature'
import { supabase } from '../../../lib/supabase'
import { APINftCreateRequest, APINftCreateResponse } from '../../../types/api'
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
      timestamp,
    } = req.body as APINftCreateRequest

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
      ),
      sig: signature,
    })
    if (recovered.toLowerCase() !== creator.toLowerCase())
      throw new createHttpError.Forbidden('signature verification failed')

    // prepare metadata
    const createMetadata: CreateNFTOffChain = {
      author,
      backgroundId,
      description,
      name,
      chainId,
      creator: creator.toLowerCase(),
      defaultEmotion,
    }

    // check for spam
    const { error: spamError, count } = await supabase
      .from<NFTOffChain>('nft')
      .select('createdAt', { count: 'exact' })
      .eq('creator', createMetadata.creator)
      .gt('createdAt', new Date(Date.now() - 30 * 1000).toUTCString()) // 30sec in the past
    if (spamError) throw spamError
    if (count && count > 0) throw new createHttpError.TooManyRequests()

    // create data
    const { data: nft, error } = await supabase
      .from<NFTOffChain>('nft')
      .insert([createMetadata])
      .single()
    if (error) throw error
    if (!nft)
      throw new createHttpError.InternalServerError('could not create resource')

    // return response
    const response: APINftCreateResponse = { metaId: nft.id }
    res.status(201).json(response)
  } catch (error) {
    if (isHttpError(error))
      // return error in response if http error
      return res.status(error.status).json({ error: error.message })
    throw error // rethrow error otherwise
  }
}
