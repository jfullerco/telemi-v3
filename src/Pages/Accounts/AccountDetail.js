import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import Page from '../../Components/Page'
import GridComponent from '../Dashboard/Components/GridComponent'

const AccountDetail = (state) => {

  const userContext = useContext(stateContext)
  const {dataLoading} = userContext
  const history = useHistory()
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()

  const [activeAccount, setActiveAccount] = useState()
  const [locations, setLocations] = useState(state.location.state.locations)
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
  
console.log(state)
  useEffect(() => {
    fetchAccount()
  },[])

  useEffect(() => {
    accountServiceLocationID.current.value != undefined ?
    fetchServices() : ""
  },[toggleServiceList])

  const fetchAccount = async() => {
   
    const accountRef = await db.collection("Accounts").doc(state.location.state.id).get()

    const data = await accountRef.data()
    const id = await accountRef.id
    setActiveAccount(data)
    userContext.setDataLoading(false)
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
    const res = await db.collection("Accounts").doc(state.location.state.id).update(data)
    history.push("/dashboard")
  }
  
  const autoClose = () => {
    setTimeout(() => {history.goBack()}, 1000)
  }

  const handleRelatedServiceID = (e) => {
    console.log(accountServiceID.current.value)
  }

  return (
    <>
    {activeAccount != undefined ? ( 
    <>
    <Page title="Account Details" handleSubmit={handleSubmit} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>
        
        <form>

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
              onChange={()=>handleRelatedServiceID()}
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
            
          </form>
          <GridComponent 
            label="BILLS"
            headerFields={billColumns}
            data={bills}
            handleSearch={(e)=>handleChangeSearchServices(e)}
            handleClick={(e)=>handleServiceClick(e)}
            handleAddBtn={() => history.push("/addservice")}
            isVisible={!serviceIsVisible}
            toggleIsVisible={()=>{setServiceIsVisible(!serviceIsVisible)}}
    />
        </Page>
          
    </> ) : ""}
    </>
  )
}
export default AccountDetail