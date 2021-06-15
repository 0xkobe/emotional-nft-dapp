import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'
import {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { specialIds } from '../../data/nft'
import {
  getBackgroundImage,
  getCharacter,
  getEmotion,
  getFavCoin,
} from '../../lib/nft'
import { Skin } from '../../types/metadata'
import { Emotion } from '../../types/nft'
import IconAngryTrend from '../icon/angrytrend'
import IconHappyTrend from '../icon/happytrend'
import IconNormalTrend from '../icon/normaltrend'
import IconRestTrend from '../icon/resttrend'
import IconWorryTrend from '../icon/worrytrend'
import Tooltip from '../tooltip/tooltip'
import NFTEmotions from './emotions'

export type IProps = HTMLAttributes<any> & {
  tokenId?: BigNumber
  characterId?: number
  favCoinId: number
  backgroundId?: number
  skin: Skin
  name: string
  action?: ReactNode
  small?: boolean
  changePercentage?: number // percentage of changes
  previewEmotion?: boolean
  defaultEmotion: Emotion
}

function trendIconFromEmotion(emotion: Emotion, small: boolean) {
  switch (emotion) {
    case Emotion.Happy:
      return (
        <IconHappyTrend
          className={classNames(small ? 'w-4' : 'w-6 h-4')}
        ></IconHappyTrend>
      )
    case Emotion.Rest:
      return (
        <IconRestTrend
          className={classNames(small ? 'w-4' : 'w-6 h-4')}
        ></IconRestTrend>
      )
    case Emotion.Normal:
      return (
        <IconNormalTrend
          className={classNames(small ? 'w-4' : 'w-6 h-4')}
        ></IconNormalTrend>
      )
    case Emotion.Worry:
      return (
        <IconWorryTrend
          className={classNames(small ? 'w-4' : 'w-6 h-4')}
        ></IconWorryTrend>
      )
    case Emotion.Angry:
      return (
        <IconAngryTrend
          className={classNames(small ? 'w-4' : 'w-6 h-4')}
        ></IconAngryTrend>
      )
  }
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
  tokenId,
  changePercentage,
  characterId,
  favCoinId,
  backgroundId,
  name,
  skin,
  previewEmotion,
  defaultEmotion,
  action,
  small,
  className,
  ...props
}: IProps) => {
  const [emotion, setEmotion] = useState(Emotion.Normal)

  const specialAnimal = useMemo(() => {
    return (
      characterId === specialIds.Minotaur || characterId === specialIds.Fish
    )
  }, [characterId])

  useEffect(() => {
    if (changePercentage)
      return setEmotion(emotionFromPriceChange(changePercentage))
    setEmotion(defaultEmotion)
  }, [changePercentage, defaultEmotion])

  return (
    <div
      className={classNames(
        'relative flex flex-col mb-auto space-y-8',
        small && 'w-52',
        className,
      )}
      {...props}
    >
      <div
        className={classNames(
          'flex flex-col border-2 border-purple-300 rounded-2xl shadow space-y-8 hover:shadow-md',
          small ? 'p-6' : 'p-8',
          gradient(emotion),
        )}
      >
        <div className="flex flex-row justify-between">
          <div
            className={classNames(
              'px-2 py-1 rounded-full font-medium',
              small ? 'text-xs leading-4' : 'text-base leading-6',
              bgColorFromEmotion(emotion),
              colorFromEmotion(emotion),
            )}
          >
            {getEmotion(emotion).text}
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            {trendIconFromEmotion(emotion, !!small)}
            <Tooltip
              tooltip={getFavCoin(favCoinId).meta.name}
              tooltipClassName="-left-14 w-28 text-center"
            >
              <img
                className={classNames(small ? 'w-6 h-6' : 'w-8 h-8')}
                src={getFavCoin(favCoinId).meta.icon}
              />
            </Tooltip>
          </div>
        </div>
        <div
          className={classNames(
            'relative overflow-hidden border border-purple-300 rounded-xl',
          )}
        >
          <div className="mt-full"></div>
          {backgroundId !== undefined && getBackgroundImage(backgroundId) && (
            <img
              className={classNames('absolute top-0 right-0 left-0 bottom-0')}
              src={getBackgroundImage(backgroundId)}
            />
          )}
          {characterId !== undefined && (
            <img
              src={getCharacter(characterId).emotions[emotion]}
              className={classNames('absolute top-0 right-0 left-0 bottom-0')}
            />
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <span
            className={classNames(
              'font-bold text-purple-900',
              small ? 'text-base leading-6' : 'text-xl leading-7',
            )}
          >
            {name || 'My Emotional NFT'}
          </span>
          <div
            className={classNames(
              'flex flex-row justify-between font-normal text-gray-500 mt-1',
              small ? 'text-xs leading-4' : 'text-sm leading-5',
            )}
          >
            <span>[ {specialAnimal ? '-' : skin} ]</span>
            {tokenId && <span>#{tokenId.toString()}</span>}
          </div>
        </div>
        {!!action && (
          <>
            <div className="absolute -top-8 left-0 bottom-0 right-0 opacity-0 hover:opacity-100 hover:bg-opacity-75 bg-white flex justify-center items-center rounded-2xl">
              <div className="bg-purple-700 p-2 rounded-2xl text-white">
                {action}
              </div>
            </div>
          </>
        )}
      </div>
      {previewEmotion && (
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
