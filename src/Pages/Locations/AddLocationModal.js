import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import StateDropDown from '../../Components/Forms/StateDropDown'
import Modal from '../../Components/Modal'

const AddLocation = ({resetAddRelatedValue, handleUpdated}) => {

  const userContext = useContext(stateContext)
  const { setLocations, refreshLocations } = userContext
  const { currentCompanyID, currentCompany } = userContext.userSession
  
  const [modalState, setModalState] = useState(true)
  const [addLocationError, setAddLocationError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()
  
  const locationName = useRef("")

  const handleSubmit = async(e) => {
    const data = {
      Name: locationName.current.value,
      CompanyID: currentCompanyID,
      CompanyName: currentCompany
    }  
    console.log(data)
    const res = await db.collection("Locations").doc().set(data)
    refreshLocations()
    handleUpdated()
    handleModalClose()
  }

  const handleModalClose = () => {
    resetAddRelatedValue()
    setModalState(false)
  }
  

  return (
      <Modal title="Add Location" handleSubmit={handleSubmit} modalState={modalState} >
          <form>

            <TextInput 
              inputFieldLabel="Location Name"
              inputFieldRef={locationName}
              inputFieldValue={""}
            />
            
          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{addLocationError}</div>
         {success === true ?  <div className="notification is-success">Location Added</div> : ""}
        </div>
      </Modal>
  )
}
export default AddLocation