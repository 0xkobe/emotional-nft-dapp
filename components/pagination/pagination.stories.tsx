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
  hasPrev: false,
  hasNext: true,
}

export const PrevAvailable = Template.bind({})
PrevAvailable.args = {
  hasPrev: true,
  hasNext: false,
}

export const AllAvailable = Template.bind({})
AllAvailable.args = {
  hasPrev: true,
  hasNext: true,
}
