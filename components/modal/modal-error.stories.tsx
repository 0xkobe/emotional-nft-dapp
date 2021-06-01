import { Meta,Story } from '@storybook/react'
import ModalError,{ IProps } from './modal-error'

export default {
  title: 'Modal/ModalError',
  component: ModalError,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalError {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
  error: new Error(
    'MetaMask Message Signature: User denied message signature.',
  ),
}
