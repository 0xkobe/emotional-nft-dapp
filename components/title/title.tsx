import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import styles from './title.module.css'

export type IProps = HTMLAttributes<{}> & {
  text: string
}

const Title: FunctionComponent<IProps> = ({ text, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, styles.title)}>
      {text}
    </div>
  )
}

export default Title
