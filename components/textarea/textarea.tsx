import classNames from 'classnames'
import { FunctionComponent, TextareaHTMLAttributes } from 'react'

export type IProps = TextareaHTMLAttributes<{}> & {
  noResize?: boolean
}

const TextArea: FunctionComponent<IProps> = ({
  noResize,
  className,
  ...props
}: IProps) => {
  return (
    <textarea
      {...props}
      className={classNames(
        'border border-purple-100 shadow rounded-2xl text-sm leading-5 font-normal text-purple-900 px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 ring-purple-400',
        noResize ? 'resize-none' : '',
      )}
    />
  )
}

export default TextArea
