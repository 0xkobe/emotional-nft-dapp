import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'

export type IProps = HTMLAttributes<{}> & {
}

const Title: FunctionComponent<IProps> = ({ children, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, "text-xl leading-7 font-bold text-gray-500")}>
      {children}
    </div>
  )
}

export default Title
