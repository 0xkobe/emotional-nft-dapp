import { HTMLAttributes, FunctionComponent } from 'react'
import { CharacterOption } from '../../types/options';
import CharacterItem from './character-item'
import styles from './character.module.css'

export type IProps = HTMLAttributes<{}> & {
  characters: CharacterOption[]
  selectedCharacterId: number
  onSelectOption: (index: number) => void
}

const CharacterView: FunctionComponent<IProps> = ({ characters, selectedCharacterId, onSelectOption, className, ...props }: IProps) => {
  return (
    <div className={styles.characters}>
      {
        characters.map((character) => {
          return (
            <CharacterItem
              key={JSON.stringify(character)}
              character={character}
              selected={character.id === selectedCharacterId}
              onSelect={() => {
                onSelectOption(character.id)
              }}
            />
          )
        })
      }
    </div>
  )
}

export default CharacterView
