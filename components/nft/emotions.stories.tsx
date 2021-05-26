import { Meta, Story } from '@storybook/react'
import { Emotion } from '../../types/nft'
import NFTEmotions, { IProps } from './emotions'

export default {
  title: 'NFT/NFTEmotions',
  component: NFTEmotions,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <NFTEmotions {...args} />

export const Angry = Template.bind({})
Angry.args = {
  current: Emotion.Happy,
  onChange: console.log,
}
