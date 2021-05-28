import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import IconNext from '../icon/next'
import IconPrev from '../icon/prev'

export type IProps = AnchorHTMLAttributes<{}> & {
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
}

const Pagination: FunctionComponent<IProps> = ({
  className,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: IProps) => {
  return (
    <div className={classNames(className, 'flex flex-row space-x-8')}>
      <div
        className={classNames(
          'flex flex-row space-x-3 items-center cursor-pointer',
          hasPrev ? 'text-gray-500' : 'text-gray-200 cursor-not-allowed',
        )}
        onClick={() => {
          if (hasPrev) onPrev()
        }}
      >
        <IconPrev
          className={classNames(
            'stroke-current',
            hasPrev ? 'text-gray-500' : 'text-gray-200',
          )}
        />
        <span className="text-sm leading-5 font-medium">Previous</span>
      </div>
      <div
        className={classNames(
          'flex flex-row space-x-3 items-center cursor-pointer',
          hasNext ? 'text-gray-500' : 'text-gray-200 cursor-not-allowed',
        )}
        onClick={() => {
          if (hasNext) onNext()
        }}
      >
        <span className="text-sm leading-5 font-medium">Next</span>
        <IconNext
          className={classNames(
            'stroke-current',
            hasNext ? 'text-gray-500' : 'text-gray-200',
          )}
        />
      </div>
    </div>
  )
}

export default Pagination
