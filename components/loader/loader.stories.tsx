import { Meta, Story } from '@storybook/react'
import Loader, { IProps } from './loader'

export default {
  title: 'Loader/Loader',
  component: Loader,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Loader {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Content = Template.bind({})
Content.args = {
  title: 'hello',
  children: (
    <>
      <div className="flex flex-col">
        <span className="text-sm leading-5 font-normal text-gray-500">
          Transaction submitted with hash:
        </span>
        <span className="text-sm leading-5 font-medium text-gray-500 truncate">
          HASH
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm leading-5 font-normal text-gray-500">
          View details on Etherscan:
        </span>
        <a className="text-sm leading-5 font-medium text-purple-700 truncate">
          hello
        </a>
      </div>
    </>
  ),
}
