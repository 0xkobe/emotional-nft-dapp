import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconRestTrend: FunctionComponent<IProps> = (props) => {
  return (
    <svg
      className={props.className}
      width="17"
      height="10"
      viewBox="0 0 17 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0913 1.58733V4.3746H1.22862C0.978476 4.3746 0.799805 4.589 0.799805 4.80341V5.16075C0.799805 5.41089 0.978476 5.58956 1.22862 5.58956H11.0913V8.41256C11.0913 9.44886 12.3062 9.94914 13.0209 9.23445L16.4514 5.80397C16.9159 5.37515 16.9159 4.62474 16.4514 4.19592L13.0209 0.765439C12.3062 0.0507545 11.0913 0.551034 11.0913 1.58733ZM15.6652 4.98208L12.2348 8.41256V1.55159L15.6652 4.98208Z"
        fill="#6B7280"
      />
    </svg>
  )
}

export default IconRestTrend
