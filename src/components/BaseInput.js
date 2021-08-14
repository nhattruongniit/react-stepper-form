import React, { forwardRef, useState, useEffect, useRef } from 'react'

const BaseInput =  forwardRef((props, ref) => {
  const [forceRender, setForceRender] = useState(Date.now());
  const [count, setCount] = useState();
  const numberRef = useRef();
  const canDispatch = useRef(false);

  useEffect(() => {
    const el = numberRef.current;
    if (!el || !canDispatch.current) return;
    // el.value = count;
    // el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    const evt = new Event('input', { bubbles: true, cancelable: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: Number(count),
        name: props.name,
      },
    });
    props.onChange(evt);
  }, [count, props]);

  useEffect(() => {
    if(props.defaultValue) {
      setCount(props.defaultValue)
      canDispatch.current = true
    }
  }, [props.defaultValue])

  useEffect(() => {
    if(!numberRef.current) return;
    // Overwrite setter, if react-form-hook set value. we can catch the value from it and do something
    Object.defineProperty(numberRef.current, 'value', {
      set(newValue) {
        setCount(newValue)
        setForceRender(Date.now())
      }
    })
  }, [])

  function decrement() {
    setCount((prevState) => Number(prevState) - 1);
  }

  function increment() {
    setCount((prevState) => Number(prevState) + 1);
  }

  function onChange(e) {
    canDispatch.current = true
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
      <input key={forceRender} className="baseInput" type="number" value={count} onChange={onChange} />
      <div className="baseInput_actions">
        <div onClick={decrement}>decrement</div>
        <div className="baseInput_divider" /> 
        <div onClick={increment}>increment</div>
      </div>
    </div>

  )
}) 

export default BaseInput
