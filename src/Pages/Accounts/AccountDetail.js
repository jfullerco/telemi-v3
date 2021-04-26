import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'
import TextInput from '../../Components/Forms/TextInput'

import AddNote from '../Dashboard/Components/AddNote'

const AccountDetail = () => {

  const userContext = useContext(stateContext)
  const {dataLoading} = userContext
  const history = useHistory()
  
  const [addAccountError, setAddAccountError] = useState("")
  const [success, setSuccess] = useState(false)

  const [activeAccount, setActiveAccount] = useState()
  const [accounts, setAccounts] = useState()
  const [locations, setLocations] = useState()
  const [servicesByLocation, setServicesByLocation] = useState()
  
  const accountAccountNum = useRef("")
  const accountVendor = useRef("")
  const accountPreTaxMRC = useRef("")
  const accountPostTaxMRC = useRef("")
  const accountParentAccountID = useRef("")
  const accountParentAccountName = useRef("")
  const accountVendorBillType = useRef("")
  const accountGroupNum = useRef("")
  const accountInternalBillingCode = useRef("")
  const accountNotes = useRef("")
  const accountContractSignedDate = useRef("")
  const accountContractTerm = useRef("")
  const accountContractExpiresDate = useRef("")
  const accountServiceLocationID = useRef("")
  const accountServiceLocationName = useRef("")
  const accountServiceID = useRef("")
  const testInput = useRef("")
console.log(testInput.current.value)

  useEffect(() => {
    fetchAccount()
    fetchAccounts()
    fetchLocations()
    
  },[])

  const fetchAccount = async() => {
   
    const accountRef = await db.collection("Accounts").doc(userContext.userSession.currentAccountID).get()

    const data = await accountRef.data()
    const id = await accountRef.id
    setActiveAccount(data)
    userContext.setDataLoading(false)
  }

  const fetchAccounts = async() => {
   
    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const accounts = accountsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setAccounts(accounts)

  }

  const fetchLocations = async() => {
   
    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setLocations(locations)

  }

  const fetchServices = async() => {

    const servicesRef = await db.collection("Services").where("LocationID", "==", activeAccount.AccountServiceLocationID).get()

    const services = servicesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setServicesByLocation(services)
  }
  
  const handleLocationChange = (e) => {
    accountServiceLocationID.current.value = e.target.value
    accountServiceLocationName.current.value = e.target.name
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
      GroupNum: accountGroupNum.current.value,
      InternalBillingCode: accountInternalBillingCode.current.value,
      Notes: accountNotes.current.value,
      ContractSignedDate: accountContractSignedDate.current.value,
      ContractTerm: accountContractTerm.current.value,
      ContractExpiresDate: accountContractExpiresDate.current.value,
      AccountServiceLocationID: accountServiceLocationID.current.value,
      AccountServiceLocationName: accountServiceLocationID.current[accountServiceLocationID.current.selectedIndex].text,
      AccountServiceID: accountServiceID.current.value,
      AccountServiceName: accountServiceID.current[accountServiceID.current.selectedIndex].text
    }  

    console.log(data)
    const res = await db.collection("Accounts").doc(userContext.userSession.currentAccountID).update(data)
    history.push("/dashboard")
  }

  
console.log()
  return (
    <div>
    {activeAccount != undefined ? ( <>
      <div className="title">{activeAccount.AccountNum} Detail</div>
        
        <form>
            <>

            <div className="level-right">
              <span className="icon-text is-clickable" onClick={handleSubmit}>
                <span>Update</span> <FontAwesomeIcon icon={faSave} />
              </span>
            </div>
            <div className="field">
              <label className="label">Parent Account</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                  <select className="select" ref={accountParentAccountID}>
                  
                  {activeAccount.ParentAccountNum !="Parent" ? 
                  <option value={activeAccount.id}>{activeAccount.ParentAccountNum}</option> : ""}

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
                <input className="input is-rounded" type="text" ref={accountAccountNum} defaultValue={activeAccount.AccountNum} />
              </div>
            </div>

            <div className="field">
              <label className="label">Vendor</label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={accountVendor} defaultValue={activeAccount.Vendor} />
              </div>
            </div>

            <div className="field">
              <label className="label">Assign Location</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                  <select className="select" ref={accountServiceLocationID} onChange={() => {fetchServices()}}>
                  <option value={activeAccount.AccountServiceLocationID}>{activeAccount.AccountServiceLocationName}</option>
                  {locations != undefined ? locations.map(location => (
                    <option key={location.id} value={location.id} name={location.Name} >
                      {location.Name}
                    </option>
                  )) : "Add a location before adding a service"}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Assign Service</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                  <select className="select" ref={accountServiceID} onClick={() => {fetchServices()}}>

                  {activeAccount.AccountServiceID != undefined ? 
                  <option value={activeAccount.AccountServiceID}>{activeAccount.AccountServiceName}</option> : 
                  <option></option> }

                  {servicesByLocation != undefined ? servicesByLocation.map(service => (
                    <option key={service.id} value={service.id} name={service.AssetID} >
                      {service.AssetID} - {service.VendorServiceName}
                    </option>
                  )) : "Add a location before adding a service"}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Pre-Tax Cost</label>
              <p className="control has-icons-left">
                <input className="input is-rounded" type="text" ref={accountPreTaxMRC} defaultValue={activeAccount.PreTaxMRC} />
                <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </p>
            </div>

            <div className="field">
              <label className="label">Post-Tax Cost</label>
              <p className="control has-icons-left">
                <input className="input is-rounded" type="text" ref={accountPostTaxMRC} defaultValue={activeAccount.PostTaxMRC} />
                <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </p>
            </div>

            <div className="field">
              <label className="label">Bill Group Number</label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={accountGroupNum} defaultValue={activeAccount.GroupNum} />
              </div>
            </div>

            <div className="field">
              <label className="label">Internal Billing Code</label>
              <div className="control"> 
                <input className="input is-rounded" type="text" name="Internal Billing Code" ref={accountInternalBillingCode} defaultValue={activeAccount.InternalBillingCode} />
              </div>
            </div>
 
            <div className="field">
              <label className="label">Contract Signed Date</label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={accountContractSignedDate} defaultValue={activeAccount.ContractSignedDate} />
              </div>
            </div>

            <div className="field">
            <label className="label">Contract Term</label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={accountContractTerm} defaultValue={activeAccount.ContractTerm} />
              </div>
            </div>

            <div className="field">
            <label className="label">Contract Expires</label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={accountContractExpiresDate} defaultValue={activeAccount.ContractExpiresDate} />
              </div>
            </div>

            <div className="field">
            <label className="label">Notes</label>
              <div className="control">
                <textarea className="textarea is-rounded" type="text" ref={accountNotes} defaultValue={activeAccount.Notes} />
              </div>
            </div>

            </> 
          </form>
        {/** <AddNote attachedTo="Accounts" attachedID={activeAccount.id} /> */}
        <div className="block">
          <div className="notification is-danger is-hidden">{addAccountError}</div>
         {success === true ?  <div className="notification is-success">Account Added</div> : ""}
        </div>
        <div className="modal-card-foot">
        
          <button className="button is-black is-outlined is-rounded level-item" type="submit" onClick={handleSubmit}>
            Update Account
          </button>
        
        </div>

        
          
    </> ) : ""}
    </div>
  )
}
export default AccountDetail