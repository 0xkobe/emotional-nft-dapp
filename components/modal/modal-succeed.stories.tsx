import { Meta, Story } from '@storybook/react'
import ModalSucceed, { IProps } from './modal-succeed'

export default {
  title: 'Modal/ModalSucceed',
  component: ModalSucceed,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalSucceed {...args} />

export const Default = Template.bind({})
Default.args = {
  nftId: '100',
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
}
