import { Web3Provider } from '@ethersproject/providers'
import { Meta, Story } from '@storybook/react'
import { Web3ReactProvider } from '@web3-react/core'
import Navigation, { IProps } from './navigation'

export default {
  title: 'Navigation/Navigation',
  component: Navigation,
} as Meta<IProps>

const Template: Story<IProps> = (args) => (
  <Web3ReactProvider getLibrary={(x) => new Web3Provider(x)}>
    <Navigation {...args} />
  </Web3ReactProvider>
)

export const Default = Template.bind({})

export const MintSelected = Template.bind({})
MintSelected.args = {
  route: '/mint',
}
