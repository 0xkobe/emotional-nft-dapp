import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import IconCheck from '../icon/check'

export type IProps = HTMLAttributes<{}> & {
  step: number
  onChangeStep: (step: number) => void
}

const Stepper: FunctionComponent<IProps> = ({
  className,
  onChangeStep,
  step,
}: IProps) => {
  const options = ['Design your NFT', 'Give it a Story', 'QSTK Allocation']
  return (
    <div
      className={classNames(
        className,
        'flex flex-row w-6/12	h-18 border-2 border-solid border-gray-300 rounded-2xl',
      )}
    >
      {options.map((option, index) => (
        <div
          key={option.toString()}
          className={classNames(
            'flex flex-row w-1/3 p-4 space-x-4',
            index === step ? 'text-black' : 'text-gray-500',
          )}
        >
          <div
            className={classNames(
              'flex items-center justify-center w-10 h-10 p-1.5 text-center border-2 border-solid rounded-full',
              index === step ? 'border-black' : 'border-gray-300',
            )}
          >
            {index < step ? (
              <IconCheck className="w-4 h-4" />
            ) : (
              '0' + (index + 1)
            )}
          </div>
          <div
            className={classNames(
              'flex items-center text-sm leading-4 font-medium',
            )}
          >
            <div className="flex flex-col">
              {index < step && (
                <a
                  className="text-black cursor-pointer"
                  onClick={() => onChangeStep(index)}
                >
                  EDIT
                </a>
              )}
              <span>{option}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Stepper
