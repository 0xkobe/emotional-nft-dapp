import { Meta, Story } from '@storybook/react'
import Title, { IProps } from './title'

export default {
  title: 'Title/Title',
  component: Title,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Title {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'Create your own Quiver Emotional NFT'
}
