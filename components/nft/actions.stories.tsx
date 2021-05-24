import { Meta, Story } from '@storybook/react'
import NFTActions, { IProps } from './actions'

export default {
  title: 'NFT/Actions',
  component: NFTActions,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <NFTActions {...args} />

export const NftAction = Template.bind({})
NftAction.args = {
  onTransfer: () => console.log('transfer'),
  onEdit: () => console.log('edit'),
  onUpgrade: () => console.log('upgrade'),
}
