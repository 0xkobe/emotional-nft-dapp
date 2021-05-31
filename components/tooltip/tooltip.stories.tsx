import { Meta, Story } from '@storybook/react'
import Tooltip, { IProps } from './tooltip'

export default {
  title: 'Tooltip/Tooltip',
  component: Tooltip,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Tooltip {...args}>My title</Tooltip>

export const Default = Template.bind({})
Default.args = {
  tooltip: '123'
}
