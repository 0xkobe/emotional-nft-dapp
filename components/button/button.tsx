import classNames from 'classnames'
import Link from 'next/link'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'

export type IProps = AnchorHTMLAttributes<{}> & {
  disabled?: boolean
  link?: boolean
}

const Button: FunctionComponent<IProps> = ({
  disabled,
  onClick,
  href,
  link,
  className,
  ...rest
}) => {
  function _button() {
    return (
      <a
        className={classNames(
          'text-sm leading-5 font-medium shadow rounded-2xl px-4 py-2 w-full text-center block',
          disabled
            ? 'bg-white border border-purple-100 text-purple-100'
            : 'bg-purple-700 text-white hover:bg-purple-800 hover:shadow-md',
          (onClick || href) && 'cursor-pointer',
          className,
        )}
        href={href}
        onClick={onClick}
        {...rest}
      ></a>
    )
  }

  return link && href ? <Link href={href}>{_button()}</Link> : _button()
}

export default Button
