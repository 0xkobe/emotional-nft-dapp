import { Meta, Story } from '@storybook/react'
import { BigNumber } from 'ethers'
import Allocation, { IProps } from './allocation'

export default {
  title: 'Allocation/Allocation',
  component: Allocation,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Allocation {...args} />

export const Default = Template.bind({})
Default.args = {
  lockAmount: BigNumber.from(12000),
  unlockTime: new Date('2022-01-01'),
}
