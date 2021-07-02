import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import StateDropDown from '../../Components/Forms/StateDropDown'
import Modal from '../../Components/Modal'

const AddLocation = ({resetAddRelatedValue}) => {

  const userContext = useContext(stateContext)
  
  const [modalState, setModalState] = useState(true)
  const [addLocationError, setAddLocationError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()
  
  const locationName = useRef("")

  const handleSubmit = async(e) => {
    const data = {
      Name: locationName.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany
    }  
    console.log(data)
    const res = await db.collection("Locations").doc().set(data)
    refreshLocations()
  }

  const refreshLocations = () => {
    const locationsRef = db.collection("Locations").where("CompanyID", "==", currentCompanyID).get()
    const locations = locationsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    userContext.setLocations(locations)
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