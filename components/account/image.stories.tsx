import { Meta, Story } from '@storybook/react'
import Image, { defaultSize, IProps } from './image'

export default {
  title: 'Account/Image',
  component: Image,
  argTypes: {
    account: {},
    size: { defaultValue: defaultSize, control: 'number' },
  },
} as Meta

const Template: Story<IProps> = (args) => <Image {...args} />

export const Default = Template.bind({})
Default.args = {
  account: '0x4041b3f87630b5b8a56f8db8a612e256a2290505',
}

export const Small = Template.bind({})
Small.args = {
  account: '0x4041b3f87630b5b8a56f8db8a612e256a2290505',
  size: 16,
}

export const Large = Template.bind({})
Large.args = {
  account: '0x4041b3f87630b5b8a56f8db8a612e256a2290505',
  size: 64,
}
