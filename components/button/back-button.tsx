import classNames from 'classnames'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import IconBack from '../icon/back'

export type IProps = AnchorHTMLAttributes<{}> & {
  text: string
}

const BackButton: FunctionComponent<IProps> = ({className, text}: IProps) => {
  return (
    <div className={classNames(className, 'flex flex-row space-x-2 items-center')}>
      <IconBack />
      <span className="text-sm leading-5 font-medium text-gray-500">
        {text}
      </span>
    </div>
  )
}

export default BackButton
