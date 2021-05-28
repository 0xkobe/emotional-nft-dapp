import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'

export type IProps = HTMLAttributes<{}> & {}

const Title: FunctionComponent<IProps> = ({
  children,
  className,
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        'text-xl leading-7 font-bold text-purple-900',
      )}
    >
      {children}
    </div>
  )
}

export default Title
