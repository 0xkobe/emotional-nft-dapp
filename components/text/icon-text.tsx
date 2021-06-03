import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'

export type IProps = HTMLAttributes<{}> & {
  icon?: string
  text?: string
  fullRounded?: boolean
}

const IconText: FunctionComponent<IProps> = ({
  icon,
  text,
  className,
  fullRounded,
}: IProps) => {
  return (
    <div className={classNames(className, 'flex flex-row items-center')}>
      {icon && (
        <img
          className={classNames(
            'w-5 h-5 mr-2',
            'ring-1 ring-purple-100 overflow-hidden',
            fullRounded ? 'rounded-full' : 'rounded-lg',
          )}
          src={icon}
        />
      )}
      <span className="text-sm leading-5 font-medium text-purple-900">
        {text}
      </span>
    </div>
  )
}

export default IconText
