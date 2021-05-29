import { Meta, Story } from '@storybook/react'
import ModalProcessing, { IProps } from './modal-processing'

export default {
  title: 'ModalProcessing/ModalProcessing',
  component: ModalProcessing,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalProcessing {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
  transactionHash: '0x95d1da0ef5c68277e1198f44b3b54979954d91930ab551b85dbb3a525647f3d6',
}
