import React, {
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'
import IconSpinner from '../icon/spinner'

export type IProps = HTMLAttributes<{}> & {
  title?: string
  content?: JSX.Element
}

const Loader: FunctionComponent<IProps> = ({
  title,
  children,
}: PropsWithChildren<any>) => {
  return (
    <div className="flex flex-col space-y-8 w-80 text-center mx-auto">
      <div className="flex justify-center">
        <IconSpinner />
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg leading-6 font-semibold text-purple-900">
          {title || 'Loading...'}
        </h1>
        {children}
      </div>
    </div>
  )
}

export default Loader
