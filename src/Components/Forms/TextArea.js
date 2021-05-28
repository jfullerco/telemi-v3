import React, { useRef } from 'react'

const TextArea = ({inputFieldName, inputFieldRef, inputFieldValue, inputFieldLabel, inputFieldChange}) => {

  const handleChange = () => {
   inputFieldChange != undefined ? inputFieldChange() : ""
  }

  return(
      <div className="field">
      <label className="label">{inputFieldLabel}</label>
        <div className="control">
          <textarea className="textarea is-rounded" type="textarea" ref={inputFieldRef} defaultValue={inputFieldValue} onChange={handleChange} />
        </div>
      </div>
  )
}
export default TextArea