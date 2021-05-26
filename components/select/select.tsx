import classNames from 'classnames'
import {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import useOnClickOutside from '../../hooks/UI/useOnClickOutside'
import IconChevron from '../icon/chevron'

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
  ...props
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
        <span className="text-sm leading-5 font-medium truncate">
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
      <div
        className={classNames(
          'flex flex-row w-full items-center justify-between h-10 p-2 pr-8 border border-solid border-gray-300 rounded-lg',
        )}
        onClick={toggleDropdown}
      >
        {(!canSearch || !isOpen) && (
          <>
            <div>
              {selectedIndex < options.length
                ? renderOption(options[selectedIndex])
                : placeholder || 'Select an option'}
            </div>
            <IconChevron
              className={classNames(
                'absolute top-4 right-4 transition duration-400 transition-transform',
                isOpen ? 'transform rotate-180' : '',
              )}
            />
          </>
        )}
        {canSearch && isOpen && (
          <input
            ref={inputRef}
            className={classNames('w-full outline-none pl-2')}
            value={keyword}
            placeholder={options[selectedIndex].text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setKeyword(e.target.value)
            }
          />
        )}
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute left-0 max-h-48 min-w-full z-50 border border-gray-400 overflow-auto">
          {filteredOptions.map(({ option, index }) => {
            return (
              <div
                onClick={onOptionClick(option, index)}
                key={index}
                className={classNames(
                  'flex flex-row items-center p-2 min-w-full',
                  selectedIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-100',
                )}
              >
                <div className="flex flex-row pl-2 items-center min-w-full w-max">
                  {option.icon && (
                    <img className="w-5 h-5 mr-2" src={option.icon} />
                  )}
                  <span className="text-sm leading-5 font-medium whitespace-nowrap">
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
