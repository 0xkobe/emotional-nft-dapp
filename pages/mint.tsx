import Head from 'next/head'
import { useState } from 'react'
import { favCoins } from '../data/nft'
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

export default function Mint(): JSX.Element {
  const [mintStep, setMintStep] = useState(0)

  return (
    <>
      <Head>
        <title>Mint NFT</title>
      </Head>
      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="flex flex-row items-center justify-between">
          <Title text="Create Your own Quiver Emotional NFT"></Title>
          <Stepper step={mintStep} onChangeStep={(step) => setMintStep(step)}/>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-8">
            <NFTCard
              changePercentage={-20}
              favcoin={favCoins[0]}
              ethPrice="0.8429"
              metadata={{
                name: 'bear',
                description: 'Gopher bear',
                image: 'string', // TODO: what is image here?
                external_url: 'string', // TODO: what is external_url here?
                attributes: [
                  {
                    trait_type: Traits.Creature,
                    value: Creature.Bear,
                  },
                  {
                    trait_type: Traits.Skin,
                    value: Skin.Silver,
                  },
                  {
                    trait_type: Traits.Background,
                    value: Background.NoCloudNightSky,
                  },
                  {
                    trait_type: Traits.FavCoin,
                    value: FavCoinEnum.MATIC,
                  },
                  {
                    trait_type: Traits.Lock,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                ]
              }}
            />
            {
              mintStep === 0 && <DesignWizard/>
            }
            {
              mintStep === 1 && <StoryWizard/>
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
                      duration: 12*30*24*3600,
                      discount: 50,
                      minAmount: BigNumber.from(1000),
                      maxAmount: BigNumber.from(2000),
                    },
                    {
                      id: 2,
                      description: "",
                      duration: 6*30*24*3600,
                      discount: 30,
                      minAmount: BigNumber.from(2000),
                      maxAmount: BigNumber.from(3000),
                    },
                    {
                      id: 3,
                      description: "",
                      duration: 3*30*24*3600,
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
            properties={[
              {
                title: "Design Properties",
                keyValues: [
                  {
                    key: "Animal",
                    value: "Bear",
                  },
                  {
                    key: "Skin",
                    value: "Gold",
                  },
                  {
                    key: "FavCoin",
                    value: "Bitcoin",
                  },
                  {
                    key: "Background",
                    value: "Sunrise",
                  },
                ]
              }
            ]}
            mintPrice="1.4761 ETH"
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
