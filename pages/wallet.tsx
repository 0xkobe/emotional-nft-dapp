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
  // const { library, chainId, account, activate, deactivate, active, error } =
  //   useWallet(connector)
  const { userNFTs, error: contractError } = useUserWallet(
    connector,
    addresses,
    abiQNFT,
  )
  console.log("userNFTs", userNFTs)
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
