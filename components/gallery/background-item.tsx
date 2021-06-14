import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { BackgroundOption } from '../../types/options'

export type IProps = Omit<HTMLAttributes<{}>, 'onChange'> & {
  background: BackgroundOption
  selected?: boolean
  onChange?: () => void
}

const BackgroundItem: FunctionComponent<IProps> = ({
  background,
  selected,
  onChange,
  className,
}: IProps) => {
  return (
    <div
      className={classNames(className)}
      onClick={() => {
        onChange && onChange()
      }}
    >
      <div className="w-18 h-18 mb-2">
        <img
          className={classNames(
            'w-full h-full rounded-2xl hover:shadow-md cursor-pointer',
            selected
              ? 'border-2 border-purple-700'
              : 'border border-purple-100',
            selected ? 'shadow-md' : 'shadow-sm',
          )}
          src={background.image}
        />
      </div>
      <div className="text-sm leading-5 font-normal text-purple-900">
        {background.name}
      </div>
    </div>
  )
}

export default BackgroundItem
