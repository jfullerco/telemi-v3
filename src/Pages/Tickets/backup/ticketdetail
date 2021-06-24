import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import Page from '../../Components/Page'
import GridComponent from '../../Components/Layout/GridComponent'
import Fade from '../../Components/Transitions/FadeTransition'

const TicketDetail = (state) => {

  const userContext = useContext(stateContext)
  const { currentTicketID,
          services} = userContext.userSession

  const history = useHistory()
  
  
  const [pageSuccess, setPageSuccess] = useState()
  const [pageError, setPageError] = useState()
  

  const [activeTicket, setActiveTicket] = useState()
  const [locations, setLocations] = useState(state.location.state.locations)
  const [accounts, setAccounts] = useState(state.location.state.accounts)
  
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

  const serviceColumns = [
  {docField: 'Vendor', headerName: 'Vendor', key: "1", filterable: true},
  {docField: 'VendorServiceName', headerName: 'Product', key: "2", filterable: true},
  {docField: 'LocationName', headerName: 'Location', key: "3", filterable: true},
  {docField: 'AssetID', headerName: 'Asset ID', key: "4", filterable: false},
  {docField: 'Type', headerName: 'Type', key: "5", filterable: true}
  ]
  

  useEffect(() => {
    fetchTicket()
  },[])

  const fetchTicket = async() => {
    const ticketRef = await db.collection("Tickets").doc(state.location.state.id).get()
    const id = ticketRef.id
    const data = ticketRef.data()
    setActiveTicket(data)
  }

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
      AccountNum: ticketAccountID.current[ticketAccountID.current.selectedIndex].text,
      Vendor: ticketVendor.current.value
    }  
    console.log(data)
    try {
      await db.collection("Tickets").doc(state.location.state.id).update(data)
      setPageSuccess("Ticket Added")
      autoClose()
    } catch {
      setPageError("Error Adding Ticket")
    }
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }
  
  return (
    <Page title="TICKET DETAILS" handleSubmit={handleSubmit} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>
          <form>
          {activeTicket && <>
            
            
            <TextInput 
              inputFieldLabel="Ticket Number"
              inputFieldRef={ticketNum}
              inputFieldValue={activeTicket.TicketNum}
            />
            

            <SelectInputProps 
              fieldLabel="Service Location"
              fieldInitialValue={activeTicket.LocationID}
              fieldInitialOption={activeTicket.LocationName}
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
              fieldInitialValue={activeTicket.AccountID}
              fieldInitialOption={activeTicket.AccountNum}
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
              fieldInitialValue={activeTicket.Vendor}
              fieldInitialOption={activeTicket.Vendor}
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
              inputFieldValue={activeTicket.DateSubmitted}
            />

            <SelectInputProps
              fieldLabel="Type"
              fieldInitialValue={activeTicket.Type}
              fieldInitialOption={activeTicket.Type}
              fieldIDRef={ticketType}>
                <option> Dispute </option>
                <option> Disconnect </option>
                <option> Service </option>
                <option> Order </option>
            </SelectInputProps>
            
            <SelectInputProps
              fieldLabel="Status"
              fieldInitialValue={activeTicket.Status}
              fieldInitialOption={activeTicket.Status}
              fieldIDRef={ticketStatus}>
                <option> Active </option>
                <option> Closed/Resolved </option>
                <option> Closed/Unresolved </option>
                <option> Completed </option>
            </SelectInputProps>

            <TextArea 
              inputFieldLabel="Details"
              inputFieldRef={ticketDetails}
              inputFieldValue={activeTicket.Details}
            />

            <GridComponent 
              label="Related Service"
              headerFields={serviceColumns}
              data={services}
              isVisible={true}
            />
          </>}
          </form>
       </Page>
  )
}
export default TicketDetail