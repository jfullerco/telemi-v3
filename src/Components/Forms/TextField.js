import React from 'react'
import Hint from './Hint'

const TextField = ({title, value, handleChange, name, hint}) => {

  return(
      <div className="field">
      <label className="label">{title}</label>
        <div className="control">
          <input className="input is-rounded is-small" name={name} type="text" defaultValue={value} onChange={handleChange} />  
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default TextField