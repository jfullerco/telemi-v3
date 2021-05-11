import React, { useRef, forwardRef } from 'react'

const SelectInputProps = (props) => {
  
  const selectRef = useRef("")

  return(
      <div className="field">
      <label className="label">{props.fieldLabel}</label>
        <div className="control">
        <div className="select is-rounded is-fullwidth">
          <select type="select" ref={props.fieldIDRef} defaultValue={props.fieldInitialOption} onChange={props.onChange}>

            {props.fieldInitialValue != undefined ? 
              <option value={props.fieldInitialValue}>
                {props.fieldInitialOption}
              </option> 
            : <option></option>}
          {props.children}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectInputProps