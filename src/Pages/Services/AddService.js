import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

const AddService = () => {

  const userContext = useContext(stateContext)

  const history = useHistory()
  
  const [modalState, setModalState] = useState(true)
  const [addServiceError, setAddServiceError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [locations, setLocations] = useState()
  
  const serviceName = useRef("")
  const serviceVendor = useRef("")
  const serviceType = useRef("")
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
  
  const handleLocationChange = (e) => {
    serviceLocationID.current.value = e.target.value
    serviceLocationName.current.value = e.target.name
  }
  
  const handleSubmit = async(e) => {
    const data = {
      
      Vendor: serviceVendor.current.value,
      Type: serviceType.current.value,
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

  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(false)}, 1000)
  }
  const handleChange = () => {
    console.log()
  }

  return (
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
        <div className="modal-card-title">
          Add Service
          </div>
        </div>
        <div className="modal-card-body">

          <form>
          
            <div className="field">
              <label className="label">Service Location</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                  <select className="select" onChange={handleChange} ref={serviceLocationID}>
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
              <div className="control">
              <label className="label">Vendor</label>
                <input className="input is-rounded" type="text" ref={serviceVendor} />
              </div>
            </div>
            
            <div className="field">            
            <label className="label">Type</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                <select type="select" ref={serviceType} >
                  <option> </option>
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

            <div className="field">            
            <label className="label">Access Type</label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                <select type="select" ref={serviceAccessType} >
                  <option> </option>
                  <option>T1</option>
                  <option>Ethernet</option>
                  <option>Cable</option>
                  <option>Fiber</option>
                </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Asset ID</label>
              <div className="control">
                <input className="input is-rounded" type="text" ref={serviceAssetID} />
              </div>
            </div>

            <div className="field">
              <div className="control">
              <label className="label">Monthly Cost</label>
                <input className="input is-rounded" type="text" ref={serviceMRC} />
              </div>
            </div>

            <div className="field">
              <div className="control">
              <label className="label">Bandwidth</label>
                <input className="input is-rounded" type="text" ref={serviceDetailsBandwidth} />
              </div>
            </div>

          </form>

        <div className="block">
          <div className="notification is-danger is-hidden">{addServiceError}</div>
         {success === true ?  <div className="notification is-success">Service Added</div> : ""}
        </div>
        <div className="modal-card-foot">

          <button className="button level-item" type="submit" onClick={handleSubmit}>
            Add Service
          </button>
        
        </div>

        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>
          
        </div>
      </div>
    </div>
  )
}
export default AddService