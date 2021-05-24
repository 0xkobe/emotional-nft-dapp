import { Meta, Story } from '@storybook/react'
import BackButton, { IProps } from './back-button'

export default {
  title: 'Button/BackButton',
  component: BackButton,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <BackButton {...args}/>

export const Default = Template.bind({})
Default.args = {
  text: 'Back to your space'
}
