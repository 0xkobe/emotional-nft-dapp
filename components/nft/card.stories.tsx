import { BigNumber } from '@ethersproject/bignumber'
import { Meta, Story } from '@storybook/react'
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
  nft: {
    tokenId: BigNumber.from(1), // random value
    characterId: 12,
    favCoinId: 58,
    lockDuration: BigNumber.from(100 * 12 * 30 * 86400),
    lockAmount: BigNumber.from(10),
    createdAt: BigNumber.from(Date.now()),
    withdrawn: false,
    metaId: 1, // random id
    author: 'gopher', // author name
    backgroundId: 7,
    description: 'Gopher bear',
    name: 'bear', // nft name
    chainId: 3,
    creator: '0x0992', // creator wallet
    defaultEmotion: Emotion.Angry,
  },
}

export const Happy = Template.bind({})
Happy.args = {
  changePercentage: 20,
  nft: {
    tokenId: BigNumber.from(1), // random value
    characterId: 12,
    favCoinId: 58,
    lockDuration: BigNumber.from(100 * 12 * 30 * 86400),
    lockAmount: BigNumber.from(10),
    createdAt: BigNumber.from(Date.now()),
    withdrawn: false,
    metaId: 1, // random id
    author: 'gopher', // author name
    backgroundId: 1,
    description: 'icrabbit bear',
    name: 'bear', // nft name
    chainId: 3,
    creator: '0x0992', // creator wallet
    defaultEmotion: Emotion.Happy,
  },
}

export const Normal = Template.bind({})
Normal.args = {
  changePercentage: 0,
  nft: {
    tokenId: BigNumber.from(1), // random value
    characterId: 12,
    favCoinId: 58,
    lockDuration: BigNumber.from(100 * 12 * 30 * 86400),
    lockAmount: BigNumber.from(10),
    createdAt: BigNumber.from(Date.now()),
    withdrawn: false,
    metaId: 1, // random id
    author: 'gopher', // author name
    backgroundId: 2,
    description: 'icrabbit bear',
    name: 'bear', // nft name
    chainId: 3,
    creator: '0x0992', // creator wallet
    defaultEmotion: Emotion.Normal,
  },
}
