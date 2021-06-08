import React, { useRef, forwardRef } from 'react'
import Hint from './Hint'

const SelectInputProps = ({fieldLabel, fieldIDRef, fieldInitialOption, onChange, fieldInitialValue, placeholder, hint, children}) => {
  
  const selectRef = useRef("")

  return(
      <div className="field">
      <label className="label">{fieldLabel}</label>
        <div className="control">
        <div className="select is-rounded is-fullwidth">
          <select type="select" ref={fieldIDRef} defaultValue={fieldInitialOption} placeholder={placeholder} onChange={onChange}>

            {fieldInitialValue != undefined ? 
              <option value={fieldInitialValue}>
                {fieldInitialOption}
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