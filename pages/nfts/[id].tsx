import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { NetworkConnector } from '@web3-react/network-connector'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NFTCard from '../../components/nft/card'
import useContract from '../../hooks/useContract'
import useNFT from '../../hooks/useNFT'
import { attribute } from '../../lib/nft'
import { Traits } from '../../types/metadata'

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
  const { id: strId } = router.query
  const id = typeof strId === 'string' ? parseInt(strId, 10) : -1
  const { contract, error: contractError } = useContract(
    remoteConnector,
    deployedAddresses,
    require('../../abi/QNFT.json'),
  )
  const { error, loading, metadata } = useNFT(contract, id)

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
            <NFTCard metadata={metadata} />
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
                    {attribute(metadata, Traits.Favcoin)}
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
      </aside>
    </>
  )
}
