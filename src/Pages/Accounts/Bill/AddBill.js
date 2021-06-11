import React, {useEffect, useState, useRef, useContext, forwardRef} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../../Contexts/firebase'
import {stateContext} from '../../../Contexts/stateContext'

import TextInput from '../../../Components/Forms/TextInput'
import TextArea from '../../../Components/Forms/TextArea'
import SelectInputProps from '../../../Components/Forms/SelectInputProps'
import TextInputAC from '../../../Components/Forms/TextInputAC'
import Page from '../../../Components/Page'
import Columns from '../../../Components/Layout/Columns'
import Column from '../../../Components/Layout/Column'

const AddBill = (state) => {

  const userContext = useContext(stateContext)

  const {currentUser, currentCompany, currentCompanyID} = userContext.userSession

  const history = useHistory()
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const billDate = useRef("")
  const billAccountID = useRef("")
  const billAccountNum = useRef("")
  const billCost = useRef("")
  const billDisputedCost = useRef("")
  const billTicketID = useRef("")
  const billTicketNum = useRef("")
  
  
  const handleSubmit = async(e) => {
    const data = {
      Date: billDate.current.value,
      AccountID: state.location.state.AccountID,
      AccountNum: state.location.state.AccountNum,
      Cost: billCost.current.value,
      DisputeCost: billDisputedCost.current.value,
      
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
      LastUpdatedBy: currentUser,
      LastUpdated: Date()
      
    }  
    console.log(data)
    try {
      await db.collection("Bills").doc().set(data)
      setPageSuccess("Bill Added")
      autoClose()
    } catch {
      setPageError("Error Adding Bill")
    }
  }

  const autoClose = () => {
    setTimeout(() => {history.goBack()}, 1000)
  }
  
  const handleChange = (e) => {
    setDropDown(true)
    const {value} = e.target
    const locationAC = locations.filter(({Name, Address1, State, City}) => Name.indexOf(value) > -1 || Address1.indexOf(value) > 1 || State.indexOf(value) > -1 || City.indexOf(value) > -1 )
    orderLocationName.current = value
    setDropDown(locationAC)
  }

  const handleSuggestedRef = (name, id) => {
    console.log(name)
    console.log(id)
    orderLocationID.current = id
    orderLocationName.current = name
    setDropDown("")
  }

  const handleDateChange = (date) => {
    orderDate.current = date
  }
  

  return (
    <Page title="Add Order" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
        
      <form>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Date"
              inputFieldRef={billDate}
              inputFieldValue={""}
              hint=""
            />
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Cost"
              inputFieldRef={billCost}
              inputFieldValue={""}
              hint="Base cost without taxes and fees"
            />       
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Disputed Cost"
              inputFieldRef={billDisputedCost}
              inputFieldValue={""}
              hint=""
            />
          </Column>

          <Column size="is-three-quarters" isVisible={false}>
            <SelectInputProps
              fieldLabel="Tickets"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={billTicketID}
              hint="">
                
            </SelectInputProps>
          </Column>
          
      </form>

        
    </Page>
      
  )
}
export default AddBill