import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

const ServiceDetail = () => {
  
  const userContext = useContext(stateContext)
  const currentLocationID = userContext
  const history = useHistory()
  
  const [success, setSuccess] = useState(false)

  const [locations, setLocations] = useState()

  const serviceName = useRef("")
  const serviceVendor = useRef("")
  const serviceType = useRef("")
  const serviceLocationID = useRef("")
  const serviceLocationName = useRef("")
  const serviceAssetID = useRef("")
  const serviceCompanyID = useRef("")
  const serviceCompanyName = useRef("")
  const serviceMRC = useRef("")
  const serviceDetailsBandwidth = useRef("")
  const serviceOrderID = useRef("")
  const serviceOrderNum = useRef("")
  const serviceAccountID = useRef("")
  const serviceAccountNum = useRef("")
  const serviceSubAccountNum = useRef("")

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
      Name: serviceName.current.value,
      Vendor: serviceVendor.current.value,
      Type: serviceType.current.value,
      LocationID: serviceLocationID.current.value,
      LocationName: serviceLocationID.current[serviceLocationID.current.selectedIndex].text,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      
      MRC: serviceMRC.current.value,
      
    }  
    console.log(data)
    const res = await db.collection("Services").doc(userContext.userSession.currentServiceID).set(data)
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
            
            <label className="label">
              Service Name
            </label>
            <input className="input" type="text" ref={serviceName} defaultValue={activeService.Name} />

            <label className="label">
              Service Location
            </label>
            <div className="select is-fullwidth">
              <select className="select" ref={serviceLocationID} defaultValue={activeService.id}>
              {locations != undefined ? locations.map(location => (
                <option key={location.id} value={location.id} name={location.Name} >
                  {location.Name}
                </option>
              )) : "All your locations are belong to us..."}
              </select>
            </div>

            <label className="label">
              Vendor
            </label>
            <input className="input" type="text" ref={serviceVendor} defaultValue={activeService.Vendor} />

            <label className="label">
              Type
            </label>
            <input className="input" type="text" ref={serviceType} defaulValue={activeService.Type} />

            <label className="label">
              Asset ID
            </label>
            <input className="input" type="text" ref={serviceAssetID} defaultValue={activeService.AssetID} />

            <label className="label">
              Monthly Cost
            </label>
            <input className="input" type="text" ref={serviceMRC} defaultValue={activeService.MRC}/>

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
            Save Changes
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