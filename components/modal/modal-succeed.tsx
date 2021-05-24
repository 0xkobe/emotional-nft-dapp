import React, { FunctionComponent, HTMLAttributes } from 'react'
import Modal from './modal'
import IconCheck from '../icon/check'

export type IProps = HTMLAttributes<{}> & {
  nftId: number,
  isShown?: boolean
  onRequestClose: () => void
  onModalClose: () => void
}

const ModalSucceed: FunctionComponent<IProps> = ({ nftId, isShown, onModalClose, onRequestClose }: IProps) => {
  return (
      <Modal isShown={isShown} onModalClose={onModalClose} onRequestClose={onRequestClose} >
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-5 items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-3xl">
              <IconCheck className="w-5 h-5 stroke-current text-green-600" />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-lg leading-6 font-semibold text-gray-500 text-center">
                Transaction Succeeded
              </span>
              <span className="text-sm leading-5 font-normal text-gray-500 text-center">
                Token successfully created with id {nftId}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center w-80 p-4 space-x-4 bg-green-50 rounded-2xl">
            <span>🎉</span>
            <span className="text-sm leading-5 font-medium text-green-800">
              You will be redirected in a few seconds to your Investor Space
            </span>
          </div>
        </div>
      </Modal>
  )
}

export default ModalSucceed
