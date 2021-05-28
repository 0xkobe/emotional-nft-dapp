import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'

export type IProps = AnchorHTMLAttributes<{}> & {}

const Button: FunctionComponent<IProps> = (props) => {
  return (
    <a
      className={classNames(
        'text-sm leading-5 font-medium bg-purple-700 text-white hover:bg-purple-900 hover:shadow-md shadow rounded-2xl px-4 py-2 w-full text-center',
        props.className,
      )}
      {...props}
    ></a>
  )
}

export default Button
