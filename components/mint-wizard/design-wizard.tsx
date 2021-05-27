import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import { favCoins } from '../../data/favCoins'
import { backgrounds, skins } from '../../data/nft'
import { CharacterOption } from '../../types/options'
import BackgroundView from '../gallery/background-view'
import CharacterView from '../gallery/character-view'
import Select from '../select/select'

export type IProps = HTMLAttributes<{}> & {
  charactersData: CharacterOption[]
  characterId: number
  setCharacterId: (index: number) => void
  skinIndex: number
  setSkinIndex: (index: number) => void
  coinIndex: number
  setCoinIndex: (index: number) => void
  backgroundIndex: number
  setBackgroundIndex: (index: number) => void
}

const DesignWizard: FunctionComponent<IProps> = ({
  className,
  ...props
}: IProps) => {
  const {
    charactersData,
    characterId,
    skinIndex,
    coinIndex,
    backgroundIndex,
    setCharacterId,
    setSkinIndex,
    setCoinIndex,
    setBackgroundIndex,
  } = props

  return (
    <div className={classNames(className, 'flex flex-col space-y-8')}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">
          Animal Set
        </div>
        <CharacterView
          characters={charactersData}
          selectedCharacterId={characterId}
          onChange={(id: number) => setCharacterId(id)}
        />
      </div>
      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">
            Animal Skine
          </div>
          <Select
            className="w-full"
            placeholder="Select skin"
            options={skins.map((val) => ({ icon: val.icon, text: val.skin }))}
            selectedIndex={skinIndex}
            onSelectOption={(_, index: number) => setSkinIndex(index)}
          />
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">
            Favorite Coin
          </div>
          <Select
            className="w-full"
            placeholder="Select a coin"
            canSearch
            options={favCoins.map((val) => ({
              icon: val.meta.icon,
              text: val.meta.name,
            }))}
            selectedIndex={coinIndex}
            onSelectOption={(_, index: number) => setCoinIndex(index)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">
          Background
        </div>
        <BackgroundView
          backgrounds={backgrounds}
          selectedIndex={backgroundIndex}
          onChange={(index: number) => setBackgroundIndex(index)}
        />
      </div>
    </div>
  )
}

export default DesignWizard
