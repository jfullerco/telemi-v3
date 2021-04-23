import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

const EditServiceModal = () => {
  
  const userContext = useContext(stateContext)
  const currentLocationID = userContext
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

            <label className="label">
              Service Location
            </label>
            <div className="select is-rounded is-fullwidth">
              <select className="select" ref={serviceLocationID} defaultValue={activeService.id}>
              <option value={activeService.LocationID}>{activeService.LocationName}</option>
              {locations != undefined ? locations.map(location => (
                <option key={location.id} value={location.id} name={location.Name} >
                  {location.Name}
                </option>
              )) : "All your locations are belong to us..."}
              </select>
            </div>

            <div className="field">
              <label className="label">
                Vendor
              </label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={serviceVendor} defaultValue={activeService.Vendor} />
              </div>
            </div>

            <div className="field">            
            <label className="label">Type</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                <select type="select" ref={serviceType} defaulValue={activeService.Type}>
                  <option value={activeService.Type}>{activeService.Type} </option>
                  <option>Data Only</option>
                  <option>Voice/Data</option>
                  <option>Voice Only</option>
                  <option>Security</option>
                  <option>Hosting</option>
                  <option>Mobility</option>
                </select>
                </div>
              </div>
            </div>

            <label className="label">
              Vendor Service Name
            </label>
            <input className="input is-rounded" type="text" ref={serviceVendorServiceName} defaultValue={activeService.VendorServiceName} />

            <div className="field">            
            <label className="label">Access Type</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                <select type="select" ref={serviceAccessType} defaultValue={activeService.AccessType}>
                  <option value={activeService.AccessType}>{activeService.AccessType} </option>
                  <option>T1</option>
                  <option>Ethernet</option>
                  <option>Cable</option>
                  <option>Fiber</option>
                </select>
                </div>
              </div>
            </div>
            
            <div className="field">
              <label className="label">
                Asset ID
              </label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={serviceAssetID} defaultValue={activeService.AssetID} />
              </div>
            </div>

            <div className="field">
              <label className="label">
                Monthly Cost
              </label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={serviceMRC} defaultValue={activeService.MRC}/>
              </div>
            </div>

            <div className="field">
              <div className="control">
              <label className="label">Bandwidth</label>
                <input className="input is-rounded" type="text" ref={serviceDetailsBandwidth} defaultValue={activeService.Bandwidth} />
              </div>
            </div>

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
export default EditServiceModal