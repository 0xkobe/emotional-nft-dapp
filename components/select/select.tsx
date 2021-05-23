import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent, useState, useRef } from 'react'
import IconChevron from '../icon/chevron'
import useOnClickOutside from '../../hooks/UI/useOnClickOutside'
import styles from './select.module.css'

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

const Select: FunctionComponent<IProps> = ({ placeholder, options, onSelectOption, selectedIndex, className, ...props }: IProps) => {
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
      <div className="flex flex-row items-center">
        {option.icon && (
          <img className="w-5 h-5 mx-2" src={option.icon} />
        )}
        <span className="text-sm leading-5 font-medium">
          {option.text}
        </span>
      </div>
    )
  }

  return (
    <div className={classNames(className, "relative cursor-pointer text-gray-500")} ref={wrapperRef}>
      <div className={classNames("flex flex-row w-full items-center justify-between p-1.5 border border-solid border-gray-300 rounded-lg", isOpen? styles.open: '')} onClick={toggleDropdown}>
        <div>
          {
            selectedIndex < options.length ? (
              renderOption(options[selectedIndex])
            ) : placeholder || 'Select an option'
          }
        </div>
        <IconChevron className={classNames(styles.dropdownArrow)} />
      </div>
      <div className={classNames(styles.selectDropdown, isOpen? styles.open: '')}>
        {
          options?.map((option, index) => (
            <div
              onClick={onOptionClick(option, index)}
              key={index}
              className={classNames(styles.selectDropdownItem, selectedIndex === index? styles.selected: '')}
            >
              {option.icon && <img src={option.icon} />}
              <span>{option.text}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Select
