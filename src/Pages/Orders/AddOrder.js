import React, {useEffect, useState, useRef, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../../Contexts/firebase'
import {stateContext} from '../../Contexts/stateContext'

import TextInput from '../../Components/Forms/TextInput'
import SelectInputProps from '../../Components/Forms/SelectInputProps'

const AddOrder = () => {

  const userContext = useContext(stateContext)

  const history = useHistory()
  
  const [modalState, setModalState] = useState(true)
  const [addOrderError, setAddOrderError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [locations, setLocations] = useState()
  
  const orderNum = useRef("")
  const companyID = useRef("")
  const companyName = useRef("")
  const orderDate = useRef("")
  const orderType = useRef("")
  const orderStatus = useRef("")
  const orderServiceType = useRef("")
  const orderMRC = useRef("")
  const orderDetails = useRef("")
  const orderMilestones = useRef("")
  const orderVendor = useRef("")
  const orderLocationID = useRef("")
  const orderLocationName = useRef("")
  const orderNotes = useRef("")

  const handleSubmit = async(e) => {
    const data = {
      OrderNum: orderNum.current.value,
      CompanyID: userContext.userSession.currentCompanyID,
      CompanyName: userContext.userSession.currentCompany,
      OrderDate: orderDate.current.value,
      OrderType: orderType.current.value,
      OrderStatus: orderStatus.current.value,
      OrderServiceType: orderServiceType.current.value,
      OrderVendor: orderVendor.current.value,
      OrderMRC: orderMRC.current.value,
      LocationID: orderLocationID.current.value,
      LocationName: orderLocationID.current[orderLocationID.current.selectedIndex].text,
      
    }  
    console.log(data)
    const res = await db.collection("Orders").doc().set(data)
    userContext.setDataLoading(true)
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

            <SelectInputProps 
              fieldLabel="Service Location"
              fieldInitialValue={""}
              fieldInitialOption={""}
              fieldIDRef={orderLocationID}>
                {locations != undefined ? 
                  locations.map(location => (
                    <option value={location.id} key={location.id}> 
                    {location.Name}</option>
                )) : (
                  <option></option>
                )}
            </SelectInputProps>
            
            <TextInput 
              inputFieldLabel="Vendor"
              inputFieldRef={orderVendor}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Service Ordered"
              inputFieldRef={orderServiceType}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Order Number"
              inputFieldRef={orderNum}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Monthly Cost"
              inputFieldRef={orderMRC}
              inputFieldValue={""}
            />

            <TextInput 
              inputFieldLabel="Date Ordered"
              inputFieldRef={orderDate}
              inputFieldValue={""}
            />

            <SelectInputProps
              fieldLabel="Type"
              fieldInitialValue="New"
              fieldInitialOption="New"
              fieldIDRef={orderType}>
                <option>New</option>
                <option>Upgrade</option>
                <option>Replacement</option>
                <option>MACD</option>
              </SelectInputProps>

            <SelectInputProps
              fieldLabel="Status"
              fieldInitialValue=""
              fieldInitialOption=""
              fieldIDRef={orderStatus}>
                <option>Pending Completion</option>
                <option>Completed</option>
                <option>Cancelled</option>
            </SelectInputProps>
          </form>    
        <div className="block">
          <div className="notification is-danger is-hidden">{addOrderError}</div>
         {success === true ?  <div className="notification is-success">Order Added</div> : ""}
        </div>
        <div className="modal-card-foot">
          
          <button className="button is-rounded level-item"
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
export default AddOrder