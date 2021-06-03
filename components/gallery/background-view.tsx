import { FunctionComponent, HTMLAttributes } from 'react'
import { BackgroundOption } from '../../types/options'
import BackgroundItem from './background-item'

export type IProps = Omit<HTMLAttributes<{}>, 'onChange'> & {
  backgrounds: BackgroundOption[]
  selectedIndex?: number
  onChange: (index: number) => void
}

const BackgroundView: FunctionComponent<IProps> = ({
  backgrounds,
  selectedIndex,
  onChange,
}: IProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {backgrounds.map((background, index) => {
        return (
          <BackgroundItem
            key={background.id}
            background={background}
            selected={index === selectedIndex}
            onChange={() => {
              onChange(index)
            }}
          />
        )
      })}
    </div>
  )
}

export default BackgroundView
