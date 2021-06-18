import React, { useRef, forwardRef } from 'react'
import Hint from './Hint'

const SelectInputProps = ({fieldLabel, fieldIDRef, fieldInitialOption, fieldInitialValue, onChange, isVisible, hint, readonly, children}) => {
  
  const selectRef = useRef("")

  return(
      <div className="field">
      <label className="label">{fieldLabel && fieldLabel}</label>
        <div className="control">
        <div className={isVisible != false ? "select is-rounded is-fullwidth is-small" : "is-hidden"}>
          <select type="select" ref={fieldIDRef} defaultValue={fieldInitialOption} onChange={onChange} readOnly={readonly}>

            {fieldInitialValue != undefined ? 
              <option value={fieldInitialValue}>
                {fieldInitialOption && fieldInitialOption}
              </option> 
            : <option></option>}
          {children}
          </select>
        </div>
        {hint && <Hint> {hint}</Hint>}
      </div>
    </div>
  )
}

export default SelectInputProps