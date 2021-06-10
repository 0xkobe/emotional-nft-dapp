import { InformationCircleIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import { favCoins } from '../../data/favCoins'
import { backgrounds, skins } from '../../data/nft'
import { Emotion } from '../../types/nft'
import { CharacterOption } from '../../types/options'
import BackgroundView from '../gallery/background-view'
import CharacterView from '../gallery/character-view'
import Select from '../select/select'
import Tooltip from '../tooltip/tooltip'

export type IProps = HTMLAttributes<{}> & {
  charactersData?: CharacterOption[]
  characterId?: number
  setCharacterId?: (index: number) => void
  skinIndex?: number
  setSkinIndex?: (index: number) => void
  coinIndex: number
  setCoinIndex: (index: number) => void
  backgroundIndex?: number
  setBackgroundIndex: (index: number) => void
  defaultEmotion?: Emotion
  setDefaultEmotion?: (emotion: Emotion) => void
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
    defaultEmotion,
    setCharacterId,
    setSkinIndex,
    setCoinIndex,
    setBackgroundIndex,
    setDefaultEmotion,
  } = props

  const emotions = Object.values(Emotion)

  return (
    <div className={classNames('flex flex-col space-y-8', className)}>
      {charactersData && setCharacterId && (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center space-x-2 text-base leading-6 font-medium text-purple-900">
            <span>Animal Set</span>
            <Tooltip
              tooltip="Select your favorite creature to be appear in your NFT"
              tooltipClassName="-left-20 w-40"
            >
              <InformationCircleIcon className="w-4 h-4" />
            </Tooltip>
          </div>
          <CharacterView
            characters={charactersData}
            selectedCharacterId={characterId}
            onChange={(id: number) => setCharacterId(id)}
          />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skinIndex !== undefined && setSkinIndex && (
          <div className="flex flex-col space-y-4">
            <div className="text-base leading-6 font-medium text-purple-900">
              Animal Skin
            </div>
            <Select
              className="w-full"
              placeholder="Select skin"
              options={skins.map((val) => ({ icon: val.icon, text: val.skin }))}
              selectedIndex={skinIndex}
              onSelectOption={(_, index: number) => setSkinIndex(index)}
            />
          </div>
        )}
        {defaultEmotion && setDefaultEmotion && (
          <div className="flex flex-col space-y-4">
            <div className="text-base leading-6 font-medium text-purple-900">
              Default emotion
            </div>
            <Select
              className="w-full"
              placeholder="Select skin"
              options={emotions.map((emotion) => ({
                text: emotion,
              }))}
              selectedIndex={emotions.findIndex(
                (emotion) => emotion === defaultEmotion,
              )}
              onSelectOption={(_, index: number) =>
                setDefaultEmotion(emotions[index])
              }
            />
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center space-x-2 text-base leading-6 font-medium text-purple-900">
            <span>Favorite Coin</span>
            <Tooltip
              tooltip="Select one of your favorite coins in the list, upgrade price is expensive and you can select the best one in this step. NFT will track your favorite coin and provide you with changed emotion by 24 hour price changes."
              tooltipClassName="-left-32 w-64"
            >
              <InformationCircleIcon className="w-4 h-4" />
            </Tooltip>
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
        <div className="text-base leading-6 font-medium text-purple-900">
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
