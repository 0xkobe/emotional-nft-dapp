import { ExclamationCircleIcon } from '@heroicons/react/outline'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import Modal from './modal'

export type IProps = HTMLAttributes<{}> & {
  error: Error | string
  isShown?: boolean
  onRequestClose?: () => void
  onModalClose?: () => void
}

const ModalError: FunctionComponent<IProps> = ({
  error,
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
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-3xl">
            <ExclamationCircleIcon className="w-5 h-5 stroke-current text-red-600" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-lg leading-6 font-semibold text-purple-900 text-center">
              An error occurred
            </span>
            <span className="text-sm leading-5 font-normal text-gray-500 text-center max-w-sm">
              {typeof error === 'string' ? error : error.message}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalError
