import { Meta, Story } from '@storybook/react'
import BackgroundView, { IProps } from './background-view'
import { backgrounds } from '../../data/nft'

export default {
  title: 'Gallery/BackgroundView',
  component: BackgroundView,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <BackgroundView {...args} />

export const Default = Template.bind({})
Default.args = {
  backgrounds: [
    {
      id: 1,
      name: "Sunrise Boat",
      image: backgrounds[1],
    },
    {
      id: 2,
      name: "Noon Boat",
      image: backgrounds[2],
    },
    {
      id: 3,
      name: "Evening Boat",
      image: backgrounds[3],
    },
    {
      id: 4,
      name: "Night Boat",
      image: backgrounds[4],
    },
    {
      id: 5,
      name: "Bright Night Sky Moon",
      image: backgrounds[5],
    },
    {
      id: 6,
      name: "Cloudy Night Sky",
      image: backgrounds[6],
    },
    {
      id: 7,
      name: "No Cloudy Night Sky",
      image: backgrounds[7],
    },
    {
      id: 8,
      name: "Rainy Night Sky",
      image: backgrounds[8],
    },
  ],
  selectedIndex: 3,
  onChange: (index: number): void => {}
}
