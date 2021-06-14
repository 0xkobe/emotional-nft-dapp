import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import { CharacterOption } from '../../types/options'

export type IProps = Omit<HTMLAttributes<{}>, 'onChange'> & {
  character: CharacterOption
  selected?: boolean
  onChange?: () => void
}

const CharacterItem: FunctionComponent<IProps> = ({
  character,
  selected,
  onChange,
  className,
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        character.currentSupply >= character.maxSupply ? 'opacity-25' : '',
      )}
      onClick={() => {
        if (character.currentSupply < character.maxSupply)
          onChange && onChange()
      }}
    >
      <div className="w-18 h-18 mb-2">
        <img
          className={classNames(
            'rounded-2xl hover:shadow-md border-2 cursor-pointer',
            selected
              ? 'border-purple-700 shadow-md'
              : 'border-purple-100 shadow-sm',
          )}
          src={character.emotions.normal}
        />
      </div>
      <div className="text-xs leading-4 font-normal text-gray-500 mb-1">
        {character.currentSupply}/{character.maxSupply}
      </div>
      <div className="text-sm leading-5 font-normal text-purple-900">
        {character.name}
      </div>
    </div>
  )
}

export default CharacterItem
