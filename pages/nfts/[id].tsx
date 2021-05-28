import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Allocation from '../../components/allocation/allocation'
import BackButton from '../../components/button/back-button'
import NFTActions from '../../components/nft/actions'
import NFTCard from '../../components/nft/card'
import IconText from '../../components/text/icon-text'
import { backgrounds, skins } from '../../data/nft'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
} from '../../data/smartContract'
import useContract from '../../hooks/useContract'
import { fetchNFT, getCharacter, getFavCoin } from '../../lib/nft'
import { QNFT } from '../../types/contracts'
import { NFT } from '../../types/nft'

export default function (): JSX.Element {
  const router = useRouter()

  const { contract, error: contractError } = useContract<QNFT>(
    metamaskConnector,
    deployedAddresses.qnft,
    abi.qnft,
  )

  const [isLoading, setLoading] = useState<boolean>(false)
  const [nft, setNFT] = useState<NFT>()
  const [error, setError] = useState<Error>()
  const [tokenId, setTokenId] = useState<BigNumber>()
  const [changePercentage, setChangePercentage] = useState(0)
  const [coinInfo, setCoinInfo] = useState({ text: '', icon: '' })
  const [creatureInfo, setCreatureInfo] = useState({ text: '', icon: '' })
  const [skinInfo, setSkinInfo] = useState({ text: '', icon: '' })
  const [backgroundInfo, setBackgroundInfo] = useState({ text: '', icon: '' })

  const _fetchData = useCallback(async (contract: QNFT, tokenId: BigNumber) => {
    setLoading(true)
    try {
      // FIXME: put back logic to get the next and previous token of the owner
      // const userNFTCount = (
      //   await contract.callStatic.balanceOf(account)
      // ).toNumber()
      // setNFTCount(userNFTCount)
      // const tokenId = await contract.callStatic.tokenOfOwnerByIndex(
      //   account,
      //   id,
      // )
      const nft = await fetchNFT(contract, tokenId)
      setNFT(nft)

      // fetch coingecko
      const favCoin = getFavCoin(nft.favCoinId)
      setCoinInfo({
        text: favCoin.meta.name,
        icon: favCoin.meta.icon,
      })
      if (favCoin.meta.coingeckoId) {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favCoin.meta.coingeckoId}&price_change_percentage=24h`,
        )
        const response = await res.json()
        if ('error' in response)
          throw new Error(
            `an error occurred while fetching coingecko pricefeed`,
          )
        if (!res.ok)
          throw new Error(
            `an unknown error occurred while fetching coingecko pricefeed`,
          )
        setChangePercentage(response[0].price_change_percentage_24h || 0)
      } else {
        setChangePercentage(0)
      }
      const character = getCharacter(nft.characterId)
      const skin = skins.find((val) => val.skin == character.skin)
      if (skin) {
        setSkinInfo({
          text: skin.skin,
          icon: skin.icon,
        })
        setCreatureInfo({
          text: character.name,
          icon: character.emotions.normal,
        })
      }
      const background = backgrounds[nft.backgroundId]
      setBackgroundInfo({
        text: background.name,
        icon: background.image,
      })
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.id) return
    if (Array.isArray(router.query.id)) return
    setTokenId(BigNumber.from(router.query.id))
  }, [router])

  useEffect(() => {
    if (!contract) return
    if (!tokenId) return
    void _fetchData(contract, tokenId)
  }, [contract, _fetchData, tokenId, router])

  return (
    <>
      <Head>
        <title>NFT</title> {/* What do you think of adding nft name here? */}
      </Head>

      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="flex flex-row justify-between">
          <Link href="/wallet">
            <a>
              <BackButton text="Back to your space" />
            </a>
          </Link>
          {/* <Pagination // FIXME: to put back with system based on the nft id
            total={nftCount}
            current={id}
            onPrev={() => {
              if (id > 0) {
                void router.push(`/nfts/${id - 1}`)
              }
            }}
            onNext={() => {
              if (id < nftCount - 1) {
                void router.push(`/nfts/${id + 1}`)
              }
            }}
          /> */}
        </div>

        {isLoading && <div>...loading</div>}
        {contractError && <div>contract: {contractError.toString()}</div>}
        {error && <div>meta: {error.toString()}</div>}

        {nft && (
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row space-x-8">
              <NFTCard
                size="big"
                className="cursor-pointer hover:shadow"
                changePercentage={changePercentage}
                nft={nft}
              />
              <div className="flex flex-col w-96 space-y-8">
                <span className="text-2xl leading-8 font-bold text-gray-500">
                  {nft.name}
                </span>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm leading-5 font-normal text-gray-500">
                    {nft.author}
                  </span>
                  <span className="text-sm leading-5 font-normal text-gray-500">
                    {new Date(
                      1000 * nft.createdAt.toNumber(),
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-base leading-6 font-medium text-gray-500">
                    Artists
                  </span>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm leading-5 font-normal text-gray-500">
                      Animal: {getCharacter(nft.characterId).creature}
                    </span>
                    <span className="text-sm leading-5 font-normal text-gray-500">
                      Background: {backgrounds[nft.backgroundId].name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-base leading-6 font-medium text-gray-500">
                    Design Properties
                  </span>
                  <div className="grid grid-cols-4 gap-4">
                    <IconText text={coinInfo.text} icon={coinInfo.icon} />
                    <IconText
                      text={creatureInfo.text}
                      icon={creatureInfo.icon}
                    />
                    <IconText text={skinInfo.text} icon={skinInfo.icon} />
                    <IconText
                      text={backgroundInfo.text}
                      icon={backgroundInfo.icon}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-base leading-6 font-medium text-gray-500">
                    Description
                  </span>
                  <span className="text-sm leading-5 font-normal text-gray-500 overflow-ellipsis overflow-hidden">
                    {nft.description}
                  </span>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-base leading-6 font-medium text-gray-500">
                    Token Allocated
                  </span>
                  <Allocation
                    lockAmount={nft.lockAmount}
                    createdAt={new Date(nft.createdAt.toNumber() * 1000)}
                    lockDuration={nft.lockDuration.toNumber()}
                  />
                </div>
              </div>
            </div>
            <NFTActions
              onTransfer={() => {
                console.log('transfer')
              }}
              onEdit={() => {
                console.log('edit')
              }}
              onUpgrade={() => {
                console.log('upgrade')
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
