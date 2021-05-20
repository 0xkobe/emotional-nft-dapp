import Head from 'next/head'
import { FormEvent, useEffect } from 'react'
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
  // const [animalId, setAnimalId] = useState('0')
  // const [skinId, setSkinId] = useState('0')
  // const [emotion, setEmotion] = useState('normal')

  const characterId = 1
  const bgImageId = 0
  const favCoinId = 0
  const lockOptionId = 0
  const lockAmount = 100
  const defaultEmotionIndex = 0
  const metaId = 0
  const freeAmount = 30000

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

  // TODO: to remove
  useEffect(() => {
    console.log('account', account)
    if (!account) return
    library
      ?.getBalance(account)
      .then((x) => console.log('getBalance:', x.toString()))
  })

  useEffect(() => {
    void qnft?.symbol().then((x) => console.log('symbol:', x.toString()))
    void qnft
      ?.totalSupply()
      .then((x) => console.log('totalSupply:', x.toString()))
    // void qnft?.maxSupply().then((x) => console.log('maxSupply:', x.toString()))
    // void qnft
    //   ?.EMOTION_COUNT()
    //   .then((x) => console.log('EMOTION_COUNT:', x.toString()))
  }, [qnft])

  useEffect(() => {
    void qnftSettings
      ?.characterCount()
      .then((x) => console.log('characterCount:', x.toString()))
    void qnftSettings
      ?.bgImageCount()
      .then((x) => console.log('bgImageCount:', x.toString()))
    void qnftSettings
      ?.favCoinsCount()
      .then((x) => console.log('favCoinsCount:', x.toString()))
    void qnftSettings
      ?.lockOptionsCount()
      .then((x) => console.log('lockOptionsCount:', x.toString()))
    void qnftSettings
      ?.onlyAirdropUsers()
      .then((x) => console.log('onlyAirdropUsers:', x.toString()))
    void qnftSettings
      ?.mintStarted()
      .then((x) => console.log('mintStarted:', x.toString()))
    void qnftSettings
      ?.mintPaused()
      .then((x) => console.log('mintPaused:', x.toString()))
    void qnftSettings
      ?.mintFinished()
      .then((x) => console.log('mintFinished:', x.toString()))
    void qnftSettings
      ?.calcMintPrice(
        characterId,
        bgImageId,
        favCoinId,
        lockOptionId,
        lockAmount,
        freeAmount,
      )
      .then((x) => console.log('calcMintPrice:', x.toString()))
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
      bgImageId,
      favCoinId,
      lockOptionId,
      lockAmount,
      freeAmount,
    )
    console.log('mintPrice', mintPrice.toString())

    console.log('Signing and sending transaction in Metamask...')
    const tx = await qnft
      .connect(signer)
      .mintNft(
        characterId,
        bgImageId,
        favCoinId,
        lockOptionId,
        lockAmount,
        defaultEmotionIndex,
        metaId,
        {
          value: mintPrice,
        },
      )
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
          <button className="block px-10 py-8 bg-primary-50">Mint</button>
        </form>
      </aside>
    </>
  )
}
