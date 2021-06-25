import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import AccountDataGrid from '../Accounts/AccountDataGrid'
import GridComponent from '../Dashboard/Components/GridComponent'
import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInput from '../../Components/Forms/SelectInput'
import Page from '../../Components/Page'
import DeleteButton from '../../Components/Buttons/DeleteButton'

const EditService = (state) => {

  const history = useHistory()
  const userContext = useContext(stateContext)
  const {serviceTypes, accessTypes, serviceStatusType, isStyle} = userContext

  const [pageSuccess, setPageSuccess] = useState()
  const [pageError, setPageError] = useState()
  

  const serviceVendor = useRef("")
  const serviceType = useRef("")
  const serviceVendorServiceName = useRef("")
  const serviceLocationID = useRef("")
  const serviceLocationName = useRef("")
  const serviceAssetID = useRef("")
  const serviceAccessType = useRef("")
  const serviceMRC = useRef("")
  const serviceDetailsBandwidth = useRef("")
  const serviceStatus = useRef("")
  const serviceNotes = useRef("")
  const serviceInternalNetworkName = useRef("")
  const serviceVendorNetworkName = useRef("")
  const serviceASN = useRef("")
  const servicePrivateIPDetails = useRef("")
  const servicePublicIPDetails = useRef("")
  const serviceRouterDetails = useRef("")
  
  const scrollAccountRef = useRef()
  const scrollTicketRef = useRef()
  const scrollOrderRef = useRef()
  
  const [activeService, setActiveService] = useState("")
  const [activeAccounts, setActiveAccounts] = useState("")
  const [activeTickets, setActiveTickets] = useState("")
  const [activeOrders, setActiveOrders] = useState("")
  
  const [toggleAccountView, setToggleAccountView] = useState(false)
  const [toggleTicketView, setToggleTicketView] = useState(false)
  const [toggleOrderView, setToggleOrderView] = useState(false)

  
  const handleToggleAccountView = () => {
    setToggleAccountView(!toggleAccountView)
  }
  const handleToggleTicketView = () => {
    setToggleTicketView(!toggleTicketView)
  }
  const handleToggleOrderView = () => {
    setToggleOrderView(!toggleOrderView)
  }
  
  useEffect(() => {
    
    fetchService()
  
  }, [])

  const fetchService = async() => {
   
    const serviceRef = await db.collection("Services").doc(state.location.state.id).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService(data)
    
  }

  const fetchAccounts = async() => {
   
    const accountRef = await db.collection("Accounts").where("AccountServiceID", "==", state.location.state.id).get()
    
    const accounts = await accountRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

    setActiveAccounts(accounts)
    
  }

  const fetchTickets = async() => {
   
    const serviceRef = await db.collection("Tickets").where("TicketServiceID", "==", state.location.state.id).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService(data)
    
  }

  const fetchOrders = async() => {
   
    const serviceRef = await db.collection("Orders").where("OrderServiceID", "==", state.location.state.id).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService(data)
    
  }

  const handleSubmit = async() => {
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
      Status: serviceStatus.current.value,
      Notes: serviceNotes.current.value,
      InternalNetworkName: serviceInternalNetworkName.current.value,
      VendorNetworkName: serviceVendorNetworkName.current.value,
      ASN: serviceASN.current.value,
      PrivateIPDetails: servicePrivateIPDetails.current.value,
      PublicIPDetails: servicePublicIPDetails.current.value,
      RouterDetails: serviceRouterDetails.current.value,
      LastUpdatedBy: userContext.userSession.currentUser,
      LastUpdated: Date()
      
    }  
    console.log(data)
    try {
    const res = await db.collection("Services").doc(state.location.state.id).update(data)
    setPageSuccess("Service Updated")
    autoClose()
     } catch {
      setPageError("Error Adding Service")
    }
    userContext.setDataLoading(true)
    
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1500)
  }

  const handleScrollToAccount = () => {
    scrollAccountRef.current.scrollIntoView({behavior: 'smooth'})
  }

console.log(state.location.state)
  return (
      <Page title="SERVICE DETAILS" handleSubmit={handleSubmit} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>
      {userContext && userContext.userSession != undefined ? 
        <>

        <div className="mb-2">
          <span className="mr-2">Options: </span>
          <button className="button is-small is-rounded is-link" onClick={() => {handleScrollToAccount()}}>
            Accounts
          </button>
          <DeleteButton colRef="Services" docRef={state.location.state.id} />
        </div>

        
        
          <form>
           
            <SelectInput 
              fieldOptions={userContext.userSession.locations}
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

            <SelectInput 
              fieldOptions={serviceStatusType}
              fieldLabel="Status"
              fieldInitialValue={activeService.Status}
              fieldInitialOption={activeService.Status}
              fieldIDRef={serviceStatus}
              fieldNameRef={serviceStatus}
              fieldChange={()=>console.log("Status Selection Changed")}
            />

            <TextArea 
              inputFieldLabel="Notes"
              inputFieldRef={serviceNotes}
              inputFieldValue={activeService.Notes}
            />

            <p style={isStyle.headerStyle} className="title">
              
              NETWORK DETAILS 
            
            </p>

            <TextInput 
              inputFieldLabel="Internal Network Name"
              inputFieldRef={serviceInternalNetworkName}
              inputFieldValue={activeService.InternalNetworkName}
            />

            <TextInput 
              inputFieldLabel="Vendor Network Name"
              inputFieldRef={serviceVendorNetworkName}
              inputFieldValue={activeService.VendorNetworkName}
            />

            <TextInput 
              inputFieldLabel="ASN"
              inputFieldRef={serviceASN}
              inputFieldValue={activeService.ASN}
            />

            <TextArea 
              inputFieldLabel="Private IP Details"
              inputFieldRef={servicePrivateIPDetails}
              inputFieldValue={activeService.PrivateIPDetails}
            />

            <TextArea 
              inputFieldLabel="Public IP Details"
              inputFieldRef={servicePublicIPDetails}
              inputFieldValue={activeService.PublicIPDetails}
            />

            <TextArea 
              inputFieldLabel="Router Details"
              inputFieldRef={serviceRouterDetails}
              inputFieldValue={activeService.RouterDetails}
            />

            </form>
            

            <p className="block" />

            <p style={isStyle.headerStyle} className="title" ref={scrollAccountRef}>
              Accounts 
            </p>

              <AccountDataGrid
                queryCol="AccountServiceID"
                queryID={state.location.state.id} 
              />

            <p style={isStyle.headerStyle} className="title">
              Tickets
            </p>
              
              <GridComponent 
                label="Tickets"

              />
        
            <p style={isStyle.headerStyle} className="title">  
              Orders 
            </p>

            <GridComponent 
                label="Tickets"

              />
          

    </> : <div className="tile warning"> No record to display</div>}    
    </Page>
  )
}
export default EditService