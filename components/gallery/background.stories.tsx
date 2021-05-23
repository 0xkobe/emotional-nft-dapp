import { Meta, Story } from '@storybook/react'
import BackgroundView, { IProps } from './background-view'
import { backgrounds } from '../../data/nft'

export default {
  title: 'Gallery/BackgroundView',
  component: BackgroundView,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <BackgroundView {...args} />

export const Default = Template.bind({})
Default.args = {
  backgrounds,
  selectedIndex: 3,
  onSelectOption: (index: number): void => { }
}
