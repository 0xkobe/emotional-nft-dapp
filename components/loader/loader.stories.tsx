import { Meta, Story } from '@storybook/react'
import Loader, { IProps } from './loader'

export default {
  title: 'Loader/Loader',
  component: Loader,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Loader {...args} />

export const Default = Template.bind({})
Default.args = {}
