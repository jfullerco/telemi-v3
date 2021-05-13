import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import TextInputAC from '../../Components/Forms/TextInputAC'

const AddServiceModal = () => {

  const userContext = useContext(stateContext)

  const {serviceTypes, accessTypes} = userContext

  const history = useHistory()
  
  const [addServiceError, setAddServiceError] = useState("")
  const [success, setSuccess] = useState(false)

  const [locations, setLocations] = useState()
  const [dropDown, setDropDown] = useState(false)
  const [suggestLocation, setSuggestLocation] = useState()
  
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
  const serviceHostName = useRef("")
  const serviceDetailsIPRange = useRef("")
  const serviceDetailsLANEdgeIP = useRef("")
  const serviceDetailsASN = useRef("")
  const serviceDetailsNotes = useRef("")
  const serviceOrderID = useRef("")
  const serviceOrderNum = useRef("")
  const serviceAccountID = useRef("")
  const serviceAccountNum = useRef("")
  const serviceSubAccountNum = useRef("")
  const testRef = useRef("")
  

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
      HostName: serviceHostName.current.value

      
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
    serviceLocationID.current = id
    serviceLocationName.current = name
    setDropDown("")
  }

  return (

      <>
        <span className="title">
          Add Service
        </span> 
        <div className="level-right">
          <button className="button is-small is-link is-rounded mr-1" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-small is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
        </div> 
        <p className="block" />
          <form>
          <div className="columns">
          <div className="column">

            <TextInputAC handleChange={(e)=>handleChange(e)} 
              label="Service Location" 
              value={serviceLocationName.current} 
              dropDownState={dropDown}>
                {dropDown != "" ? 
                  <ul> 
                  {dropDown.map(d => 
                    <a className="dropdown-item" key={d.id} onClick={()=> handleSuggestedRef(d.Name, d.id)}>
                      <li >{d.Name}</li>
                    </a>
                  )}
                  </ul> : ""} 
            </TextInputAC>

            

            <SelectInput 
              fieldOptions={serviceTypes}
              fieldLabel="Type"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={serviceType}
              fieldNameRef={serviceType}
              fieldChange={()=>console.log("Type Selection Changed")}
            />
          <div className="columns">
          <div className="column is-half">
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
            </div>
          <div className="column is-half">
            <TextInput 
              inputFieldLabel="Product"
              inputFieldRef={serviceVendorServiceName}
              inputFieldValue={""}
            />
          </div>
          </div>
                       
          <div className="columns">
          <div className="column is-half">
            <SelectInput 
              fieldOptions={accessTypes}
              fieldLabel="Access Type"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={serviceAccessType}
              fieldNameRef={serviceAccessType}
              fieldChange={()=>console.log("Access Type Selection Changed")}
            />
          </div>
          <div className="column is-half">
            <TextInput 
              inputFieldLabel="Bandwidth"
              inputFieldRef={serviceDetailsBandwidth}
              inputFieldValue={""}
            />
          </div>
          </div>

          <div className="columns">
          <div className="column is-half">
            <TextInput 
              inputFieldLabel="Asset ID"
              inputFieldRef={serviceAssetID}
              inputFieldValue={""}
            />
          </div>
          <div className="column is-half">
            <TextInput 
              inputFieldLabel="Hostname"
              inputFieldRef={serviceHostName}
              inputFieldValue={""}
            />
          </div>
          </div>
          <div className="columns">
          <div className="column is-half">
            <TextInput 
              inputFieldLabel="Monthly Cost"
              inputFieldRef={serviceMRC}
              inputFieldValue={""}
            />
          </div>
          </div>  
          </div>
          </div>
          </form>

        <div className="block">
          <div className="notification is-danger is-hidden">{addServiceError}</div>
         {success === true ?  <div className="notification is-success">Service Added</div> : ""}
        </div>
        <div className="modal-card-foot">

          <button className="button is-rounded is-link level-item" type="submit" onClick={handleSubmit}>
            Save
          </button>
          <button className="button is-rounded mr-1" onClick={()=>autoClose()}>Close</button>
        
        </div>     
    </>
      
  )
}
export default AddServiceModal