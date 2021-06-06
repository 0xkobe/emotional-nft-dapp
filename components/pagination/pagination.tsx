import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import SecondaryButton from '../button/secondary-button'

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
    <div className={classNames(className, 'flex flex-row space-x-4')}>
      <SecondaryButton
        shadow
        disabled={!hasPrev}
        onClick={() => {
          if (hasPrev) onPrev()
        }}
      >
        <ChevronLeftIcon className="inline-flex w-3 h-3 mr-2" />
        <span>Previous</span>
      </SecondaryButton>
      <SecondaryButton
        shadow
        disabled={!hasNext}
        onClick={() => {
          if (hasNext) onNext()
        }}
      >
        <span className="mr-2">Next</span>
        <ChevronRightIcon className="inline-flex w-3 h-3" />
      </SecondaryButton>
    </div>
  )
}

export default Pagination
