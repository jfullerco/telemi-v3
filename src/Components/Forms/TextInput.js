import React, { useRef } from 'react'
import Hint from './Hint'

const TextInput = ({inputFieldName, inputFieldRef, inputFieldValue, inputFieldLabel, inputFieldChange, hint, onClick}) => {

  const handleChange = () => {
   inputFieldChange != undefined ? inputFieldChange() : ""
  }

  return(
      <div className="field">
      <label className="label">{inputFieldLabel}</label>
        <div className="control">
          <input className="input is-rounded" type="text" ref={inputFieldRef} defaultValue={inputFieldValue} onChange={handleChange} />
          <Hint>{hint && hint}</Hint>
        </div>
      </div>
  )
}
export default TextInput