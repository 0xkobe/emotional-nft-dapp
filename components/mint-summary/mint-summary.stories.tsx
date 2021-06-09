import { Meta, Story } from '@storybook/react'
import MintSummary, { IProps } from './mint-summary'

export default {
  title: 'MintSummary/MintSummary',
  component: MintSummary,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <MintSummary {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Mint Summary',
  properties: [
    {
      title: 'Design Properties',
      keyValues: [
        {
          key: 'Animal',
          value: 'Bear',
        },
        {
          key: 'Skin',
          value: 'Gold',
        },
        {
          key: 'FavCoin',
          value: 'Bitcoin',
        },
        {
          key: 'Background',
          value: 'Sunrise',
        },
      ],
    },
    {
      title: 'Story Properties',
      keyValues: [
        {
          key: 'Name',
          value: 'Filled',
        },
        {
          key: 'Minter',
          value: 'Filled',
        },
        {
          key: 'Description',
          value: 'Filled',
        },
      ],
    },
    {
      title: 'QSTK Allocation',
      keyValues: [
        {
          key: 'Mint amount',
          value: '2,000 QSTK',
        },
        {
          key: 'Lock period',
          value: '6 months',
        },
        {
          key: 'Free allocatioin',
          value: '10,000 QSTK',
        },
        {
          key: 'Total to receive',
          value: '12,000 QSTK',
        },
      ],
    },
  ],
  prices: {
    title: 'NFT Mint Price',
    keyValues: [
      { key: 'Character', value: '1.0 ETH' },
      { key: 'FavCoin', value: '0.4761 ETH' },
      { key: 'Token', value: '0.0 ETH' },
    ],
  },
  totalPrice: '1.4761 ETH',
}
