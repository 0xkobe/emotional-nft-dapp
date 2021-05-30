import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, ReactNode, useState } from 'react'
import { getBackgroundImage, getCharacter, getFavCoin } from '../../lib/nft'
import { Emotion, NFT } from '../../types/nft'
import IconAngryTrend from '../icon/angrytrend'
import IconHappyTrend from '../icon/happytrend'
import IconNormalTrend from '../icon/normaltrend'
import IconRestTrend from '../icon/resttrend'
import IconWorryTrend from '../icon/worrytrend'
import NFTEmotions from './emotions'

export type IProps = HTMLAttributes<any> & {
  changePercentage?: number // percentage of changes
  nft: NFT
  isDesign?: boolean
  defaultEmotion?: Emotion
  action?: ReactNode
  size?: string
}

function trendIconFromEmotion(emotion: Emotion): any {
  switch (emotion) {
    case Emotion.Happy:
      return IconHappyTrend
    case Emotion.Rest:
      return IconRestTrend
    case Emotion.Normal:
      return IconNormalTrend
    case Emotion.Worry:
      return IconWorryTrend
    case Emotion.Angry:
      return IconAngryTrend
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

export function gradient(emotion: Emotion): string {
  switch (emotion) {
    case Emotion.Angry:
      return 'bg-gradient-to-t from-red-50 via-transparent to-transparent'
    case Emotion.Worry:
      return 'bg-gradient-to-t from-yellow-50 via-transparent to-transparent'
    case Emotion.Normal:
      return 'bg-gradient-to-t from-gray-50 via-transparent to-transparent'
    case Emotion.Rest:
      return 'bg-gradient-to-t from-blue-50 via-transparent to-transparent'
    case Emotion.Happy:
      return 'bg-gradient-to-t from-green-50 via-transparent to-transparent'
  }
}

const NFTCard: FunctionComponent<IProps> = ({
  changePercentage,
  nft,
  isDesign,
  defaultEmotion,
  action,
  size,
  className,
  ...props
}: IProps) => {
  const [emotion, setEmotion] = useState(
    isDesign
      ? Emotion.Normal
      : defaultEmotion || emotionFromPriceChange(changePercentage || 0),
  )
  const TrendIcon = trendIconFromEmotion(emotion)
  const favCoin = getFavCoin(nft.favCoinId)
  const backgroundSrc = getBackgroundImage(nft.backgroundId)
  const character = getCharacter(nft.characterId)

  return (
    <div
      className={classNames(
        'relative flex flex-col mb-auto space-y-8',
        size
          ? size === 'big'
            ? 'w-96'
            : size === 'medium'
            ? 'w-64'
            : 'w-52'
          : '',
        className,
      )}
      {...props}
    >
      <div
        className={classNames(
          'flex flex-col border-2 border-purple-300 rounded-2xl shadow space-y-8 hover:shadow-md',
          size !== 'big' ? 'p-6' : 'p-8',
          gradient(emotion),
        )}
      >
        <div className="flex flex-row justify-between">
          <div
            className={classNames(
              'px-2 py-1 rounded-full font-medium',
              size !== 'big' ? 'text-xs leading-4' : 'text-base leading-6',
              bgColorFromEmotion(emotion),
              colorFromEmotion(emotion),
            )}
          >
            {capitalizeFirstLetter(emotion)}
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            {!isDesign && (
              <TrendIcon
                className={classNames(size !== 'big' ? 'w-4' : 'w-6 h-4')}
              />
            )}
            <img
              className={classNames(size !== 'big' ? 'w-6 h-6' : 'w-8 h-8')}
              src={favCoin.meta.icon}
            />
          </div>
        </div>
        <div
          className={classNames(
            'relative overflow-hidden border border-purple-300 rounded-xl',
          )}
        >
          <div className="mt-full"></div>
          {backgroundSrc && (
            <img
              className={classNames('absolute top-0 right-0 left-0 bottom-0')}
              src={backgroundSrc}
            />
          )}
          <img
            src={character.emotions[emotion]}
            className={classNames('absolute top-0 right-0 left-0 bottom-0')}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span
            className={classNames(
              'font-bold text-purple-900',
              size !== 'big' ? 'text-base leading-6' : 'text-xl leading-7',
            )}
          >
            {nft.name || 'My Emotional NFT'}
          </span>
          <span
            className={classNames(
              'font-normal text-gray-500 mt-1',
              size !== 'big' ? 'text-xs leading-4' : 'text-sm leading-5',
            )}
          >
            [ {character.skin.toUpperCase()} ]
          </span>
        </div>
        {!!action && (
          <>
            <div className="absolute -top-8 left-0 bottom-0 right-0 opacity-0 hover:opacity-100 hover:bg-opacity-75 bg-white flex justify-center items-center rounded-2xl">
              {action}
            </div>
          </>
        )}
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
