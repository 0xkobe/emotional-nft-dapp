import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'

export type IProps = HTMLAttributes<{}> & {
  title: string
  content: JSX.Element
}

const Metamask: FunctionComponent<IProps> = ({
  title,
  content,
  children,
  className,
}: IProps) => {
  return (
    <div
      className={classNames(
        'flex flex-col w-80 text-center mx-auto',
        className,
      )}
    >
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full">
          <img src="/ethereum.svg" className="m-2 w-16 h-16" />
        </div>
      </div>
      <div className="flex flex-col space-y-4 mt-8">
        <h1 className="text-lg leading-6 font-semibold text-purple-900">
          {title}
        </h1>
        {content && (
          <div className="flex flex-col text-sm leading-5 font-normal text-gray-500">
            {content}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Metamask
