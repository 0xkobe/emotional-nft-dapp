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
import ModalError from '../components/modal/modal-error'
import ModalMetamask from '../components/modal/modal-metamask'
import ModalProcessing from '../components/modal/modal-processing'
import ModalSucceed from '../components/modal/modal-succeed'
import NFTCard from '../components/nft/card'
import Stepper from '../components/stepper/stepper'
import Title from '../components/title/title'
import { chain } from '../data/chains'
import { favCoins } from '../data/favCoins'
import {
  backgrounds,
  characters,
  charactersSupply,
  lockOptions,
  nonTokenMultiplier,
  qstkPrice,
  skins,
  specialIds,
  tokenMultiplier,
} from '../data/nft'
import { abi, deployedAddresses } from '../data/smartContract'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import { createNFTOffChain } from '../lib/nft'
import { payloadForSignatureEIP712v4 } from '../lib/signature'
import { bnToText } from '../lib/utils'
import { QAirdrop, QNFT, QNFTSettings, QStk } from '../types/contracts'
import { Skin } from '../types/metadata'
import { Emotion } from '../types/nft'
import { CharacterOption } from '../types/options'

export default function Mint(): JSX.Element {
  const { push: redirect } = useRouter()

  // init wallet
  const { account, activate, signer, signTypedDataV4 } = useWallet()

  // init QNFT smart contract
  const { contract: qnft } = useContract<QNFT>(deployedAddresses.qnft, abi.qnft)

  // init QSTK smart contract
  const { contract: qstk } = useContract<QStk>(deployedAddresses.qstk, abi.qstk)

  // init qAirdrop smart contract
  const { contract: qAirdrop } = useContract<QAirdrop>(
    deployedAddresses.qAirdrop,
    abi.qAirdrop,
  )

  // init qNFTSettings smart contract
  const { contract: qnftSettings } = useContract<QNFTSettings>(
    deployedAddresses.qnftSettings,
    abi.qnftSettings,
  )

  // form variables
  const [error, setError] = useState<string>()
  const [mintStep, setMintStep] = useState(0)
  const [characterId, setCharacterId] = useState(0)
  const [skinIndex, setSkinIndex] = useState(0)
  const [coinIndex, setCoinIndex] = useState(0)
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [charactersData, setCharactersData] = useState([] as CharacterOption[])
  const [nftName, setNftName] = useState('')
  const [minterName, setMinterName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [qstkAmount, setQstkAmount] = useState(BigNumber.from(0))
  const [lockOptionId, setLockOptionId] = useState(0)
  const [airdropAmount, setAirdropAmount] = useState(BigNumber.from(0))
  const [airdropSignature, setAirdropSignature] = useState<string>()
  const [airdropClaimed, setAirdropClaimed] = useState(false)
  const [availableMintAmount, setAvailableMintAmount] = useState<BigNumber>()
  const [availableFreeAllocation, setAvailableFreeAllocation] =
    useState<BigNumber>()
  const [onlyAirdropUsers, setOnlyAirdropUsers] = useState(false)

  // fetch remaining qstk
  useEffect(() => {
    if (!qnft) return
    qnft.remainingQstk().then(setAvailableMintAmount).catch(setError)
  }, [qnft])

  // fetch remaining free allocation
  useEffect(() => {
    if (!qstk) return
    qstk
      .balanceOf(deployedAddresses.qAirdrop)
      .then(setAvailableFreeAllocation)
      .catch(setError)
  }, [qstk])

  // fetch onlyAirdropUsers in qnftSettings
  useEffect(() => {
    if (!qnftSettings) return
    qnftSettings.onlyAirdropUsers().then(setOnlyAirdropUsers).catch(setError)
  }, [qnftSettings])

  const freeAllocationAmount = useMemo(() => {
    return airdropClaimed ? BigNumber.from(0) : airdropAmount
  }, [airdropAmount, airdropClaimed])

  useEffect(() => {
    if (characterId === specialIds.Minotaur) return
    if (characterId === specialIds.Fish) return
    setCharacterId(characterId - (characterId % skins.length) + skinIndex)
  }, [skinIndex]) // Shouldn't put characterId as a callback dependency

  const filteredCharacters = useMemo(() => {
    return characters.filter(
      (character) =>
        character.skin === skins[skinIndex].skin ||
        character.skin === Skin.None,
    )
  }, [skinIndex])

  useEffect(() => {
    if (!qnft) return
    Promise.all(filteredCharacters.map((x) => qnft.nftCountByCharacter(x.id)))
      .then((resCharactersSupply) => {
        setCharactersData(
          filteredCharacters.map((character, index) => ({
            ...character,
            maxSupply: charactersSupply[character.id],
            currentSupply: resCharactersSupply[index].toNumber(),
          })),
        )
      })
      .catch(setError)
  }, [qnft, filteredCharacters])

  const characterPrice = useMemo(() => {
    return characters[characterId].mintPrice.mul(nonTokenMultiplier).div(100)
  }, [characterId])

  const favcoinPrice = useMemo(() => {
    return favCoins[coinIndex].mintPrice.mul(nonTokenMultiplier).div(100)
  }, [coinIndex])

  const tokenPrice = useMemo(() => {
    return qstkAmount
      .add(freeAllocationAmount)
      .mul(qstkPrice)
      .mul(100 - lockOptions[lockOptionId].discount)
      .mul(tokenMultiplier)
      .div(10000)
      .div(BigNumber.from(10).pow(18))
  }, [freeAllocationAmount, lockOptionId, qstkAmount])

  const nftPrice = useMemo(() => {
    return characterPrice.add(favcoinPrice).add(tokenPrice)
  }, [characterPrice, favcoinPrice, tokenPrice])

  // calculate summary
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
            value: nftName ? 'filled' : '-',
          },
          {
            key: 'Minter',
            value: minterName ? 'filled' : '-',
          },
          {
            key: 'Description',
            value: nftDescription ? 'filled' : '-',
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
            value: bnToText(freeAllocationAmount),
          },
          {
            key: 'Total to receive',
            value: bnToText(qstkAmount.add(freeAllocationAmount)),
          },
        ],
      })
    }

    return mintSummaryProperties
  }, [
    characterId,
    skinIndex,
    coinIndex,
    backgroundIndex,
    mintStep,
    nftName,
    minterName,
    nftDescription,
    qstkAmount,
    lockOptionId,
    freeAllocationAmount,
  ])

  // calculate mint summary button name
  const mintSummaryBtnName = useMemo(() => {
    return ['Validate Design', 'Validate Story', 'Mint my NFT'][mintStep]
  }, [mintStep])

  // button handle function
  const handleSubmit = () => {
    if (isDisabled()) return
    if (mintStep < 2) return setMintStep(mintStep + 1)
    setIsMinting(true)
  }

  // minting state variables
  const [isMinting, setIsMinting] = useState(false)
  const [receipt, setReceipt] = useState<ContractReceipt>()
  const [tx, setTx] = useState<ContractTransaction>()
  const [signature, setSignature] = useState<string>()
  const [metaId, setMetaId] = useState<string>()

  // activate metamask when start minting
  useEffect(() => {
    if (!isMinting) return
    activate().catch((error) => {
      setError('Make sure Metamask is installed and activated')
      console.error(error)
    })
  }, [activate, isMinting])

  // sign metadata
  useEffect(() => {
    if (!isMinting) return
    if (!account) return // don't sign if account is not set

    // generate signature
    signTypedDataV4(
      payloadForSignatureEIP712v4(
        chain.id,
        minterName,
        backgroundIndex,
        nftDescription,
        nftName,
      ),
    )
      .then(setSignature)
      .catch((error) => {
        console.error('sign metadata error', error)
        setError(error.message)
        setIsMinting(false)
      })
    return () => {
      setSignature(undefined)
    }
  }, [
    isMinting,
    minterName,
    backgroundIndex,
    nftDescription,
    nftName,
    signTypedDataV4,
    account,
  ])

  // create metadata
  useEffect(() => {
    if (!signature) return
    if (!account) return
    // save meta
    // TODO: we could update the modal to display a loader
    createNFTOffChain(
      signature,
      chain.id,
      account,
      minterName,
      backgroundIndex,
      nftDescription,
      nftName,
      Emotion.Normal, // FIXME: make the user choose the default emotion
    )
      .then(setMetaId)
      .catch((error) => {
        console.error('metadata error', error)
        setError(error.message)
        setIsMinting(false)
      })
    return () => {
      setMetaId(undefined)
    }
  }, [signature, account, minterName, backgroundIndex, nftDescription, nftName])

  // sign & broadcast transaction
  useEffect(() => {
    if (!qnft) return
    if (!signer) return
    if (!metaId) return

    const qnftWithSigner = qnft.connect(signer)
    const mintPromise = airdropSignature
      ? qnftWithSigner.mintNftForAirdropUser(
          characterId,
          coinIndex,
          lockOptionId,
          metaId,
          qstkAmount,
          airdropAmount,
          airdropSignature,
          {
            value: nftPrice,
          },
        )
      : qnftWithSigner.mintNft(
          characterId,
          coinIndex,
          lockOptionId,
          metaId,
          qstkAmount,
          {
            value: nftPrice,
          },
        )

    mintPromise.then(setTx).catch((error) => {
      console.error('sign and broadcast tx error', error)
      setError(error.error?.message || error.message)
      setIsMinting(false)
    })
    return () => {
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
    airdropSignature,
    airdropAmount,
  ])

  // wait for receipt
  useEffect(() => {
    if (!tx) return
    tx.wait()
      .then(setReceipt)
      .catch((error) => {
        console.error('receipt error', error)
        setError(error.message)
        setIsMinting(false)
      })
    return () => {
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
          onRequestClose={() => {}}
          onModalClose={() => {}}
          isShown={true}
          transactionHash={tx.hash}
        />
      )
    }
    return (
      <ModalMetamask
        title="Metamask Data"
        content={
          <>
            Please fill the information in your metamask account in order to
            continue the Mint process
          </>
        }
        onRequestClose={() => {}}
        onModalClose={() => {}}
        isShown
      ></ModalMetamask>
    )
  }

  function errorUI() {
    if (!error) return
    return (
      <ModalError
        onRequestClose={() => setError(undefined)}
        onModalClose={() => {}}
        isShown={true}
        error={error}
      />
    )
  }

  function step() {
    return [
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
      />,
      <StoryWizard
        nftName={nftName}
        minterName={minterName}
        nftDescription={nftDescription}
        onNftNameChange={setNftName}
        onMinterNameChange={setMinterName}
        onNftDescriptionChange={setNftDescription}
      />,
      <AllocationWizard
        qAirdrop={qAirdrop}
        account={account || ''}
        availableMintAmount={availableMintAmount}
        availableFreeAllocation={availableFreeAllocation}
        lockOptions={lockOptions}
        lockOptionId={lockOptionId}
        qstkAmount={qstkAmount}
        freeAllocationAmount={freeAllocationAmount}
        setLockOptionId={setLockOptionId}
        setQstkAmount={setQstkAmount}
        setAirdropAmount={setAirdropAmount}
        setAirdropSignature={setAirdropSignature}
        setAirdropClaimed={setAirdropClaimed}
      />,
    ][mintStep]
  }

  function isDisabled() {
    return [
      () =>
        backgroundIndex === undefined ||
        coinIndex === undefined ||
        characterId === undefined,
      () => nftName === '' || minterName === '' || nftDescription === '',
      () =>
        lockOptionId === undefined ||
        qstkAmount === undefined ||
        qstkAmount.eq(0) ||
        (onlyAirdropUsers && !airdropSignature),
    ][mintStep]()
  }

  return (
    <>
      <Head>
        <title>Mint NFT</title>
      </Head>
      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Title>Create Your own Quiver Emotional NFT</Title>
          <Stepper
            className="mt-4 md:mt-0"
            step={mintStep}
            onChangeStep={setMintStep}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 p-8 bg-white border border-purple-100 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <NFTCard
                previewEmotion
                nft={{
                  tokenId: BigNumber.from(1), // random value
                  characterId: characterId,
                  favCoinId: coinIndex,
                  unlockTime:
                    Date.now() / 1000 + lockOptions[lockOptionId].duration,
                  lockAmount: qstkAmount.add(freeAllocationAmount),
                  withdrawn: false,
                  metaId: 0, // zero as none
                  author: minterName,
                  backgroundId: backgroundIndex,
                  description: nftDescription,
                  name: nftName, // nft name
                  chainId: chain.id,
                  creator: characters[characterId].artist.wallet, // FIXME: I don't think this is right. this should be the minter address
                  defaultEmotion: Emotion.Normal,
                }}
              />
              {step()}
            </div>
          </div>
          <aside>
            <MintSummary
              properties={summary}
              characterPrice={`${bnToText(characterPrice)} ETH`}
              favcoinPrice={`${bnToText(favcoinPrice)} ETH`}
              tokenPrice={`${bnToText(tokenPrice)} ETH`}
              mintPrice={`${bnToText(nftPrice)} ETH`}
            >
              <span className="cursor-pointer">
                <Button disabled={isDisabled()} onClick={handleSubmit}>
                  {mintSummaryBtnName}
                </Button>
              </span>
            </MintSummary>
          </aside>
        </div>
        {isMinting && transactionUI()}
        {error && errorUI()}
      </div>
    </>
  )
}
