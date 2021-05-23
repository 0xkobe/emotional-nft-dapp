import { Meta, Story } from '@storybook/react'
import ModalSucceed, { IProps } from './modal-succeed'

export default {
  title: 'ModalSucceed/ModalSucceed',
  component: ModalSucceed,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <ModalSucceed {...args} />

export const Default = Template.bind({})
Default.args = {  
  isShown: true,
  onRequestClose: (): void => {},
  onModalClose: (): void => {},
}
