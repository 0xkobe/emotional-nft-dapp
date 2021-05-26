import { FunctionComponent, HTMLAttributes } from 'react'
import { CharacterOption } from '../../types/options'
import CharacterItem from './character-item'
import styles from './character.module.css'

export type IProps = Omit<HTMLAttributes<{}>, 'onChange'> & {
  characters: CharacterOption[]
  selectedCharacterId: number
  onChange: (index: number) => void
}

const CharacterView: FunctionComponent<IProps> = ({
  characters,
  selectedCharacterId,
  onChange,
  className,
  ...props
}: IProps) => {
  return (
    <div className={styles.characters}>
      {characters.map((character) => {
        return (
          <CharacterItem
            key={JSON.stringify(character)}
            character={character}
            selected={character.id === selectedCharacterId}
            onChange={() => {
              onChange(character.id)
            }}
          />
        )
      })}
    </div>
  )
}

export default CharacterView
