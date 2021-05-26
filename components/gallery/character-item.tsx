import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { CharacterOption } from '../../types/options'
import styles from './character.module.css'

export type IProps = Omit<HTMLAttributes<{}>, "onChange"> & {
  character: CharacterOption
  selected?: boolean
  onChange?: () => void
}

const CharacterItem: FunctionComponent<IProps> = ({
  character,
  selected,
  onChange,
  className,
  ...props
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        styles.character,
        selected && styles.selected,
      )}
      onClick={() => {
        onChange && onChange()
      }}
    >
      <div className={styles.image}>
        <img src={character.emotions.normal} />
      </div>
      <div className={styles.supply}>
        {character.currentSupply}/{character.maxSupply}
      </div>
      <div className={styles.name}>{character.name}</div>
    </div>
  )
}

export default CharacterItem
