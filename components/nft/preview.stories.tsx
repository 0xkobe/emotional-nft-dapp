import { BigNumber } from '@ethersproject/bignumber'
import { Meta, Story } from '@storybook/react'
import { Skin } from '../../types/metadata'
import NFTPreview, { IProps } from './preview'

export default {
  title: 'NFT/NFTPreview',
  component: NFTPreview,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <NFTPreview {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  tokenId: BigNumber.from(1), // random value
  characterId: 12,
  favCoinId: 58,
  backgroundId: 7,
  name: 'bear', // nft name
  skin: Skin.Bronze,
}
