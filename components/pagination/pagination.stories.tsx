import { Meta, Story } from '@storybook/react'
import Pagination, { IProps } from './pagination'

export default {
  title: 'Pagination/Pagination',
  component: Pagination,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {}

export const NextAvailable = Template.bind({})
NextAvailable.args = {
  total: 10,
  current: 0,
}

export const PrevAvailable = Template.bind({})
PrevAvailable.args = {
  total: 10,
  current: 9,
}

export const AllAvailable = Template.bind({})
AllAvailable.args = {
  total: 10,
  current: 5,
}
