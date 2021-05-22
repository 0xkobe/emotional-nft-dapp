import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'

export type IProps = HTMLAttributes<{}> & {
  text: string
}

const Title: FunctionComponent<IProps> = ({ text, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, "text-xl leading-7 font-bold text-gray-500")}>
      {text}
    </div>
  )
}

export default Title
