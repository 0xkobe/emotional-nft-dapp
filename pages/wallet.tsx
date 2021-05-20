import { InjectedConnector } from '@web3-react/injected-connector'
import Head from 'next/head'
import Link from 'next/link'
import useUserWallet from '../hooks/useUserNFTs'
// import useWallet from '../hooks/useWallet'

export const connector = new InjectedConnector({})

const abiQNFT = require('../abi/QNFT.json')
const addresses = {
  3: '0x29D1B07a302d7CB8d3A78216495a80A86aA9593f',
}

export default function Wallet(): JSX.Element {
  const {
    nfts,
    error: contractError,
    isLoading,
  } = useUserWallet(connector, addresses, abiQNFT)

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
            {nfts.map((x) => (
              <li key={x.id}>
                <Link href={`'/nfts/${x.id}`}>NFT {x.id}</Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
