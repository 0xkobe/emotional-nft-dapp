import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { BackgroundOption } from '../../types/options'
import styles from './character.module.css'

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
  ...props
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        styles.background,
        selected && styles.selected,
      )}
      onClick={() => {
        onChange && onChange()
      }}
    >
      <div className={styles.image}>
        <img src={background.image} />
      </div>
      <div className={styles.name}>{background.name}</div>
    </div>
  )
}

export default BackgroundItem
