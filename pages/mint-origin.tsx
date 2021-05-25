import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import { characters, favCoins, lockOptions } from '../data/nft'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
  remoteConnector,
} from '../data/smartContract'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import { payloadForSignatureEIP712v4 } from '../lib/signature'
import { APINftCreateRequest } from '../types/api'
import { QNFT, QNFTSettings } from '../types/contracts'
import { Emotion } from '../types/nft'

// This helper function allow to iterate on a enum containing string. Source: https://www.petermorlion.com/iterating-a-typescript-enum/
// TODO: only use by the form. can be removed when not needed
function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[]
}

export default function Mint(): JSX.Element {
  const {
    account,
    library,
    chainId,
    getSigner,
  } = useWallet(metamaskConnector)
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

  const [error, setError] = useState<string | undefined>(undefined)
  const [userBalance, setUserBalance] = useState(BigNumber.from(0))
  const [maxSupply, setMaxSupply] = useState(BigNumber.from(0))
  const [totalSupply, setTotalSupply] = useState(BigNumber.from(0))
  const [mintTotalPrice, setMintTotalPrice] = useState(BigNumber.from(0))
  const [mintTokenPrice, setMintTokenPrice] = useState(BigNumber.from(0))
  const [mintNonTokenPrice, setMintNonTokenPrice] = useState(BigNumber.from(0))

  const [character, setCharacter] = useState(characters[0])
  const [favCoin, setFavCoin] = useState(favCoins[0])
  const [lockOption, setLockOption] = useState(lockOptions[0])
  const [lockAmount, setLockAmount] = useState(BigNumber.from(0))
  const [freeAmount, setFreeAmount] = useState(BigNumber.from(0))
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [backgroundId, setBackgroundId] = useState(0)
  const [defaultEmotion, setDefaultEmotion] = useState(Emotion.Normal)

  // user balance
  useEffect(() => {
    if (!account) return
    if (!library) return
    void library.getBalance(account).then(setUserBalance)
  }, [library, account])

  // totalSupply
  // TODO: could be nice to refresh on every block
  useEffect(() => {
    if (!qnft) return
    void qnft.totalSupply().then(setTotalSupply)
    void qnft.maxSupply().then(setMaxSupply)
  }, [qnft])

  // show error in console
  useEffect(() => {
    if (!error) return
    console.error('error', error)
  }, [error])
  useEffect(() => {
    if (!qnftError) return
    console.error('qnftError', qnftError)
  }, [qnftError])
  useEffect(() => {
    if (!qnftSettingsError) return
    console.error('qnftSettingsError', qnftSettingsError)
  }, [qnftSettingsError])

  // calcMintPrice
  useEffect(() => {
    void qnftSettings
      ?.calcMintPrice(
        character.id,
        favCoin.id,
        lockOption.id,
        lockAmount,
        freeAmount,
      )
      .then((x) => {
        console.log('mint price updated', x.toString())
        setMintTotalPrice(x.totalPrice)
        setMintTokenPrice(x.tokenPrice)
        setMintNonTokenPrice(x.nonTokenPrice)
      })
  }, [qnftSettings, character, favCoin, lockOption, lockAmount, freeAmount])

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

      if (!mintStarted) return setError('mint is not started') // TODO: show this message to user nicely
      if (mintPaused) return setError('mint is pause') // TODO: show this message to user nicely
      if (mintFinished) return setError('mint is finished') // TODO: show this message to user nicely
      if (onlyAirdropUsers) return setError('mint is only for airdrops users') // TODO: show this message to user nicely
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

  // generate the signature of the metadata using Metamask
  const signMetadata = async (): Promise<string> => {
    if (!library) throw new Error('library is falsy')
    if (!chainId) throw new Error('chainId is falsy')
    const payload = payloadForSignatureEIP712v4(
      chainId,
      author,
      backgroundId,
      description,
      name,
    )
    return library.send('eth_signTypedData_v4', [
      account,
      JSON.stringify(payload),
    ])
  }

  // create a new metadata on the API. Returns the created metadata id.
  const createMetadata = async (signature: string): Promise<string> => {
    if (!chainId) throw new Error('chainId is falsy')
    if (!account) throw new Error('account is falsy')

    const data: APINftCreateRequest = {
      author,
      backgroundId,
      description,
      name,
      creator: account,
      signature,
      chainId,
      defaultEmotion: defaultEmotion,
    }
    const res = await fetch('/api/nft/create', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    })
    if (!res.ok) {
      const error = (await res.json()).error
      if (error)
        throw new Error(`an error occurred while creating metadata: ${error}`)
      throw new Error(`an unknown error occurred while creating metadata`)
    }
    const metaId = (await res.json()).metaId
    return metaId
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const signer = await getSigner()

    if (!signer) return setError('signer is falsy')
    if (!qnft) return setError('qnft is falsy')

    if (lockAmount.isZero() || lockAmount.isNegative())
      return setError('lockAmount must be positive and not zero')

    // generate signature
    // TODO: try to use useCallback to not call this if not changes. same for createMetadata if it works
    console.log('Signing metadata using Metamask...')
    const signature = await signMetadata()
    console.log('signature', signature)

    // save meta
    console.log('Saving metadata on backend...')
    const metaId = await createMetadata(signature)
    console.log('metaId', metaId)

    // console.log('Form was submitted', animalId, skinId, emotion)

    console.log('Signing and sending transaction using Metamask...')
    // TODO: make sure chainId is the same with signer and qnft
    // TODO: It seems the contracts hooks is also using the chain id from metamask: to investigate
    const tx = await qnft
      .connect(signer)
      .mintNft(character.id, favCoin.id, lockOption.id, lockAmount, metaId, {
        value: mintTotalPrice,
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
    if (!tokenId) return setError('tokenId is falsy')
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
        <div className="border h-96 w-96 mx-auto">
          {character != null && defaultEmotion != null ? (
            <Image
              src={character.emotions[defaultEmotion]}
              height={200}
              width={200}
            />
          ) : (
            'Select an character to get the preview'
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="character">Character</label>
            <select
              id="character"
              name="characterId"
              value={character.id}
              onChange={(event) => {
                const char = characters.find(
                  (c) => c.id === parseInt(event.target.value),
                )
                if (!char) return
                setCharacter(char)
              }}
            >
              {characters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="defaultEmotion">DefaultEmotion</label>
            <select
              id="defaultEmotion"
              name="defaultEmotion"
              value={defaultEmotion}
              onChange={(event) => {
                const x = enumKeys(Emotion).find(
                  (key) => Emotion[key] === event.target.value,
                )
                if (!x) return
                setDefaultEmotion(Emotion[x])
              }}
            >
              {enumKeys(Emotion).map((defaultEmotion) => (
                <option key={defaultEmotion} value={Emotion[defaultEmotion]}>
                  {defaultEmotion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="favCoin">FavCoin</label>
            <select
              id="favCoin"
              name="favCoinId"
              value={favCoin.id}
              onChange={(event) => {
                const x = favCoins.find(
                  (x) => x.id === parseInt(event.target.value),
                )
                if (!x) return
                setFavCoin(x)
              }}
            >
              {favCoins.map((favCoin) => (
                <option key={favCoin.id} value={favCoin.id}>
                  {favCoin.meta.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lockOption">LockOption</label>
            <select
              id="lockOption"
              name="lockOptionId"
              value={lockOption.id}
              onChange={(event) => {
                const x = lockOptions.find(
                  (x) => x.id === parseInt(event.target.value),
                )
                if (!x) return
                setLockOption(x)
              }}
            >
              {lockOptions.map((lockOption) => (
                <option key={lockOption.id} value={lockOption.id}>
                  {lockOption.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lockAmount">LockAmount</label>

            <input
              id="lockAmount"
              name="lockAmount"
              type="number"
              onChange={(event) => {
                setLockAmount(parseUnits(event.target.value || '0', 'wei'))
              }}
            />
          </div>

          <div>
            <label htmlFor="backgroundId">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={(event) => {
                setDescription(event.target.value)
              }}
            />
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <input
              id="author"
              name="author"
              type="text"
              onChange={(event) => {
                setAuthor(event.target.value)
              }}
            />
          </div>

          <div>
            <label htmlFor="backgroundId">BackgroundId</label>
            <input
              id="backgroundId"
              name="backgroundId"
              type="number"
              onChange={(event) => {
                setBackgroundId(parseInt(event.target.value))
              }}
            />
          </div>

          <div>
            <label htmlFor="freeAmount">FreeAmount</label>
            <input
              id="freeAmount"
              name="freeAmount"
              type="number"
              onChange={(event) => {
                setFreeAmount(parseUnits(event.target.value || '0', 'wei'))
              }}
            />
          </div>
          <div>Mint total price: {formatUnits(mintTotalPrice)} ETH</div>
          <div>Mint token price: {formatUnits(mintTokenPrice)}</div>
          <div>Mint non token price: {formatUnits(mintNonTokenPrice)}</div>
          <div>Your balance: {formatUnits(userBalance)} ETH</div>
          <div>
            Minted NFTs: {totalSupply.toString()} / {maxSupply.toString()}
          </div>
          <div>Chain id: {chainId}</div>
          <button className="block px-10 py-8 bg-primary-50">Mint</button>
        </form>
      </aside>
    </>
  )
}
