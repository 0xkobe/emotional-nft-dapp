import classNames from 'classnames'
import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconBack: FunctionComponent<IProps> = (props) => {
  return (
    <svg
      className={classNames(props.className)}
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.66667 6.66671L1 4.00004M1 4.00004L3.66667 1.33337M1 4.00004L13 4.00004"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconBack
