import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'

const ServiceDetail = () => {
  
  const userContext = useContext(stateContext)
  const {serviceTypes, accessTypes} = userContext
  
  const history = useHistory()
  
  const [success, setSuccess] = useState(false)

  const [locations, setLocations] = useState()

  const serviceVendor = useRef("")
  const serviceType = useRef("")
  const serviceVendorServiceName = useRef("")
  const serviceLocationID = useRef("")
  const serviceLocationName = useRef("")
  const serviceAssetID = useRef("")
  const serviceAccessType = useRef("")
  const serviceMRC = useRef("")
  const serviceDetailsBandwidth = useRef("")

  const [modalState, setModalState] = useState(true)

  const [activeService, setActiveService] = useState("")

  
  useEffect(() => {
    
    fetchService()
  
  }, [])

  const fetchService = async() => {
   
    const serviceRef = await db.collection("Services").doc(userContext.userSession.currentServiceID).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService(data)
    
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
      MRC: serviceMRC.current.value,
      
    }  
    console.log(data)
    const res = await db.collection("Services").doc(userContext.userSession.currentServiceID).set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  useEffect(() => {
    fetchLocations()
  },[])

  const fetchLocations = async() => {
   
    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setLocations(locations)

  }
  
  const handleLocationChange = (e) => {
    serviceLocationID.current.value = e.target.value
    serviceLocationName.current.value = e.target.name
  }

  const handleModalClose = () => {
    setModalState(!modalState)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(false)}, 1000)
  }

  return (
    <div className={modalState === true ? "modal is-active is-info" : "modal is-hidden"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <p className="modal-card-title">{activeService.Name} Details</p>
        </div>
        <section className="modal-card-body"> 
          <form>

            <SelectInput 
              fieldOptions={locations}
              fieldLabel="Service Location"
              fieldInitialValue={activeService.LocationID}
              fieldInitialOption={activeService.LocationName}
              fieldIDRef={serviceLocationID}
              fieldNameRef={serviceLocationName}
              fieldChange={()=> console.log("Changed Selection")}
            />
            
            <TextInput 
              inputFieldLabel="Vendor"
              inputFieldRef={serviceVendor}
              inputFieldValue={activeService.Vendor}
            />

            <SelectInput 
              fieldOptions={serviceTypes}
              fieldLabel="Type"
              fieldInitialValue={activeService.Type}
              fieldInitialOption={activeService.Type}
              fieldIDRef={serviceType}
              fieldNameRef={serviceType}
              fieldChange={()=>console.log("Type Selection Changed")}
            />

            <TextInput 
              inputFieldLabel="Service Name"
              inputFieldRef={serviceVendorServiceName}
              inputFieldValue={activeService.VendorServiceName}
            />

            <SelectInput 
              fieldOptions={accessTypes}
              fieldLabel="Access Type"
              fieldInitialValue={activeService.AccessType}
              fieldInitialOption={activeService.AccessType}
              fieldIDRef={serviceAccessType}
              fieldNameRef={serviceAccessType}
              fieldChange={()=>console.log("Access Type Selection Changed")}
            />
            
            <TextInput 
              inputFieldLabel="Asset ID"
              inputFieldRef={serviceAssetID}
              inputFieldValue={activeService.AssetID}
            />

            <TextInput 
              inputFieldLabel="Bandwidth"
              inputFieldRef={serviceDetailsBandwidth}
              inputFieldValue={activeService.Bandwidth}
            />

            <TextInput 
              inputFieldLabel="Monthly Cost"
              inputFieldRef={serviceMRC}
              inputFieldValue={activeService.MRC}
            />

          </form>

        {/* Error Status Block */}
        <div className="block">
          <div className="notification is-danger is-hidden"></div>
        </div>

        {/* Footer Buttons */}
        <div className="modal-card-foot">
          
          <button className="button is-rounded"
          type="submit" onClick={handleSubmit}
          >
            Update Service
          </button>

          
        </div>

        {/* Close Modal */}
        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>  

        </section>
      </div>
    </div>
  )
}
export default ServiceDetail