import classNames from 'classnames'
import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconPrev: FunctionComponent<IProps> = (props) => {
  return (
    <svg
      className={classNames(props.className)}
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
    >
      <path
        d="M8 15L1 8L8 1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconPrev
