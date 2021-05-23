import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'
import { backgrounds, characters } from '../../data/nft'
import { attribute, getCreature } from '../../lib/nft'
import { APINftMetadataResponse } from '../../types/api'
import { Creature, Skin, Traits } from '../../types/metadata'
import { Character, FavCoin, Emotion } from '../../types/nft'
import IconUptrend from '../icon/uptrend'
import IconDownTrend from '../icon/downtrend'
import IconNormalTrend from '../icon/normaltrend'
import styles from './card.module.css'

export type IProps = HTMLAttributes<any> & {
  changePercentage: number // percentage of changes
  favcoin: FavCoin
  metadata: APINftMetadataResponse
  ethPrice: string
  size?: 'big' | 'medium' | 'small'
}

function trendIcon(changePercentage: number): any {
  if (changePercentage > 0) {
    return IconUptrend
  }
  if (changePercentage < 0) {
    return IconDownTrend
  }
  return IconNormalTrend
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function emotionFromPriceChange(changePercentage: number): Emotion {
  // temporarily we strictly define emotion as specified in https://github.com/Quiver-Protocol/emotional-nft-dapp/issues/8
  // angry	< -20%
  // worry	[-20%, -10%]
  // normal	[-10%, +15%]
  // rest	[+15%, +30%]
  // happy	>+30%
  if (changePercentage < -20) {
    return Emotion.Angry
  }
  if (changePercentage < -10) {
    return Emotion.Worry
  }
  if (changePercentage < 15) {
    return Emotion.Normal
  }
  if (changePercentage < 30) {
    return Emotion.Rest
  }
  return Emotion.Happy
}

function bgColorFromPriceChange(changePercentage: number): string {
  const emotion = emotionFromPriceChange(changePercentage)
  switch(emotion) {
    case Emotion.Angry:
    case Emotion.Worry:
      return 'bg-red-100'
    case Emotion.Rest:
    case Emotion.Happy:
      return 'bg-green-100'
    case Emotion.Normal:
      return 'bg-gray-100'
  }
}

function colorFromPriceChange(changePercentage: number): string {
  const emotion = emotionFromPriceChange(changePercentage)
  switch(emotion) {
    case Emotion.Angry:
    case Emotion.Worry:
      return 'text-red-500'
    case Emotion.Rest:
    case Emotion.Happy:
      return 'text-green-500'
    case Emotion.Normal:
      return 'text-black'
  }
}

const NFTCard: FunctionComponent<IProps> =
  ({ changePercentage, favcoin, ethPrice, metadata, size, className }: IProps) => {
    const [creature, setCreature] = useState<Character>()

    useEffect(() => {
      const animalId = attribute(metadata, Traits.Creature) as Creature
      const skinId = attribute(metadata, Traits.Skin) as Skin
      let creature: Character | undefined
      if (animalId === Creature.Fish) {
        creature = characters[25]
      } else if (animalId === Creature.Minotaur) {
        creature = characters[26]
      } else {
        creature = getCreature(animalId, skinId)
      }
      if (!creature) return
      setCreature(creature)
    }, [metadata])

    if (!creature) return <div>not found</div>

    const TrendIcon = trendIcon(changePercentage)
    const backgroundSrc = backgrounds[attribute(metadata, Traits.Background) as number].image
    const emotion = emotionFromPriceChange(changePercentage)
    const bgColor = bgColorFromPriceChange(changePercentage);
    const color = colorFromPriceChange(changePercentage);

    return (
      <div className={classNames(className, 'flex flex-col space-y-8 p-8 border rounded-xl mb-auto max-w-sm', (
        size === 'big' ? 'w-96' : (
          size === 'medium' ? 'w-80' : (
            size === 'small' ? 'w-72' : ''
          )
        )
      ), styles.card)}>
        <div className="flex flex-row justify-between">
          <div className={classNames("px-2 py-1 rounded-full", bgColor, color)}>
            {capitalizeFirstLetter(emotion)}
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            <TrendIcon className="w-6 h-4"/>
            <img className="w-8 h-8" src={favcoin.meta.icon} />
          </div>
        </div>
        <div className={classNames('relative rounded-xl overflow-hidden')}>
          {
            backgroundSrc && (
              <img
                src={backgroundSrc}
                className="top-0 right-0 left-0 bottom-0"
              />
            )
          }
          <img
            src={creature.emotions[emotion]}
            className="absolute top-0 right-0 left-0 bottom-0"
          />
        </div>
        <div className="flex flex-row justify-between space-u-4">
          <div className="flex flex-col space-y-1">
            <span className="text-base leading-6 font-bold text-purple-900">
              {metadata.name}
            </span>
            <span className="text-xs leading-4 font-normal text-gray-400">
              [{attribute(metadata, Traits.Skin)} -{' '}
              {attribute(metadata, Traits.Creature)}]
            </span>
          </div>
          <div className="flex flex-row items-center justify-center space-x-1">
            <img className="h-3" src="/favcoin/eth.svg" />
            <span className="text-sm leading-6 font-bold text-purple-900 pt-px">
              {ethPrice}
            </span>
          </div>
        </div>
      </div>
    )
  }

export default NFTCard
