import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import Page from '../../Components/Page'


const AddCompany = ({open}) => {
  const history = useHistory()
  const userContext = useContext(stateContext)
  const {setDataLoading} = userContext
  const {currentUser} = userContext.userSession

  const [checked, setChecked] = useState(true)
  
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
    
    
  }
  

  return (
    
      <Page subtitle="Add Company" handleSubmit={handleSubmit} status="new" handleToggleReadOnly={()=> setInputReadOnly(!inputReadOnly)} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>

          <form>
            <TextInput 
              inputFieldLabel="New Company Name"
              inputFieldRef={companyName}
            />
          </form>
        
      </Page>
    
  )
}
export default AddCompany