import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import Modal from '../../Components/Modal'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import TextInput from '../../Components/Forms/TextInput'
import TextInputAC from '../../Components/Forms/TextInputAC'

const AddAccount = ({id}) => {

  const userContext = useContext(stateContext)
  
  const [modalState, setModalState] = useState(true)
  
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [accounts, setAccounts] = useState()
  const [dropDown, setDropDown] = useState(false)
  
  const accountAccountNum = useRef("")
  const accountSubAccountNum = useRef("")
  const accountVendor = useRef("")
  const accountPreTaxMRC = useRef("")
  const accountPostTaxMRC = useRef("")
  const accountServiceType = useRef("")

  useEffect(() => {
    fetchAccounts()
  },[])

  const fetchAccounts = async() => {
   
    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).where("SubAccountNum", "!=", false).get()

    const accounts = accountsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

    setAccounts(accounts)

  }
  
  const handleSubmit = async() => {
    const data = {

      AccountNum: accountAccountNum.current,
      SubAccountNum: accountSubAccountNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      Vendor: accountVendor.current.value,
      PreTaxMRC: accountPreTaxMRC.current.value,
      PostTaxMRC: accountPostTaxMRC.current.value,
      AccountServiceID: id
    }  

    console.log(data)
    const res = await db.collection("Accounts").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()

  }

  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(false)}, 1000)
  }

  const handleToggle = (e) => {
    toggleQuestions.current = toggleQuestions.current + e
  }

  const handleChange = (e) => {
    setDropDown("")
    const {value} = e.target
    const accountsAC = accounts.filter(({AccountNum}) => AccountNum.indexOf(value) > -1)
    accountAccountNum.current = value
    setDropDown(accountsAC)
    console.log(accounts)
  }

  const handleSuggestedRef = (val) => {
    accountAccountNum.current = val
    setDropDown("")
  }

  return (
    <Modal title="Add Account" handleSubmit={handleSubmit} modalState={modalState}>
      <form>
        <TextInputAC handleChange={(e)=>handleChange(e)} 
          label="Account Number" 
          value={accountAccountNum.current} 
          dropDownState={dropDown}>
          {dropDown != "" ? 
            <ul> 
              {dropDown.map(d => 
              <a className="dropdown-item" key={d.id} onClick={()=> handleSuggestedRef(d.AccountNum)}>
                <li >{d.AccountNum}</li>
              </a>
              )}
            </ul> : ""} 
            </TextInputAC>
            
            <TextInput 
              inputFieldLabel="Sub-Account Number"
              inputFieldRef={accountSubAccountNum}
              inputFieldValue={""}
            />

            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={accountVendor}>
                <option>AT&T</option>
                <option>Verizon</option>
                <option>CenturyLink</option>
                <option>Lumos</option>
                <option>Windstream</option>
                <option>Spectrum</option>
                <option>Comcast</option>
                <option>Masergy</option>
                <option>Microsoft</option>
            </SelectInputProps>

            <TextInput 
              inputFieldLabel="Pre-Tax Cost"
              inputFieldRef={accountPreTaxMRC}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Post-Tax Cost"
              inputFieldRef={accountPostTaxMRC}
              inputFieldValue={""}
            />
            
      </form>
    </Modal>
  )
}
export default AddAccount