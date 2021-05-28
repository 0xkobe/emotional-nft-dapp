import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { FavCoin, NFT } from '../../types/nft'

export default function (): JSX.Element {
  const router = useRouter()

  const {
    contract,
    error: contractError,
    account, // TODO: this is wrong. useContract should not return the account. useWallet
  } = useContract<QNFT>(metamaskConnector, deployedAddresses.qnft, abi.qnft)

  const [isLoading, setLoading] = useState<boolean>(false)
  const [nft, setNFT] = useState<NFT>()
  const [error, setError] = useState<Error>()
  const [nftCount, setNFTCount] = useState<number>(0)
  const [changePercentage, setChangePercentage] = useState(0)

  const tokenId = useMemo(() => {
    if (!router.isReady) return undefined
    if (!router.query.id) return undefined
    return BigNumber.from(router.query.id)
  }, [router])

  // FIXME: maybe useful
  // const tokenId = await contract.callStatic.tokenOfOwnerByIndex(account, id)

  const favCoin = useMemo(() => {
    if (!nft) return null
    return getFavCoin(nft.favCoinId)
  }, [nft])

  const skin = useMemo(() => {
    if (!nft) return null
    const character = getCharacter(nft.characterId)
    return skins.find((val) => val.skin === character.skin)
  }, [nft])

  const character = useMemo(() => {
    if (!nft) return null
    return getCharacter(nft.characterId)
  }, [nft])

  const background = useMemo(() => {
    if (!nft) return null
    return backgrounds[nft.backgroundId]
  }, [nft])

  // const _fetchData = useCallback(
  //   async (contract: QNFT, account: string, tokenId: BigNumber) => {
  //     setLoading(true)
  //     try {
  //       // FIXME: put back logic to get the next and previous token of the owner
  //       // const userNFTCount = (
  //       //   await contract.callStatic.balanceOf(account)
  //       // ).toNumber()
  //       // setNFTCount(userNFTCount)
  //       // const tokenId = await contract.callStatic.tokenOfOwnerByIndex(
  //       //   account,
  //       //   id,
  //       // )
  //       const nft = await fetchNFT(contract, tokenId)
  //       setNFT(nft)
  //     } catch (e) {
  //       setError(e)
  //     } finally {
  //       setLoading(false)
  //     }
  //   },
  //   [],
  // )

  const fetchPercentage = useCallback(async (favCoin: FavCoin) => {
    if (!favCoin) return 0
    if (!favCoin.meta.coingeckoId) return 0
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favCoin.meta.coingeckoId}&price_change_percentage=24h`,
    )
    const response = await res.json()
    if ('error' in response)
      throw new Error(`an error occurred while fetching coingecko pricefeed`)
    if (!res.ok)
      throw new Error(
        `an unknown error occurred while fetching coingecko pricefeed`,
      )
    return response[0].price_change_percentage_24h || 0
  }, [])

  useEffect(() => {
    if (!contract) return
    if (!account) return
    if (!tokenId) return
    setLoading(true)
    console.log('fetch  nft data', tokenId)
    fetchNFT(contract, tokenId)
      .then(setNFT)
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      setNFT(undefined)
      setLoading(false)
      setError(undefined)
    }
  }, [account, /* contract, */ tokenId]) // TODO: Add contract when the contract is not refreshed at every changes

  useEffect(() => {
    if (!favCoin) return
    fetchPercentage(favCoin).then(setChangePercentage).catch(setError)
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
                    {character && (
                      <IconText
                        text={character.name}
                        icon={character.emotions.normal}
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
