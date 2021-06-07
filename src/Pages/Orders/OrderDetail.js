import React, {useEffect, useState, useRef, useContext, forwardRef} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import TextArea from '../../Components/Forms/TextArea'
import SelectInputProps from '../../Components/Forms/SelectInputProps'
import TextInputAC from '../../Components/Forms/TextInputAC'
import Page from '../../Components/Page'
import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'

const OrderDetails = (state) => {

  const userContext = useContext(stateContext)

  const {serviceTypes, accessTypes, vendorList} = userContext
  const {currentUser, currentCompany, currentCompanyID} = userContext.userSession

  const history = useHistory()
  
  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()

  const [locations, setLocations] = useState(state.location.state.locations)
  const [dropDown, setDropDown] = useState("")
  const [suggestLocation, setSuggestLocation] = useState()
  
  const orderCompanyID = useRef(currentCompanyID)
  const orderCompanyName = useRef(currentCompany)
  const orderNum = useRef("")
  const orderDate = useRef("")
  const orderType = useRef("")
  const orderStatus = useRef("")
  const orderVendorServiceName = useRef("")
  const orderBandwidth = useRef("")
  const orderMRC = useRef("")
  const orderDetails = useRef("")
  const orderVendor = useRef("")
  const orderLocationID = useRef("")
  const orderLocationName = useRef("")
  
  const orderServiceID = useRef("")
  const orderServiceAssetID = useRef("")
  
  
  const handleSubmit = async(e) => {
    const data = {
      OrderNum: orderNum.current.value,
      OrderDate: orderDate.current.value,
      Vendor: orderVendor.current.value,
      VendorServiceName: orderVendorServiceName.current.value,
      Bandwidth: orderBandwidth.current.value,
      MRC: orderMRC.current.value,
      LocationID: orderLocationID.current,
      LocationName: orderLocationName.current,
      Status: orderStatus.current.value,     
      Details: orderDetails.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      LastUpdatedBy: userContext.userSession.currentUser,
      LastUpdated: Date()
      
    }  
    console.log(data)
    const res = await db.collection("Orders").doc().set(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1000)
  }
  
  const handleChange = (e) => {
    setDropDown(true)
    const {value} = e.target
    const locationAC = locations.filter(({Name, Address1, State, City}) => Name.indexOf(value) > -1 || Address1.indexOf(value) > 1 || State.indexOf(value) > -1 || City.indexOf(value) > -1 )
    orderLocationName.current = value
    setDropDown(locationAC)
  }

  const handleSuggestedRef = (name, id) => {
    console.log(name)
    console.log(id)
    orderLocationID.current = id
    orderLocationName.current = name
    setDropDown("")
  }

  const handleDateChange = (date) => {
    orderDate.current = date
  }
  

  return (
    <Page title="Add Order" handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
        
      <form>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Order Number"
              inputFieldRef={orderNum}
              inputFieldValue={""}
              hint=""
            />
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Date Ordered"
              inputFieldRef={orderDate}
              inputFieldValue={""}
              hint="format. MM/DD/YYYY"
            />       
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={orderVendor}
              hint="">
                {vendorList && vendorList.map(vendor => 
                <option key={vendor.id}>{vendor.Name}</option>
                )}
            </SelectInputProps>
          </Column>
          
          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Vendor Service Name"
              inputFieldRef={orderVendorServiceName}
              inputFieldValue={""}
              hint="ie. IP Flex or AVPN"
            />
          </Column>

          <Column size="is-three-quarters" isVisible={false}>
            <TextInput 
              inputFieldLabel="Type"
              inputFieldRef={orderType}
              inputFieldValue={""}
            />
          </Column> 

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Bandwidth"
              inputFieldRef={orderBandwidth}
              inputFieldValue={""}
              hint="ie. 100M"
            />
          </Column> 

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Monthly Cost"
              inputFieldRef={orderMRC}
              inputFieldValue={""}
              hint="Price quoted by vendor"
            />
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInputAC handleChange={(e)=>handleChange(e)} 
              label="Related Location" 
              value={orderLocationName.current} 
              dropDownState={dropDown}
              hint="Location where service will be installed"
            >
                {dropDown && dropDown != "" ? 
                  <ul> 
                  {dropDown.map(d => 
                    <a className="dropdown-item" key={d.id} onClick={()=> handleSuggestedRef(d.Name, d.id)}>
                      <li >
                        {d.Name}
                      </li>
                    </a>
                  )}
                  </ul> : ""} 
            </TextInputAC>
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <SelectInputProps
              fieldLabel="Status"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={orderStatus}>
                <option>  </option>
                <option> Placed </option>
                <option> Completed </option>
                <option> Cancelled </option>
            </SelectInputProps>
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextArea 
              inputFieldLabel="Details"
              inputFieldRef={orderDetails}
              inputFieldValue={""}
              isVisible={false}
            />
          </Column>
          
      </form>

        
    </Page>
      
  )
}
export default OrderDetails