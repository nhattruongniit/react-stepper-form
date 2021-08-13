import React, { forwardRef, useState, useEffect, useRef } from 'react'

const BaseInput =  forwardRef((props, ref) => {
  const [count, setCount] = useState(props.defaultValue || 0);
  const numberRef = useRef(props.defaultValue || 0);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    el.value = count;
    el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }, [count]);

  function decrement() {
    setCount((prevState) => Number(prevState) - 1);
  }

  function increment() {
    setCount((prevState) => Number(prevState) + 1);
  }

  function onChange(e) {
    const { value } = e.target;
    setCount(value);
  }
  return (
    <div className="baseInput_wrapper">
      <input
        type="hidden"
        ref={(el) => {
          ref.current = el;
          numberRef.current = el;
        }}
        {...props}
        onInput={props.onChange}
      />
      <input className="baseInput" type="number" value={count} onChange={onChange} />
      <div className="baseInput_actions">
        <div onClick={decrement}>decrement</div>
        <div className="baseInput_divider" /> 
        <div onClick={increment}>increment</div>
      </div>
    </div>

  )
}) 

export default BaseInput
