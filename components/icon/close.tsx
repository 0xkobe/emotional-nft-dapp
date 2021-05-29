import classNames from 'classnames'
import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconClose: FunctionComponent<IProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(props.className, 'h-6 w-6')}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default IconClose
