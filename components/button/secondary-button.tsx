import classNames from 'classnames'
import Link from 'next/link'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'

export type IProps = AnchorHTMLAttributes<{}> & {
  link?: boolean
  disabled?: boolean
  shadow?: boolean
  active?: boolean
}

const SecondaryButton: FunctionComponent<IProps> = ({
  onClick,
  href,
  link,
  disabled,
  shadow,
  active,
  className,
  ...rest
}) => {
  function _button() {
    return (
      <a
        className={classNames(
          'text-xs leading-4 font-medium rounded-xl px-3 py-2 text-center bg-white',
          active
            ? 'border-purple-700 text-purple-700 bg-purple-50 hover:border-purple-700 hover:text-purple-700'
            : disabled
            ? 'text-purple-200 border border-purple-50'
            : 'text-purple-900 border border-purple-100 hover:border-purple-700 hover:text-purple-700',
          shadow && 'shadow-sm',
          shadow && !disabled && 'hover:shadow-md',
          (onClick || href) && !disabled && 'cursor-pointer',
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

export default SecondaryButton
