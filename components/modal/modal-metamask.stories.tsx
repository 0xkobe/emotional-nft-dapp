import { Meta, Story } from '@storybook/react'
import ModalMetamask, { IProps } from './modal-metamask'
import Button from '../button/button'

export default {
  title: 'Modal/ModalMetamask',
  component: ModalMetamask,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalMetamask {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Connect to Your Wallet',
  content: <>To use Quiver Emotional NFTs DApp you need to sign in to your MetaMask wallet.</>,
  children: <a className="text-sm leading-5 font-medium shadow rounded-2xl px-8 py-3 w-full text-center block bg-purple-700 text-white">Sign In</a>,
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
}
