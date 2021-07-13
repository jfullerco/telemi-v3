import React, {useEffect, useState, useRef, useContext, forwardRef} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../Contexts/firebase'
import {stateContext} from '../Contexts/stateContext'

import TextBox from '../Components/Forms/TextInput'
import TextArea from '../Components/Forms/TextArea'
import SelectInputProps from '../Components/Forms/SelectInputProps'
import TextInputAC from '../Components/Forms/TextInputAC'
import DrawerPage from '../Components/DrawerPage'
import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'

const QuickAdd = ({
  colRef,
  dataField,
  handleUpdated,
  handleClose,
}) => {

  const userContext = useContext(stateContext)

  const { setCurrentDate, 
          refreshBills } = userContext
  const { currentUser, 
          currentCompany, 
          currentCompanyID}  = userContext.userSession

  const history = useHistory()

  const [data, setData] = useState("")
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const currentDate = setCurrentDate()

  
  

  const handleSubmit = async() => {
    console.log(data)
    try {
      
      await db.collection(colRef).doc().set(data) 
      
      setPageSuccess("Saved")
      
      handleUpdated()
      
    } catch {
      setPageError("Error Saving")
    }
    setTimeout(() => {()=>handleClose(false)}, 1000)
  }

  const autoClose = () => {
    setTimeout(() => {()=>handleClose()}, 1000)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setData({...data, [name]: value})
  }
  

  return (
    <DrawerPage title="Quick Add" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} status="new" backbtn="hide" handleClose={()=>handleClose(false)}>
       
      <form>

          <Column size="is-three-quarters" isVisible={true}>
            <TextBox 
              inputFieldLabel={dataField}
              fieldChanged={handleChange}
              inputFieldValue={""}
              type="text"
              hint=""
            />
          </Column>

          
          
      </form>

        
    </DrawerPage>
      
  )
}
export default QuickAdd