import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import { backgrounds, skins, favCoins, characters } from '../../data/nft'
import Select from '../select/select'
import CharacterView from '../gallery/character-view'
import BackgroundView from '../gallery/background-view'
import { CharacterOption } from '../../types/options'

export type IProps = HTMLAttributes<{}> & {
  charactersData: CharacterOption[]
  characterIndex: number
  setCharacterIndex: (index: number) => void
  skinIndex: number
  setSkinIndex: (index: number) => void
  coinIndex: number
  setCoinIndex: (index: number) => void
  backgroundIndex: number
  setBackgroundIndex: (index: number) => void
}

const DesignWizard: FunctionComponent<IProps> = ({ className, ...props }: IProps) => {
  const {
    charactersData,
    characterIndex,
    skinIndex,
    coinIndex,
    backgroundIndex,
    setCharacterIndex,
    setSkinIndex,
    setCoinIndex,
    setBackgroundIndex
  } = props

  return (
    <div className={classNames(className, "flex flex-col space-y-8")}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Animal Set</div>
        <CharacterView
          characters={charactersData}
          selectedIndex={charactersData.findIndex(character => character.id === characters[characterIndex].id)}
          onSelectOption={(index: number) => setCharacterIndex(charactersData[index].id)}
        />
      </div>
      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Animal Skine</div>
          <Select
            className="w-full"
            placeholder="Select skin"
            options={skins.map(val => ({ icon: val.icon, text: val.skin }))}
            selectedIndex={skinIndex}
            onSelectOption={(_, index: number) => setSkinIndex(index)}
          />
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Favorite Coin</div>
          <Select
            className="w-full"
            placeholder="Select a coin"
            options={favCoins.map(val => ({ icon: val.meta.icon, text: val.meta.name }))}
            selectedIndex={coinIndex}
            onSelectOption={(_, index: number) => setCoinIndex(index)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Background</div>
        <BackgroundView
          backgrounds={backgrounds}
          selectedIndex={backgroundIndex}
          onSelectOption={(index: number) => setBackgroundIndex(index)}
        />
      </div>
    </div>
  )
}

export default DesignWizard