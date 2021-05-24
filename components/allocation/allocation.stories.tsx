import { Meta, Story } from '@storybook/react'
import Allocation, { IProps } from './allocation'

export default {
  title: 'Allocation/Allocation',
  component: Allocation,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Allocation {...args} />

export const Default = Template.bind({})
Default.args = {
  lockAmount: 12000,
  createdAt: new Date("2021-06-01"),
  lockDuration: 3600*24*30*6,
}
