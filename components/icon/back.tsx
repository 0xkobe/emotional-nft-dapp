import classNames from 'classnames'
import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconBack: FunctionComponent<IProps> = (props) => {
  return (
    <svg className={classNames(props.className)} width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9L1 5M1 5L5 1M1 5L19 5" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default IconBack