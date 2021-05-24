import { Meta, Story } from '@storybook/react'
import TextArea, { IProps } from './textarea'

export default {
  title: 'TextArea/TextArea',
  component: TextArea,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <TextArea {...args} />

export const Default = Template.bind({})

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: '2000',
}

export const WithValue = Template.bind({})
WithValue.args = {
  value: '2000',
}

export const WithAll = Template.bind({})
WithAll.args = {
  placeholder: '2000',
  value: '2000',
}
