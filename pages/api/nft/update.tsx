import { Contract } from '@ethersproject/contracts'
import { recoverTypedSignature_v4 } from 'eth-sig-util'
import createHttpError, { isHttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { abi, deployedAddresses } from '../../../data/smartContract'
import { remoteProvider } from '../../../lib/remote-provider'
import { payloadForSignatureEIP712v4 } from '../../../lib/signature'
import { supabase } from '../../../lib/supabase'
import { APINftUpdateRequest } from '../../../types/api'
import { QNFT } from '../../../types/contracts'
import { NFTOffChain, UpdateNFTOffChain } from '../../../types/nft'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const {
      metaId,
      tokenId,
      author,
      backgroundId,
      description,
      name,
      signer,
      signature,
      chainId,
      defaultEmotion,
      timestamp,
    } = req.body as APINftUpdateRequest

    // check body
    const reqError = []
    if (!metaId) reqError.push('metaId is empty')
    if (!tokenId) reqError.push('tokenId is empty')
    if (!signature) reqError.push('signature is empty')
    if (!chainId) reqError.push('chainId is empty')
    if (!author) reqError.push('author is empty')
    if (!description) reqError.push('description is empty')
    if (!name) reqError.push('name is empty')
    if (!signer) reqError.push('signer is empty')
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
      data: payloadForSignatureEIP712v4({
        chainId,
        author,
        backgroundId,
        description,
        name,
        timestamp,
        tokenId,
        metaId,
      }),
      sig: signature,
    })
    if (recovered.toLowerCase() !== signer.toLowerCase())
      throw new createHttpError.Forbidden('signature verification failed')

    // fetch NFT data on chain
    const qnftContract = new Contract(
      deployedAddresses.qnft,
      abi.qnft,
      remoteProvider,
    ) as QNFT
    const [owner, nftOnChain] = await Promise.all([
      qnftContract.ownerOf(tokenId),
      qnftContract.nftData(tokenId),
    ])

    // check NFT's owner matches
    if (recovered.toLowerCase() !== owner.toLowerCase())
      throw new createHttpError.Forbidden('signer must be owner of NFT')

    // check NFT's metaId matches
    if (nftOnChain.metaId !== metaId)
      throw new createHttpError.Forbidden(
        'metaId provided is not the same as on chain metaId',
      )

    // prepare metadata
    const updateMetadata: UpdateNFTOffChain = {
      author,
      backgroundId,
      description,
      name,
      chainId,
      creator: signer.toLowerCase(),
      defaultEmotion,
    }

    // check for spam
    const { error: spamError, count } = await supabase
      .from<NFTOffChain>('nft')
      .select('updatedAt', { count: 'exact' })
      .eq('id', metaId)
      .gt('updatedAt', new Date(Date.now() - 30 * 1000).toUTCString()) // 30sec in the past
    if (spamError) throw spamError
    if (count && count > 0) throw new createHttpError.TooManyRequests()

    // update data
    const { error } = await supabase
      .from<NFTOffChain>('nft')
      .update(updateMetadata)
      .eq('id', metaId)
    if (error) throw error

    // return response
    res.status(200).json({})
  } catch (error) {
    if (isHttpError(error))
      // return error in response if http error
      return res.status(error.status).json({ error: error.message })
    throw error // rethrow error otherwise
  }
}
