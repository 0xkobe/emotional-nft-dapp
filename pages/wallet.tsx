import Head from 'next/head'
import Link from 'next/link'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
} from '../data/smartContract'
import useUserWallet from '../hooks/useUserNFTs'

export default function Wallet(): JSX.Element {
  const {
    nfts,
    error: contractError,
    isLoading,
  } = useUserWallet(metamaskConnector, deployedAddresses.qnft, abi.qnft)

  return (
    <>
      <Head>
        <title>Wallet</title>
      </Head>

      <main>
        {isLoading && <div>loading...</div>}
        {contractError && <div>{contractError.toString()}</div>}
        {nfts.length === 0 && <div>No NFTs</div>}
        {nfts.length > 0 && (
          <ul>
            {nfts.map((nft) => (
              <li key={nft.id}>
                <Link href={`/nfts/${nft.id}`}>
                  <a>NFT {nft.id}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
