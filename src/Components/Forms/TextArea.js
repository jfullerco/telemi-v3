import React, { useState } from 'react'
import Hint from './Hint'

const TextArea = (props) => {
  const {title, value, name, fieldChanged, hint} = props
  return(
    <div className="field">
      <label className="label">{title}</label>
        <div className="control">
          <textarea type="textarea" className="textarea is-rounded" name={name} value={value} onChange={e=>fieldChanged(e)} />  
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default TextArea