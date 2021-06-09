import { CheckIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'

export type IProps = HTMLAttributes<{}> & {
  steps: string[]
  currentStep: number
  onChangeStep: (step: number) => void
}

const Stepper: FunctionComponent<IProps> = ({
  className,
  onChangeStep,
  currentStep,
  steps,
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        'bg-white flex flex-col sm:flex-row border-1 border-solid border-purple-100 rounded-2xl shadow-sm',
      )}
    >
      {steps.map((step, index) => (
        <div
          key={step.toString()}
          className={classNames(
            `flex flex-row w-full sm:w-1/${steps.length} p-4 space-x-4`,
            index === currentStep ? 'text-black' : 'text-gray-500',
          )}
        >
          <div
            className={classNames(
              'flex items-center justify-center w-10 h-10 p-1.5 text-center border-2 rounded-full text-sm leading-4 font-medium',
              index === currentStep
                ? 'border-purple-700'
                : ' border-purple-100',
              index <= currentStep ? 'text-purple-700' : 'text-gray-500',
            )}
          >
            {index < currentStep ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              '0' + (index + 1)
            )}
          </div>
          <div className={classNames('flex items-center')}>
            <div className="flex flex-col">
              {index < currentStep && (
                <a
                  className="text-black cursor-pointer text-xs leading-4 font-medium text-purple-700 tracking-wider uppercase"
                  onClick={() => onChangeStep(index)}
                >
                  EDIT
                </a>
              )}
              <span
                className={classNames(
                  'text-sm leading-5 font-medium',
                  index === currentStep ? 'text-purple-700' : 'text-gray-500',
                )}
              >
                {step}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Stepper
