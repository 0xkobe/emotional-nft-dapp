import classNames from 'classnames'
import { AnchorHTMLAttributes,FunctionComponent } from 'react'

export type IProps = AnchorHTMLAttributes<{}> & {
  disabled?: boolean
}

const Button: FunctionComponent<IProps> = (props) => {
  return (
    <a
      className={classNames(
        'text-sm leading-5 font-medium shadow rounded-2xl px-4 py-2 w-full text-center block',
        props.disabled
          ? 'bg-white border border-purple-100 text-purple-100'
          : 'bg-purple-700 text-white hover:bg-purple-900 hover:shadow-md',
        props.className,
      )}
      {...props}
    ></a>
  )
}

export default Button
