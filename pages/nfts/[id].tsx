import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

export default function NFT(): JSX.Element {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>NFT</title>
      </Head>

      <main>
        <h1>NFT {id}</h1>
      </main>
    </>
  )
}
