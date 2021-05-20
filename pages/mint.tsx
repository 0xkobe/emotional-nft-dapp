import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
  remoteConnector,
} from '../data/smartContract'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import { QNFT, QNFTSettings } from '../types'

export default function Mint(): JSX.Element {
  const { signer, account, library } = useWallet(metamaskConnector)
  const { contract: qnft, error: qnftError } = useContract<QNFT>(
    remoteConnector,
    deployedAddresses.qnft,
    abi.qnft,
  )
  const { contract: qnftSettings, error: qnftSettingsError } =
    useContract<QNFTSettings>(
      remoteConnector,
      deployedAddresses.qnftSettings,
      abi.qnftSettings,
    )

  const [userBalance, setUserBalance] = useState(BigNumber.from(0))
  const [maxSupply, setMaxSupply] = useState(BigNumber.from(0))
  const [totalSupply, setTotalSupply] = useState(BigNumber.from(0))
  const [mintPrice, setMintPrice] = useState(BigNumber.from(0))

  const [characterId, setCharacterId] = useState(0)
  const [favCoinId, setFavCoinId] = useState(0)
  const [lockOptionId, setLockOptionId] = useState(0)
  const [lockAmount, setLockAmount] = useState(0)
  const [metaId, setMetaId] = useState<number | undefined>(undefined)
  const [freeAmount, setFreeAmount] = useState(0)
  // TODO: to save in database
  // const [name, setName] = useState("")
  // const [description, setDescription] = useState("")
  // const [author, setAuthor] = useState("")
  // const [bgImageId, setBgImageId] = useState(0)
  // const [defaultEmotionIndex, setDefaultEmotionIndex] = useState(0)

  // user balance
  useEffect(() => {
    if (!account) return
    library?.getBalance(account).then((x) => setUserBalance(x))
  }, [library, account])

  // totalSupply
  useEffect(() => {
    qnft?.totalSupply().then((x) => setTotalSupply(x))
  }, [qnft])

  // maxSupply
  useEffect(() => {
    qnft?.maxSupply().then((x) => setMaxSupply(x))
  }, [qnft])

  // calcMintPrice
  useEffect(() => {
    void qnftSettings
      ?.calcMintPrice(
        characterId,
        favCoinId,
        lockOptionId,
        lockAmount,
        freeAmount,
      )
      .then((x) => setMintPrice(x))
  }, [
    qnftSettings,
    characterId,
    favCoinId,
    lockOptionId,
    lockAmount,
    freeAmount,
  ])

  // check mint conditions
  useEffect(() => {
    if (!qnftSettings) return
    void Promise.all([
      qnftSettings.mintStarted(),
      qnftSettings.mintPaused(),
      qnftSettings.mintFinished(),
      qnftSettings.onlyAirdropUsers(),
    ]).then(([mintStarted, mintPaused, mintFinished, onlyAirdropUsers]) => {
      console.log('mintStarted:', mintStarted.toString())
      console.log('mintPaused:', mintPaused.toString())
      console.log('mintFinished:', mintFinished.toString())
      console.log('onlyAirdropUsers:', onlyAirdropUsers.toString())

      if (!mintStarted) throw new Error('mint is not started') // TODO: show this message to user nicely
      if (mintPaused) throw new Error('mint is pause') // TODO: show this message to user nicely
      if (mintFinished) throw new Error('mint is finished') // TODO: show this message to user nicely
      if (onlyAirdropUsers) throw new Error('mint is only for airdrops users') // TODO: show this message to user nicely
    })
  }, [qnftSettings])

  useEffect(() => {
    void qnftSettings
      ?.characterCount()
      .then((x) => console.log('characterCount:', x.toString()))
    void qnftSettings
      ?.favCoinsCount()
      .then((x) => console.log('favCoinsCount:', x.toString()))
    void qnftSettings
      ?.lockOptionsCount()
      .then((x) => console.log('lockOptionsCount:', x.toString()))
  }, [qnftSettings])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // TODO: make sure metamask is connected or throw a nice error

    // console.log('Form was submitted', animalId, skinId, emotion)
    if (!signer) throw new Error('signer is falsy')
    if (!account) throw new Error('account is falsy')
    if (!qnft) throw new Error('qnft is falsy')
    if (!qnftSettings) throw new Error('qnftSettings is falsy')

    console.log('Calculate price...')
    const mintPrice = await qnftSettings.calcMintPrice(
      characterId,
      favCoinId,
      lockOptionId,
      lockAmount,
      freeAmount,
    )
    console.log('mintPrice', mintPrice.toString())

    console.log('Signing and sending transaction in Metamask...')
    // TODO: make sure chainId is the same with signer and qnft
    const tx = await qnft
      .connect(signer)
      .mintNft(characterId, favCoinId, lockOptionId, lockAmount, metaId, {
        value: mintPrice,
      })
    console.log('tx', tx)
    console.log('Tx signed and broadcasted with success', tx.hash)

    console.log('Waiting for tx to be mined...')
    const log = await tx.wait()
    console.log('log', log)
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
          <strong>qnft contract: </strong>
          <span>
            {qnft ? qnft.address : qnftError ? qnftError.toString() : 'n/a'}
          </span>
        </div>
        <div>
          <strong>qnftSettings contract: </strong>
          <span>
            {qnftSettings
              ? qnftSettings.address
              : qnftSettingsError
              ? qnftSettingsError.toString()
              : 'n/a'}
          </span>
        </div>
        {/* <div className="border h-96 w-96 mx-auto">
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
        </div> */}
        <form onSubmit={handleSubmit}>
          {/* <div>
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
          </div> */}
          <div>Mint price: {formatUnits(mintPrice)} ETH</div>
          <div>Your balance: {formatUnits(userBalance)} ETH</div>
          <div>
            Minted NFTs: {totalSupply.toString()} / {maxSupply.toString()}
          </div>
          <button className="block px-10 py-8 bg-primary-50">Mint</button>
        </form>
      </aside>
    </>
  )
}
