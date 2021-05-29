import React, { FunctionComponent, HTMLAttributes } from 'react'
import Modal from './modal'

export type IProps = HTMLAttributes<{}> & {
  title: string
  content: JSX.Element
  isShown?: boolean
  onRequestClose: () => void
  onModalClose: () => void
}

const ModalConnectMetamask: FunctionComponent<IProps> = ({
  isShown,
  title,
  content,
  children,
  onModalClose,
  onRequestClose,
}: IProps) => {
  return (
    <Modal
      isShown={isShown}
      onModalClose={onModalClose}
      onRequestClose={onRequestClose}
    >
      <div className="flex flex-col space-y-8 w-80 text-center">
        <div className="flex justify-center">
          <img src="/metamask.png" />
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg leading-6 font-semibold">{title}</h1>
          {content && (
            <div className="flex flex-col text-sm leading-5 font-normal">
              {content}
            </div>
          )}
          {children && (
            <div className="flex flex-col">
              {children}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ModalConnectMetamask
