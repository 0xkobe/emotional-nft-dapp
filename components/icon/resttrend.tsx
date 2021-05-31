import { FunctionComponent } from 'react'

type IProps = {
  className?: string
}

const IconRestTrend: FunctionComponent<IProps> = (props) => {
  return (
    <svg
      className={props.className}
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.599609 2.98299C0.599609 3.20184 0.755936 3.35817 0.974793 3.35817H4.00752L6.66507 6.26584L7.35291 5.51547L4.53903 2.48274C4.4765 2.42021 4.38271 2.35768 4.25765 2.35768H0.974793C0.755936 2.35768 0.599609 2.54527 0.599609 2.73286V2.98299ZM16.2948 11.706C16.7012 11.3308 16.7012 10.6742 16.2948 10.2991L14.2938 8.29808C13.6685 7.67277 12.6055 8.11049 12.6055 8.98592V10.6117H12.074L9.38515 7.73531L8.69731 8.48567L11.5112 11.5184C11.5737 11.5809 11.6988 11.6122 11.7926 11.6122H12.6055V12.9879C12.6055 13.8946 13.6685 14.3323 14.2938 13.707L16.2948 11.706ZM15.6695 10.9244C15.732 10.9556 15.732 11.0494 15.6695 11.0807L13.6685 13.0817C13.606 13.1755 13.4809 13.1129 13.4809 12.9879V8.98592C13.4809 8.89212 13.606 8.82959 13.6685 8.92339L15.6695 10.9244ZM16.2948 3.70209C16.7012 3.3269 16.7012 2.67033 16.2948 2.29515L14.2938 0.294172C13.6685 -0.331133 12.6055 0.106581 12.6055 0.982008V2.35768H11.7926C11.6675 2.35768 11.5737 2.42021 11.5112 2.48274L4.00752 10.6117H0.974793C0.755936 10.6117 0.599609 10.7993 0.599609 10.9869V11.237C0.599609 11.4559 0.755936 11.6122 0.974793 11.6122H4.25765C4.38271 11.6122 4.4765 11.5809 4.53903 11.5184L12.074 3.35817H12.6055V4.98396C12.6055 5.89065 13.6685 6.32837 14.2938 5.70306L16.2948 3.70209ZM15.6695 2.92045C15.732 2.95172 15.732 3.04552 15.6695 3.07678L13.6685 5.07776C13.606 5.17155 13.4809 5.10902 13.4809 4.98396V0.982008C13.4809 0.888212 13.606 0.825682 13.6685 0.919477L15.6695 2.92045Z"
        fill="#3B82F6"
      />
    </svg>
  )
}

export default IconRestTrend