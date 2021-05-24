import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import { BackgroundOption } from '../../types/options';
import styles from './character.module.css'

export type IProps = HTMLAttributes<{}> & {
  background: BackgroundOption
  selected?: boolean
  onSelect?: () => void
}

const BackgroundItem: FunctionComponent<IProps> = ({ background, selected, onSelect, className, ...props }: IProps) => {
  return (
    <div
      className={classNames(className, styles.background, selected && styles.selected )}
      onClick={() => {
        onSelect && onSelect()
      }}
    >
      <div className={styles.image}>
        <img
          src={background.image}
        />
      </div>
      <div className={styles.name}>
        {background.name}
      </div>
    </div>
  )
}

export default BackgroundItem
