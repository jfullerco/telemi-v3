import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import StateDropDown from '../../Components/Forms/StateDropDown'
import Page from '../../Components/Page'

const AddLocation = () => {

  const userContext = useContext(stateContext)
  const history = useHistory()
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  
  const locationName = useRef("")
  const locationAddress1 = useRef("")
  const locationAddress2 = useRef("")
  const locationCity = useRef("")
  const locationPhone = useRef("")
  const locationState = useRef("")
  const locationZip = useRef("")

  const handleSubmit = async(e) => {
    const data = {
      Name: locationName.current.value,
      Address1: locationAddress1.current.value,
      Address2: locationAddress2.current.value,
      City: locationCity.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      Phone: locationPhone.current.value,
      State: locationState.current.value,
      Zip: locationZip.current.value
    }  
    console.log(data)
    const res = await db.collection("Locations").doc().set(data)
    userContext.setDataLoading(true)
    history.push("/dashboard")
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }
  

  return (
      <Page title="Add Location" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose} >
          <form>

            <TextInput 
              inputFieldLabel="Location Name"
              inputFieldRef={locationName}
              inputFieldValue={""}
            />
            <TextInput 
              inputFieldLabel="Address 1"
              inputFieldRef={locationAddress1}
              inputFieldValue={""}
            />
            <TextInput 
              inputFieldLabel="Address 2"
              inputFieldRef={locationAddress2}
              inputFieldValue={""}
            />
            <TextInput 
              inputFieldLabel="City"
              inputFieldRef={locationCity}
              inputFieldValue={""}
            />
            <StateDropDown 
              fieldRef={locationState}
              
            />
            <TextInput 
              inputFieldLabel="Zip"
              inputFieldRef={locationZip}
              inputFieldValue={""}
            />
            <TextInput 
              inputFieldLabel="Phone"
              inputFieldRef={locationPhone}
              inputFieldValue={""}
            />
            
          </form>
        
      </Page>
  )
}
export default AddLocation