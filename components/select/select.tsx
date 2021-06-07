import { ChevronDownIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import useOnClickOutside from '../../hooks/UI/useOnClickOutside'
import SecondaryButton from '../button/secondary-button'

export type Option = {
  icon?: string
  text?: string
}

export type IProps = HTMLAttributes<{}> & {
  placeholder?: string
  options: Option[]
  selectedIndex: number
  canSearch?: boolean
  onSelectOption?: (option: Option, index: number) => void
}

const Select: FunctionComponent<IProps> = ({
  placeholder,
  options,
  onSelectOption,
  selectedIndex,
  canSearch,
  className,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [keyword, setKeyword] = useState('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    setKeyword('')
  }

  const onOptionClick = (option: Option, index: number) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    toggleDropdown()
    onSelectOption && onSelectOption(option, index)
  }

  const wrapperRef = useRef(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, inputRef])

  const renderOption = (option: Option) => {
    return (
      <div className="flex flex-row pl-2 items-center">
        {option.icon && <img className="w-5 h-5 mr-2" src={option.icon} />}
        <span className="text-sm leading-5 font-medium text-purple-900 truncate">
          {option.text}
        </span>
      </div>
    )
  }

  const filteredOptions = options
    .map((option, index) => ({
      option,
      index,
    }))
    .filter(
      ({ option }) =>
        !canSearch ||
        option.text?.toLowerCase().includes(keyword.toLowerCase()),
    )

  return (
    <div
      className={classNames(
        className,
        'relative cursor-pointer text-gray-500 w-full',
      )}
      ref={wrapperRef}
    >
      <SecondaryButton
        onClick={toggleDropdown}
        className="inline-flex w-full justify-between"
        shadow
      >
        {(!canSearch || !isOpen) && (
          <>
            <div>
              {selectedIndex < options.length ? (
                renderOption(options[selectedIndex])
              ) : (
                <span className="text-tray-400">
                  {placeholder || 'Select an option'}
                </span>
              )}
            </div>
            <ChevronDownIcon
              className={classNames(
                'w-5 h-5 duration-400 transition-transform text-purple-700',
                isOpen ? 'transform rotate-180' : '',
              )}
            />
          </>
        )}
        {canSearch && isOpen && (
          <input
            ref={inputRef}
            className={classNames(
              'w-full outline-none pl-2 placeholder-purple-400',
            )}
            value={keyword}
            placeholder={options[selectedIndex].text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setKeyword(e.target.value)
            }
          />
        )}
      </SecondaryButton>
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute left-0 max-h-48 min-w-full z-50 border border-purple-400 overflow-auto">
          {filteredOptions.map(({ option, index }) => {
            return (
              <div
                onClick={onOptionClick(option, index)}
                key={index}
                className={classNames(
                  'flex flex-row items-center p-2 min-w-full',
                  selectedIndex === index
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-purple-500 hover:bg-purple-100',
                )}
              >
                <div className="flex flex-row pl-2 items-center min-w-full w-max">
                  {option.icon && (
                    <img className="w-5 h-5 mr-2" src={option.icon} />
                  )}
                  <span className="text-sm leading-5 font-medium text-purple-900 whitespace-nowrap">
                    {option.text}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Select
