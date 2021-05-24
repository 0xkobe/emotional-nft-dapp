import { Meta, Story } from '@storybook/react'
import IconText, { IProps } from './icon-text'

export default {
  title: 'Text/IconText',
  component: IconText,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <IconText {...args} />

export const Sample1 = Template.bind({})
Sample1.args = {
  icon: '/favcoin/btc.svg',
  text: 'Bronze'
}

export const Sample2 = Template.bind({})
Sample2.args = {
  icon: '/favcoin/btc.svg',
  text: 'Diamond'
}