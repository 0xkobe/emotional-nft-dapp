import Head from 'next/head'
import React from 'react'
import { favCoins } from '../data/nft'
import { Creature, LockPeriod, Skin, Traits, Background, FavCoinEnum, DisplayType } from '../types/metadata'
import LockedTokenStat from '../components/allocation/locked-token-stat'
import Button from '../components/button/button'
import Title from '../components/title/title'
import NFTCard from '../components/nft/card'
import { Emotion } from '../types/nft'

export default function Wallet(): JSX.Element {
  return (
    <>
      <Head>
        <title>Wallet</title>
      </Head>

      <div className="flex flex-col w-full px-2 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="flex flex-row items-center justify-between">
          <Title>Your Investor Space</Title>
          <LockedTokenStat lockAmount={48000} />
        </div>
        <div className="flex flex-col w-full space-y-8">
          <div className="flex flex-row items-center justify-between">
            <span className="text-base leading-6 font-bold text-gray-500">
              Your NFT's Collection
            </span>
            <Button href="/mint">
              Mint new NFT
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-8">
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
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
                    trait_type: Traits.LockPeriod,
                    value: LockPeriod.OneCentury,
                  },
                  {
                    trait_type: Traits.LockAmount,
                    value: '0',
                  },
                  {
                    trait_type: Traits.CreatorName,
                    value: 'gopher',
                  },
                  {
                    trait_type: Traits.CreatorWallet,
                    value: '0x0992',
                  },
                  {
                    display_type: DisplayType.Date,
                    trait_type: Traits.CreatedDate,
                    value: 0
                  },
                  {
                    trait_type: Traits.Withdrawn,
                    value: false
                  },
                  {
                    trait_type: Traits.DefaultEmotion,
                    value: Emotion.Normal
                  },
                ]
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
