import React, { FunctionComponent, HTMLAttributes } from 'react'
import IconSpinner from '../icon/spinner'

export type IProps = HTMLAttributes<{}> & {
  text?: string
}

const Loader: FunctionComponent<IProps> = ({ text }: IProps) => {
  return (
    <div className="flex flex-col space-y-8 w-80 text-center mx-auto">
      <div className="flex justify-center">
        <IconSpinner />
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg leading-6 font-semibold text-purple-900">
          {text || 'Loading...'}
        </h1>
      </div>
    </div>
  )
}

export default Loader
