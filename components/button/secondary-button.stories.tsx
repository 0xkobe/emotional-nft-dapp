import { Meta, Story } from '@storybook/react'
import SecondaryButton, { IProps } from './secondary-button'

export default {
  title: 'Button/Secondary',
  component: SecondaryButton,
} as Meta<IProps>

const Template: Story<IProps> = (args) => (
  <SecondaryButton {...args}>My button</SecondaryButton>
)

export const Default = Template.bind({})

export const WithLink = Template.bind({})
WithLink.args = {
  href: '#',
}

export const WithClick = Template.bind({})
WithClick.args = {
  onClick: console.log,
}
