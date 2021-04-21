import React, {useState, useContext, useRef, useEffect} from 'react'

import {stateContext} from '../../stateContext'
import {db} from '../../Contexts/firebase'

const AddUsers = () => {

  const userContext = useContext(stateContext)

  const userFirstName = useRef("")
  const userLastName = useRef("")
  const userEmail = useRef("")

  const handleSubmit = async() => {
    const data = {
      Email: userEmail.current.value,
      FirstName: userFirstName.current.value,
      LastName: userLastName.current.value
    }
    const res = await db.collection("Users").doc.set(data)
  }
  return(
    <>
    
    </>
  )
}
export default AddUsers