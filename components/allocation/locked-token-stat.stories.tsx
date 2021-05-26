import { BigNumber } from '@ethersproject/bignumber'
import { Meta, Story } from '@storybook/react'
import LockedTokenStat, { IProps } from './locked-token-stat'

export default {
  title: 'Allocation/LockedTokenStat',
  component: LockedTokenStat,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <LockedTokenStat {...args} />

export const Default = Template.bind({})
Default.args = {
  lockAmount: BigNumber.from(48000),
}
