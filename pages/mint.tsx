import Head from 'next/head'
import { useEffect, useState } from 'react'
import { backgrounds, favCoins, skins, characters, charactersSupply } from '../data/nft'
import { Creature, LockPeriod, Skin, Traits, Background, FavCoinEnum } from '../types/metadata'
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
import { Character } from '../types/nft'

export default function Mint(): JSX.Element {
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
  const [nftPrice, setNFTPrice] = useState(0)
  const [changePercentage, setChangePercentage] = useState(0)
  const [nftName, setNftName] = useState('')
  const [minterName, setMinterName] = useState('')
  const [nftDescription, setNftDescription] = useState('')

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

  let mintSummaryProperties = [
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
              ethPrice={nftPrice.toString()}
              metadata={{
                name: nftName,
                description: nftDescription,
                image: 'string', // TODO: what is image here?
                external_url: 'string', // TODO: what is external_url here?
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
                    trait_type: Traits.Lock,
                    value: LockPeriod.OneCentury, // Need to be updated with actual state variable
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: characters[characterId].artist.name,
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: characters[characterId].artist.wallet,
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
                  availableMintAmount={BigNumber.from("540000")}
                  availableFreeAllocation={BigNumber.from("1520000")}
                  lockOptions={[
                    {
                      id: 1,
                      description: "",
                      duration: 12 * 30 * 24 * 3600,
                      discount: 50,
                      minAmount: BigNumber.from(1000),
                      maxAmount: BigNumber.from(2000),
                    },
                    {
                      id: 2,
                      description: "",
                      duration: 6 * 30 * 24 * 3600,
                      discount: 30,
                      minAmount: BigNumber.from(2000),
                      maxAmount: BigNumber.from(3000),
                    },
                    {
                      id: 3,
                      description: "",
                      duration: 3 * 30 * 24 * 3600,
                      discount: 20,
                      minAmount: BigNumber.from(3000),
                      maxAmount: BigNumber.from(4000),
                    },
                  ]}
                />
              )
            }
          </div>
          <MintSummary
            properties={mintSummaryProperties}
            mintPrice={`${nftPrice.toString()} ETH`}
          >
            <Button onClick={() => {
              setMintStep(mintStep + 1)
            }}>
              Validate Design
            </Button>
          </MintSummary>
        </div>
      </div>
    </>
  )
}
