import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'
import {useAuth} from '../../Contexts/AuthContext'

import TextInput from '../../Components/Forms/TextInput'
import Modal from '../../Components/Modal'


const AddCompany = () => {
  const history = useHistory()
  const userContext = useContext(stateContext)
  const currentUser = useAuth()
  const [modalState, setModalState] = useState(true)
  const [addCompanyError, setAddCompanyError] = useState("")
  const [success, setSuccess] = useState(false)
  
  const companyName = useRef("")

  const handleSubmit = async(e) => {

    const data = {
      Name: companyName.current.value,
      Users: [currentUser]
    }  

    const res = await db.collection("Companies").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()

  }

  const handleModalClose = () => {
    autoClose()
  }

  const autoClose = () => {
    
    setTimeout(() => {
      setModalState(false)
      history.push("/dashboard")
    }, 2000)
    
  }
  

  return (
    <Modal title="Add Company" handleSubmit={handleSubmit} modalState={modalState}>
          <form>
            <TextInput 
              inputFieldLabel="Company Name"
              inputFieldRef={companyName}
            />
          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{addCompanyError}</div>
         {success === true ?  <div className="notification is-success">Company Added</div> : ""}
        </div>
      </Modal>
  )
}
export default AddCompany