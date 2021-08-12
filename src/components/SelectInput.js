import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { useClickAway } from "react-use";

const SelectInput = forwardRef(({ defaultValue, options, name, placeholder, ...rest }, ref) => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  // Refs
  const selectRef = useRef();

  useEffect(() => {
    const ele = document.getElementById(name);
    if(ele) {
      ele.value = selected;
      ele.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  function toggleOpen() {
    setIsOpen(prevState => !prevState)
  }

  const handleSelectItem = value => () => {
    setSelected(value)
  }

  useClickAway(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <div>
      <select
        id={name}
        name={name}
        ref={ref}
        style={{ display: 'none' }}
        {...rest}
      >
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <div 
        ref={selectRef}
        className={`select_wrapper ${isOpen ? 'open' : ''}`}
        onClick={toggleOpen}
      >
        <div className="select_label">
          {selected ? (
            <div>{selected}</div>
          ) : (
          <div className="select_placeholder">
            {placeholder}
          </div>
          )}
        
          <div className="select_arrow" />
        </div>
        <div className="select_options">
          {options.map(item => (
            <div
              key={item.value}
              className="select_options_item"
              onClick={handleSelectItem(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

    
    </div>
  )
})   

export default SelectInput
