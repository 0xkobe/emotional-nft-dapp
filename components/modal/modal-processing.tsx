import React, { FunctionComponent, HTMLAttributes } from 'react'
import { chain } from '../../data/chains'
import Loader from '../loader/loader'
import Modal from './modal'

export type IProps = HTMLAttributes<{}> & {
  title?: string
  transactionHash: string
  isShown?: boolean
  onRequestClose?: () => void
  onModalClose?: () => void
}

const ModalProcessing: FunctionComponent<IProps> = ({
  title,
  isShown,
  onModalClose,
  onRequestClose,
  transactionHash,
}: IProps) => {
  return (
    <Modal
      isShown={isShown}
      onModalClose={onModalClose}
      onRequestClose={onRequestClose}
    >
      <Loader title={title || 'Processing the Transaction'}>
        <div className="flex flex-col">
          <span className="text-sm leading-5 font-normal text-gray-500">
            Transaction submitted with hash:
          </span>
          <span className="text-sm leading-5 font-medium text-gray-500 truncate">
            {transactionHash}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm leading-5 font-normal text-gray-500">
            View details on Etherscan:
          </span>
          <a
            href={chain.explorerUrlForTx(transactionHash)}
            className="text-sm leading-5 font-medium text-purple-700 truncate"
          >
            {chain.explorerUrlForTx(transactionHash)}
          </a>
        </div>
      </Loader>
    </Modal>
  )
}

export default ModalProcessing
