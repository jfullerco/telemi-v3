import React from 'react'
import Hint from './Hint'

const SelectField = ({title, value, handleChange, name, hide, hint, children}) => {

  return(
      <div className="field">
      <label className="label">{title && title}</label>
        <div className="control">
        <div className={hide != true ? "select is-rounded is-fullwidth is-small" : "is-hidden"}>
          <select type="select" name={name && name} defaultValue={value && value} onChange={handleChange} >
            {children}
          </select>
        </div>
        {hint && <Hint> {hint}</Hint>}
      </div>
    </div>
  )
}

export default SelectField