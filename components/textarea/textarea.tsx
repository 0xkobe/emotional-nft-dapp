import classNames from 'classnames'
import { TextareaHTMLAttributes, FunctionComponent } from 'react'
import styles from './textarea.module.css'

export type IProps = TextareaHTMLAttributes<{}> & {
  label?: string
}

const TextArea: FunctionComponent<IProps> = ({ label, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, styles.textarea)}>
      <div className={styles.textareaLabel}>{label}</div>
      <div className={styles.textareaWrapper}>
        <textarea {...props} />
      </div>
    </div>
  )
}

export default TextArea
