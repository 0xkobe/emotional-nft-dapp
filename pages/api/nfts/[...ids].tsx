// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { Contract } from '@ethersproject/contracts'
// import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../supabase'

// import {
//   abi,
//   deployedAddresses,
//   remoteProviderConfig,
// } from '../../../data/smartContract'
// import { ERC721 } from '../../../types/ERC721'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // parse request
  if (!Array.isArray(req.query.ids)) return res.status(404).json({})
  const [tokenId, metaId] = req.query.ids
  if (tokenId === undefined) return res.status(404).json({})
  if (metaId === undefined) return res.status(404).json({})

  // init ethereum provider
  // FIXME: to put back
  // const provider = new StaticJsonRpcProvider({
  //   allowGzip: true,
  //   url: remoteProviderConfig.urls[remoteProviderConfig.defaultChainId],
  // })

  // // init smart contract
  // FIXME: to put back
  // const contract = new Contract(
  //   deployedAddresses[remoteProviderConfig.defaultChainId],
  //   abi.erc721,
  //   provider,
  // ) as ERC721

  // // fetch info on-chain
  // FIXME: to put back
  // const ownerOf = await contract.ownerOf(tokenId)
  const ownerOf = '0x0'

  // fetch info off-chain from database
  const { data, error } = await supabase
    .from('nft')
    .select('*')
    .eq('id', metaId)
  if (error) throw error
  if (!data || data?.length === 0)
    return res.status(404).json({ error: 'meta not found' })
  const nft = data.pop()

  // return response
  res.status(200).json({ tokenId, metaId, ownerOf, nft })
}
