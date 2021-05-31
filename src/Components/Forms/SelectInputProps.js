import React, { useRef, forwardRef } from 'react'

const SelectInputProps = ({fieldLabel, fieldIDRef, fieldInitialOption, onChange, fieldInitialValue, children}) => {
  
  const selectRef = useRef("")

  return(
      <div className="field">
      <label className="label">{fieldLabel}</label>
        <div className="control">
        <div className="select is-rounded is-fullwidth">
          <select type="select" ref={fieldIDRef} defaultValue={fieldInitialOption} onChange={onChange}>

            {fieldInitialValue != undefined ? 
              <option value={fieldInitialValue}>
                {fieldInitialOption}
              </option> 
            : <option></option>}
          {children}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectInputProps