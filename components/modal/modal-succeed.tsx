import React, { FunctionComponent, HTMLAttributes } from 'react'
import Modal from './modal'
import IconCheck from '../icon/check'
import styles from './modal.module.css'

export type IProps = HTMLAttributes<{}> & {
  isShown?: boolean
  onRequestClose: () => void
  onModalClose: () => void
}

const ModalSucceed: FunctionComponent<IProps> = ({ isShown, onModalClose, onRequestClose }: IProps) => {
  return (
      <Modal isShown={isShown} onModalClose={onModalClose} onRequestClose={onRequestClose} >
        <div>
            <div className={styles.check}>
                <IconCheck />
            </div>
            <h1 className={styles.succeedTitle}>
                Transaction Succeeded
            </h1>
            <p className={styles.succeedBody}>
                Token successfully created with id 100
            </p>
            <p className={styles.succeedFooter}>
                🎉 You will be redirected in a few seconds to your Investor Space
            </p>
        </div>
      </Modal>
  )
}

export default ModalSucceed
