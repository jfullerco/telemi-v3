import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

const AddTicket = () => {

  const userContext = useContext(stateContext)

  const history = useHistory()
  
  const [modalState, setModalState] = useState(true)
  const [addOrderError, setAddOrderError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [locations, setLocations] = useState()
  
  const ticketNum = useRef("")
  const ticketDate = useRef("")
  const ticketType = useRef("")
  const ticketStatus = useRef("")
  const ticketDetails = useRef("")
  const ticketLocationID = useRef("")
  const ticketLocationName = useRef("")
  const ticketAccountID = useRef("")
  const ticketAccountNum = useRef("")
  const ticketCompletedDate = useRef("")
  

  const handleSubmit = async(e) => {
    const data = {
      TicketNum: ticketNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      TicketDate: ticketDate.current.value,
      TicketType: ticketType.current.value,
      TicketStatus: ticketStatus.current.value,
      TicketDetails: ticketDetails.current.value,
      TicketLocationID: ticketLocationID.current.value,
      TicketLocationName: ticketLocationName.current.value,
      LocationID: orderLocationID.current.value,
      LocationName: orderLocationID.current[orderLocationID.current.selectedIndex].text
    }  
    console.log(data)
    const res = await db.collection("Orders").doc().set(data)
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
export default AddTicket