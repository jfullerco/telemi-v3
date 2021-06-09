import React, {useState, useContext, useRef, useEffect} from 'react'

import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

import Page from '../../Components/Page'
import TextInput from '../../Components/Forms/TextInput'

const AddUsers = () => {

  const userContext = useContext(stateContext)
  const {currentCompanyID} = userContext.userSession

  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()

  const userFirstName = useRef("")
  const userLastName = useRef("")
  const userEmail = useRef("")

  const handleSubmit = async() => {
    const data = {
      Email: userEmail.current.value,
      FirstName: userFirstName.current.value,
      LastName: userLastName.current.value,
      Companies: [
        {currentCompanyID}
      ]
    }
    try {
      const res = await db.collection("Users").doc.set(data)
      setPageSuccess("User Added")
      autoClose()
    } catch {
      setPageError("Error Adding User")
    }
  }

  const autoClose = () => {
    setTimeout(() => {history.goBack()}, 1000)
  }

  return(
    <Page title="Add User" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
    
    <TextInput inputFieldLabel="Email" inputFieldRef={userEmail} inputFieldValue={""} />

    <TextInput inputFieldLabel="First Name" inputFieldRef={userFirstName} inputFieldValue={""} />

    <TextInput inputFieldLabel="Last Name" inputFieldRef={userLastName} inputFieldValue={""} />

    </Page>
  )
}
export default AddUsers