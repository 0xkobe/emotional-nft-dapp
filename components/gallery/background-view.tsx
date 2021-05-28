import { FunctionComponent, HTMLAttributes } from 'react'
import { BackgroundOption } from '../../types/options'
import BackgroundItem from './background-item'
import styles from './character.module.css'

export type IProps = Omit<HTMLAttributes<{}>, 'onChange'> & {
  backgrounds: BackgroundOption[]
  selectedIndex: number
  onChange: (index: number) => void
}

const BackgroundView: FunctionComponent<IProps> = ({
  backgrounds,
  selectedIndex,
  onChange,
}: IProps) => {
  return (
    <div className={styles.backgrounds}>
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
