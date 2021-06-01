import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Allocation from '../../components/allocation/allocation'
import BackButton from '../../components/button/back-button'
import IconCardPreview from '../../components/icon/cardpreview'
import ModalError from '../../components/modal/modal-error'
import NFTActions from '../../components/nft/actions'
import NFTCard from '../../components/nft/card'
import NFTPreview from '../../components/nft/preview'
import Pagination from '../../components/pagination/pagination'
import IconText from '../../components/text/icon-text'
import { backgrounds, skins } from '../../data/nft'
import { abi, deployedAddresses } from '../../data/smartContract'
import useContract from '../../hooks/useContract'
import useWallet from '../../hooks/useWallet'
import { fetchPercentages } from '../../lib/coingecko'
import { fetchNFT, getCharacter, getFavCoin } from '../../lib/nft'
import { QNFT } from '../../types/contracts'
import { NFT } from '../../types/nft'

export default function PageNFT(): JSX.Element {
  const router = useRouter()

  const { contract } = useContract<QNFT>(deployedAddresses.qnft, abi.qnft)
  const { account } = useWallet()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [nft, setNFT] = useState<NFT>()
  const [error, setError] = useState<Error>()
  const [changePercentage, setChangePercentage] = useState(0)
  const [ownerTokenIds, setOwnerTokenIds] = useState<BigNumber[]>()
  const [tokenIndex, setTokenIndex] = useState<number>() // index of the current token id in the ownerTokenIds array
  const [isPreview, setIsPreview] = useState(false)

  const tokenId = useMemo(() => {
    if (!router.isReady) return undefined
    if (!router.query.id) return undefined
    return BigNumber.from(router.query.id)
  }, [router])

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

  const fetchOwnerTokenIds = useCallback(
    async (qnft: QNFT, account: string) => {
      const count = await qnft.balanceOf(account)
      const tokenIds = await Promise.all(
        Array.from(Array(count.toNumber()).keys()).map(async (index) => {
          return qnft.tokenOfOwnerByIndex(account, index)
        }),
      )
      return tokenIds
    },
    [],
  )

  useEffect(() => {
    if (!contract) return
    if (!tokenId) return
    setLoading(true)
    fetchNFT(contract, tokenId)
      .then(setNFT)
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      setNFT(undefined)
      setLoading(false)
      setError(undefined)
    }
  }, [contract, tokenId])

  useEffect(() => {
    if (!nft) return
    fetchPercentages([nft])
      .then((x) => {
        const p = x.pop()
        if (!p) return
        setChangePercentage(p)
      })
      .catch(setError)
    return () => {
      setChangePercentage(0)
    }
  }, [nft])

  useEffect(() => {
    if (!contract) return
    if (!account) return
    fetchOwnerTokenIds(contract, account).then(setOwnerTokenIds).catch(setError)
    return () => {
      setOwnerTokenIds(undefined)
    }
  }, [contract, account, fetchOwnerTokenIds])

  useEffect(() => {
    if (!ownerTokenIds) return
    if (!tokenId) return
    const tokenIndex = ownerTokenIds.findIndex((x) => x.eq(tokenId))
    if (tokenIndex > -1) setTokenIndex(tokenIndex)
    return () => {
      setTokenIndex(undefined)
    }
  }, [ownerTokenIds, tokenId])

  function item(key: string, value: string) {
    return (
      <div className="text-sm leading-5 font-normal text-gray-500 mb-2">
        {key}: <span className="text-purple-900">{value}</span>
      </div>
    )
  }

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
            hasPrev={tokenIndex ? tokenIndex > 0 : false}
            hasNext={
              ownerTokenIds && tokenIndex !== undefined
                ? ownerTokenIds.length - 1 > tokenIndex
                : false
            }
            onPrev={() => {
              if (ownerTokenIds && tokenIndex !== undefined)
                void router.push(`/nfts/${ownerTokenIds[tokenIndex - 1]}`)
            }}
            onNext={() => {
              if (ownerTokenIds && tokenIndex !== undefined)
                void router.push(`/nfts/${ownerTokenIds[tokenIndex + 1]}`)
            }}
          />
        </div>

        {isLoading && <div>...loading</div>}
        {error && (
          <ModalError
            error={error}
            onRequestClose={() => setError(undefined)}
            onModalClose={() => setError(undefined)}
            isShown={true}
          />
        )}

        {nft && (
          <>
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 p-8 bg-white border border-purple-100 rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <NFTCard
                    className="cursor-pointer"
                    changePercentage={changePercentage}
                    nft={nft}
                    onClick={() => {
                      console.log('here')
                      setIsPreview(true)
                    }}
                    action={<IconCardPreview />}
                  />
                  <div>
                    <h1 className="text-2xl leading-8 font-bold text-purple-900 mb-8">
                      {nft.name}
                    </h1>
                    {item('Minter', nft.author)}
                    {item(
                      'Created',
                      new Date(
                        1000 * nft.createdAt.toNumber(),
                      ).toLocaleDateString(),
                    )}

                    <h3 className="text-base leading-6 font-medium text-purple-900 mt-8 mb-4">
                      Artists
                    </h3>

                    {item('Animal', getCharacter(nft.characterId).artist.name)}
                    {item('Background', backgrounds[nft.backgroundId].name)}

                    <h3 className="text-base leading-6 font-medium text-purple-900 mt-8 mb-4">
                      Design Properties
                    </h3>

                    <div className="flex flex-col space-y-4">
                      <div className="grid grid-cols-4 gap-8">
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

                    <h3 className="text-base leading-6 font-medium text-purple-900 mt-8 mb-4">
                      Description
                    </h3>

                    <p className="text-sm leading-5 font-normal text-purple-900">
                      {nft.description}
                    </p>
                  </div>
                </div>
              </div>
              <aside>
                <Allocation
                  lockAmount={nft.lockAmount}
                  createdAt={new Date(nft.createdAt.toNumber() * 1000)}
                  lockDuration={nft.lockDuration.toNumber()}
                />
                <NFTActions
                  className="mt-8"
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
              </aside>
            </div>
            <NFTPreview
              nft={nft}
              isShown={isPreview}
              onModalClose={() => {
                setIsPreview(false)
              }}
              onRequestClose={() => {
                setIsPreview(false)
              }}
            />
          </>
        )}
      </div>
    </>
  )
}
