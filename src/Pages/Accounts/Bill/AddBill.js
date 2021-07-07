import React, {useEffect, useState, useRef, useContext, forwardRef} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../../Contexts/firebase'
import {stateContext} from '../../../Contexts/stateContext'

import TextInput from '../../../Components/Forms/TextInput'
import TextArea from '../../../Components/Forms/TextArea'
import SelectInputProps from '../../../Components/Forms/SelectInputProps'
import TextInputAC from '../../../Components/Forms/TextInputAC'
import Modal from '../../../Components/Modal'
import Columns from '../../../Components/Layout/Columns'
import Column from '../../../Components/Layout/Column'

const AddBill = ({
  accountID,
  accountNum,
  subAccountNum,
  groupNum,
  assetID,
  serviceID,
  modalState,
  resetState,
  handleUpdated,
  update, 
  id, 
  bill
}) => {

  const userContext = useContext(stateContext)
  const {setCurrentDate, refreshBills} = userContext
  const {currentUser, currentCompany, currentCompanyID} = userContext.userSession

  const history = useHistory()
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const currentDate = setCurrentDate()
  
  const billDate = useRef("")
  
  const billCost = useRef("")
  const billDisputedCost = useRef("")
  const billTicketID = useRef("")
  const billTicketNum = useRef("")
  
  

  const handleSubmit = async(e) => {
    const data = {
      Date: billDate.current.value,
      AccountID: accountID,
      AccountNum: accountNum,
      Cost: billCost.current.value,
      DisputedAmount: billDisputedCost.current.value,
      GroupNum: groupNum,
      AssetID: assetID,
      ServiceID: serviceID,
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
      LastUpdatedBy: currentUser,
      LastUpdated: currentDate
      
    }  
    console.log(data)
    try {
      update === false ?
      await db.collection("Bills").doc().set(data) :
      await db.collection("Bills").doc(id).update(data)
      setPageSuccess("Bill Added")
      refreshBills()
      handleUpdated()
      autoClose()
    } catch {
      setPageError("Error Adding Bill")
    }
  }

  const autoClose = () => {
    setTimeout(() => {resetState("")}, 1000)
  }
  

  return (
    <Modal title="Add Order" modalState={true} handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
        
      <form>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Date"
              inputFieldRef={billDate}
              inputFieldValue={""}
              type="date"
              hint=""
            />
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Cost"
              inputFieldRef={billCost}
              inputFieldValue={""}
              hint=""
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

        
    </Modal>
      
  )
}
export default AddBill