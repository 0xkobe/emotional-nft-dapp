import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import LockedTokenStat from '../components/allocation/locked-token-stat'
import Button from '../components/button/button'
import IconCardView from '../components/icon/cardview'
import NFTCard from '../components/nft/card'
import Title from '../components/title/title'
import { favCoins } from '../data/favCoins'
import { abi, deployedAddresses } from '../data/smartContract'
import useUserNFTs from '../hooks/useUserNFTs'
import { NFT } from '../types/nft'

export default function Wallet(): JSX.Element {
  const {
    nfts,
    error: contractError,
    isLoading,
  } = useUserNFTs(deployedAddresses.qnft, abi.qnft)

  const [lockAmount, setLockAmount] = useState(BigNumber.from(0))
  const [pricechanges, setPricechanges] = useState<number[]>([])

  const fetchPriceChanges = useCallback(async (nfts: NFT[]) => {
    const data = []
    const coingeckoIds = []
    for (let i = 0; i < nfts.length; i++) {
      const favCoin = favCoins[nfts[i].favCoinId]
      if (favCoin.meta.coingeckoId) {
        coingeckoIds.push(favCoin.meta.coingeckoId)
      }
    }
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coingeckoIds.join(
        ',',
      )}&price_change_percentage=24h`,
    )
    const response = await res.json()
    if ('error' in response)
      throw new Error(`an error occurred while fetching coingecko pricefeed`)
    if (!res.ok)
      throw new Error(
        `an unknown error occurred while fetching coingecko pricefeed`,
      )
    for (let i = 0; i < nfts.length; i++) {
      const favCoin = favCoins[nfts[i].favCoinId]
      if (favCoin.meta.coingeckoId) {
        const favCoinData = response.find(
          (val: any) => val.id === favCoin.meta.coingeckoId,
        )
        data.push(favCoinData.price_change_percentage_24h || 0)
      } else {
        data.push(0)
      }
    }
    setPricechanges(data)
  }, [])

  useEffect(() => {
    if (isLoading || contractError || nfts.length === 0) return
    const sum = nfts.reduce(
      (sum, nft) => sum.add(nft.lockAmount),
      BigNumber.from(0),
    )
    setLockAmount(sum)
    void fetchPriceChanges(nfts)
  }, [contractError, fetchPriceChanges, isLoading, nfts])

  return (
    <>
      <Head>
        <title>Wallet</title>
      </Head>
      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="flex flex-row items-center justify-between">
          <Title>Your Investor Space</Title>
          <LockedTokenStat lockAmount={lockAmount} />
        </div>
        <div className="bg-white border border-purple-50 shadow p-8 rounded-2xl flex flex-col w-full space-y-8">
          <div className="flex flex-row items-center justify-between">
            <span className="text-base leading-6 font-bold text-gray-500">
              Your NFT's Collection
            </span>
            <div>
              <Button href="/mint">Mint new NFT</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {isLoading && <div>loading...</div>}
            {contractError && <div>{contractError.toString()}</div>}
            {!isLoading && nfts.length === 0 && <div>No NFTs</div>}
            {!isLoading &&
              nfts.map((nft, i) => (
                <Link key={i} href={`/nfts/${nft.tokenId}`}>
                  <a>
                    <NFTCard
                      key={i}
                      className="cursor-pointer"
                      changePercentage={pricechanges[i]}
                      nft={nft}
                      action={<IconCardView />}
                    />
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
