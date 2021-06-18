import React from 'react'
import Hint from './Hint'

const TextBox = (props) => {
  const {title, value, name, fieldChanged, hint} = props
  return(
      <div className="field">
      <label className="label">{title}</label>
        <div className="control">
          <input type="text" className="input is-rounded is-small" name={name} value={value} onChange={e=>fieldChanged(e)} />  
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default TextBox