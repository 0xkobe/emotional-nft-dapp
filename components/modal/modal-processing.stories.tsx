import { Meta, Story } from '@storybook/react'
import ModalProcessing, { IProps } from './modal-processing'

export default {
  title: 'Modal/ModalProcessing',
  component: ModalProcessing,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalProcessing {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  onRequestClose: console.log,
  onModalClose: console.log,
}
