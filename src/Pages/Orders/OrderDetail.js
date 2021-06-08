import React, {useEffect, useState, useRef, useContext} from 'react'
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

const OrderDetail = (state) => {

  const history = useHistory()
  const userContext = useContext(stateContext)

  const {serviceTypes, accessTypes, vendorList} = userContext
  const {currentUser, currentCompany, currentCompanyID} = userContext.userSession

  const [pageError, setPageError] = useState()
  const [pageSuccess, setPageSuccess] = useState()

  const [dropDown, setDropDown] = useState("")
  const [activeOrder, setActiveOrder] = useState()
  const [locations, setLocations] = useState(state.location.state.locations)
  const [accounts, setAccounts] = useState(state.location.state.accounts)
  
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
  
  useEffect(() => {
    fetchOrder()
  },[])

  console.log(state.location.state)

  const fetchOrder = async() => {
    const orderRef = await db.collection("Orders").doc(state.location.state.id).get()
    console.log(orderRef)
    
    const data = await orderRef.data()
    setActiveOrder(data)
  }

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
      CompanyID: currentCompanyID,
      CompanyName: currentCompany,
      LastUpdatedBy: userContext.userSession.currentUser,
      LastUpdated: Date()
      
    }  
    console.log(data)
    const res = await db.collection("Orders").doc(state.location.state.id).update(data)
    userContext.setDataLoading(true)
    autoClose()
  }

  const autoClose = () => {
    setTimeout(() => {history.goBack()}, 1000)
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
    <Page title={`${activeOrder && activeOrder.OrderNum != undefined ? activeOrder.OrderNum : "Order"} DETAILS`} handleSubmit={handleSubmit} pageError={pageError} pageSuccess={pageSuccess} autoClose={autoClose}>
        
      <form>
        {activeOrder && <>
          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Order Number"
              inputFieldRef={orderNum}
              inputFieldValue={activeOrder.OrderNum}
              hint=""
            />
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Date Ordered"
              inputFieldRef={orderDate}
              inputFieldValue={activeOrder.OrderDate}
              hint="format. MM/DD/YYYY"
            />       
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <SelectInputProps
              fieldLabel="Vendor"
              fieldInitialValue={activeOrder.Vendor}
              fieldInitialOption={activeOrder.Vendor}
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
              inputFieldValue={activeOrder.VendorServiceName}
              hint="ie. IP Flex or AVPN"
            />
          </Column>

          <Column size="is-three-quarters" isVisible={false}>
            <TextInput 
              inputFieldLabel="Type"
              inputFieldRef={orderType}
              inputFieldValue={activeOrder.Type}
            />
          </Column> 

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Bandwidth"
              inputFieldRef={orderBandwidth}
              inputFieldValue={activeOrder.Bandwidth}
              hint="ie. 100M"
            />
          </Column> 

          <Column size="is-three-quarters" isVisible={true}>
            <TextInput 
              inputFieldLabel="Monthly Cost"
              inputFieldRef={orderMRC}
              inputFieldValue={activeOrder.MRC}
              hint="Price quoted by vendor"
            />
          </Column>

          <Column size="is-three-quarters" isVisible={true}>
            <TextInputAC handleChange={(e)=>handleChange(e)} 
              label="Related Location" 
              value={orderLocationName.current}
              defaultValue={activeOrder.LocationName}
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
              fieldInitialValue={activeOrder.Status}
              fieldInitialOption={activeOrder.Status}
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
              inputFieldValue={activeOrder.Details}
              isVisible={false}
            />
          </Column>
        </>}  
      </form>

        
    </Page>
      
  )
}
export default OrderDetail