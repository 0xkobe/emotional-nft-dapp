import { Meta, Story } from '@storybook/react'
import CharacterView, { IProps } from './character-view'
import { characters } from '../../data/nft'
import { Creature } from '../../types/metadata'
import { capitalize } from '../../lib/utils'

export default {
  title: 'Gallery/CharacterView',
  component: CharacterView,
} as Meta<IProps>

const Template: Story<IProps> = (args) => <CharacterView {...args} />

export const Default = Template.bind({})
Default.args = {
  characters: [
    {
      id: 1,
      name: capitalize(Creature.Bull),
      image: characters[0].emotions.normal,
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      id: 2,
      name: capitalize(Creature.Bear),
      image: characters[5].emotions.normal,
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      id: 3,
      name: capitalize(Creature.Whale),
      image: characters[10].emotions.normal,
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      id: 4,
      name: capitalize(Creature.Dragon),
      image: characters[15].emotions.normal,
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      id: 5,
      name: capitalize(Creature.Deer),
      image: characters[20].emotions.normal,
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      id: 6,
      name: capitalize(Creature.Fish),
      image: characters[25].emotions.normal,
      maxSupply: 100,
      currentSupply: 100,
    },
    {
      id: 7,
      name: capitalize(Creature.Minotaur),
      image: characters[26].emotions.normal,
      maxSupply: 100,
      currentSupply: 100,
    }
  ],
  selectedIndex: 3,
  onChange: (index: number): void => {}
}
