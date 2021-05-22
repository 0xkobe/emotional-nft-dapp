import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'

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
    <div className={classNames(className, "flex flex-row w-6/12	h-18 border-2 border-solid border-gray-300 rounded-2xl")}>
      {
        options.map((option, index) => (
          <div className={classNames("flex flex-row w-1/3 p-4 space-x-4")}>
            <div className={classNames("w-10 h-10 p-1.5 text-center border-2 border-solid rounded-full", index <= step ? "border-black" : "border-gray-300")}>
              {('0' + (index+1))}
            </div>
            <div className={classNames("flex items-center text-sm leading-4 font-medium", index <= step  ? "text-black" : "text-gray-500")}>
              {option}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Stepper
