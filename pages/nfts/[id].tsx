import { Contract } from '@ethersproject/contracts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { NetworkConnector } from '@web3-react/network-connector'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import NFTCard from '../../components/nft/card'
import useContract from '../../hooks/useContract'
import { attribute } from '../../lib/nft'
import { favCoins } from '../../data/nft'
import {
  Background,
  Creature,
  FavCoinEnum,
  LockPeriod,
  Metadata,
  Skin,
  Traits,
} from '../../types/metadata'


// TODO: remove when API is ready
const metadataMock: Metadata = {
  name: 'Super Bitcoin Bear',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis felis in tincidunt posuere. Nullam imperdiet convallis augue vulputate sollicitudin.',
  external_url: '',
  image: 'https://via.placeholder.com/320x320',
  attributes: [
    { trait_type: Traits.Creature, value: Creature.Bear },
    { trait_type: Traits.Skin, value: Skin.Gold },
    { trait_type: Traits.Background, value: Background.NightBoat },
    { trait_type: Traits.FavCoin, value: FavCoinEnum.BTC },
    { trait_type: Traits.Lock, value: LockPeriod.SixMonths },
    { trait_type: Traits.CreatorName, value: 'px4.eth' },
    { trait_type: Traits.CreatorWallet, value: '0x' },
  ],
}

// TODO: move in a dedicate file
const deployedAddresses = {
  3: '0x29D1B07a302d7CB8d3A78216495a80A86aA9593f',
}

const remoteConnector = new NetworkConnector({
  urls: {
    3: 'https://eth-ropsten.alchemyapi.io/v2/j3511RMZjDGkirYD0QPu8nGn1sIY0Y7c',
  },
  defaultChainId: 3,
})

export default function NFT(): JSX.Element {
  const router = useRouter()
  const { contract, error: contractError } = useContract(
    remoteConnector,
    deployedAddresses,
    require('../../abi/QNFT.json'),
  )
  const [id, setId] = useState<number>()
  const [loading, setLoading] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<Metadata>()
  const [error, setError] = useState<Error>()

  const fetchMetadata = useCallback(async (contract: Contract, id: number) => {
    setLoading(true)
    try {
      console.log(contract, id)
      const tokenURI = await contract.tokenURI(id)
      console.log(tokenURI)
      // TODO: fetch metadata
      const metadata = metadataMock
      setMetadata(metadata)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.id) return
    setId(parseInt(router.query.id as string, 10))
  }, [router])

  useEffect(() => {
    if (!contract) return
    if (!id) return
    void fetchMetadata(contract, id)
  }, [contract, fetchMetadata, id])

  return (
    <>
      <Head>
        <title>NFT</title>
      </Head>

      <main>
        <Link href="/wallet">
          <a className="text-sm leading-5 font-medium">Back to your space</a>
        </Link>

        {loading && <div>...loading</div>}
        {contractError && <div>contract: {contractError.toString()}</div>}
        {error && <div>meta: {error.toString()}</div>}

        {metadata && (
          <div className="flex">
            <NFTCard
              changePercentage={-20}
              favcoin={favCoins[0]}
              ethPrice={"0.8429"}
              metadata={metadata}
            />
            <div>
              <h1>{metadata.name}</h1>
              <div>
                <span>
                  Author:
                  <a
                    href={`https://etherscan.io/address/${attribute(
                      metadata,
                      Traits.CreatorWallet,
                    )}`}
                    target="_blank"
                  >
                    {attribute(metadata, Traits.CreatorName)}
                  </a>
                </span>
              </div>
              <div>
                <h3>Properties</h3>
                <div className="flex">
                  <span className="p-4 mr-2 border">
                    {attribute(metadata, Traits.FavCoin)}
                  </span>
                  <span className="p-4 mr-2 border">
                    {attribute(metadata, Traits.Creature)}
                  </span>
                  <span className="p-4 mr-2 border">
                    {attribute(metadata, Traits.Skin)}
                  </span>
                  <span className="p-4 mr-2 border">
                    {attribute(metadata, Traits.Background)}
                  </span>
                </div>
              </div>
              <div>
                <h3>Description</h3>
                <p>{metadata.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <aside className="w-96">
        {id && (
          <nav className="inline-flex w-full justify-between">
            <Link href={`/nfts/${id - 1}`}>
              <a className="text-sm leading-5 font-medium inline-flex items-center">
                <ChevronLeftIcon className="w-4 h-4" />
                Previous
              </a>
            </Link>
            <Link href={`/nfts/${id + 1}`}>
              <a className="text-sm leading-5 font-medium inline-flex items-center">
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </a>
            </Link>
          </nav>
        )}
      </aside>
    </>
  )
}
