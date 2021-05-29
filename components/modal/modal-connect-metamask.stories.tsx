import { Meta, Story } from '@storybook/react'
import ModalConnectMetamask, { IProps } from './modal-connect-metamask'

export default {
  title: 'Modal/ModalConnectMetamask',
  component: ModalConnectMetamask,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalConnectMetamask {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
}
