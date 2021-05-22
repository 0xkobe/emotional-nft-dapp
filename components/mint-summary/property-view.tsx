import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import styles from './mint-summary.module.css'
import { Property } from '../../types/nft'

export type IProps = HTMLAttributes<{}> & {
  value: Property
}

const PropertyView: FunctionComponent<IProps> = ({ value, className, ...props }: IProps) => {
  return (
    <div
      className={classNames(className, styles.property )}
    >
      <div className={styles.propertyTitle}>
        {value.title}
      </div>
      <div className={styles.keyValues}>
      {
        value.keyValues.map(keyValue => {
          return (
            <div key={keyValue.key} className={styles.keyValue}>
              <div className={styles.key}>
                {keyValue.key}
              </div>
              <div className={styles.value}>
                {keyValue.value}
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default PropertyView
