import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import styles from './button.module.css'

export type IProps = AnchorHTMLAttributes<{}> & {}

const Button: FunctionComponent<IProps> = (props) => {
  return (
    <a
      className={classNames(
        'bg-primary shadow-sm py-2 px-4 rounded-lg text-sm leading-5 font-medium text-white',
        props.className,
        styles.button,
      )}
      {...props}
    ></a>
  )
}

export default Button
