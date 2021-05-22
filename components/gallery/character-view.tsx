import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import { CharacterOption } from '../../types/options';
import CharacterItem from './character-item'
import styles from './character.module.css'

export type IProps = HTMLAttributes<{}> & {
  characters: CharacterOption[]
  selectedIndex: number
  onSelectOption: (index: number) => void
}

const CharacterView: FunctionComponent<IProps> = ({ characters, selectedIndex, onSelectOption, className, ...props }: IProps) => {
  return (
    <div className={styles.characters}>
      {
        characters.map((character, index) => {
          return (
            <CharacterItem
              key={character.id}
              character={character}
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

export default CharacterView
