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
      <h1>
        Transaction Succeeded
      </h1>
      <p>
        Token successfully created with id 100
      </p>
    </div>
  ),
  onRequestClose: (): void => {},
  onModalClose: (): void => {},
}
