import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { backgrounds, favCoins, skins, characters, charactersSupply, nonTokenMultiplier, qstkPrice, lockOptions, tokenMultiplier } from '../data/nft'
import { DisplayType, Skin, Traits } from '../types/metadata'
import Title from '../components/title/title'
import Stepper from '../components/stepper/stepper'
import NFTCard from '../components/nft/card'
import DesignWizard from '../components/mint-wizard/design-wizard'
import StoryWizard from '../components/mint-wizard/story-wizard'
import AllocationWizard from '../components/mint-wizard/allocation-wizard'
import MintSummary from '../components/mint-summary/mint-summary'
import Button from '../components/button/button'
import { BigNumber } from '@ethersproject/bignumber'
import useContract from '../hooks/useContract'
import { QNFT } from '../types/contracts'
import { abi, deployedAddresses, remoteConnector } from '../data/smartContract'
import { CharacterOption } from '../types/options'
import { Character, Emotion } from '../types/nft'
import { bnToText } from '../lib/utils'

export default function Mint(): JSX.Element {
  const { contract: qnft, error: qnftError, account } = useContract<QNFT>(
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
        qnft.nftCountByCharacter(characters[i].id).then(
          (val): number => val.toNumber()),
      )
    }
    const resCharactersSupply: number[] = await Promise.all(requestCharactersSupply)
    setCharactersData(characters.map((character, index) => ({
      ...character,
      maxSupply: charactersSupply[character.id],
      currentSupply: resCharactersSupply[index]
    })))
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
      const filteredCharacters = characters.filter(character => character.skin === skins[skinIndex].skin || character.skin === Skin.None)
      void getCharactersSupply(qnft, filteredCharacters)
    } catch (err) {
      console.error(' qnft getCharactersSupply fail')
    }
  }, [qnft, skinIndex])

  const nftPrice = useMemo(() => {
    const nonTokenPrice = characters[characterId].mintPrice.add(favCoins[coinIndex].mintPrice).mul(nonTokenMultiplier)
    const tokenPrice = qstkAmount.add(airdropAmount).mul(qstkPrice).mul(100 - lockOptions[lockOptionId].discount).div(100).mul(tokenMultiplier)
    return nonTokenPrice.add(tokenPrice)
  }, [airdropAmount, characterId, coinIndex, lockOptionId, qstkAmount])

  const mintSummaryProperties = [
    {
      title: "Design Properties",
      keyValues: [
        {
          key: "Animal",
          value: characters[characterId].name,
        },
        {
          key: "Skin",
          value: skins[skinIndex].skin,
        },
        {
          key: "FavCoin",
          value: favCoins[coinIndex].meta.name,
        },
        {
          key: "Background",
          value: backgrounds[backgroundIndex].name,
        },
      ]
    },
  ]

  if (mintStep > 0) {
    mintSummaryProperties.push({
      title: "Story Properties",
      keyValues: [
        {
          key: "Name",
          value: nftName,
        },
        {
          key: "Minter",
          value: minterName,
        },
        {
          key: "Description",
          value: nftDescription,
        },
      ]
    })
  }

  if (mintStep > 1) {
    mintSummaryProperties.push({
      title: "QSTK Allocation",
      keyValues: [
        {
          key: "Mint amount",
          value: bnToText(qstkAmount),
        },
        {
          key: "Lock period",
          value: lockOptions[lockOptionId].description,
        },
        {
          key: "Free allocation",
          value: bnToText(airdropAmount),
        },
        {
          key: "Total to receive",
          value: bnToText(qstkAmount.add(airdropAmount)),
        },
      ]
    })
  }

  const mintSummaryBtnName = useMemo(() => {
    if (mintStep === 0) {
      return 'Validate Design'
    }
    if (mintStep === 1) {
      return 'Validate Story'
    }
    return 'Mint my NFT'
  }, [mintStep])

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
                    value: lockOptionId
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: qstkAmount.add(airdropAmount).toString() // Need to confirm if this is correct
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
                    value: 0  // Need to be updated with actual value
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal // Need to be updated with actual value
                  },
                ]
              }}
            />
            {
              mintStep === 0 &&
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
            }
            {
              mintStep === 1 &&
              <StoryWizard
                nftName={nftName}
                minterName={minterName}
                nftDescription={nftDescription}
                onNftNameChange={(value: string) => setNftName(value)}
                onMinterNameChange={(value: string) => setMinterName(value)}
                onNftDescriptionChange={(value: string) => setNftDescription(value)}
              />
            }
            {
              mintStep === 2 && (
                <AllocationWizard
                  account={account || ''}
                  availableMintAmount={BigNumber.from("540000")}  // TODO: Get actual value from the contract
                  availableFreeAllocation={BigNumber.from("1520000")} // TODO: Get actual value from the contract
                  lockOptions={lockOptions}
                  lockOptionId={lockOptionId}
                  qstkAmount={qstkAmount}
                  airdropAmount={airdropAmount}
                  setLockOptionId={(id: number): void => setLockOptionId(id)}
                  setQstkAmount={(amount: BigNumber): void => setQstkAmount(amount)}
                  setAirdropAmount={(amount: BigNumber): void => setAirdropAmount(amount)}
                />
              )
            }
          </div>
          <MintSummary
            properties={mintSummaryProperties}
            mintPrice={`${bnToText(nftPrice)} ETH`}
          >
            <Button onClick={() => {
              setMintStep(mintStep + 1)
            }}>
              {mintSummaryBtnName}
            </Button>
          </MintSummary>
        </div>
      </div>
    </>
  )
}
