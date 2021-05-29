import { Meta, Story } from '@storybook/react'
import ModalInstallMetamask, { IProps } from './modal-install-metamask'

export default {
  title: 'Modal/ModalInstallMetamask',
  component: ModalInstallMetamask,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalInstallMetamask {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
}
