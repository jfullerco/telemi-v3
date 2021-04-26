import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

const AddTicket = () => {

  const userContext = useContext(stateContext)

  const history = useHistory()
  
  const [modalState, setModalState] = useState(true)
  const [addTicketError, setAddTicketError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [locations, setLocations] = useState()
  
  const ticketNum = useRef("")
  const ticketLocationID = useRef("")
  const ticketVendor = useRef("")
  const ticketDate = useRef("")
  const ticketType = useRef("")
  const ticketStatus = useRef("")
  const ticketDetails = useRef("")
  const ticketAccountID = useRef("")
  const ticketAccountNum = useRef("")
  const ticketCompletedDate = useRef("")
  

  const handleSubmit = async(e) => {
    const data = {
      TicketNum: ticketNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      DateSubmitted: ticketDate.current.value,
      Type: ticketType.current.value,
      Status: ticketStatus.current.value,
      Details: ticketDetails.current.value,
      LocationID: ticketLocationID.current.value,
      LocationName: ticketLocationID.current[orderLocationID.current.selectedIndex].text,
      AccountID: ticketAccountID,
      AccountNum: ticketAccountID.current[ticketAccountID.current.selectedIndex].text

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

  const fetchAccounts = async() => {
   
    const accountsRef = await db.collection("Accounts").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const accounts = accountsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setAccounts(accounts)

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
        <p className="modal-card-title">Add Ticket</p>
      </div>
        <section className="modal-card-body">
          <form>

            <label className="label">Location</label>
            <div className="select is-fullwidth">
              <select className="select" ref={ticketLocationID}>
              {locations != undefined ? locations.map(location => (
                <option key={location.id} value={location.id} name={location.Name} >
                  {location.Name}
                </option>
              )) : "Add a location before adding a ticket"}
              </select>
            </div>

            <label className="label">Related Account</label>
            <div className="select is-fullwidth">
              <select className="select" ref={ticketAccountID}>
              {accounts != undefined ? accounts.map(account => (
                <option key={account.id} value={account.id} name={account.AccountNum} >
                  {account.AccountNum}
                </option>
              )) : "Add an Account before adding a ticket"}
              </select>
            </div>

            <label className="label">Vendor</label>
            <input className="input" type="text" ref={ticketVendor} />

            <label className="label">Date Submitted</label>
            <input className="input" type="text" ref={ticketDate} />
            
            <label className="label">Type of Ticket</label>
            <div className="select is-fullwidth">
              <select className="select" ref={ticketType}>
                <option> Dispute </option>
                <option> Disconnect </option>
                <option> Service </option>
                <option> Order </option>
              </select>
            </div>

            <label className="label">Status</label>
            <input className="input" type="text" ref={ticketStatus} />

            <label className="label">Details</label>
            <input className="input" type="textarea" ref={ticketDetails} />

          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{addTicketError}</div>
         {success === true ?  <div className="notification is-success">Ticket Added</div> : ""}
        </div>
        <div className="modal-card-foot">
          
          <button className="button level-item"
          type="submit" onClick={handleSubmit}
          >
            Add Ticket
          </button>
        
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleModalClose}></button>  
        </section>
      </div>
    </div>
  )
}
export default AddTicket