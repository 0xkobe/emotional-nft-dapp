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
  onRequestClose?: () => void
  onModalClose?: () => void
}

// TODO: recreate with https://headlessui.dev/react/dialog and tailwind
const Modal: FunctionComponent<IProps> = ({
  isShown,
  children,
  onModalClose,
  onRequestClose,
}: IProps) => {
  const [closeRequestSent, setCloseRequest] = useState(false)
  useEffect(() => {
    if (closeRequestSent && isShown === false) {
      if (onModalClose) onModalClose()
    }
  }, [isShown, closeRequestSent, onModalClose])

  const requestClose = () => {
    setCloseRequest(true)
    if (onRequestClose) onRequestClose()
  }

  useKeyDown('Escape', () => isShown && requestClose())

  const modal = (
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
