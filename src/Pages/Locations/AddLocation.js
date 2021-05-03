import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'

const AddLocation = () => {

  const userContext = useContext(stateContext)
  
  const [modalState, setModalState] = useState(true)
  const [addLocationError, setAddLocationError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()
  
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
    autoClose()
  }

  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(false)}, 1000)
  }
  

  return (
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
      <div className="modal-card-head">
        <p className="modal-card-title">Add Location</p>
      </div>
        <section className="modal-card-body">
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
            <TextInput 
              inputFieldLabel="State"
              inputFieldRef={locationState}
              inputFieldValue={""}
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
        <div className="block">
          <div className="notification is-danger is-hidden">{addLocationError}</div>
         {success === true ?  <div className="notification is-success">Location Added</div> : ""}
        </div>
        <div className="modal-card-foot">
          
          <button className="button level-item"
          type="submit" onClick={handleSubmit}
          >
            Add Location
          </button>
        
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>  
        </section>
      </div>
    </div>
  )
}
export default AddLocation