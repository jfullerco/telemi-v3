import React from 'react'
import Hint from './Hint'
import { FaDollarSign } from 'react-icons/fa';



const TextBox = (props) => {
  const {title, value, type, name, fieldChanged, hint, addOn} = props
  return(
      <div className="field">
      <label className="label">{title}</label>
        <div className={addOn != undefined ? "control has-icons-left" : "control"}>
          {addOn === "currency" ? <i className="icon is-left"><FaDollarSign /></i> : ""}
          <input type={type != undefined ? type : "text"} className="input is-rounded " name={name} value={value} onChange={e=>fieldChanged(e)} />  
        </div>
        {hint && <Hint>{hint}</Hint>}
      </div>
  )
}
export default TextBox