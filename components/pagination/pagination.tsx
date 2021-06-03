import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import SecondaryButton from '../button/secondary-button'
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
    <div className={classNames(className, 'flex flex-row space-x-4')}>
      <SecondaryButton
        shadow
        disabled={!hasPrev}
        onClick={() => {
          if (hasPrev) onPrev()
        }}
      >
        <IconPrev className="inline-block mr-2" />
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
        <IconNext className="inline-block" />
      </SecondaryButton>
    </div>
  )
}

export default Pagination
