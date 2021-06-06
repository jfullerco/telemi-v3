import React, { useState } from 'react'
import Hint from './Hint'

const TextArea = ({inputFieldName, inputFieldRef, inputFieldValue, inputFieldLabel, inputFieldChange, hint, isVisible}) => {

  const [visible, setVisible] = useState(isVisible)

  const handleChange = () => {
   inputFieldChange != undefined ? inputFieldChange() : ""
  }

  return(
    
      <div className="field">

      <label className="label">
        {inputFieldLabel}
          {visible == false ? 
          <span className="is-size-6 ml-1"><a onClick={()=> setVisible(!visible)}>+</a></span> : 
          <span className="is-size-6 ml-1"><a onClick={()=> setVisible(!visible)}>-</a></span> }
      </label>

        <div className={visible != false ? "control" : "control is-hidden"}>
          <textarea className="textarea is-rounded" type="textarea" ref={inputFieldRef} defaultValue={inputFieldValue} onChange={handleChange} />
          <Hint>{hint && hint}</Hint>
        </div>
      </div>
  )
}
export default TextArea