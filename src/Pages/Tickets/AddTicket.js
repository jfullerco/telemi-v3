import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInputProps from '../../Components/Forms/SelectInputProps'

const AddTicket = () => {

  const userContext = useContext(stateContext)

  const history = useHistory()
  
  const [modalState, setModalState] = useState(true)
  const [addTicketError, setAddTicketError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [locations, setLocations] = useState()
  const [accounts, setAccounts] = useState()
  
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
      LocationName: ticketLocationID.current[ticketLocationID.current.selectedIndex].text,
      AccountID: ticketAccountID.current.value,
      AccountNum: ticketAccountID.current[ticketAccountID.current.selectedIndex].text

    }  
    console.log(data)
    const res = await db.collection("Tickets").doc().set(data)
    autoClose()
  }

  useEffect(() => {

    fetchLocations()
    fetchAccounts()

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
            <TextInput 
              inputFieldLabel="Ticket Number"
              inputFieldRef={ticketNum}
              inputFieldValue={""}
            />
            <SelectInputProps 
              fieldLabel="Service Location"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={ticketLocationID}>
                {locations != undefined ? 
                  locations.map(location => (
                    <option value={location.id} key={location.id}> 
                    {location.Name}</option>
                )) : (
                  <option></option>
                )}
            </SelectInputProps>

            <SelectInputProps 
              fieldLabel="Related Account"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={ticketAccountID}>
                {accounts != undefined ? 
                  accounts.map(account => (
                    <option value={account.id} key={account.id}> 
                    {account.AccountNum}</option>
                )) : (
                  <option></option>
                )}
            </SelectInputProps>

            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={ticketVendor}>
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

            <TextInput 
              inputFieldLabel="Date Submitted"
              inputFieldRef={ticketDate}
              inputFieldValue={""}
            />

            <SelectInputProps
              fieldLabel="Type"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={ticketType}>
                <option> Dispute </option>
                <option> Disconnect </option>
                <option> Service </option>
                <option> Order </option>
            </SelectInputProps>
            
            <SelectInputProps
              fieldLabel="Status"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={ticketStatus}>
                <option> Active </option>
                <option> Closed/Resolved </option>
                <option> Closed/Unresolved </option>
                <option> Completed </option>
            </SelectInputProps>

            <TextArea 
              inputFieldLabel="Details"
              inputFieldRef={ticketDetails}
              inputFieldValue={""}
            />

          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{addTicketError}</div>
         {success === true ?  <div className="notification is-success">Ticket Added</div> : ""}
        </div>
        <div className="modal-card-foot">
          
          <button className="button is-rounded level-item"
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