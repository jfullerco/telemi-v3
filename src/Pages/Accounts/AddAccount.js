import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

const AddAccount = () => {

  const userContext = useContext(stateContext)
  
  const [modalState, setModalState] = useState(true)
  const [addAccountError, setAddAccountError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [accounts, setAccounts] = useState()

  const toggleQuestions = useRef(1)
  
  const accountAccountNum = useRef("")
  const accountVendor = useRef("")
  const accountPreTaxMRC = useRef("")
  const accountPostTaxMRC = useRef("")
  const accountParentAccountID = useRef("")
  const accountServiceType = useRef("")

  useEffect(() => {
    fetchAccounts()
  },[])

  const fetchAccounts = async() => {
   
    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    

    const accounts = accountsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

    setAccounts(accounts)

  }
  
  const handleSubmit = async(e) => {
    const data = {

      AccountNum: accountAccountNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      Vendor: accountVendor.current.value,
      PreTaxMRC: accountPreTaxMRC.current.value,
      PostTaxMRC: accountPostTaxMRC.current.value,
      ParentAccountID: accountParentAccountID.current.value,
      ParentAccountNum: accountParentAccountID.current[accountParentAccountID.current.selectedIndex].text,
      ServiceType: accountServiceType.current.value
      
    }  

    console.log(data)
    const res = await db.collection("Accounts").doc().set(data)
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

  return (
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
        <div className="modal-card-title">
          Add Account
          </div>
        </div>
        <div className="modal-card-body">

          <form>

            <div className="field">
              <label className="label">Parent Account</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                  <select className="select" ref={accountParentAccountID}>
                  <option value="Parent" name="Parent"></option>
                  {accounts != undefined ? accounts.map(account => (
                    <option key={account.id} value={account.id} name={account.AccountNum} >
                      {account.AccountNum}
                    </option>
                  )) : "No other accounts added"}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Account Number</label>
              <div className="control">
                <input className="input is-rounded" type="text" name="Account Number" ref={accountAccountNum} />
              </div>
            </div>

            <div className="field">
              <label className="label">Vendor</label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={accountVendor} />
              </div>
            </div>

            <div className="field">
              <label className="label">Service Type</label>
              <p className="control">
                <input className="input is-rounded" type="text" ref={accountServiceType} />
              </p>
            </div>

            <div className="field">
              <label className="label">Pre-Tax Cost</label>
              <p className="control has-icons-left">
                <input className="input is-rounded" type="text" ref={accountPreTaxMRC} />
                
              </p>
            </div>

            <div className="field">
              <label className="label">Post-Tax Cost</label>
              <p className="control has-icons-left">
                <input className="input is-rounded" type="text" ref={accountPostTaxMRC} />
                
              </p>
            </div>
           
          </form>

        <div className="block">
          <div className="notification is-danger is-hidden">{addAccountError}</div>
         {success === true ?  <div className="notification is-success">Account Added</div> : ""}
        </div>
        <div className="modal-card-foot">
        
          <button className="button level-item" type="submit" onClick={handleSubmit}>
            Finish
          </button>
        
        </div>

        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>
          
        </div>
      </div>
    </div>
  )
}
export default AddAccount