import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { favCoins } from '../data/nft'
import { Traits } from '../types/metadata'
import LockedTokenStat from '../components/allocation/locked-token-stat'
import Button from '../components/button/button'
import Title from '../components/title/title'
import NFTCard from '../components/nft/card'
import { BigNumber } from '@ethersproject/bignumber'
import { abi, deployedAddresses, metamaskConnector } from '../data/smartContract'
import useUserNFTs from '../hooks/useUserNFTs'
import Link from 'next/link'
import { attribute } from '../lib/nft'

export default function Wallet(): JSX.Element {
  const {
    nfts,
    error: contractError,
    isLoading,
  } = useUserNFTs(metamaskConnector, deployedAddresses.qnft, abi.qnft)

  const [lockAmount, setLockAmount] = useState(BigNumber.from(0))

  useEffect(() => {
    if (isLoading || contractError || nfts.length === 0) return
    const sum = BigNumber.from(0)
    nfts.forEach(nft => {
      const nftLockAmount = attribute(nft.metadata, Traits.LockAmount) as string
      sum.add(BigNumber.from(nftLockAmount))
    })
    setLockAmount(sum)
  }, [contractError, isLoading, nfts])

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
        <div className="flex flex-col w-full space-y-8">
          <div className="flex flex-row items-center justify-between">
            <span className="text-base leading-6 font-bold text-gray-500">
              Your NFT's Collection
            </span>
            <Button href="/mint">
              Mint new NFT
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {isLoading && <div>loading...</div>}
            {contractError && <div>{contractError.toString()}</div>}
            {!isLoading && nfts.length === 0 && <div>No NFTs</div>}
            {!isLoading && nfts.map(nft => (
              <Link href={`/nfts/${nft.id}`}>
                <a>
                  <NFTCard
                    key={nft.id}
                    className="cursor-pointer hover:shadow"
                    changePercentage={-20}
                    favcoin={favCoins[attribute(nft.metadata, Traits.FavCoin) as number]}
                    metadata={nft.metadata}
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
