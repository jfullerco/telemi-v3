import React, { useRef } from 'react'

const TextInputProps = (props) => {

  const {inputFieldName, inputFieldRef, inputFieldValue, inputFieldLabel, inputFieldChange} = props

  const handleChange = () => {
   inputFieldChange != undefined ? inputFieldChange() : ""
  }

  return(
      <div className="field">
      <label className="label">{inputFieldLabel}</label>
        <div className="control">
          <input className="input is-rounded" type="text" ref={inputFieldRef} defaultValue={inputFieldValue} onChange={handleChange}>{props.children}</input>
        </div>
      </div>
  )
}
export default TextInputProps