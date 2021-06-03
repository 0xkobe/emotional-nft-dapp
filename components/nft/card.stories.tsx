import { Meta, Story } from '@storybook/react'
import { Skin } from '../../types/metadata'
import Card, { IProps } from './card'

export default {
  title: 'NFT/Card',
  component: Card,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Card {...args} />

export const Angry = Template.bind({})
Angry.args = {
  changePercentage: -20,
  characterId: 12,
  favCoinId: 58,
  backgroundId: 7,
  skin: Skin.Bronze,
}

export const Happy = Template.bind({})
Happy.args = {
  changePercentage: 20,
  characterId: 12,
  favCoinId: 58,
  backgroundId: 7,
  skin: Skin.Bronze,
}

export const Normal = Template.bind({})
Normal.args = {
  changePercentage: 0,
  characterId: 12,
  favCoinId: 58,
  backgroundId: 7,
  skin: Skin.Bronze,
}
