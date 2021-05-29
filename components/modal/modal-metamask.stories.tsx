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
  title: 'Metamask Data',
  content: <>Please fill the information in your metamask account in order to continue the Mint process</>,
  children: <Button>Sign In</Button>,
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
}
