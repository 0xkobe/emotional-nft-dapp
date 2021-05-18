import Head from 'next/head'
import Link from 'next/link'

export default function Wallet(): JSX.Element {
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
