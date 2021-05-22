import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import { CharacterOption } from '../../types/options';
import styles from './character.module.css'

export type IProps = HTMLAttributes<{}> & {
  character: CharacterOption
  selected?: boolean
  onSelect?: () => void
}

const CharacterItem: FunctionComponent<IProps> = ({ character, selected, onSelect, className, ...props }: IProps) => {
  return (
    <div
      className={classNames(className, styles.character, selected && styles.selected )}
      onClick={() => {
        onSelect && onSelect()
      }}
    >
      <div className={styles.image}>
        <img
          src={character.image}
        />
      </div>
      <div className={styles.supply}>
        {character.currentSupply}/{character.maxSupply}
      </div>
      <div className={styles.name}>
        {character.name}
      </div>
    </div>
  )
}

export default CharacterItem
