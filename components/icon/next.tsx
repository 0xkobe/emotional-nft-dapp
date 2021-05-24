import classNames from 'classnames'
import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconNext: FunctionComponent<IProps> = (props) => {
  return (
    <svg className={classNames(props.className)} width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
      <path d="M0.999999 1L8 8L1 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default IconNext