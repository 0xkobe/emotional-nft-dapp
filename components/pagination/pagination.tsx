import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import IconNext from '../icon/next'
import IconPrev from '../icon/prev'

export type IProps = AnchorHTMLAttributes<{}> & {
  total: number
  current: number
  onPrev: () => void
  onNext: () => void
}

const Pagination: FunctionComponent<IProps> = ({
  className,
  total,
  current,
}: IProps) => {
  return (
    <div className={classNames(className, 'flex flex-row space-x-8')}>
      <div
        className={classNames(
          'flex flex-row space-x-3 items-center cursor-pointer',
          current > 0 ? 'text-gray-500' : 'text-gray-200 cursor-not-allowed',
        )}
      >
        <IconPrev
          className={classNames(
            'stroke-current',
            current > 0 ? 'text-gray-500' : 'text-gray-200',
          )}
        />
        <span className="text-sm leading-5 font-medium">Previous</span>
      </div>
      <div
        className={classNames(
          'flex flex-row space-x-3 items-center cursor-pointer',
          total > current + 1
            ? 'text-gray-500'
            : 'text-gray-200 cursor-not-allowed',
        )}
      >
        <span className="text-sm leading-5 font-medium">Next</span>
        <IconNext
          className={classNames(
            'stroke-current',
            total > current + 1 ? 'text-gray-500' : 'text-gray-200',
          )}
        />
      </div>
    </div>
  )
}

export default Pagination
