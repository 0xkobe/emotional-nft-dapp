import classNames from 'classnames'
import { FunctionComponent, InputHTMLAttributes } from 'react'
import styles from './input.module.css'

export type IProps = InputHTMLAttributes<{}> & {
  unit?: string
  isError?: boolean
}

const Input: FunctionComponent<IProps> = ({
  unit,
  isError,
  className,
  ...props
}: IProps) => {
  return (
    <div className={classNames(className, styles.input)}>
      <div className={styles.inputWrapper}>
        <input
          className={classNames(isError ? 'border-red-500' : 'border-gray-300')}
          {...props}
        />
        <div className={styles.inputUnit}>{unit}</div>
      </div>
    </div>
  )
}

export default Input
