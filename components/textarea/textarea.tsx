import classNames from 'classnames'
import { TextareaHTMLAttributes, FunctionComponent } from 'react'
import styles from './textarea.module.css'

export type IProps = TextareaHTMLAttributes<{}> & {
}

const TextArea: FunctionComponent<IProps> = ({className, ...props }: IProps) => {
  return (
    <div className={classNames(className, styles.textarea)}>
      <div className={styles.textareaWrapper}>
        <textarea {...props} />
      </div>
    </div>
  )
}

export default TextArea
