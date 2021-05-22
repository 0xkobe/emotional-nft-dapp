import classNames from 'classnames'
import { InputHTMLAttributes, FunctionComponent } from 'react'
import styles from './input.module.css'

export type IProps = InputHTMLAttributes<{}> & {
  unit?: string
}

const Input: FunctionComponent<IProps> = ({ unit, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, styles.input)}>
      <div className={styles.inputWrapper}>
        <input {...props} />
        <div className={styles.inputUnit}>{unit}</div>
      </div>
    </div>
  )
}

export default Input
