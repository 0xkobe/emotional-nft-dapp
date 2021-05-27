import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, useState } from 'react'
import { hydrateMetadata } from '../../lib/nft'
import { Emotion, Metadata } from '../../types/nft'
import IconDownTrend from '../icon/downtrend'
import IconNormalTrend from '../icon/normaltrend'
import IconUptrend from '../icon/uptrend'
import styles from './card.module.css'
import NFTEmotions from './emotions'

export type IProps = HTMLAttributes<any> & {
  changePercentage?: number // percentage of changes
  metadata: Metadata
  size?: 'big' | 'medium' | 'small'
  isDesign?: boolean
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

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
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

export function bgColorFromEmotion(emotion: Emotion): string {
  switch (emotion) {
    case Emotion.Angry:
      return 'bg-red-50'
    case Emotion.Worry:
      return 'bg-yellow-50'
    case Emotion.Normal:
      return 'bg-gray-50'
    case Emotion.Rest:
      return 'bg-blue-50'
    case Emotion.Happy:
      return 'bg-green-50'
  }
}

export function colorFromEmotion(emotion: Emotion): string {
  switch (emotion) {
    case Emotion.Angry:
      return 'text-red-500'
    case Emotion.Worry:
      return 'text-yellow-500'
    case Emotion.Normal:
      return 'text-gray-500'
    case Emotion.Rest:
      return 'text-blue-500'
    case Emotion.Happy:
      return 'text-green-500'
  }
}

export function borderColorFromEmotion(emotion: Emotion): string {
  switch (emotion) {
    case Emotion.Angry:
      return 'border-red-500'
    case Emotion.Worry:
      return 'border-yellow-500'
    case Emotion.Normal:
      return 'border-gray-500'
    case Emotion.Rest:
      return 'border-blue-500'
    case Emotion.Happy:
      return 'border-green-500'
  }
}

const NFTCard: FunctionComponent<IProps> = ({
  changePercentage,
  metadata,
  size,
  isDesign,
  className,
}: IProps) => {
  const [emotion, setEmotion] = useState(
    isDesign ? Emotion.Normal : emotionFromPriceChange(changePercentage || 0),
  )
  const TrendIcon = trendIcon(changePercentage || 0)
  const hydratedMetadata = hydrateMetadata(metadata)

  return (
    <div className={classNames(className, 'flex flex-col mb-auto space-y-8')}>
      <div
        className={classNames(
          'flex flex-col space-y-8 p-8 border rounded-xl mb-auto max-w-sm',
          size === 'big'
            ? 'w-96'
            : size === 'medium'
            ? 'w-80'
            : size === 'small'
            ? 'w-72'
            : '',
          styles.card,
        )}
      >
        <div className="flex flex-row justify-between">
          <div
            className={classNames(
              'px-2 py-1 rounded-full',
              bgColorFromEmotion(emotion),
              colorFromEmotion(emotion),
            )}
          >
            {capitalizeFirstLetter(emotion)}
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            {!isDesign && <TrendIcon className="w-6 h-4" />}
            <img className="w-8 h-8" src={hydratedMetadata.favCoin.meta.icon} />
          </div>
        </div>
        <div className={classNames('relative rounded-xl overflow-hidden')}>
          <div className="mt-full"></div>
          {hydratedMetadata.backgroundUrl && (
            <img
              className={classNames('absolute top-0 right-0 left-0 bottom-0')}
              src={hydratedMetadata.backgroundUrl}
            />
          )}
          <img
            src={hydratedMetadata.character.emotions[emotion]}
            className={classNames('absolute top-0 right-0 left-0 bottom-0')}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-base leading-6 font-bold text-purple-900">
            {hydratedMetadata.name}
          </span>
          <span className="text-xs leading-4 font-normal text-gray-400">
            [{hydratedMetadata.character.skin} -{' '}
            {hydratedMetadata.character.creature}]
          </span>
        </div>
      </div>
      {isDesign && (
        <NFTEmotions
          current={emotion}
          onChange={(e) => {
            setEmotion(e)
          }}
        />
      )}
    </div>
  )
}

export default NFTCard
