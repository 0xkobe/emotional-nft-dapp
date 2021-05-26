import classNames from 'classnames'
import { FunctionComponent, TextareaHTMLAttributes } from 'react'
import styles from './textarea.module.css'

export type IProps = TextareaHTMLAttributes<{}> & {
  noResize?: boolean
}

const TextArea: FunctionComponent<IProps> = ({
  noResize,
  className,
  ...props
}: IProps) => {
  return (
    <div className={classNames(className, styles.textarea)}>
      <div className={styles.textareaWrapper}>
        <textarea {...props} className={noResize ? 'resize-none' : ''} />
      </div>
    </div>
  )
}

export default TextArea
