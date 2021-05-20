import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../supabase'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // check body
  const { author, backgroundId, description, name, owner } = req.body

  // TODO: add signature and remove owner
  // could even not require any signature or owner and verify more info during update. it would requires to token to be minted in order to be edited.

  const reqError = []
  if (!author) reqError.push('author is empty')
  if (!description) reqError.push('description is empty')
  if (!name) reqError.push('name is empty')
  if (!owner) reqError.push('owner is empty') // TODO: make sure it's an ETH address
  if (!Number.isInteger(backgroundId))
    reqError.push('backgroundId is not set or not a number')

  if (reqError.length > 0)
    return res.status(400).json({ error: reqError.join(', ') })

  // create data
  const { data, error } = await supabase.from('nft').insert([
    {
      author,
      backgroundId,
      description,
      name,
      owner,
    },
  ])
  if (error) throw error
  if (!data || data?.length === 0) throw new Error('could not create resource')
  const nft = data.pop()

  // return response
  res.status(201).json({ metaId: nft.id })
}
