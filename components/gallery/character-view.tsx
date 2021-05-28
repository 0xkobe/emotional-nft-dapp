import { FunctionComponent, HTMLAttributes } from 'react'
import { CharacterOption } from '../../types/options'
import CharacterItem from './character-item'

export type IProps = Omit<HTMLAttributes<{}>, 'onChange'> & {
  characters: CharacterOption[]
  selectedCharacterId: number
  onChange: (index: number) => void
}

const CharacterView: FunctionComponent<IProps> = ({
  characters,
  selectedCharacterId,
  onChange,
}: IProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
