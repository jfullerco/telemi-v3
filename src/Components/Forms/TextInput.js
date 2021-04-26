import React, { useRef } from 'react'

const TextInput = ({inputFieldName, inputFieldRef, inputFieldValue, inputFieldLabel, inputFieldChange}) => {

  const handleChange = () => {
   inputFieldChange == typeof Function ? inputFieldChange() : console.log("You have not passed a function")
  }

  return(
      <div className="field">
      <label className="label">{inputFieldLabel}</label>
        <div className="control">
          <input className="input is-rounded" type="text" ref={inputFieldRef} defaultValue={inputFieldValue} />
        </div>
      </div>
  )
}
export default TextInput