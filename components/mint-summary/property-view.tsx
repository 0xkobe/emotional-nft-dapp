import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Property } from '../../types/nft'
import styles from './mint-summary.module.css'

export type IProps = HTMLAttributes<{}> & {
  value: Property
}

const PropertyView: FunctionComponent<IProps> = ({
  value,
  className,
  ...props
}: IProps) => {
  // TODO: Mint summary description to 1 line with ellipsis
  // since there are few fields that are long that could break whole style,
  // we need to make everything to not overflow specific number of letters in short description
  // and reduce them into ellipsis
  return (
    <div className={classNames(className, styles.property)}>
      <div className={styles.propertyTitle}>{value.title}</div>
      <div className={styles.keyValues}>
        {value.keyValues.map((keyValue) => {
          return (
            <div key={keyValue.key} className={styles.keyValue}>
              <div className={styles.key}>{keyValue.key}</div>
              <div className={styles.value}>{keyValue.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PropertyView
