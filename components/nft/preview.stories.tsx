import { BigNumber } from '@ethersproject/bignumber'
import { Meta, Story } from '@storybook/react'
import { Emotion } from '../../types/nft'
import NFTPreview, { IProps } from './preview'

export default {
  title: 'NFT/NFTPreview',
  component: NFTPreview,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <NFTPreview {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  nft: {
    tokenId: BigNumber.from(1), // random value
    characterId: 12,
    favCoinId: 58,
    unlockTime: Date.now() + 100 * 12 * 30 * 86400,
    lockAmount: BigNumber.from(10),
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
