import { Meta, Story } from '@storybook/react'
import Select, { IProps } from './select'

export default {
  title: 'Select/Select',
  component: Select,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Select {...args} />

export const Default = Template.bind({})

export const WithIcon = Template.bind({})
WithIcon.args = {
  placeholder: 'Select skin',
  options: [
    { icon: '/favcoin/btc.svg', text: 'Bronze' },
    { icon: '/favcoin/btc.svg', text: 'Diamond' },
    { icon: '/favcoin/btc.svg', text: 'Silver' },
    { icon: '/favcoin/btc.svg', text: 'Gold' },
    { icon: '/favcoin/btc.svg', text: 'Platinum' },
  ],
  selectedIndex: 1,
  onSelectOption: (_, __): void => { }
}

export const WithNoIcon = Template.bind({})
WithNoIcon.args = {
  placeholder: 'Select skin',
  options: [
    { icon: '', text: 'Bronze' },
    { icon: '', text: 'Diamond' },
    { icon: '', text: 'Silver' },
    { icon: '', text: 'Gold' },
    { icon: '', text: 'Platinum' },
  ],
  selectedIndex: 1,
  onSelectOption: (_, __): void => { }
}