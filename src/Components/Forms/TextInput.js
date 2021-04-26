import React, { useRef } from 'react'

const TextInput = ({inputFieldName, inputFieldValue, inputFieldChange}) => {

  const handleChange = () => {
   inputFieldChange == typeof Function ? inputFieldChange() : console.log("You have not passed a function")
  }

  return(
    <>
      <input className="input is-rounded" name={inputFieldName} ref={inputFieldValue} onChange={handleChange}/>
    </>
  )
}
export default TextInput