import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

const AddOrder = () => {

  const userContext = useContext(stateContext)

  const history = useHistory()
  
  const [modalState, setModalState] = useState(true)
  const [addOrderError, setAddOrderError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [locations, setLocations] = useState()
  
  const orderNum = useRef("")
  const companyID = useRef("")
  const companyName = useRef("")
  const orderDate = useRef("")
  const orderType = useRef("")
  const orderStatus = useRef("")
  const orderServiceType = useRef("")
  const orderMRC = useRef("")
  const orderDetails = useRef("")
  const orderMilestones = useRef("")
  const orderVendor = useRef("")
  const orderLocationID = useRef("")
  const orderLocationName = useRef("")
  const orderNotes = useRef("")

  const handleSubmit = async(e) => {
    const data = {
      OrderNum: orderNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      OrderDate: orderDate.current.value,
      OrderType: orderType.current.value,
      OrderStatus: orderStatus.current.value,
      OrderServiceType: orderServiceType.current.value,
      OrderVendor: orderVendor.current.value,
      OrderMRC: orderMRC.current.value,
      LocationID: orderLocationID.current.value,
      LocationName: orderLocationID.current[orderLocationID.current.selectedIndex].text,
      OrderNotes: orderNotes.current.value
    }  
    console.log(data)
    const res = await db.collection("Orders").doc().set(data)
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
    orderLocationID.current.value = e.target.value
    orderLocationName.current.value = e.target.name
  }
  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(false)}, 1000)
  }
  

  return (
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
      <div className="modal-card-head">
        <p className="modal-card-title">Add Order</p>
      </div>
        <section className="modal-card-body">
          <form>

            <label className="label">Service Location</label>
            <div className="select is-fullwidth">
              <select className="select" ref={orderLocationID}>
              {locations != undefined ? locations.map(location => (
                <option key={location.id} value={location.id} name={location.Name} >
                  {location.Name}
                </option>
              )) : "Add a location before adding a service"}
              </select>
            </div>

            <label className="label">Vendor</label>
            <input className="input" type="text" ref={orderVendor} />
            <label className="label">Order Number</label>
            <input className="input" type="text" ref={orderNum} />
            <label className="label">Date Ordered</label>
            <input className="input" type="text" ref={orderDate} />
            <label className="label">Type of Order</label>
            <input className="input" type="text" ref={orderType} />
            <label className="label">Status</label>
            <input className="input" type="text" ref={orderStatus} />
            <label className="label">Service Ordered</label>
            <input className="input" type="text" ref={orderServiceType} />
            <label className="label">Monthly Cost</label>
            <input className="input" type="text" ref={orderMRC} />
            <label className="label">Notes</label>
            <textarea className="textarea" type="textarea" ref={orderNotes} />
          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{addOrderError}</div>
         {success === true ?  <div className="notification is-success">Order Added</div> : ""}
        </div>
        <div className="modal-card-foot">
          
          <button className="button level-item"
          type="submit" onClick={handleSubmit}
          >
            Add Order
          </button>
        
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>  
        </section>
      </div>
    </div>
  )
}
export default AddOrder