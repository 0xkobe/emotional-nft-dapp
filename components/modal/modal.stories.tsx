import { Meta, Story } from '@storybook/react'
import Modal, { IProps } from './modal'

export default {
  title: 'Modal/Modal',
  component: Modal,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  isShown: true,
  children: (
    <div>
      <h1>Modal basic</h1>
    </div>
  ),
  onRequestClose: console.log,
  onModalClose: console.log,
}
