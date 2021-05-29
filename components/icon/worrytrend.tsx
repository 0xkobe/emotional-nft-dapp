import { FunctionComponent } from 'react'

type IProps = {
    className?: string
}

const IconWorryTrend: FunctionComponent<IProps> = (props) => {
    return (
        <svg className={props.className} width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.293396 2.32462C0.168477 2.1997 0.168477 1.99151 0.293396 1.86659L0.751431 1.40855C0.87635 1.28363 1.08455 1.28363 1.20947 1.40855L4.24915 4.4066L7.78852 0.867238C8.03835 0.617401 8.45475 0.617401 8.70459 0.867238L12.6187 4.78136L14.4508 2.94922C14.659 2.74102 14.9089 2.65774 15.1587 2.65774C15.7 2.65774 16.1997 3.0325 16.1997 3.65709V8.6122C16.1997 8.98695 15.8666 9.32007 15.4918 9.32007H10.5367C9.62066 9.32007 9.16262 8.1958 9.82885 7.57121L11.661 5.69743L8.24655 2.28298L4.74883 5.82235C4.45735 6.07218 4.04096 6.07218 3.79112 5.82235L0.293396 2.32462ZM11.2862 7.9876H14.8672V4.4066L11.2862 7.9876Z" fill="#F59E0B" />
        </svg>

    )
}

export default IconWorryTrend
