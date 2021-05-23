import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconNormalTrend: FunctionComponent<IProps> = (props) => {
  return (
    <svg 
        className={props.className}
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M11.2895 4.58739V7.37466H1.42686C1.17672 7.37466 0.998047 7.58906 0.998047 7.80347V8.16081C0.998047 8.41095 1.17672 8.58962 1.42686 8.58962H11.2895V11.4126C11.2895 12.4489 12.5045 12.9492 13.2192 12.2345L16.6496 8.80403C17.1142 8.37522 17.1142 7.6248 16.6496 7.19599L13.2192 3.7655C12.5045 3.05082 11.2895 3.55109 11.2895 4.58739ZM15.8635 7.98214L12.433 11.4126V4.55165L15.8635 7.98214Z"
            fill="#0EA5E9"
        />
    </svg>
  )
}

export default IconNormalTrend
