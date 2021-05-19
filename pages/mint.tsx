import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import { animals, skins } from '../data/nft'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
  remoteConnector,
} from '../data/smartContract'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import { ERC721 } from '../types/ERC721'

export default function Mint(): JSX.Element {
  const [animalId, setAnimalId] = useState('0')
  const [skinId, setSkinId] = useState('0')
  const [emotion, setEmotion] = useState('normal')

  const { signer, account } = useWallet(metamaskConnector)
  const { contract, error: contractError } = useContract<ERC721>(
    remoteConnector,
    deployedAddresses,
    abi.erc721,
  )

  useEffect(() => {
    if (!contract) return
    void contract.symbol().then((x) => console.log('loaded symbol:', x))
  }, [contract])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // TODO: make sure metamask is connected or throw a nice error

    console.log('Form was submitted', animalId, skinId, emotion)
    if (!signer) throw new Error('signer is falsy')
    if (!account) throw new Error('account is falsy')
    if (!contract) throw new Error('contract is falsy')

    console.log('Signing and sending transaction in Metamask...')
    const tx = await contract.connect(signer).mint(account)
    console.log('Tx signed and broadcasted with success', tx.hash)

    console.log('Waiting for tx to be mined...')
    const log = await tx.wait()
    const transferEvent = log.events?.find(
      (event) => event.event === 'Transfer',
    )
    const tokenId = transferEvent?.args?.tokenId
    if (!tokenId) throw new Error('tokenId is falsy')
    console.log('Tx mined with success. Token id:', tokenId.toString())
  }

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
          <strong>Contract: </strong>
          <span>
            {contract
              ? contract.address
              : contractError
              ? contractError.toString()
              : 'n/a'}
          </span>
        </div>
        <div className="border h-96 w-96 mx-auto">
          {animalId != null && skinId != null ? (
            <Image
              src={`/nft/characters/${animals[
                Number.parseInt(animalId)
              ].name.toLowerCase()}/${skins[
                Number.parseInt(skinId)
              ].toLowerCase()}/${emotion}.png`}
              height={200}
              width={200}
            />
          ) : (
            'Select an animal and a skin to get the preview'
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="animal">Animal</label>
            <select
              id="animal"
              name="animalId"
              value={animalId}
              onChange={(event) => setAnimalId(event.target.value)}
            >
              {animals.map((animal, index) => (
                <option key={index} value={index}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="skin">Skin</label>
            <select
              id="skin"
              name="skinId"
              value={skinId}
              onChange={(event) => setSkinId(event.target.value)}
            >
              {skins.map((skin, index) => (
                <option key={index} value={index}>
                  {skin}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="emotion">Emotion</label>
            <select
              id="emotion"
              name="emotion"
              value={emotion}
              onChange={(event) => setEmotion(event.target.value)}
            >
              {['angry', 'worry', 'normal', 'rest', 'happy'].map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
          </div>
          <button className="block px-10 py-8 bg-primary-50">Mint</button>
        </form>
      </aside>
    </>
  )
}
