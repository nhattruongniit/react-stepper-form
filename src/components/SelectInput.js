import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { useClickAway } from "react-use";

const SelectInput = forwardRef((props, ref) => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  // Refs
  const selectRef = useRef();
  const valueRef = useRef(null);
  const canDispatch = useRef(false);

  useEffect(() => {
    const ele = valueRef.current;
    if(!ele || !canDispatch.current) return; 
    // ele.value = selected;
    // ele.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
    const evt = new Event('change', { bubbles: true, cancelable: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: selected,
        name: props.name
      }
    })
    props.onChange(evt)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  useEffect(() => {
    if(!valueRef.current) return;
    // Overwrite setter, if react-form-hook set value. we can catch the value from it and do something
    Object.defineProperty(valueRef.current, 'value', {
      set(newValue) {
        setSelected(newValue);
      }
    })
  }, [])

  useEffect(() => {
    if(!props.defaultValue) return;
    setSelected(props.defaultValue)
    canDispatch.current = true
  }, [props.defaultValue])


  function toggleOpen() {
    setIsOpen(prevState => !prevState)
  }

  const handleSelectItem = value => () => {
    setSelected(value)
    canDispatch.current = true
  }

  useClickAway(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <div>
      <input
        type="hidden"
        ref={(el) => {
          ref.current = el;
          valueRef.current = el;
        }}
        {...props}
        onInput={props.onChange}
      />

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
            {props.placeholder}
          </div>
          )}
        
          <div className="select_arrow" />
        </div>
        <div className="select_options">
          {props.options.map(item => (
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
