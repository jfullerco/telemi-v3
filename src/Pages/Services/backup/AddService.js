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

const AddService = () => {

  const userContext = useContext(stateContext)

  const {serviceTypes, accessTypes, serviceStatusType, vendorList} = userContext
  const {currentUser} = userContext.userSession

  const history = useHistory()
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()

  const [locations, setLocations] = useState(userContext.userSession.locations)
  const [dropDown, setDropDown] = useState(false)
  const [suggestLocation, setSuggestLocation] = useState()
  
  const serviceVendor = useRef("")
  const serviceType = useRef("")
  const serviceVendorServiceName = useRef("")
  const serviceLocationID = useRef("")
  const serviceLocationName = useRef("")
  const serviceAssetID = useRef("")
  const serviceAccessType = useRef("")
  const serviceMRC = useRef("")
  const serviceDetailsBandwidth = useRef("")
  const serviceStatus = useRef("")
  const serviceNotes = useRef("")
  
  

  useEffect(() => {
    fetchLocations()
  },[])

  const fetchLocations = async() => {
   
    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setLocations(locations)

  }
  
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

    const locationAC = locations.filter(({Name, Address1, State, City}) => Name.indexOf(value) > -1 || Address1.indexOf(value) > -1 || State.indexOf(value) > -1 || City.indexOf(value) > -1 )
    
    serviceLocationName.current = value
    
    setDropDown(locationAC)

  }

  const handleSuggestedRef = (name, id) => {
    console.log(name)
    console.log(id)
    serviceLocationID.current = id
    serviceLocationName.current = name
    setDropDown("")
  }

  return (
    <Page title="Add Service" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
        
      <form>

            <TextInputAC handleChange={(e)=>handleChange(e)} 
              label="Service Location" 
              value={serviceLocationName.current} 
              dropDownState={dropDown}
              handleClose={()=> setDropDown(false)}
              >
                {dropDown && dropDown != "" ? 
                  <ul> 
                  {dropDown.map(d => 
                    <a className="dropdown-item" key={d.id} onClick={()=> handleSuggestedRef(d.Name, d.id)}>
                      <li >{`${d.Name} - ${d.Address1} ${d.City} ${d.State}`}</li>
                    </a>
                  )}
                  </ul> : ""} 
            </TextInputAC>

            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={serviceVendor}
              hint="">
                {vendorList && vendorList.map(vendor => 
                <option key={vendor.id}>{vendor.Name}</option>
                )}
            </SelectInputProps>

            <SelectInput 
              fieldOptions={serviceTypes}
              fieldLabel="Type"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={serviceType}
              fieldNameRef={serviceType}
              fieldChange={()=>console.log("Type Selection Changed")}
            />

            <TextInput 
              inputFieldLabel="Service Name"
              inputFieldRef={serviceVendorServiceName}
              inputFieldValue={""}
            />

            <SelectInput 
              fieldOptions={accessTypes}
              fieldLabel="Access Type"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={serviceAccessType}
              fieldNameRef={serviceAccessType}
              fieldChange={()=>console.log("Access Type Selection Changed")}
            />
            
            <TextInput 
              inputFieldLabel="Asset ID"
              inputFieldRef={serviceAssetID}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Bandwidth"
              inputFieldRef={serviceDetailsBandwidth}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Monthly Cost"
              inputFieldRef={serviceMRC}
              inputFieldValue={""}
            />

            <SelectInput 
              fieldOptions={serviceStatusType}
              fieldLabel="Status"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={serviceStatus}
              fieldNameRef={serviceStatus}
              fieldChange={()=>console.log("Status Selection Changed")}
            />

            <TextArea 
              inputFieldLabel="Notes"
              inputFieldRef={serviceNotes}
              inputFieldValue={""}
            />
          
      </form>

        
    </Page>
      
  )
}
export default AddService