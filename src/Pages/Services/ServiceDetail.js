import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'
import Page from '../../Components/Page'

const ServiceDetail = () => {
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
  const serviceInternalNetworkName = useRef("")
  const serviceVendorNetworkName = useRef("")
  const serviceASN = useRef("")
  const servicePrivateIPRange = useRef("")
  const servicePrivateIPGateway = useRef("")
  const servicePublicIPRange = useRef("")
  const servicePublicIPGateway = useRef("")
  const serviceRouterHostname = useRef("")
  const serviceRouterSN = useRef("")

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
      InternalNetworkName: serviceInternalNetworkName.current.value,
      VendorNetworkName: serviceVendorNetworkName.current.value,
      ASN: serviceASN.current.value,
      PrivateIPRange: servicePrivateIPRange.current.value,
      PrivateIPGateway: servicePrivateIPGateway.current.value,
      PublicIPRange: servicePrivateIPRange.current.value,
      PublicIPGateway: servicePrivateIPGateway.current.value,
      RouterHostname: serviceRouterHostname.current.value,
      RouterSN: serviceRouterSN.current.value
      
    }  
    console.log(data)
    const res = await db.collection("Services").doc(userContext.userSession.currentServiceID).set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }


  return (
      <Page title="Service Details" handleSubmit={handleSubmit} pageSuccess={pageSuccess} pageError={pageError} autoClose={autoClose}>
      {userContext && userContext.userSession != undefined ?
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

            <p className="title has-text-black">Network Details</p>

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

            <TextInput 
              inputFieldLabel="Private IP Range"
              inputFieldRef={servicePrivateIPRange}
              inputFieldValue={activeService.PrivateIPRange}
            />

            <TextInput 
              inputFieldLabel="Private IP Gateway"
              inputFieldRef={servicePrivateIPGateway}
              inputFieldValue={activeService.PrivateIPGateway}
            />

            <TextInput 
              inputFieldLabel="Public IP Range"
              inputFieldRef={servicePublicIPRange}
              inputFieldValue={activeService.PublicIPRange}
            />

            <TextInput 
              inputFieldLabel="Public IP Gateway"
              inputFieldRef={servicePublicIPGateway}
              inputFieldValue={activeService.PublicIPGateway}
            />

            <TextInput 
              inputFieldLabel="Router Hostname"
              inputFieldRef={serviceRouterHostname}
              inputFieldValue={activeService.RouterHostname}
            />

            <TextInput 
              inputFieldLabel="Router S/N"
              inputFieldRef={serviceRouterSN}
              inputFieldValue={activeService.RouterSN}
            />
  
          </form>

    : <div className="tile warning"> No record to display</div>}    
    </Page>
  )
}
export default ServiceDetail