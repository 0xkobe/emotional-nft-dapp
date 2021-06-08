import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import { useHover } from '../../hooks/UI/userHover'

export type IProps = HTMLAttributes<{}> & {
  tooltip?: ReactNode
  tooltipClassName?: string
}

const Tooltip: FunctionComponent<IProps> = ({
  tooltip,
  tooltipClassName,
  children,
  className,
}: IProps) => {
  const [ref, isHover] = useHover<HTMLDivElement>()

  return (
    <div className={classNames(className, 'relative')}>
      <div ref={ref}>{children}</div>
      {isHover && (
        <div className="absolute left-2/4 top-1 w-0 h-full">
          <div className="relative h-full">
            <div
              className={classNames(
                'absolute p-3 mt-1 z-10 top-full bg-white border border-gray-200 rounded-2xl shadow-md text-sm leading-5 font-normal text-purple-900',
                tooltipClassName ? tooltipClassName : '-left-24 w-48',
              )}
            >
              {tooltip}
            </div>
            <div className="absolute z-20 -ml-1 top-full w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
