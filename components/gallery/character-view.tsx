import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent } from 'react'
import { CharacterOption } from '../../types/options';
import CharacterItem from './character-item'
import styles from './character.module.css'

export type IProps = HTMLAttributes<{}> & {
  characters: CharacterOption[]
  selectedIndex: number
  onChange: (index: number) => void
}

const CharacterView: FunctionComponent<IProps> = ({ characters, selectedIndex, onChange, className, ...props }: IProps) => {
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
                onChange(index)
              }}
            />
          )
        })
      }
    </div>
  )
}

export default CharacterView
