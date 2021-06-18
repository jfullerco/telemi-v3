import React, { useRef, forwardRef } from 'react'
import {stateList} from '../../Contexts/states'

const StateDropDown = ({
    fieldOptions, 
    fieldInitialValue, 
    fieldInitialOption, 
    fieldLabel,
    fieldRef, 
    fieldChange}) => {
  
  const handleChange = () => {
    
   console.log(fieldRef.current.value)
  }

  return(
      <div className="field">
      <label className="label">State</label>
        <div className="control">
        <div className="select is-rounded is-fullwidth">
          <select type="select" ref={fieldRef} defaultValue={fieldInitialOption} onChange={handleChange}>
            <option></option>
            {stateList && stateList.map(s => (
              <option>{s.code}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default StateDropDown