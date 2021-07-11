import React, {useEffect, useState, useRef, useContext, forwardRef} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../../Contexts/firebase'
import {stateContext} from '../../../Contexts/stateContext'

import TextInput from '../../../Components/Forms/TextInput'
import TextArea from '../../../Components/Forms/TextArea'
import SelectInputProps from '../../../Components/Forms/SelectInputProps'
import TextInputAC from '../../../Components/Forms/TextInputAC'
import DrawerPage from '../../../Components/DrawerPage'
import Columns from '../../../Components/Layout/Columns'
import Column from '../../../Components/Layout/Column'

const AddBill = ({
  active,
  handleUpdated,
  handleClose,
}) => {

  const userContext = useContext(stateContext)

  const { setCurrentDate, 
          refreshBills } = userContext
  const { currentUser, 
          currentCompany, 
          currentCompanyID}  = userContext.userSession
  const { AccountID, 
          AccountNum, 
          SubAccountNum, 
          GroupNum, 
          AssetID, 
          id } = active
console.log(active, AccountID)
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
      AccountID: AccountID && AccountID,
      AccountNum: AccountNum && AccountNum,
      SubAccountNum: SubAccountNum && SubAccountNum,
      Cost: billCost.current.value,
      DisputedAmount: billDisputedCost.current.value,
      GroupNum: GroupNum && GroupNum,
      AssetID: AssetID && AssetID,
      ServiceID: id && id,
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
      LastUpdatedBy: currentUser,
      LastUpdated: currentDate
      
    }  
    console.log(data)
    try {
      
      await db.collection("Bills").doc().set(data) 
      
      setPageSuccess("Bill Added")
      refreshBills()
      handleUpdated()
      
    } catch {
      setPageError("Error Adding Bill")
    }
    setTimeout(() => {()=>handleClose(false)}, 1000)
  }

  const autoClose = () => {
    setTimeout(() => {()=>handleClose()}, 1000)
  }
  

  return (
    <DrawerPage title="Add Bill" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} status="new" backbtn="hide" handleClose={()=>handleClose(false)}>
      {!AccountID ? <div className="notification is-danger">No Account has been entered</div> : null}  
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

        
    </DrawerPage>
      
  )
}
export default AddBill