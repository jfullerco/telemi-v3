import React, { useRef } from 'react'

const TextArea = ({inputFieldName, inputFieldRef, inputFieldValue, inputFieldLabel, inputFieldChange}) => {

  const handleChange = () => {
   inputFieldChange()
  }

  return(
      <div className="field">
      <label className="label">{inputFieldLabel}</label>
        <div className="control">
          <textarea className="textarea is-rounded" type="text" ref={inputFieldRef} defaultValue={inputFieldValue} onChange={handleChange} />
        </div>
      </div>
  )
}
export default TextArea