import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'
import {currentUser} from '../../Contexts/AuthContext'


const AddCompany = () => {
  const history = useHistory()
  const userContext = useContext(stateContext)
  
  const [modalState, setModalState] = useState(true)
  const [addCompanyError, setAddCompanyError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()
  
  const companyName = useRef("")

  const handleSubmit = async(e) => {
    const data = {
      Name: companyName.current.value,
      Users: ["jonathan@jfuller.co"]
    }  
    const res = await db.collection("Companies").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    
    setTimeout(() => {
      
      setModalState(false)

    }, 2000)
    
  }
  

  return (
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">Add Company</div>
        <div className="modal-card-body">
          <form>
            <label>Company Name</label>
            <input className="input" type="text" ref={companyName} />
          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{addCompanyError}</div>
         {success === true ?  <div className="notification is-success">Company Added</div> : ""}
        </div>
        <div className="modal-card-foot">
          
          <button className="button level-item"
          type="submit" onClick={handleSubmit}
          >
            Add Company
          </button>
        
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>  
        </div>
      </div>
    </div>
  )
}
export default AddCompany