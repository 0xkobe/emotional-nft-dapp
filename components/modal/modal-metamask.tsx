import React, { FunctionComponent, HTMLAttributes } from 'react'
import Metamask from '../metamask/metamask'
import Modal from './modal'

export type IProps = HTMLAttributes<{}> & {
  title: string
  content: JSX.Element
  isShown?: boolean
  onRequestClose: () => void
  onModalClose: () => void
}

const ModalMetamask: FunctionComponent<IProps> = ({
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
      <Metamask title={title} content={content} children={children} />
    </Modal>
  )
}

export default ModalMetamask
