import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Emotion } from '../../types/nft'
import { borderColorFromEmotion, bgColorFromEmotion, colorFromEmotion, capitalizeFirstLetter } from './card'

export type IProps = Omit<HTMLAttributes<any>, "onChange"> & {
  current: Emotion
  onChange: (emotion: Emotion) => void
}

const NFTEmotions: FunctionComponent<IProps> = ({
  current,
  onChange,
  className,
}: IProps) => {
  const emotions = Object.values(Emotion)
  return (
    <div className={classNames(className, "flex flex-col space-y-4")}>
      <span className="text-sm leading-5 font-medium text-purple-900">
        Preview the NFT Emotions
      </span>
      <div className="flex flex-row space-x-4">
        {
          emotions.map(emotion => {
            return (
              <span
                key={emotion}
                className={classNames(
                  bgColorFromEmotion(emotion),
                  colorFromEmotion(emotion),
                  borderColorFromEmotion(emotion),
                  'py-1 px-2 text-xs leading-none font-normal rounded-2xl cursor-pointer',
                  emotion === current ? 'border' : ''
                )}
                onClick={() => {
                  onChange(emotion)
                }}
              >
                { capitalizeFirstLetter(emotion) }
              </span>
            )
          })
        }
      </div>
    </div>
  )
}

export default NFTEmotions

