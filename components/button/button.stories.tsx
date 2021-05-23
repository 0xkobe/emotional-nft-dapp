import { Meta, Story } from '@storybook/react'
import Button, { IProps } from './button'

export default {
  title: 'Button/Button',
  component: Button,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Button {...args}>My button</Button>

export const Default = Template.bind({})

export const WithLink = Template.bind({})
WithLink.args = {
  href: '#',
}

export const WithClick = Template.bind({})
WithClick.args = {
  onClick: console.log,
}
