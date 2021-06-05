import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInput from '../../Components/Forms/SelectInput'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import TextInputAC from '../../Components/Forms/TextInputAC'
import Page from '../../Components/Page'

const AddOrder = (state) => {

  const userContext = useContext(stateContext)

  const {serviceTypes, accessTypes, serviceStatusType} = userContext
  const {currentUser, currentCompany, currentCompanyID} = userContext.userSession

  const history = useHistory()
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()

  const [locations, setLocations] = useState(userContext.userSession.locations)
  const [dropDown, setDropDown] = useState(false)
  const [suggestLocation, setSuggestLocation] = useState()
  
  const orderCompanyID = useRef(currentCompanyID)
  const orderCompanyName = useRef(currentCompany)
  const orderNum = useRef("")
  const orderDate = useRef("")
  const orderType = useRef("")
  const orderStatus = useRef("")
  const orderVendorServiceName = useRef("")
  const orderMRC = useRef("")
  const orderDetails = useRef("")
  const orderVendor = useRef("")
  const orderLocationID = useRef("")
  const orderLocationName = useRef("")
  
  const orderServiceID = useRef("")
  const orderServiceAssetID = useRef("")
  
  
  const handleSubmit = async(e) => {
    const data = {
      
      Vendor: serviceVendor.current.value,
      Type: serviceType.current.value,
      VendorServiceName: serviceVendorServiceName.current.value,
      LocationID: serviceLocationID.current,
      LocationName: serviceLocationName.current,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      Bandwidth: serviceDetailsBandwidth.current.value,
      AccessType: serviceAccessType.current.value,
      AssetID: serviceAssetID.current.value,
      MRC: serviceMRC.current.value,
      Notes: serviceNotes.current.value,
      LastUpdatedBy: userContext.userSession.currentUser,
      LastUpdated: Date()
      
    }  
    console.log(data)
    const res = await db.collection("Services").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }
  
  const handleChange = (e) => {
    setDropDown(true)
    const {value} = e.target
    const locationAC = locations.filter(({Name, Address1, State, City}) => Name.indexOf(value) > -1 || Address1.indexOf(value) > 1 || State.indexOf(value) > -1 || City.indexOf(value) > -1 )
    serviceLocationName.current = value
    setDropDown(locationAC)
  }

  const handleSuggestedRef = (name, id) => {
    console.log(name)
    console.log(id)
    orderLocationID.current = id
    orderLocationName.current = name
    setDropDown("")
  }

  return (
    <Page title="Add Order" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
        
      <form>

            <TextInput 
              inputFieldLabel="Vendor"
              inputFieldRef={orderVendor}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Order Number"
              inputFieldRef={orderNum}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Date Ordered"
              inputFieldRef={orderDate}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Type"
              inputFieldRef={orderType}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Status"
              inputFieldRef={orderStatus}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Vendor Service Name"
              inputFieldRef={orderVendorServiceName}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Monthly Cost"
              inputFieldRef={orderMRC}
              inputFieldValue={""}
            />

            <TextArea 
              inputFieldLabel="Details"
              inputFieldRef={orderDetails}
              inputFieldValue={""}
            />

            <TextInputAC handleChange={(e)=>handleChange(e)} 
              label="Related Location" 
              value={orderLocationName.current} 
              dropDownState={dropDown}
            >
                {dropDown != "" ? 
                  <ul> 
                  {dropDown.map(d => 
                    <a className="dropdown-item" key={d.id} onClick={()=> handleSuggestedRef(d.Name, d.id)}>
                      <li >
                        {d.Name}
                      </li>
                    </a>
                  )}
                  </ul> : ""} 
            </TextInputAC>
          
      </form>

        
    </Page>
      
  )
}
export default AddOrder