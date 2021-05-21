import { Meta, Story } from '@storybook/react'
import Card from './card'
import { Creature, LockPeriod, Skin, Traits, Background, FavCoinEnum, Metadata } from '../../types/metadata'

export default {
  title: 'NFT/Card',
  component: Card,
} as Meta

const Template: Story<{ metadata: Metadata }> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
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

// TODO: how should we handle transparent background?
export const EmptyBackground = Template.bind({})
EmptyBackground.args = {
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
