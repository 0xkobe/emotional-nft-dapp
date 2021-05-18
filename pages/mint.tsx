import Head from 'next/head'

export default function Mint(): JSX.Element {
  return (
    <>
      <Head>
        <title>Mint NFT</title>
      </Head>

      <main className="flex-1 overflow-y-auto">
        <section className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last">
          <h1>Create your own Quiver NFT</h1>
          ...
        </section>
      </main>

      <aside className="w-1/3 bg-white border-l border-gray-200 overflow-y-auto p-4 flex flex-col justify-between">
        <div>
          <div className="border h-96 w-96 mx-auto">preview</div>
          <ul>
            <li>Stat 1</li>
            <li>Stat 2</li>
            <li>Stat 3</li>
            <li>Stat 4</li>
          </ul>
        </div>
        <button className="block px-10 py-8 bg-primary-50">Mint</button>
      </aside>
    </>
  )
}
