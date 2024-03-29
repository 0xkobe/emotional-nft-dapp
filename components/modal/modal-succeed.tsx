import { CheckIcon } from '@heroicons/react/outline'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import Button from '../button/button'
import Modal from './modal'

export type IProps = HTMLAttributes<{}> & {
  nftId: string
  isShown?: boolean
  onRequestClose?: () => void
  onModalClose?: () => void
}

const ModalSucceed: FunctionComponent<IProps> = ({
  nftId,
  isShown,
  onModalClose,
  onRequestClose,
}: IProps) => {
  return (
    <Modal
      isShown={isShown}
      onModalClose={onModalClose}
      onRequestClose={onRequestClose}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-5 items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-3xl">
            <CheckIcon className="w-5 h-5 stroke-current text-green-600" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-lg leading-6 font-semibold text-purple-900 text-center">
              Transaction Succeeded
            </span>
            <span className="text-sm leading-5 font-normal text-gray-500 text-center">
              Token successfully created with{' '}
              <span className="font-semibold">id {nftId}</span>
            </span>
          </div>
        </div>
        <Button link href={`/nfts/${nftId}`}>
          View your NFT
        </Button>
      </div>
    </Modal>
  )
}

export default ModalSucceed
