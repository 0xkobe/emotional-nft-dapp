import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { bnToText, formatDate, lockDurationToString } from '../../lib/utils'
import styles from './allocation.module.css'

export type IProps = HTMLAttributes<{}> & {
  lockAmount: BigNumber
  createdAt: Date
  lockDuration: number
}

const Allocation: FunctionComponent<IProps> = ({
  lockAmount,
  createdAt,
  lockDuration,
  className,
  ...props
}: IProps) => {
  const headers = [
    'COIN',
    'AMOUNT',
    'SUBSCRIPTION',
    'LOCK PERIOD',
    'REDEMPTION',
  ]

  const values = [
    <>
      <img src="/quiver.svg" />
      <div>QSTK</div>
    </>,
    bnToText(lockAmount),
    formatDate(createdAt),
    lockDurationToString(lockDuration),
    formatDate(new Date(createdAt.getTime() + lockDuration * 1000)),
  ]

  return (
    <div className={classNames(className, styles.allocation)}>
      <div className={styles.headers}>
        {headers.map((header) => {
          return (
            <div key={header} className={styles.header}>
              {header}
            </div>
          )
        })}
      </div>
      <div className={styles.values}>
        {values.map((value) => {
          return (
            <div key={value.toString()} className={styles.value}>
              {value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Allocation
