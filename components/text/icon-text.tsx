import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'

export type IProps = HTMLAttributes<{}> & {
  icon?: string
  text?: string
}

const IconText: FunctionComponent<IProps> = ({
  icon,
  text,
  className,
}: IProps) => {
  return (
    <div className={classNames(className, 'flex flex-row items-center')}>
      {icon && <img className="w-5 h-5 mr-2" src={icon} />}
      <span className="text-sm leading-5 font-medium text-gray-500">
        {text}
      </span>
    </div>
  )
}

export default IconText
