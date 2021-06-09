import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import Modal from '../../Components/Modal'


const AddCompany = () => {
  const history = useHistory()
  const userContext = useContext(stateContext)
  const {setDataLoading} = userContext
  const {currentUser} = userContext.userSession

  const [modalState, setModalState] = useState(true)
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const companyName = useRef("")

  const handleSubmit = async(e) => {

    const data = {
      Name: companyName.current.value,
      Users: [currentUser]
    }  

    try {
      await db.collection("Companies").doc().set(data)
      setPageSuccess("Company Added")
      autoClose()
    } catch {
      setPageError("Error Adding Company")
    }
  }
  

  const handleModalClose = () => {
    autoClose()
  }

  const autoClose = () => {
    
    setTimeout(() => {

      setDataLoading(true)

      setModalState(false)

      history.goBack()
    }, 1000)
    
  }
  

  return (
    <Modal title="Add Company" handleSubmit={handleSubmit} modalState={modalState}>

          <form>
            <TextInput 
              inputFieldLabel="Company Name"
              inputFieldRef={companyName}
            />
          </form>
        
      </Modal>
  )
}
export default AddCompany