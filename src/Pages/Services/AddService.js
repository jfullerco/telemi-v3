import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'
import SelectInputProps from '../../Components/Forms/SelectInputProps'

const AddServiceModal = () => {

  const userContext = useContext(stateContext)

  const {serviceTypes, accessTypes} = userContext

  const history = useHistory()
  
  const [addServiceError, setAddServiceError] = useState("")
  const [success, setSuccess] = useState(false)

  const [locations, setLocations] = useState()
  
  const serviceName = useRef("")
  const serviceVendor = useRef("")
  const serviceType = useRef("")
  const serviceVendorServiceName = useRef("")
  const serviceLocationID = useRef("")
  const serviceLocationName = useRef("")
  const serviceAssetID = useRef("")
  const serviceAccessType = useRef("")
  const serviceMRC = useRef("")
  const serviceDetailsBandwidth = useRef("")
  const serviceDetailsIPRange = useRef("")
  const serviceDetailsLANEdgeIP = useRef("")
  const serviceDetailsASN = useRef("")
  const serviceDetailsNotes = useRef("")
  const serviceOrderID = useRef("")
  const serviceOrderNum = useRef("")
  const serviceAccountID = useRef("")
  const serviceAccountNum = useRef("")
  const serviceSubAccountNum = useRef("")
  

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
      LocationID: serviceLocationID.current.value,
      LocationName: serviceLocationID.current[serviceLocationID.current.selectedIndex].text,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      Bandwidth: serviceDetailsBandwidth.current.value,
      AccessType: serviceAccessType.current.value,
      AssetID: serviceAssetID.current.value,

      
    }  
    console.log(data)
    const res = await db.collection("Services").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }
  const handleChange = () => {
    console.log()
  }

  return (

      <>
        <span className="title">
          Add Service
        </span>  
        <span className="level-item level-right"><button className="button is-rounded" onClick={()=>autoClose()}>X</button></span>
        <p className="block" />
          <form>
          
            <SelectInputProps 
              fieldLabel="Service Location"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={serviceLocationID}>
                {locations != undefined ? 
                  locations.map(location => (
                    <option value={location.id} key={location.id}> 
                    {location.Name}</option>
                )) : (
                  <option></option>
                )}
            </SelectInputProps>

            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={serviceVendor}>
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

            <SelectInputProps
              fieldLabel="Type"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={serviceType}>
                  <option> </option>
                  <option>Data Only</option>
                  <option>Voice/Data</option>
                  <option>Voice Only</option>
                  <option>Security</option>
                  <option>Hosting</option>
                  <option>Mobility</option>  
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
              inputFieldLabel="Vendor Product Name"
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
              inputFieldLabel="Monthly Cost"
              inputFieldRef={serviceMRC}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Bandwidth"
              inputFieldRef={serviceDetailsBandwidth}
              inputFieldValue={""}
            />

          </form>

        <div className="block">
          <div className="notification is-danger is-hidden">{addServiceError}</div>
         {success === true ?  <div className="notification is-success">Service Added</div> : ""}
        </div>
        <div className="modal-card-foot">

          <button className="button is-rounded level-item" type="submit" onClick={handleSubmit}>
            Add Service
          </button>
        
        </div>     
    </>
      
  )
}
export default AddServiceModal