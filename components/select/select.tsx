import classNames from 'classnames'
import { HTMLAttributes, FunctionComponent, useState, useRef } from 'react'
import IconArrowDown from '../icon/down'
import useOnClickOutside from '../../hooks/UI/useOnClickOutside'
import './select.css'

export type Option = {
  icon?: string
  text?: string
}

export type IProps = HTMLAttributes<{}> & {
  label?: string
  placeholder?: string
  options: Option[]
  selectedIndex: number
  onSelectOption?: (option: Option, index: number) => void
}

const Select: FunctionComponent<IProps> = ({ label, placeholder, options, onSelectOption, selectedIndex, className, ...props }: IProps) => {
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

  return (
    <div className={classNames(className, 'select')}>
      <div className="select-label">{label}</div>
      <div className={classNames('select-trigger', isOpen? 'open': '')} onClick={toggleDropdown}>
        {placeholder}
        <IconArrowDown className="dropdown-arrow" />
      </div>
      <div className={classNames('select-dropdown', isOpen? 'open': '')}>
        {
          options?.map((option, index) => (
            <div
              onClick={onOptionClick(option, index)}
              key={index}
              className={classNames('select-dropdown-item', selectedIndex === index? 'selected': '')}
            >
              {option.text}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Select
