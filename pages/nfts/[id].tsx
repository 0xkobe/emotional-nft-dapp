import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { FavCoin } from '../../types/nft'

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
  const [changePercentage, setChangePercentage] = useState(0)

  const id = useMemo(() => {
    if (!router.isReady) return -1
    if (!router.query.id) return -1
    return parseInt(router.query.id as string, 10)
  }, [router])

  const favCoin = useMemo(() => {
    if (!metadata) return null
    return favCoins[attribute(metadata, Traits.FavCoin) as number]
  }, [metadata])

  const skin = useMemo(() => {
    if (!metadata) return null
    return skins.find(
      (val) => val.skin == (attribute(metadata, Traits.Skin) as Skin),
    )
  }, [metadata])

  const creature = useMemo(() => {
    if (!metadata) return null
    if (!skin) return null
    return characters.find(
      (character) =>
        character.creature ===
          (attribute(metadata, Traits.Creature) as Creature) &&
        character.skin === skin.skin,
    )
  }, [metadata, skin])

  const background = useMemo(() => {
    if (!metadata) return null
    return backgrounds[attribute(metadata, Traits.Background) as number]
  }, [metadata])

  const fetchMetadata = useCallback(
    async (contract: QNFT, account: string, id: number) => {
      const tokenId = await contract.callStatic.tokenOfOwnerByIndex(account, id)
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
      return response
    },
    [],
  )

  const fetchPercentage = useCallback(async (favCoin: FavCoin) => {
    if (!favCoin) return 0
    if (!favCoin.meta.coingeckoId) return 0
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${favCoin.meta.coingeckoId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
    )
    const response = await res.json()
    if ('error' in response)
      throw new Error(`an error occurred while fetching coingecko pricefeed`)
    if (!res.ok)
      throw new Error(
        `an unknown error occurred while fetching coingecko pricefeed`,
      )
    return response.market_data.price_change_percentage_24h || 0
  }, [])

  useEffect(() => {
    if (!contract) return
    if (!account) return
    if (id < 0) return
    setLoading(true)
    console.log('fetch  metadata', id)
    fetchMetadata(contract, account, id)
      .then(setMetadata)
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      setMetadata(undefined)
      setLoading(false)
      setError(undefined)
    }
  }, [account, /* contract, */ fetchMetadata, id]) // TODO: Add contract when the contract is not refreshed at every changes

  useEffect(() => {
    if (!favCoin) return
    fetchPercentage(favCoin).then(setChangePercentage)
    return () => {
      setChangePercentage(0)
    }
  }, [favCoin, fetchPercentage])

  useEffect(() => {
    if (!contract) return
    if (!account) return
    contract.callStatic
      .balanceOf(account)
      .then((x) => x.toNumber())
      .then(setNFTCount)
      .catch(setError)
    return () => {
      setNFTCount(0)
    }
  }, [contract, account])

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
                      Background: {background && background.name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-base leading-6 font-medium text-gray-500">
                    Design Properties
                  </span>
                  <div className="grid grid-cols-4 gap-4">
                    {favCoin && (
                      <IconText
                        text={favCoin.meta.name}
                        icon={favCoin.meta.icon}
                      />
                    )}
                    {creature && (
                      <IconText
                        text={creature.name}
                        icon={creature.emotions.normal}
                      />
                    )}
                    {skin && <IconText text={skin.skin} icon={skin.icon} />}
                    {background && (
                      <IconText
                        text={background.name}
                        icon={background.image}
                      />
                    )}
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
