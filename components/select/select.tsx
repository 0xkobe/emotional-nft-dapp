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

  return (
    <div className={classNames(className, styles.select)} ref={wrapperRef}>
      <div className={classNames(styles.selectTrigger, isOpen? styles.open: '')} onClick={toggleDropdown}>
        {placeholder || 'Select an option'}
        <IconChevron className={styles.dropdownArrow} />
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
