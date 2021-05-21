import classNames from 'classnames'
import { InputHTMLAttributes, FunctionComponent } from 'react'
import './input.css'

export type IProps = InputHTMLAttributes<{}> & {
  unit?: string
  label?: string
}

const Input: FunctionComponent<IProps> = ({ unit, label, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, 'input')}>
      <div className="input-label">{label}</div>
      <div className="input-wrapper">
        <input {...props} />
        <div className="input-unit">{unit}</div>
      </div>
    </div>
  )
}

export default Input


