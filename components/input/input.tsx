import classNames from 'classnames'
import { FunctionComponent, InputHTMLAttributes } from 'react'

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
    <input
      className={classNames(
        'border shadow rounded-2xl text-sm leading-5 font-normal text-purple-900 px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 ring-purple-300',
        isError ? 'border-red-500' : 'border-purple-100',
        className,
      )}
      {...props}
    />
  )
}

export default Input
