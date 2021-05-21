import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconCheck: FunctionComponent<IProps> = (props) => {
  return (
    <svg 
        className={props.className}
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
            fill="#D1FAE5"
        />
        <path
            d="M17 25L21 29L31 19"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
  )
}

export default IconCheck