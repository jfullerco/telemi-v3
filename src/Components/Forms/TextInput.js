import React, { useRef } from 'react'

const TextInput = (props) => {

  const inputFieldName = props.inputFieldName
  const inputFieldValue = props.inputFieldValue

  const inputValueRef = useRef("")
  const inputNameRef = useRef(inputFieldName)

  return(
    <>
      <input className="input is-rounded" name={inputNameRef} defaultValue={inputFieldValue} ref={inputValueRef}/>
    </>
  )
}

export {inputValueRef, inputNameRef}
export default TextInput