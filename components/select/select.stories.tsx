import { Meta, Story } from '@storybook/react'
import Select, { IProps, Option } from './select'

export default {
  title: 'Select/Select',
  component: Select,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <Select {...args} />

export const Default = Template.bind({})

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: 'Animal Skin',
  placeholder: 'Select skin',
  options: [
    { icon: '/favcoin/btc.svg', text: 'Bronze' },
    { icon: '/favcoin/btc.svg', text: 'Diamond' },
    { icon: '/favcoin/btc.svg', text: 'Silver' },
    { icon: '/favcoin/btc.svg', text: 'Gold' },
    { icon: '/favcoin/btc.svg', text: 'Platinum' },
  ],
  selectedIndex: 1,
  onSelectOption: (option: Option, index: number): void => {}
}

export const WithNoIcon = Template.bind({})
WithNoIcon.args = {
  label: 'Animal Skin',
  placeholder: 'Select skin',
  options: [
    { icon: '', text: 'Bronze' },
    { icon: '', text: 'Diamond' },
    { icon: '', text: 'Silver' },
    { icon: '', text: 'Gold' },
    { icon: '', text: 'Platinum' },
  ],
  selectedIndex: 1,
  onSelectOption: (option: Option, index: number): void => {}
}