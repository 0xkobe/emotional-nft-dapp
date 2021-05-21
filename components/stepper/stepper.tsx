import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import './stepper.css'

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
    <div className={classNames(className, 'stepper')}>
      {
        options.map((option, index) => (
          <div className={classNames('stepper-option', (step > index? 'done': ''))}>
            <div className="stepper-option-number">
              {('0' + (index+1))}
            </div>
            <div className="stepper-option-text">
              {option}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Stepper
