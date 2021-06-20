import React from 'react'
import Hint from './Hint'

import TextField from '@material-ui/core/TextField';

const TextBox = (props) => {
  const {title, value, name, fieldChanged, hint} = props
  return(
      <div className="field">
      <label className="label is-hidden">{title}</label>
        <div className="control">
          
          <TextField
            id={name}
            label={title}
            type="number"
            InputLabelProps={{
            shrink: true,
            }}
            name={name} 
            value={value} 
            type="text"
            onChange={e=>fieldChanged(e)}
            variant="outlined"
        /> 
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default TextBox