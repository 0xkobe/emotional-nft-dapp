import { BigNumber } from '@ethersproject/bignumber'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Allocation from '../../components/allocation/allocation'
import BackButton from '../../components/button/back-button'
import NFTActions from '../../components/nft/actions'
import NFTCard from '../../components/nft/card'
import Pagination from '../../components/pagination/pagination'
import IconText from '../../components/text/icon-text'
import { characters, favCoins } from '../../data/nft'
import { DisplayType, LockPeriod, Traits } from '../../types/metadata'
import { Emotion } from '../../types/nft'
import { RawNFTData } from '../../types/raw'

export default function NFT(): JSX.Element {
  const router = useRouter()

  const [id, setId] = useState<number>(0)

  // const fetchMetadata = useCallback(
  //   async (contract: Contract, id: number) => {
  //     setLoading(true)
  //     try {
  //       console.log(contract, id)
  //       const tokenURI = await contract.tokenURI(id)
  //       console.log(tokenURI)
  //       const res = await fetch(tokenURI)
  //       const response: APINftMetadataResponse | APIResponseError =
  //         await res.json()
  //       if ('error' in response)
  //         return setError(
  //           new Error(`an error occurred while fetching metadata: ${error}`),
  //         )
  //       if (!res.ok)
  //         return setError(
  //           new Error(`an unknown error occurred while fetching metadata`),
  //         )
  //       setMetadata(response)
  //     } catch (e) {
  //       setError(e)
  //     } finally {
  //       setLoading(false)
  //     }
  //   },
  //   [error],
  // )

  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.id) return
    setId(parseInt(router.query.id as string, 10))
  }, [router])

  const nft: RawNFTData = {
    id,
    characterId: 0,
    favCoinId: 0,
    lockDuration: BigNumber.from(12 * 30 * 24 * 3600),
    lockAmount: BigNumber.from("1000"),
    createdAt: BigNumber.from("1000"),
    withdrawn: false,
    metaId: BigNumber.from("1000"),
  }
  const changePercentage = 20;
  const ethPrice = "1000";

  return (
    <>
      <Head>
        <title>NFT</title> {/* What do you think of adding nft name here? */}
      </Head>

      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="flex flex-row justify-between">
          <BackButton text="Back to your space" />
          <Pagination
            total={10}
            current={5}
            onPrev={() => { console.log('prev') }}
            onNext={() => { console.log('next') }}
          />
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row space-x-8">
            <NFTCard
              size="big"
              className="cursor-pointer hover:shadow"
              changePercentage={changePercentage}
              favcoin={favCoins[nft.favCoinId]}
              ethPrice={ethPrice}
              metadata={{
                name: 'bear',
                description: 'description',
                image: characters[nft.characterId].emotions.normal,
                external_url: '/',
                attributes: [
                  {
                    trait_type: Traits.Creature,
                    value: characters[nft.characterId].creature,
                  },
                  {
                    trait_type: Traits.Skin,
                    value: characters[nft.characterId].skin,
                  },
                  {
                    trait_type: Traits.Background,
                    value: 1,
                  },
                  {
                    trait_type: Traits.FavCoin,
                    value: nft.favCoinId,
                  },
                  {
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.SixMonths
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: characters[nft.characterId].artist.name,
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: characters[nft.characterId].artist.wallet,
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
            <div className="flex flex-col w-96 space-y-8">
              <span className="text-2xl leading-8 font-bold text-gray-500">
                Super Bitcoin Bear
              </span>
              <div className="flex flex-col space-y-2">
                <span className="text-sm leading-5 font-normal text-gray-500">
                  Minter: px4.eth
                </span>
                <span className="text-sm leading-5 font-normal text-gray-500">
                  Created: 01/06/2021
                </span>
              </div>
              <div className="flex flex-col space-y-4">
                <span className="text-base leading-6 font-medium text-gray-500">
                  Artists
                </span>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm leading-5 font-normal text-gray-500">
                    Animal: @Beeple
                  </span>
                  <span className="text-sm leading-5 font-normal text-gray-500">
                    Background: @Beeple
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <span className="text-base leading-6 font-medium text-gray-500">
                  Design Properties
                </span>
                <div className="grid grid-cols-4 gap-4">
                  <IconText text="Bitcoin" icon="/favcoin/btc.svg" />
                  <IconText text="Bitcoin" icon="/favcoin/btc.svg" />
                  <IconText text="Bitcoin" icon="/favcoin/btc.svg" />
                  <IconText text="Bitcoin" icon="/favcoin/btc.svg" />
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <span className="text-base leading-6 font-medium text-gray-500">
                  Description
                </span>
                <span className="text-sm leading-5 font-normal text-gray-500 overflow-ellipsis overflow-hidden">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis felis in tincidunt posuere. Nullam imperdiet convallis augue vulputate sollicitudin.
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
            onTransfer={() => { console.log('transfer') }}
            onEdit={() => { console.log('edit') }}
            onUpgrade={() => { console.log('upgrade') }}
          />
        </div>
      </div>
    </>
  )
}
