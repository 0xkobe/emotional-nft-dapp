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
        'flex flex-col space-y-8 w-80 text-center mx-auto',
        className,
      )}
    >
      <div className="flex justify-center">
        <img src="/ethereum.svg" />
      </div>
      <div className="flex flex-col space-y-4">
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
