import classNames from 'classnames'
import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconCheck: FunctionComponent<IProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(props.className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

export default IconCheck
