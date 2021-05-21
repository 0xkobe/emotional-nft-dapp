import { Meta, Story } from '@storybook/react'
import Input, { IProps } from './input'

export default {
  title: 'Input/Input',
  component: Input,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Input {...args} />

export const Default = Template.bind({})

export const WithUnit = Template.bind({})
WithUnit.args = {
  unit: 'QSTK',
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: '2000',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Amount to Mint',
}

export const WithValue = Template.bind({})
WithValue.args = {
  value: '2000',
}

export const WithAll = Template.bind({})
WithAll.args = {
  label: 'Amount to Mint',
  placeholder: '2000',
  value: '2000',
  unit: 'QSTK',
}
