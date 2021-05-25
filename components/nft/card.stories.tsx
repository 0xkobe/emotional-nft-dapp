import { BigNumber } from '@ethersproject/bignumber'
import { Meta, Story } from '@storybook/react'
import { favCoins } from '../../data/nft'
import {
  Background,
  Creature,
  DisplayType,
  FavCoinEnum,
  LockPeriod,
  Skin,
  Traits,
} from '../../types/metadata'
import { Emotion } from '../../types/nft'
import Card, { IProps } from './card'

export default {
  title: 'NFT/Card',
  component: Card,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Card {...args} />

export const Angry = Template.bind({})
Angry.args = {
  changePercentage: -20,
  favcoin: favCoins[0],
  ethPrice: '0.8429',
  metadata: {
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
        value: BigNumber.from(10),
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
        value: Date.now(),
      },
      {
        trait_type: Traits.Withdrawn,
        value: false,
      },
      {
        trait_type: Traits.DefaultEmotion,
        value: Emotion.Angry,
      },
    ],
  },
}

export const Happy = Template.bind({})
Happy.args = {
  changePercentage: 20,
  favcoin: favCoins[0],
  ethPrice: '0.8429',
  metadata: {
    name: 'bear',
    description: 'icrabbit bear',
    image: 'string',
    external_url: 'string',
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
        value: Background.None,
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
        value: BigNumber.from(10),
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
        value: Date.now(),
      },
      {
        trait_type: Traits.Withdrawn,
        value: false,
      },
      {
        trait_type: Traits.DefaultEmotion,
        value: Emotion.Happy,
      },
    ],
  },
}

export const Normal = Template.bind({})
Normal.args = {
  changePercentage: 0,
  favcoin: favCoins[0],
  ethPrice: '0.8429',
  metadata: {
    name: 'bear',
    description: 'icrabbit bear',
    image: 'string',
    external_url: 'string',
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
        value: Background.None,
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
        value: BigNumber.from(10),
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
        value: Date.now(),
      },
      {
        trait_type: Traits.Withdrawn,
        value: false,
      },
      {
        trait_type: Traits.DefaultEmotion,
        value: Emotion.Normal,
      },
    ],
  },
}
