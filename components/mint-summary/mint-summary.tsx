import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import styles from './mint-summary.module.css'
import PropertyView from './property-view'
import Button from '../button/button'
import { Property } from '../../types/nft'

export type IProps = HTMLAttributes<{}> & {
  properties: Property[]
  mintPrice: string
}

const MintSummary: FunctionComponent<IProps> = ({ properties, mintPrice, className, ...props }: IProps) => {
  return (
    <div className={classNames(className, styles.mintSummary)}>
      <div
        className={styles.properties}
      >
        <div className={styles.title}>
          Mint Summary
        </div>
        {
          properties.map(property => {
            return (
              <PropertyView key={property.title} value={property} />
            )
          })
        }
      </div>
      <div className={styles.mint}>
        <div className={styles.keyValue}>
          <div className={styles.key}>
            NFT Mint Price
          </div>
          <div className={styles.value}>
            {mintPrice}
          </div>
        </div>
        <Button>
          Mint my NFT
        </Button>
      </div>
    </div>
  )
}

export default MintSummary
