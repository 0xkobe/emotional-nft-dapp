import { Meta, Story } from '@storybook/react'
import Card, { IProps } from './card'
import { favCoins } from '../../data/nft'
import { Creature, LockPeriod, Skin, Traits, Background, FavCoinEnum, Metadata } from '../../types/metadata'

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
  }
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
  }
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
  }
}
