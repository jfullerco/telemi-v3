import React from 'react'
import Hint from './Hint'

const TextField = ({title, value, name, handleChange, hint}) => {

  return(
      <div className="field">
      <label className="label">{title}</label>
        <div className="control">
          <input className="input is-rounded is-small" type="text" name={name} onChange={handleChange} defaultValue={value} />  
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default TextField