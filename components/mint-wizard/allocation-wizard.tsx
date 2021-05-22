import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import { characters, backgrounds } from '../../data/nft'
import { Creature } from '../../types/metadata'
import { capitalize } from '../../lib/utils'
import Select from '../select/select'
import CharacterView from '../gallery/character-view'
import BackgroundView from '../gallery/background-view'

export type IProps = HTMLAttributes<{}> & {
}

const AllocationWizard: FunctionComponent<IProps> = ({ className, ...props }: IProps) => {
  return (
    <div className={classNames(className, "flex flex-col space-y-8")}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Animal Set</div>
        <CharacterView
          characters={[
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
          ]}
          selectedIndex={3}
          onSelectOption={(index: number): void => {}}
        />
      </div>
      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Animal Skine</div>
          <Select
            className="w-full"
            placeholder="Select skin"
            options={[
              { icon: '/favcoin/btc.svg', text: 'Bronze' },
              { icon: '/favcoin/btc.svg', text: 'Diamond' },
              { icon: '/favcoin/btc.svg', text: 'Silver' },
              { icon: '/favcoin/btc.svg', text: 'Gold' },
              { icon: '/favcoin/btc.svg', text: 'Platinum' },
            ]}
            selectedIndex={1}
            onSelectOption={(option: Option, index: number): void => {}}
          />
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Favorite Coin</div>
          <Select
            className="w-full"
            placeholder="Select a coin"
            options={[
              { icon: '/favcoin/btc.svg', text: 'Bronze' },
              { icon: '/favcoin/btc.svg', text: 'Diamond' },
              { icon: '/favcoin/btc.svg', text: 'Silver' },
              { icon: '/favcoin/btc.svg', text: 'Gold' },
              { icon: '/favcoin/btc.svg', text: 'Platinum' },
            ]}
            selectedIndex={1}
            onSelectOption={(option: Option, index: number): void => {}}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Background</div>
        <BackgroundView
          backgrounds={[
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
          ]}
          selectedIndex={3}
          onSelectOption={(index: number): void => {}}
        />
      </div>
    </div>
  )
}

export default AllocationWizard