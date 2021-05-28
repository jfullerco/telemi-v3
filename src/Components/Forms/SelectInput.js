import React, { useRef, forwardRef } from 'react'

const SelectInput = ({
    fieldOptions, 
    fieldInitialValue, 
    fieldInitialOption, 
    fieldLabel,
    fieldIDRef,
    fieldRefOption, 
    fieldChange}) => {
  
  const selectRef = useRef("")
  const handleChange = () => {
    
   fieldChange()
  }

  return(
      <div className="field">
      <label className="label">{fieldLabel}</label>
        <div className="control">
        <div className="select is-rounded is-fullwidth">
          <select type="select" ref={fieldIDRef} defaultValue={fieldInitialOption} onChange={handleChange}>

            {fieldInitialValue != undefined ? 
              <option value={fieldInitialValue}>
                {fieldInitialOption}
              </option> 
            : <option></option>}
          {fieldOptions && fieldOptions != undefined ? fieldOptions.map(option => (
            <option value={option.id} key={option.id}>{option.Name}</option>
          ))
          : ""}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectInput