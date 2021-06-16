import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import TextInputAC from '../../Components/Forms/TextInputAC'
import Page from '../../Components/Page'

const AddTicket = (state) => {

  const userContext = useContext(stateContext)

  const history = useHistory()

  const [locations, setLocations] = useState(state.location.state.locations)
  const [accounts, setAccounts] = useState(state.location.state.accounts)
  const [ticketDropDown, setTicketDropDown] = useState(false)
  const [ticketDropDownValues, setTicketDropDownValues] = useState("")
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()
  
  const ticketNum = useRef("")
  const ticketLocationID = useRef("")
  const ticketLocationName = useRef("")
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
      LocationID: ticketLocationID.current,
      LocationName: ticketLocationName.current,
      AccountID: ticketAccountID.current.value,
      AccountNum: ticketAccountID.current[ticketAccountID.current.selectedIndex].text,
      Vendor: ticketVendor.current.value

    }  
    console.log(data)
    try {
      await db.collection("Tickets").doc().set(data)
      setPageSuccess("Ticket Added")
      autoClose()
    } catch {
      setPageError("Error Adding Ticket")
    }
  }


  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }

  const handleChange = (e) => {
    setTicketDropDown(true)
    const {value} = e.target
    
    const locationAC = locations.filter(({Name, Address1, State, City}) => Name.indexOf(value) > -1 || Address1.indexOf(value) > 1 || State.indexOf(value) > -1 || City.indexOf(value) > -1 )
    ticketLocationName.current = value
    console.log(locationAC)
    setTicketDropDownValues(locationAC)
  }

  const handleSuggestedRef = (id, name) => {
    console.log(id)
    console.log(name)
    
    ticketLocationID.current = id
    ticketLocationName.current = name
    
    setTicketDropDown(false)
  }
  

  return (
    <Page title="Add Ticket" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
          <form>
            <TextInput 
              inputFieldLabel="Ticket Number"
              inputFieldRef={ticketNum}
              inputFieldValue={""}
            />

            <TextInputAC handleChange={(e)=>handleChange(e)} 
              label="Service Location" 
              value={ticketLocationName.current} 
              isVisible={ticketDropDown}
              handleClose={()=>handleSuggestedRef("")}>
                {ticketDropDownValues != "" ? 
                  <ul> 
                  {ticketDropDownValues.map(d => 
                    <a className="dropdown-item" key={d.id} onClick={()=> handleSuggestedRef(d.id, d.Name)}>
                      <li>{d.Name}</li>
                    </a>
                  )}
                  </ul> : ""} 
            </TextInputAC>

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
    </Page>    
  )
}
export default AddTicket