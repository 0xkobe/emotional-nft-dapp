import { Contract } from '@ethersproject/contracts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import NFTCard from '../../components/nft/card'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
} from '../../data/smartContract'
import useContract from '../../hooks/useContract'
import { attribute } from '../../lib/nft'
import { APINftMetadataResponse, APIResponseError } from '../../types/api'
import { favCoins } from '../../data/nft'
import { Traits } from '../../types/metadata'

export default function NFT(): JSX.Element {
  const router = useRouter()
  const { contract, error: contractError } = useContract(
    metamaskConnector,
    deployedAddresses.qnft,
    abi.qnft,
  )
  const [id, setId] = useState<number>()
  const [loading, setLoading] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<APINftMetadataResponse>()
  const [error, setError] = useState<Error>()

  const fetchMetadata = useCallback(async (contract: Contract, id: number) => {
    setLoading(true)
    try {
      console.log(contract, id)
      const tokenURI = await contract.tokenURI(id)
      console.log(tokenURI)
      const res = await fetch(tokenURI)
      const response: APINftMetadataResponse | APIResponseError =
        await res.json()
      if ('error' in response)
        return setError(
          new Error(`an error occurred while fetching metadata: ${error}`),
        )
      if (!res.ok)
        return setError(
          new Error(`an unknown error occurred while fetching metadata`),
        )
      setMetadata(response)
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
