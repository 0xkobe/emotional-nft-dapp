import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import Tooltip from '../tooltip/tooltip'

export type IProps = HTMLAttributes<{}> & {
  icon?: string
  text?: string
  fullRounded?: boolean
}

const IconText: FunctionComponent<IProps> = ({
  icon,
  text,
  fullRounded,
}: IProps) => {
  return (
    <Tooltip
      tooltip={text}
      className="inline-flex"
      tooltipClassName="text-center transform -translate-x-1/2"
    >
      <img
        className={classNames(
          'w-8 h-8 ring-1 ring-purple-100 overflow-hidden',
          fullRounded ? 'rounded-full' : 'rounded-lg',
        )}
        src={icon}
      />
      {}
    </Tooltip>
  )
}

export default IconText
