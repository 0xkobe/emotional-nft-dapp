import { FunctionComponent, HTMLAttributes } from 'react'
import { Emotion, NFT } from '../../types/nft'
import IconClose from '../icon/close'
import Modal from '../modal/modal'
import NFTCard from './card'

export type IProps = HTMLAttributes<any> & {
  nft: NFT
  isShown?: boolean
  onRequestClose: () => void
  onModalClose: () => void
}

const NFTPreview: FunctionComponent<IProps> = ({
  nft,
  isShown,
  onModalClose,
  onRequestClose,
}: IProps) => {
  const emotions = Object.values(Emotion)
  return (
    <Modal
      isShown={isShown}
      onModalClose={onModalClose}
      onRequestClose={onRequestClose}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row justify-between">
          <span className="text-base leading-6 font-bold text-purple-900">
            NFT Emotions Preview
          </span>
          <span onClick={onModalClose}>
            <IconClose className="text-gray-400 cursor-pointer" />
          </span>
        </div>
        <div className="flex flex-row space-x-8">
          {emotions.map((emotion) => (
            <NFTCard
              key={emotion}
              size="small"
              nft={nft}
              defaultEmotion={emotion}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default NFTPreview
