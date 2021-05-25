import React, { FunctionComponent, HTMLAttributes } from 'react'
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
      <div className={styles.processing}>
        <div className={styles.spinner}>
          <IconSpinner />
        </div>
        <h1 className={styles.processingTitle}>Processing the Transaction</h1>
        <p className={styles.processingBody}>
          Transaction submitted with hash: {transactionHash}
        </p>
        <p className={styles.processingFooter}>
          View details on Etherscan:
          <br /> https://etherscan.com/tx/{transactionHash}
        </p>
      </div>
    </Modal>
  )
}

export default ModalProcessing
