import { Meta, Story } from '@storybook/react'
import Stepper, { IProps } from './stepper'

export default {
  title: 'Stepper/Stepper',
  component: Stepper,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Stepper {...args} />

export const Default = Template.bind({})
Default.args = {
  currentStep: 1,
  steps: ['Step 1', 'Step 2', 'Step 3'],
}
