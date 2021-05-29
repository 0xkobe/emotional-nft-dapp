import React, { FunctionComponent, HTMLAttributes } from 'react'
import { chain } from '../../data/chains'
import IconSpinner from '../icon/spinner'
import Modal from './modal'
import styles from './modal.module.css'

export type IProps = HTMLAttributes<{}> & {
  transactionHash: string
  isShown?: boolean
  onRequestClose: () => void
  onModalClose: () => void
}

const ModalProcessing: FunctionComponent<IProps> = ({
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
      <div className="flex flex-col space-y-8 w-80 text-center">
        <div className="flex justify-center">
          <IconSpinner />
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg leading-6 font-semibold text-purple-900">Processing the Transaction</h1>
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
            <a href={chain.explorerUrlForTx(transactionHash)} className="text-sm leading-5 font-medium text-purple-700 truncate">
              {chain.explorerUrlForTx(transactionHash)}
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalProcessing
