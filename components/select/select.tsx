import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, useRef, useState } from 'react'
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
  onSelectOption?: (option: Option, index: number) => void
}

const Select: FunctionComponent<IProps> = ({
  placeholder,
  options,
  onSelectOption,
  selectedIndex,
  className,
  ...props
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const onOptionClick = (option: Option, index: number) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    toggleDropdown()
    onSelectOption && onSelectOption(option, index)
  }

  const wrapperRef = useRef(null)
  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false)
  })

  const renderOption = (option: Option) => {
    return (
      <div className="flex flex-row pl-2 items-center">
        {option.icon && <img className="w-5 h-5 mr-2" src={option.icon} />}
        <span className="text-sm leading-5 font-medium">{option.text}</span>
      </div>
    )
  }

  return (
    <div
      className={classNames(className, 'relative cursor-pointer text-gray-500')}
      ref={wrapperRef}
    >
      <div
        className={classNames(
          'flex flex-row w-full items-center justify-between p-2 border border-solid border-gray-300 rounded-lg',
        )}
        onClick={toggleDropdown}
      >
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
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 border border-gray-400">
          {options?.map((option, index) => (
            <div
              onClick={onOptionClick(option, index)}
              key={index}
              className={classNames(
                'flex flex-row items-center p-2',
                selectedIndex === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100',
              )}
            >
              <div className="flex flex-row pl-2 items-center">
                {option.icon && (
                  <img className="w-5 h-5 mr-2" src={option.icon} />
                )}
                <span className="text-sm leading-5 font-medium">
                  {option.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
