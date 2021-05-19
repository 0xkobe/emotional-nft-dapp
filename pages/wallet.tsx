import { InjectedConnector } from '@web3-react/injected-connector'
import Head from 'next/head'
import Link from 'next/link'
import useUserWallet from '../hooks/useUserWallet'
import useWallet from '../hooks/useWallet'

export const connector = new InjectedConnector({})

const abiQNFT = require('../abi/QNFT.json')
const addresses = {
  3: '0x29D1B07a302d7CB8d3A78216495a80A86aA9593f',
}

export default function Wallet(): JSX.Element {
  const { account, chainId } = useWallet(connector)
  const { totalNFTs, myNFTs, error: contractError } = useUserWallet(
    addresses,
    abiQNFT,
    account || undefined,
    chainId
  )
  console.log("totalNFTs", totalNFTs)
  console.log("myNFTs", myNFTs)
  console.log("contractError", contractError)

  return (
    <>
      <Head>
        <title>Wallet</title>
      </Head>

      <main>
        <ul>
          <li>
            <Link href="/nfts/1">NFT1</Link>
          </li>
          <li>
            <Link href="/nfts/2">NFT2</Link>
          </li>
          <li>
            <Link href="/nfts/3">NFT3</Link>
          </li>
        </ul>
      </main>
    </>
  )
}
