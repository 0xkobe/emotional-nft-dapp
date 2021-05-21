import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import styles from './stepper.module.css'

export type IProps = HTMLAttributes<{}> & {
  step: number
}

const Stepper: FunctionComponent<IProps> = ({ className, step }: IProps) => {
  let options = [
    'Design your NFT',
    'Give it a Story',
    'QSTK Allocation'
  ]
  return (
    <div className={classNames(className, styles.stepper)}>
      {
        options.map((option, index) => (
          <div className={classNames(styles.stepperOption, (step > index? styles.done: ''))}>
            <div className={styles.stepperOptionNumber}>
              {('0' + (index+1))}
            </div>
            <div className={styles.stepperOptionText}>
              {option}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Stepper
