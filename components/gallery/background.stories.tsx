import { Meta, Story } from '@storybook/react'
import { backgrounds } from '../../data/nft'
import BackgroundView, { IProps } from './background-view'

export default {
  title: 'Gallery/BackgroundView',
  component: BackgroundView,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <BackgroundView {...args} />

export const Default = Template.bind({})
Default.args = {
  backgrounds,
  selectedIndex: 3,
  onChange: console.log,
}
