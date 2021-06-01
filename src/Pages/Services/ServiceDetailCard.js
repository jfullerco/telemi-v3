import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import AccountDataGrid from '../Accounts/AccountDataGrid'
import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInput from '../../Components/Forms/SelectInput'
import Page from '../../Components/Page'

const ServiceDetail = ({state}) => {
  const history = useHistory()
  const userContext = useContext(stateContext)
  const {serviceTypes, accessTypes, serviceStatusType} = userContext

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
  

  const [activeService, setActiveService] = useState("")
  
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
    const res = await db.collection("Services").doc(state.location.state.id).set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }

console.log(state.location.state)
  return (
      <>
      {userContext && userContext.userSession != undefined ? <>
          <div className="columns">
            <div className="column has-text-weight-semibold">Location</div>
            <div className="column">{activeService.LocationName}</div>
            </div>
            

            
  
          

    </> : <div className="tile warning"> No record to display</div>}    
    </>
  )
}
export default ServiceDetail