import { BigNumber } from '@ethersproject/bignumber'
import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Button from '../components/button/button'
import MintSummary from '../components/mint-summary/mint-summary'
import AllocationWizard from '../components/mint-wizard/allocation-wizard'
import DesignWizard from '../components/mint-wizard/design-wizard'
import StoryWizard from '../components/mint-wizard/story-wizard'
import Modal from '../components/modal/modal'
import ModalProcessing from '../components/modal/modal-processing'
import ModalSucceed from '../components/modal/modal-succeed'
import NFTCard from '../components/nft/card'
import Stepper from '../components/stepper/stepper'
import Title from '../components/title/title'
import {
  backgrounds,
  characters,
  charactersSupply,
  favCoins,
  lockOptions,
  nonTokenMultiplier,
  qstkPrice,
  skins,
  tokenMultiplier,
} from '../data/nft'
import {
  abi,
  deployedAddresses,
  metamaskConnector,
  remoteConnector,
} from '../data/smartContract'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import { createMetadata } from '../lib/nft'
import { payloadForSignatureEIP712v4 } from '../lib/signature'
import { bnToText } from '../lib/utils'
import { QNFT } from '../types/contracts'
import { DisplayType, Skin, Traits } from '../types/metadata'
import { Character, Emotion } from '../types/nft'
import { CharacterOption } from '../types/options'

export default function Mint(): JSX.Element {
  const { push: redirect } = useRouter()
  const { account, chainId, activate, signer, signTypedDataV4 } =
    useWallet(metamaskConnector)

  const { contract: qnft, error: qnftError } = useContract<QNFT>(
    remoteConnector,
    deployedAddresses.qnft,
    abi.qnft,
  )
  // const { contract: qnftSettings, error: qnftSettingsError } =
  //   useContract<QNFTSettings>(
  //     remoteConnector,
  //     deployedAddresses.qnftSettings,
  //     abi.qnftSettings,
  //   )

  const [mintStep, setMintStep] = useState(0)
  const [characterId, setCharacterId] = useState(0)
  const [skinIndex, setSkinIndex] = useState(0)
  const [coinIndex, setCoinIndex] = useState(0)
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [charactersData, setCharactersData] = useState([] as CharacterOption[])
  const [changePercentage, setChangePercentage] = useState(0)
  const [nftName, setNftName] = useState('')
  const [minterName, setMinterName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [qstkAmount, setQstkAmount] = useState(BigNumber.from(0))
  const [lockOptionId, setLockOptionId] = useState(0)
  const [airdropAmount, setAirdropAmount] = useState(BigNumber.from(0))

  const getCharactersSupply = async (qnft: QNFT, characters: Character[]) => {
    const requestCharactersSupply = []
    for (let i = 0; i < characters.length; i++) {
      requestCharactersSupply.push(
        qnft
          .nftCountByCharacter(characters[i].id)
          .then((val): number => val.toNumber()),
      )
    }
    const resCharactersSupply: number[] = await Promise.all(
      requestCharactersSupply,
    )
    setCharactersData(
      characters.map((character, index) => ({
        ...character,
        maxSupply: charactersSupply[character.id],
        currentSupply: resCharactersSupply[index],
      })),
    )
  }

  useEffect(() => {
    if (!qnftError) return
    console.error('qnftError', qnftError)
  }, [qnftError])
  // useEffect(() => {
  //   if (!qnftSettingsError) return
  //   console.error('qnftSettingsError', qnftSettingsError)
  // }, [qnftSettingsError])
  useEffect(() => {
    if (!qnft) return
    try {
      const filteredCharacters = characters.filter(
        (character) =>
          character.skin === skins[skinIndex].skin ||
          character.skin === Skin.None,
      )
      void getCharactersSupply(qnft, filteredCharacters)
    } catch (err) {
      console.error(' qnft getCharactersSupply fail')
    }
  }, [qnft, skinIndex])

  const nftPrice = useMemo(() => {
    const nonTokenPrice = characters[characterId].mintPrice
      .add(favCoins[coinIndex].mintPrice)
      .mul(nonTokenMultiplier)
    const tokenPrice = qstkAmount
      .add(airdropAmount)
      .mul(qstkPrice)
      .mul(100 - lockOptions[lockOptionId].discount)
      .div(100)
      .mul(tokenMultiplier)
      .div(BigNumber.from(10).pow(18))
    return nonTokenPrice.add(tokenPrice)
  }, [airdropAmount, characterId, coinIndex, lockOptionId, qstkAmount])

  const summary = useMemo(() => {
    const mintSummaryProperties = [
      {
        title: 'Design Properties',
        keyValues: [
          {
            key: 'Animal',
            value: characters[characterId].name,
          },
          {
            key: 'Skin',
            value: skins[skinIndex].skin,
          },
          {
            key: 'FavCoin',
            value: favCoins[coinIndex].meta.name,
          },
          {
            key: 'Background',
            value: backgrounds[backgroundIndex].name,
          },
        ],
      },
    ]

    if (mintStep > 0) {
      mintSummaryProperties.push({
        title: 'Story Properties',
        keyValues: [
          {
            key: 'Name',
            value: nftName,
          },
          {
            key: 'Minter',
            value: minterName,
          },
          {
            key: 'Description',
            value: nftDescription,
          },
        ],
      })
    }

    if (mintStep > 1) {
      mintSummaryProperties.push({
        title: 'QSTK Allocation',
        keyValues: [
          {
            key: 'Mint amount',
            value: bnToText(qstkAmount),
          },
          {
            key: 'Lock period',
            value: lockOptions[lockOptionId].description,
          },
          {
            key: 'Free allocation',
            value: bnToText(airdropAmount),
          },
          {
            key: 'Total to receive',
            value: bnToText(qstkAmount.add(airdropAmount)),
          },
        ],
      })
    }

    return mintSummaryProperties
  }, [
    mintStep,
    characterId,
    skinIndex,
    coinIndex,
    backgroundIndex,
    nftName,
    minterName,
    nftDescription,
    qstkAmount,
    lockOptionId,
    airdropAmount,
  ])

  const mintSummaryBtnName = useMemo(() => {
    return ['Validate Design', 'Validate Story', 'Mint my NFT'][mintStep]
  }, [mintStep])

  const handleSubmit = () => {
    if (mintStep < 2) return setMintStep(mintStep + 1)
    // TODO: mint with airdrop
    setIsMinting(true)
  }

  const [isMinting, setIsMinting] = useState(false)
  const [receipt, setReceipt] = useState<ContractReceipt>()
  const [tx, setTx] = useState<ContractTransaction>()
  const [signature, setSignature] = useState<string>()
  const [metaId, setMetaId] = useState<string>()

  // activate metamask when start minting
  useEffect(() => {
    if (!isMinting) return
    activate()
  }, [activate, isMinting])

  // sign metadata
  useEffect(() => {
    if (!isMinting) return
    if (!chainId) return
    // generate signature
    console.log('Signing metadata using Metamask...')
    void signTypedDataV4(
      payloadForSignatureEIP712v4(
        chainId,
        minterName,
        backgroundIndex,
        nftDescription,
        nftName,
      ),
    )
      .then((signature) => {
        console.log('signature', signature)
        setSignature(signature)
      })
      .catch((error) => {
        console.error('sign metadata error', error)
        setIsMinting(false)
      })
    return () => {
      console.log('setSignature(undefined)')
      setSignature(undefined)
    }
  }, [
    isMinting,
    chainId,
    minterName,
    backgroundIndex,
    nftDescription,
    nftName,
    signTypedDataV4,
  ])

  // create metadata
  useEffect(() => {
    if (!signature) return
    if (!chainId) return
    if (!account) return
    // save meta
    console.log('Saving metadata on backend...')
    void createMetadata(
      signature,
      chainId,
      account,
      minterName,
      backgroundIndex,
      nftDescription,
      nftName,
      Emotion.Normal, // FIXME: make the user choose the default emotion
    )
      .then((metaId) => {
        console.log('metaId', metaId)
        setMetaId(metaId)
      })
      .catch((error) => {
        console.error('metadata error', error)
        setIsMinting(false)
      })
    return () => {
      console.log('setMetaId(undefined)')
      setMetaId(undefined)
    }
  }, [
    signature,
    chainId,
    account,
    minterName,
    backgroundIndex,
    nftDescription,
    nftName,
  ])

  // sign & broadcast transaction
  useEffect(() => {
    if (!qnft) return
    if (!signer) return
    if (!metaId) return
    console.log('Signing and sending transaction using Metamask...')
    // TODO: make sure chainId is the same with signer and qnft
    // TODO: It seems the contracts hooks is also using the chain id from metamask: to investigate
    void qnft
      .connect(signer)
      .mintNft(characterId, coinIndex, lockOptionId, qstkAmount, metaId, {
        value: nftPrice,
      })
      .then((tx) => {
        console.log('Tx signed and broadcasted with success', tx.hash)
        setTx(tx)
      })
      .catch((error) => {
        console.error('sign tx', error)
        setIsMinting(false)
      })
    return () => {
      console.log('setTx(undefined)')
      setTx(undefined)
    }
  }, [
    qnft,
    signer,
    characterId,
    coinIndex,
    lockOptionId,
    qstkAmount,
    metaId,
    nftPrice,
  ])

  // wait for receipt
  useEffect(() => {
    if (!tx) return
    console.log('Waiting for tx to be mined...')
    void tx
      .wait()
      .then((receipt) => {
        console.log('receipt', receipt)
        setReceipt(receipt)
      })
      .catch((error) => {
        console.error('receipt error', error)
        setIsMinting(false)
      })
    return () => {
      console.log('setReceipt(undefined)')
      setReceipt(undefined)
    }
  }, [tx])

  // mintedNFTId memo
  const mintedNFTId = useMemo((): string | undefined => {
    if (!receipt) return
    const transferEvent = receipt.events?.find(
      (event) => event.event === 'Transfer',
    )
    const tokenId = transferEvent?.args?.tokenId
    if (!tokenId) throw new Error('tokenId is falsy')
    console.log('Tx mined with success. Token id:', tokenId.toString())
    return tokenId.toString()
  }, [receipt])

  function transactionUI() {
    if (!isMinting) return
    if (mintedNFTId) {
      return (
        <ModalSucceed
          nftId={mintedNFTId}
          isShown={true}
          onModalClose={() => {
            void redirect(`/nfts/${mintedNFTId}`)
          }}
          onRequestClose={() => void redirect(`/nfts/${mintedNFTId}`)}
        />
      )
    }
    if (tx) {
      return (
        <ModalProcessing
          onRequestClose={() => console.error('cannot close this modal')}
          onModalClose={() => console.error('cannot close this modal')}
          isShown={true}
          transactionHash={tx.hash}
        />
      )
    }
    return (
      <Modal
        onRequestClose={() => console.error('cannot close this modal')}
        onModalClose={() => console.error('cannot close this modal')}
        isShown={true}
      >
        Check metamask
      </Modal>
    )
  }

  // TODO: remove following code
  // const mintNft = async () => {

  //   if (!signer) throw new Error('signer is falsy')
  //   if (!qnft) throw new Error('qnft is falsy')
  //   if (!account) throw new Error('account is falsy')
  //   if (!library) throw new Error('library is falsy')
  //   if (!chainId) throw new Error('chainId is falsy')

  //   // FIXME: are the following check still necessary?
  //   if (qstkAmount.isZero() || qstkAmount.isNegative())
  //     throw new Error('qstkAmount must be positive and not zero')
  // }

  return (
    <>
      <Head>
        <title>Mint NFT</title>
      </Head>
      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="flex flex-row items-center justify-between">
          <Title>Create Your own Quiver Emotional NFT</Title>
          <Stepper step={mintStep} onChangeStep={(step) => setMintStep(step)} />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-8">
            <NFTCard
              size="big"
              changePercentage={changePercentage}
              favcoin={favCoins[coinIndex]}
              ethPrice={bnToText(nftPrice)}
              metadata={{
                name: nftName,
                description: nftDescription,
                image: characters[characterId].emotions.normal, // TODO: confirm?
                external_url: '/', // TODO: confirm?
                attributes: [
                  {
                    trait_type: Traits.Creature,
                    value: characters[characterId].creature,
                  },
                  {
                    trait_type: Traits.Skin,
                    value: characters[characterId].skin,
                  },
                  {
                    trait_type: Traits.Background,
                    value: backgroundIndex,
                  },
                  {
                    trait_type: Traits.FavCoin,
                    value: coinIndex,
                  },
                  {
                    trait_type: Traits.LockPeriod,
                    value: lockOptionId,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: qstkAmount.add(airdropAmount).toString(),
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: characters[characterId].artist.name,
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: characters[characterId].artist.wallet,
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0, // Need to be updated with actual value
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false,
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal, // Need to be updated with actual value
                  },
                ],
              }}
            />
            {mintStep === 0 && (
              <DesignWizard
                charactersData={charactersData}
                characterId={characterId}
                setCharacterId={setCharacterId}
                skinIndex={skinIndex}
                setSkinIndex={setSkinIndex}
                coinIndex={coinIndex}
                setCoinIndex={setCoinIndex}
                backgroundIndex={backgroundIndex}
                setBackgroundIndex={setBackgroundIndex}
              />
            )}
            {mintStep === 1 && (
              <StoryWizard
                nftName={nftName}
                minterName={minterName}
                nftDescription={nftDescription}
                onNftNameChange={(value: string) => setNftName(value)}
                onMinterNameChange={(value: string) => setMinterName(value)}
                onNftDescriptionChange={(value: string) =>
                  setNftDescription(value)
                }
              />
            )}
            {mintStep === 2 && (
              <AllocationWizard
                account={account || ''}
                availableMintAmount={BigNumber.from('540000')} // TODO: Get actual value from the contract
                availableFreeAllocation={BigNumber.from('1520000')} // TODO: Get actual value from the contract
                lockOptions={lockOptions}
                lockOptionId={lockOptionId}
                qstkAmount={qstkAmount}
                airdropAmount={airdropAmount}
                setLockOptionId={(id: number): void => setLockOptionId(id)}
                setQstkAmount={(amount: BigNumber): void =>
                  setQstkAmount(amount)
                }
                setAirdropAmount={(amount: BigNumber): void =>
                  setAirdropAmount(amount)
                }
              />
            )}
          </div>
          <MintSummary
            properties={summary}
            mintPrice={`${bnToText(nftPrice)} ETH`}
          >
            <Button onClick={() => handleSubmit()}>{mintSummaryBtnName}</Button>
          </MintSummary>

          {isMinting && transactionUI()}
        </div>
      </div>
    </>
  )
}
