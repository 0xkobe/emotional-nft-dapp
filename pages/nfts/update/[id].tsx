import { BigNumber } from '@ethersproject/bignumber'
import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts'
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/button/button'
import SecondaryButton from '../../../components/button/secondary-button'
import Loader from '../../../components/loader/loader'
import MintSummary from '../../../components/mint-summary/mint-summary'
import DesignWizard from '../../../components/mint-wizard/design-wizard'
import StoryWizard from '../../../components/mint-wizard/story-wizard'
import ModalError from '../../../components/modal/modal-error'
import ModalMetamask from '../../../components/modal/modal-metamask'
import ModalProcessing from '../../../components/modal/modal-processing'
import ModalTransactionSucceed from '../../../components/modal/modal-transaction-succeed'
import NFTCard from '../../../components/nft/card'
import Stepper from '../../../components/stepper/stepper'
import Title from '../../../components/title/title'
import { chain } from '../../../data/chains'
import { favCoins } from '../../../data/favCoins'
import { backgrounds } from '../../../data/nft'
import { abi, deployedAddresses } from '../../../data/smartContract'
import useContract from '../../../hooks/useContract'
import useWallet from '../../../hooks/useWallet'
import { fetchNFT, getCharacter, updateNFTOffChain } from '../../../lib/nft'
import { payloadForSignatureEIP712v4 } from '../../../lib/signature'
import { bnToText } from '../../../lib/utils'
import { QNFT, QNFTSettings } from '../../../types/contracts'
import { Emotion, NFT } from '../../../types/nft'

export default function Update(): JSX.Element {
  const router = useRouter()
  const { push: redirect } = router

  // init wallet
  const { account, signer, signTypedDataV4, error: walletError } = useWallet()

  // init QNFT smart contract
  const { contract: qnft } = useContract<QNFT>(deployedAddresses.qnft, abi.qnft)

  // init QNFTSettings smart contract
  const { contract: qnftSettings } = useContract<QNFTSettings>(
    deployedAddresses.qnftSettings,
    abi.qnftSettings,
  )

  // state
  const [isLoading, setLoading] = useState<boolean>(false)
  const [nft, setNFT] = useState<NFT>()

  // token id
  const tokenId = useMemo(() => {
    if (!router.isReady) return undefined
    if (!router.query.id) return undefined
    return BigNumber.from(router.query.id)
  }, [router])

  // load nft
  useEffect(() => {
    if (!qnft) return
    if (!tokenId) return
    setLoading(true)
    fetchNFT(qnft, tokenId)
      .then(setNFT)
      .catch(setError)
      .finally(() => setLoading(false))
    return () => {
      setNFT(undefined)
      setLoading(false)
      setError(undefined)
    }
  }, [qnft, tokenId])

  // form variables
  const [error, setError] = useState<string>()
  const [step, setStep] = useState(0)
  const [favCoinIndex, setFavCoinIndex] = useState<number>() // TODO: should not be the index
  const [backgroundIndex, setBackgroundIndex] = useState<number>() // TODO: should not be the index
  const [nftName, setNftName] = useState('')
  const [minterName, setMinterName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [timestamp, setTimestamp] = useState<number>()
  const [upgradePriceMultiplier, setUpgradePriceMultiplier] =
    useState<BigNumber>()

  // init nft data
  useEffect(() => {
    if (!nft) return

    // favCoin
    const favCoinIndex = favCoins.findIndex(
      (favCoin) => favCoin.id === nft.favCoinId,
    )
    if (favCoinIndex >= 0) setFavCoinIndex(favCoinIndex)

    // background
    const backgroundIndex = backgrounds.findIndex(
      (background) => background.id === nft.backgroundId,
    )
    if (backgroundIndex >= 0) setBackgroundIndex(backgroundIndex)

    setNftName(nft.name)
    setMinterName(nft.author)
    setNftDescription(nft.description)
  }, [nft])

  // connect walletError to error
  useEffect(() => {
    if (walletError) setError(walletError.message)
  }, [walletError])

  // fetch upgradePriceMultiplier
  useEffect(() => {
    qnftSettings
      ?.upgradePriceMultiplier()
      .then(setUpgradePriceMultiplier)
      .catch(setError)
  }, [qnftSettings])

  // calculate favCoin price
  const favCoinPrice = useMemo(() => {
    if (favCoinIndex === undefined || !nft || !upgradePriceMultiplier)
      return BigNumber.from(0)

    // check if favCoin is the same
    const nftFavCoinIndex = favCoins.findIndex(
      (favCoin) => favCoin.id === nft.favCoinId,
    )
    if (favCoinIndex === nftFavCoinIndex) return BigNumber.from(0)

    // calculate price
    return favCoins[favCoinIndex].mintPrice.mul(upgradePriceMultiplier).div(100)
  }, [favCoinIndex, nft, upgradePriceMultiplier])

  // calculate nft price
  const nftPrice = useMemo(() => {
    return favCoinPrice
  }, [favCoinPrice])

  // calculate summary
  const summary = useMemo(() => {
    const mintSummaryProperties = [
      {
        title: 'Design Properties',
        keyValues: [
          {
            key: 'FavCoin',
            value:
              favCoinIndex === undefined
                ? '-'
                : favCoins[favCoinIndex].meta.name,
          },
          {
            key: 'Background',
            value:
              backgroundIndex === undefined
                ? '-'
                : backgrounds[backgroundIndex].name,
          },
        ],
      },
    ]

    if (step > 0) {
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

    return mintSummaryProperties
  }, [favCoinIndex, backgroundIndex, step, nftName, minterName, nftDescription])

  // calculate prices
  const prices = useMemo(() => {
    return {
      title: 'Edition Price',
      keyValues: [
        {
          key: 'FavCoin',
          value: `${bnToText(favCoinPrice)} ETH`,
        },
      ],
    }
  }, [favCoinPrice])

  // calculate mint summary button name
  const mintSummaryBtnName = useMemo(() => {
    return ['Validate Design', 'Validate NFT Edition'][step]
  }, [step])

  // button handle function
  const handleSubmit = () => {
    if (step < 1) return setStep(step + 1)
    setTimestamp(Math.floor(Date.now() / 1000))
    setIsUpdating(true)
  }

  // update state variables
  const [isUpdating, setIsUpdating] = useState(false)
  const [receipt, setReceipt] = useState<ContractReceipt>()
  const [tx, setTx] = useState<ContractTransaction>()
  const [signature, setSignature] = useState<string>()
  const [metadataUpdated, setMetadataUpdated] = useState(false)

  // sign metadata
  useEffect(() => {
    if (!isUpdating) return
    if (!account) return // don't sign if account is not set
    if (backgroundIndex == undefined) return
    if (!timestamp) return
    if (!nft) return

    // generate signature
    signTypedDataV4(
      payloadForSignatureEIP712v4({
        chainId: chain.id,
        author: minterName,
        backgroundId: backgroundIndex,
        description: nftDescription,
        name: nftName,
        timestamp,
        tokenId: nft.tokenId.toString(),
        metaId: nft.metaId,
      }),
    )
      .then(setSignature)
      .catch((error) => {
        console.error('sign metadata error', error)
        setError(error.message)
        setIsUpdating(false)
      })
    return () => {
      setSignature(undefined)
    }
  }, [
    isUpdating,
    minterName,
    backgroundIndex,
    nftDescription,
    nftName,
    signTypedDataV4,
    account,
    timestamp,
    nft,
  ])

  // update metadata
  useEffect(() => {
    if (!signature) return
    if (!account) return
    if (backgroundIndex == undefined) return
    if (!timestamp) return
    if (!nft) return
    // TODO: add loader

    // update meta
    updateNFTOffChain({
      signature,
      chainId: chain.id,
      signer: account,
      author: minterName,
      backgroundId: backgroundIndex,
      description: nftDescription,
      name: nftName,
      defaultEmotion: Emotion.Normal, // FIXME: make the user choose the default emotion
      timestamp,
      metaId: nft.metaId,
      tokenId: nft.tokenId.toString(),
    })
      .then(() => {
        setMetadataUpdated(true)
      })
      .catch((error) => {
        console.error('metadata error', error)
        setError(error.message)
        setIsUpdating(false)
      })
    return () => {
      setMetadataUpdated(false)
    }
  }, [
    signature,
    account,
    minterName,
    backgroundIndex,
    nftDescription,
    nftName,
    timestamp,
    nft,
  ])

  // sign & broadcast transaction
  useEffect(() => {
    if (!qnft) return
    if (!signer) return
    if (!nft) return
    if (!favCoinIndex) return
    if (!metadataUpdated) return
    if (favCoinPrice.eq(0)) return
    // FIXME: only execute if favCoinIndex is not the same

    qnft
      .connect(signer)
      .upgradeNftCoin(nft.tokenId, favCoinIndex, {
        // TODO: this should be favCoin id
        value: nftPrice,
      })
      .then(setTx)
      .catch((error) => {
        console.error('sign and broadcast tx error', error)
        setError(error.error?.message || error.message)
        setIsUpdating(false)
      })
    return () => {
      setTx(undefined)
    }
  }, [qnft, signer, favCoinIndex, metadataUpdated, nftPrice, nft, favCoinPrice])

  // wait for receipt
  useEffect(() => {
    if (!tx) return
    tx.wait()
      .then(setReceipt)
      .catch((error) => {
        console.error('receipt error', error)
        setError(error.message)
        setIsUpdating(false)
      })
    return () => {
      setReceipt(undefined)
    }
  }, [tx])

  function transactionUI() {
    if (!isUpdating) return
    if (receipt) {
      return (
        <ModalTransactionSucceed
          title="Transaction Succeeded"
          text={<>NFT successfully edited</>}
          buttonText={<>Go back to NFT</>}
          href={`/nfts/${nft?.tokenId}`}
          onRequestClose={() => void redirect(`/nfts/${nft?.tokenId}`)}
        />
      )
    }
    if (tx) {
      return <ModalProcessing isShown={true} transactionHash={tx.hash} />
    }
    if (metadataUpdated && favCoinPrice.eq(0)) {
      return (
        <ModalTransactionSucceed
          title="Edition Succeeded"
          text={<>NFT successfully edited</>}
          buttonText={<>Go back to NFT</>}
          href={`/nfts/${nft?.tokenId}`}
          onRequestClose={() => void redirect(`/nfts/${nft?.tokenId}`)}
        />
      )
    }
    return (
      <ModalMetamask
        title="Continue on Wallet"
        content={
          <>
            Please open your Ethereum wallet and follow the instructions to
            continue the Edition process
          </>
        }
        isShown
        onRequestClose={() => setIsUpdating(false)}
      ></ModalMetamask>
    )
  }

  function errorUI() {
    if (!error) return
    return (
      <ModalError
        onRequestClose={() => setError(undefined)}
        isShown={true}
        error={error}
      />
    )
  }

  function stepUI() {
    if (favCoinIndex === undefined) return
    return [
      <DesignWizard
        coinIndex={favCoinIndex}
        setCoinIndex={setFavCoinIndex}
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
    ][step]
  }

  return (
    <>
      <Head>
        <title>Edit your NFT</title>
      </Head>
      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <SecondaryButton link href={`/nfts/${tokenId}`} shadow>
            <ArrowNarrowLeftIcon className="inline-flex w-4 h-4 mr-2" />
            <span>Cancel</span>
          </SecondaryButton>
          {/* TODO: FIX position of title */}
          <Title>Edit your NFT</Title>
          <Stepper
            className="mt-4 md:mt-0"
            currentStep={step}
            steps={['Edit the Design', 'Edit the Story']}
            onChangeStep={setStep}
          />
        </div>
        {isLoading && <Loader />}
        {nft && favCoinIndex !== undefined && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 p-8 bg-white border border-purple-100 rounded-2xl shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <NFTCard
                  previewEmotion
                  characterId={nft.characterId}
                  favCoinId={favCoinIndex}
                  backgroundId={backgroundIndex}
                  skin={getCharacter(nft.characterId).skin}
                  name={nftName}
                />
                {stepUI()}
              </div>
            </div>
            <aside>
              <MintSummary
                title="Edition Summary"
                properties={summary}
                prices={prices}
                totalPrice={`${bnToText(nftPrice)} ETH`}
              >
                <span className="cursor-pointer">
                  <Button onClick={handleSubmit}>{mintSummaryBtnName}</Button>
                </span>
              </MintSummary>
            </aside>
          </div>
        )}
        {isUpdating && transactionUI()}
        {error && errorUI()}
      </div>
    </>
  )
}
