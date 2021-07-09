import React, {useRef, useContext} from 'react'
import TextInput from '../Components/Forms/TextInput'

const ReusableTextInput = () => {

  const inputRef = useRef("")

  const handleChange = () => {
    console.log(inputRef.current.value)
  }

  return(
    <>
      <TextInput inputFieldValue={inputRef} inputFieldChange={()=> handleChange()} />
    </>
  )
}

export default ReusableTextInput