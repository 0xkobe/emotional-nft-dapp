import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import { useKeyDown } from '../../hooks/UI/useKeyDown'
import styles from './modal.module.css'

export type IProps = HTMLAttributes<{}> & {
  isShown?: boolean
  children: ReactNode
  onRequestClose: () => void
  onModalClose: () => void
}

const Modal: FunctionComponent<IProps> = ({
  className,
  isShown,
  children,
  onModalClose,
  onRequestClose,
  ...props
}: IProps) => {
  const [closeRequestSent, setCloseRequest] = useState(false)
  useEffect(() => {
    if (closeRequestSent && isShown === false) {
      onModalClose()
    }
  }, [isShown, closeRequestSent, onModalClose])

  const requestClose = () => {
    setCloseRequest(true)
    onRequestClose()
  }

  useKeyDown('Escape', () => isShown && requestClose())

  let modal = (
    <React.Fragment>
      <div className={styles.backdrop} onClick={requestClose} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </React.Fragment>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}

export default Modal
