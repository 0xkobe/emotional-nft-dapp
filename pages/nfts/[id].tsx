import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Allocation from '../../components/allocation/allocation'
import BackButton from '../../components/button/back-button'
import NFTActions from '../../components/nft/actions'
import NFTCard from '../../components/nft/card'
import Pagination from '../../components/pagination/pagination'
import IconText from '../../components/text/icon-text'
import { favCoins } from '../../data/favCoins'
import {
  backgrounds,
  characters,
  nftAPIURL,
  nftBaseURL,
  skins,
} from '../../data/nft'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
} from '../../data/smartContract'
import useContract from '../../hooks/useContract'
import { attribute } from '../../lib/nft'
import { APINftMetadataResponse, APIResponseError } from '../../types/api'
import { QNFT } from '../../types/contracts'
import { Creature, Skin, Traits } from '../../types/metadata'

export default function NFT(): JSX.Element {
  const router = useRouter()

  const {
    contract,
    error: contractError,
    account,
  } = useContract<QNFT>(metamaskConnector, deployedAddresses.qnft, abi.qnft)

  const [isLoading, setLoading] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<APINftMetadataResponse>()
  const [error, setError] = useState<Error>()
  const [nftCount, setNFTCount] = useState<number>(0)
  const [id, setId] = useState<number>(-1)
  const [changePercentage, setChangePercentage] = useState(0)
  const [coinInfo, setCoinInfo] = useState({ text: '', icon: '' })
  const [creatureInfo, setCreatureInfo] = useState({ text: '', icon: '' })
  const [skinInfo, setSkinInfo] = useState({ text: '', icon: '' })
  const [backgroundInfo, setBackgroundInfo] = useState({ text: '', icon: '' })

  const fetchMetadata = useCallback(
    async (contract: QNFT, account: string, id: number) => {
      setLoading(true)
      try {
        const userNFTCount = (
          await contract.callStatic.balanceOf(account)
        ).toNumber()
        setNFTCount(userNFTCount)
        const tokenId = await contract.callStatic.tokenOfOwnerByIndex(
          account,
          id,
        )
        const tokenURI = await contract.tokenURI(tokenId)
        const newTokenURI = nftAPIURL
          ? tokenURI.replace(nftBaseURL, nftAPIURL)
          : tokenURI
        const res = await fetch(newTokenURI)
        const response: APINftMetadataResponse | APIResponseError =
          await res.json()
        if ('error' in response)
          throw new Error(`an error occurred while fetching metadata`)
        if (!res.ok)
          throw new Error(`an unknown error occurred while fetching metadata`)
        setMetadata(response)
        const favCoin = favCoins[attribute(response, Traits.FavCoin) as number]
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
        const skin = skins.find(
          (val) => val.skin == (attribute(response, Traits.Skin) as Skin),
        )
        if (skin) {
          setSkinInfo({
            text: skin.skin,
            icon: skin.icon,
          })
          const character = characters.find(
            (character) =>
              character.creature ===
                (attribute(response, Traits.Creature) as Creature) &&
              character.skin === skin.skin,
          )
          if (character) {
            setCreatureInfo({
              text: character.name,
              icon: character.emotions.normal,
            })
          }
        }
        const background =
          backgrounds[attribute(response, Traits.Background) as number]
        setBackgroundInfo({
          text: background.name,
          icon: background.image,
        })
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.id) return
    setId(parseInt(router.query.id as string, 10))
  }, [router])

  useEffect(() => {
    if (!contract) return
    if (!account) return
    if (id < 0) return
    void fetchMetadata(contract, account, id)
  }, [account, contract, fetchMetadata, id, router])

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
          <Pagination
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
          />
        </div>

        {isLoading && <div>...loading</div>}
        {contractError && <div>contract: {contractError.toString()}</div>}
        {error && <div>meta: {error.toString()}</div>}

        {metadata && (
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row space-x-8">
              <NFTCard
                size="big"
                className="cursor-pointer hover:shadow"
                changePercentage={changePercentage}
                metadata={metadata}
              />
              <div className="flex flex-col w-96 space-y-8">
                <span className="text-2xl leading-8 font-bold text-gray-500">
                  {metadata.name}
                </span>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm leading-5 font-normal text-gray-500">
                    {metadata.author}
                  </span>
                  <span className="text-sm leading-5 font-normal text-gray-500">
                    {new Date(
                      1000 *
                        (attribute(metadata, Traits.CreatedDate) as number),
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-base leading-6 font-medium text-gray-500">
                    Artists
                  </span>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm leading-5 font-normal text-gray-500">
                      Animal: {attribute(metadata, Traits.Creature)}
                    </span>
                    <span className="text-sm leading-5 font-normal text-gray-500">
                      Background:{' '}
                      {
                        backgrounds[
                          attribute(metadata, Traits.Background) as number
                        ].name
                      }
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
                    {metadata.description}
                  </span>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-base leading-6 font-medium text-gray-500">
                    Token Allocated
                  </span>
                  <Allocation
                    lockAmount={BigNumber.from(
                      attribute(metadata, Traits.LockAmount) as string,
                    )}
                    createdAt={
                      new Date(
                        (attribute(metadata, Traits.CreatedDate) as number) *
                          1000,
                      )
                    }
                    lockDuration={
                      attribute(metadata, Traits.LockPeriod) as number
                    }
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
