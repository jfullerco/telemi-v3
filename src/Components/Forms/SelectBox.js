import React from 'react'
import Hint from './Hint'

import TextField from '@material-ui/core/TextField';


const SelectBox = (props) => {
  const {title, value, name, fieldChanged, children, hint} = props
  return(
      <div className="field">
      <label className="label is-hidden">{title}</label>
        <div className="control">
          
          <TextField
            id={name}
            select
            label={title}
            InputLabelProps={{
            shrink: true,
            }}
            value={value} 
            onChange={e=>fieldChanged(e)}
            variant="outlined"
            
        >
          
            {children}
          
        </TextField> 
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default SelectBox