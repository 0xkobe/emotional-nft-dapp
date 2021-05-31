import { recoverTypedSignature_v4 } from 'eth-sig-util'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { payloadForSignatureEIP712v4 } from '../../../lib/signature'
import { supabase } from '../../../lib/supabase'
import { APINftCreateRequest, APINftCreateResponse } from '../../../types/api'
import { NFTOffChain } from '../../../types/nft'

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
    } = req.body as APINftCreateRequest

    const reqError = []
    if (!signature) reqError.push('signature is empty')
    if (!chainId) reqError.push('chainId is empty')
    if (!author) reqError.push('author is empty')
    if (!description) reqError.push('description is empty')
    if (!name) reqError.push('name is empty')
    if (!creator) reqError.push('creator is empty')
    if (!defaultEmotion) reqError.push('defaultEmotion is empty')
    if (!Number.isInteger(backgroundId))
      reqError.push('backgroundId is not set or not a number')

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
      ),
      sig: signature,
    })
    if (recovered.toLowerCase() !== creator.toLowerCase())
      throw new createHttpError.Forbidden('signature verification failed')

    const metadata: NFTOffChain = {
      author,
      backgroundId,
      description,
      name,
      chainId,
      creator: creator.toLowerCase(),
      defaultEmotion,
    }

    // create data
    const { data, error } = await supabase.from('nft').insert([metadata])
    if (error) throw error
    if (!data || data?.length === 0)
      throw new createHttpError.InternalServerError('could not create resource')
    const nft = data.pop()

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
