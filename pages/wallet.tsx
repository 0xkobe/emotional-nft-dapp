import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LockedTokenStat from '../components/allocation/locked-token-stat'
import Button from '../components/button/button'
import IconCardView from '../components/icon/cardview'
import Loader from '../components/loader/loader'
import ModalError from '../components/modal/modal-error'
import NFTCard from '../components/nft/card'
import Title from '../components/title/title'
import { abi, deployedAddresses } from '../data/smartContract'
import useUserNFTs from '../hooks/useUserNFTs'
import { fetchPercentages } from '../lib/coingecko'

export default function Wallet(): JSX.Element {
  const { nfts, error, isLoading } = useUserNFTs(
    deployedAddresses.qnft,
    abi.qnft,
  )

  const [lockAmount, setLockAmount] = useState<BigNumber>()
  const [priceChanges, setPriceChanges] = useState<number[]>([])

  useEffect(() => {
    if (isLoading || error || nfts.length === 0) return
    const sum = nfts.reduce(
      (sum, nft) => sum.add(nft.lockAmount),
      BigNumber.from(0),
    )
    setLockAmount(sum)
  }, [error, isLoading, nfts])

  useEffect(() => {
    if (isLoading || error || nfts.length === 0) return
    fetchPercentages(nfts).then(setPriceChanges).catch(console.error)
  }, [error, isLoading, nfts])

  return (
    <>
      {error && (
        <ModalError
          error={error}
          onRequestClose={() => window.location.reload()}
          onModalClose={() => {}}
          isShown={true}
        />
      )}

      <Head>
        <title>Wallet</title>
      </Head>
      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="flex flex-row items-center justify-between">
          <Title>Your Investor Space</Title>
          <LockedTokenStat lockAmount={lockAmount} />
        </div>
        <div className="bg-white border border-purple-100 shadow-sm p-8 rounded-2xl flex flex-col w-full space-y-8">
          <div className="flex flex-row items-center justify-between">
            <span className="text-base leading-6 font-bold text-purple-900">
              Your NFT's Collection
            </span>
            <div>
              <Button link href="/mint">
                Mint new NFT
              </Button>
            </div>
          </div>

          {isLoading && <Loader />}

          {!isLoading && nfts.length === 0 && <div>No NFTs</div>}

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {nfts.map((nft, i) => (
              <Link key={i} href={`/nfts/${nft.tokenId}`}>
                <a>
                  <NFTCard
                    key={i}
                    className="cursor-pointer"
                    changePercentage={priceChanges[i]}
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
