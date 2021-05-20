import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../supabase'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // check body
  const { id, author, backgroundId, description, name, owner } = req.body

  // TODO: add signature to improve check on owner
  // TODO: fetch owner from on-chain

  const reqError = []

  if (id === undefined || id === null) reqError.push('id not set')
  if (!owner) reqError.push('owner not set')

  if (reqError.length > 0)
    return res.status(400).json({ error: reqError.join(', ') })

  const toUpdate: any = {}
  //   author,
  //   backgroundId,
  //   description,
  //   name,
  //   owner,

  if (author) toUpdate.author = author
  if (description) toUpdate.description = description
  if (name) toUpdate.name = name
  if (Number.isInteger(backgroundId)) toUpdate.backgroundId = backgroundId

  // create data
  const { data, error } = await supabase
    .from('nft')
    .update(toUpdate)
    .match({ id, owner })
  if (error) throw error
  if (!data || data?.length === 0) throw new Error('could not update resource')
  const nft = data.pop()

  // return response
  res.status(201).json({ metaId: nft.id })
}
