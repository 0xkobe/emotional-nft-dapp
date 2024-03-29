import { BigNumber } from '@ethersproject/bignumber'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  ArrowsExpandIcon,
  PencilIcon,
} from '@heroicons/react/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Allocation from '../../../components/allocation/allocation'
import SecondaryButton from '../../../components/button/secondary-button'
import Loader from '../../../components/loader/loader'
import ModalError from '../../../components/modal/modal-error'
import NFTCard from '../../../components/nft/card'
import NFTPreview from '../../../components/nft/preview'
import NFTTransferModal from '../../../components/nft/transfer'
import Pagination from '../../../components/pagination/pagination'
import IconText from '../../../components/text/icon-text'
import Tooltip from '../../../components/tooltip/tooltip'
import { backgrounds, skins } from '../../../data/nft'
import { abi, deployedAddresses } from '../../../data/smartContract'
import useContract from '../../../hooks/useContract'
import useWallet from '../../../hooks/useWallet'
import { fetchPercentages } from '../../../lib/coingecko'
import { fetchNFT, getCharacter, getFavCoin } from '../../../lib/nft'
import { QNFT } from '../../../types/contracts'
import { NFT } from '../../../types/nft'

export default function PageNFT(): JSX.Element {
  const router = useRouter()
  const { push: redirect } = router

  const { contract } = useContract<QNFT>(deployedAddresses.qnft, abi.qnft)
  const { account, error: walletError } = useWallet()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [nft, setNFT] = useState<NFT>()
  const [error, setError] = useState<Error>()
  const [changePercentage, setChangePercentage] = useState<number>()
  const [ownerTokenIds, setOwnerTokenIds] = useState<BigNumber[]>()
  const [tokenIndex, setTokenIndex] = useState<number>() // index of the current token id in the ownerTokenIds array
  const [isPreview, setIsPreview] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)

  // connect walletError to error
  useEffect(() => {
    if (walletError) setError(walletError)
  }, [walletError])

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

  const canTransfer = useMemo(() => {
    if (!nft) return false
    if (!account) return false
    return nft.creator.toLowerCase() === account.toLowerCase() && !nft.withdrawn
  }, [nft, account])

  const canUpdate = useMemo(() => {
    if (!nft) return false
    if (!account) return false
    return nft.creator.toLowerCase() === account.toLowerCase()
  }, [nft, account])

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

  // load nft and its price
  useEffect(() => {
    if (!contract) return
    if (!tokenId) return
    setLoading(true)
    fetchNFT(contract, tokenId)
      .then((nft) => {
        setNFT(nft)
        return nft
      })
      .then((nft) => fetchPercentages([nft]))
      .then(([percent]) => {
        if (!percent) return
        setChangePercentage(percent)
      })
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      setNFT(undefined)
      setLoading(false)
      setError(undefined)
      setChangePercentage(undefined)
    }
  }, [contract, tokenId])

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

      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-row justify-between mb-8">
          <SecondaryButton link href="/wallet" shadow>
            <ArrowNarrowLeftIcon className="inline-flex w-4 h-4 mr-2" />
            <span>Back to your space</span>
          </SecondaryButton>
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

        {isLoading && <Loader />}

        {showTransferModal && nft && (
          <NFTTransferModal
            tokenId={nft.tokenId}
            onRequestClose={() => setShowTransferModal(false)}
          ></NFTTransferModal>
        )}

        {error && (
          <ModalError
            error={error}
            onRequestClose={() => setError(undefined)}
            onModalClose={() => setError(undefined)}
            isShown={true}
          />
        )}

        {nft && !isLoading && (
          <>
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 p-8 bg-white border border-purple-100 rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <NFTCard
                    className="cursor-pointer"
                    tokenId={nft.tokenId}
                    changePercentage={changePercentage}
                    characterId={nft.characterId}
                    favCoinId={nft.favCoinId}
                    backgroundId={nft.backgroundId}
                    skin={getCharacter(nft.characterId).skin}
                    name={nft.name}
                    onClick={() => {
                      console.log('here')
                      setIsPreview(true)
                    }}
                    action={<ArrowsExpandIcon className="w-6 h-6" />}
                    defaultEmotion={nft.defaultEmotion}
                  />
                  <div>
                    <h1 className="text-2xl leading-8 font-bold text-purple-900 mb-8">
                      {nft.name}
                    </h1>
                    {item('Minter', nft.author)}

                    <h3 className="text-base leading-6 font-medium text-purple-900 mt-8 mb-4">
                      Artists
                    </h3>

                    {item('Animal', getCharacter(nft.characterId).artist.name)}
                    {item('Background', backgrounds[nft.backgroundId].name)}

                    <h3 className="text-base leading-6 font-medium text-purple-900 mt-8 mb-4">
                      Design Properties
                    </h3>

                    <div className="space-x-4">
                      {favCoin && (
                        <IconText
                          text={favCoin.meta.name}
                          icon={favCoin.meta.icon}
                          fullRounded
                        />
                      )}
                      {character && (
                        <IconText
                          text={character.name}
                          icon={character.emotions.normal}
                        />
                      )}
                      {skin && (
                        <IconText
                          text={skin.skin}
                          icon={skin.icon}
                          fullRounded
                        />
                      )}
                      {background && (
                        <IconText
                          text={background.name}
                          icon={background.image}
                        />
                      )}
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
                  unlockTime={new Date(nft.unlockTime * 1000)}
                />
                <div className="flex flex-col mt-8 p-8 mb-auto bg-white -sm border border-purple-100 rounded-2xl">
                  <span className="text-base leading-6 font-bold text-purple-900 mb-8">
                    NFT Actions
                  </span>
                  <div className="flex flex-col space-y-4">
                    <Tooltip
                      tooltip={!canTransfer && 'You cannot transfer this token'}
                    >
                      <SecondaryButton
                        className="block"
                        onClick={() =>
                          canTransfer && setShowTransferModal(true)
                        }
                        disabled={!canTransfer}
                      >
                        <ArrowNarrowRightIcon className="inline-flex w-4 h-4 mr-2" />
                        Transfer
                      </SecondaryButton>
                    </Tooltip>

                    <SecondaryButton
                      className="block"
                      onClick={() =>
                        canUpdate && redirect(`/nfts/${nft?.tokenId}/update`)
                      }
                      disabled={!canUpdate}
                    >
                      <PencilIcon className="inline-flex w-4 h-4 mr-2" />
                      Edition
                    </SecondaryButton>
                  </div>
                </div>
              </aside>
            </div>
            <NFTPreview
              tokenId={nft.tokenId}
              characterId={nft.characterId}
              favCoinId={nft.favCoinId}
              backgroundId={nft.backgroundId}
              skin={getCharacter(nft.characterId).skin}
              name={nft.name}
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
