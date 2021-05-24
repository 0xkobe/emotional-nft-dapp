import { Meta, Story } from '@storybook/react'
import CharacterView, { IProps } from './character-view'
import { characters } from '../../data/nft'

export default {
  title: 'Gallery/CharacterView',
  component: CharacterView,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <CharacterView {...args} />

export const Default = Template.bind({})
Default.args = {
  characters: [
    {
      ...characters[0],
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      ...characters[5],
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      ...characters[10],
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      ...characters[15],
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      ...characters[20],
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      ...characters[25],
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      ...characters[26],
      maxSupply: 100,
      currentSupply: 100,
    }
  ],
  selectedCharacterId: 0,
  onSelectOption: (_) => { },
}
