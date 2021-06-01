import { NFT } from '../types/nft'
import { getFavCoin } from './nft'

export const fetchPercentages = async (nfts: NFT[]): Promise<number[]> => {
  const coingeckoIds = nfts
    .map((nft) => getFavCoin(nft.favCoinId).meta.coingeckoId)
    .filter((x) => x) as string[] // have to force ts type even with filter

  if (coingeckoIds.length === 0) return []

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=24h&ids=${coingeckoIds.join(
      ',',
    )}`,
  )
  const body = await res.json().catch(console.error)
  if ('error' in body)
    throw new Error(`an error occurred while fetching coingecko price feed`)
  if (!res.ok)
    throw new Error(
      `an unknown error occurred while fetching coingecko price feed`,
    )

  return nfts.map((nft) => {
    const coingeckoId = getFavCoin(nft.favCoinId).meta.coingeckoId
    if (!coingeckoId) return 0
    const match = body.find((val: any) => val.id === coingeckoId)
    return match.price_change_percentage_24h || 0
  })
}
