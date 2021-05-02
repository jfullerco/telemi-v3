import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'
import SelectInputProps from '../../Components/Forms/SelectInputProps'

const AccountDetail = () => {

  const userContext = useContext(stateContext)
  const {dataLoading} = userContext
  const history = useHistory()
  
  const [addAccountError, setAddAccountError] = useState("")
  const [success, setSuccess] = useState(false)

  const [activeAccount, setActiveAccount] = useState()
  const [locations, setLocations] = useState()
  const [servicesByLocation, setServicesByLocation] = useState()
  const [toggleServiceList, setToggleServiceList] = useState()
  
  const accountNum = useRef("")
  const subAccountNum = useRef("")
  const accountVendor = useRef("")
  const accountGroupNum = useRef("")
  const accountInternalBillingCode = useRef("")
  const accountServiceLocationID = useRef("")
  const accountServiceLocationName = useRef("")
  const accountServiceID = useRef("")
  const accountPreTaxMRC = useRef("")
  const accountPostTaxMRC = useRef("")
  

  useEffect(() => {
    fetchAccount()
    fetchLocations()
    
  },[])

  useEffect(() => {
    accountServiceLocationID.current.value != undefined ?
    fetchServices() : ""
  },[toggleServiceList])

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
    console.log(accounts)
    setAccounts(accounts)

  }

  const fetchLocations = async() => {
   
    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({id: doc.id, Name: doc.Name, ...doc.data()}))
    setLocations(locations)

  }

  const fetchServices = async() => {
    
    const servicesRef = await db.collection("Services").where("LocationID", "==", accountServiceLocationID.current.value).get()

    const services = servicesRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()}))
    setServicesByLocation(services)
    
  }
  
  const handleToggleServiceList = () => {
    setToggleServiceList(!toggleServiceList)
  }
  
  const handleSubmit = async(e) => {

    const data = {

      AccountNum: accountNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      Vendor: accountVendor.current.value,
      PreTaxMRC: accountPreTaxMRC.current.value,
      PostTaxMRC: accountPostTaxMRC.current.value,
      SubAccountNum: subAccountNum.current.value,
      GroupNum: accountGroupNum.current.value,
      InternalBillingCode: accountInternalBillingCode.current.value,
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
      <div className="title">
        Account {activeAccount.AccountNum} Detail
      </div>
        
        <form>
            <>

            <div className="level-right">
              <span className="icon-text is-clickable" onClick={handleSubmit}>
                <span>Update</span> <FontAwesomeIcon icon={faSave} />
              </span>
            </div>

            <TextInput 
              inputFieldLabel="Account Number"
              inputFieldRef={accountNum}
              inputFieldValue={activeAccount.AccountNum}
            />

            <TextInput 
              inputFieldLabel="Sub Account Number"
              inputFieldRef={subAccountNum}
              inputFieldValue={activeAccount.SubAccountNum}
            />
            
            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue={activeAccount.Vendor}
              fieldInitialOption={activeAccount.Vendor}
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

            <SelectInput 
              fieldOptions={locations}
              fieldLabel="Related Location"
              fieldInitialValue={activeAccount.AccountServiceLocationID}
              fieldInitialOption={activeAccount.AccountServiceLocationName}
              fieldIDRef={accountServiceLocationID}
              fieldChange={()=>handleToggleServiceList()}
            />

            <SelectInputProps 
              fieldLabel="Related Service"
              fieldInitialValue={activeAccount.AccountServiceID}
              fieldInitialOption={activeAccount.AccountServiceName}
              fieldIDRef={accountServiceID}
            >
              {servicesByLocation != undefined ? 
                servicesByLocation.map(service => (
                  <option value={service.id} key={service.id}> 
                  {service.AssetID}</option>
                )) : (
                  <option></option>
              )}
            </SelectInputProps>

            <TextInput 
              inputFieldLabel="Pre-Tax Cost"
              inputFieldRef={accountPreTaxMRC}
              inputFieldValue={activeAccount.PreTaxMRC}
            />

            <TextInput 
              inputFieldLabel="Post-Tax Cost"
              inputFieldRef={accountPostTaxMRC}
              inputFieldValue={activeAccount.PostTaxMRC}
            />

            <TextInput 
              inputFieldLabel="Bill Group Number"
              inputFieldRef={accountGroupNum}
              inputFieldValue={activeAccount.GroupNum}
            />

            <TextInput 
              inputFieldLabel="Internal Billing Code"
              inputFieldRef={accountInternalBillingCode}
              inputFieldValue={activeAccount.InternalBillingCode}
            />
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