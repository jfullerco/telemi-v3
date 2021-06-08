import React, { useState } from 'react'
import Hint from './Hint'

const TextInput = ({inputFieldName, inputFieldRef, inputFieldValue, inputFieldLabel, inputFieldChange, hint}) => {

  const [toggleVisible, setToggleVisible] = useState(false)

  const handleChange = () => {
   inputFieldChange != undefined ? inputFieldChange() : ""
  }

  const hintStyle = {
    borderBottom: "1px dotted #000",
    textDecoration: "none",
    color: "black"}

  return(
      <div className="field">
      <label className="label">{inputFieldLabel}</label>
        <div className="control">
          <input className="input is-rounded" type="text" ref={inputFieldRef} defaultValue={inputFieldValue} onChange={handleChange} />  
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default TextInput