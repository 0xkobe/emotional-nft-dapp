import classNames from 'classnames'
import { InputHTMLAttributes, FunctionComponent } from 'react'
import styles from './input.module.css'

export type IProps = InputHTMLAttributes<{}> & {
  unit?: string
  label?: string
}

const Input: FunctionComponent<IProps> = ({ unit, label, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, styles.input)}>
      <div className={styles.inputLabel}>{label}</div>
      <div className={styles.inputWrapper}>
        <input {...props} />
        <div className={styles.inputUnit}>{unit}</div>
      </div>
    </div>
  )
}

export default Input
