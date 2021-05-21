import { Web3Provider } from '@ethersproject/providers'
import { Meta, Story } from '@storybook/react'
import { Web3ReactProvider } from '@web3-react/core'
import SocialMenu from './social-menu'

export default {
  title: 'Navigation/SocialMenu',
  component: SocialMenu,
  argTypes: {},
} as Meta

const Template: Story<{}> = (args) => (
  <Web3ReactProvider getLibrary={(x) => new Web3Provider(x)}>
    <div className="flex justify-center">
      <SocialMenu {...args} />
    </div>
  </Web3ReactProvider>
)

export const Default = Template.bind({})
