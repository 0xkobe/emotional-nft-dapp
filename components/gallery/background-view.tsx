import { HTMLAttributes, FunctionComponent } from 'react'
import { BackgroundOption } from '../../types/options';
import BackgroundItem from './background-item'
import styles from './character.module.css'

export type IProps = HTMLAttributes<{}> & {
  backgrounds: BackgroundOption[]
  selectedIndex: number
  onSelectOption: (index: number) => void
}

const BackgroundView: FunctionComponent<IProps> = ({ backgrounds, selectedIndex, onSelectOption, className, ...props }: IProps) => {
  return (
    <div className={styles.backgrounds}>
      {
        backgrounds.map((background, index) => {
          return (
            <BackgroundItem
              key={JSON.stringify(background)}
              background={background}
              selected={index === selectedIndex}
              onSelect={() => {
                onSelectOption(index)
              }}
            />
          )
        })
      }
    </div>
  )
}

export default BackgroundView
