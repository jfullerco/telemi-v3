import React, {useState, useRef, useContext, useEffect} from 'react'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'
import TextInput from '../../Components/Forms/TextInput'
import SelectInput from '../../Components/Forms/SelectInput'
import TextArea from '../../Components/Forms/TextArea'

const OrderDetail = () => {

  const userContext = useContext(stateContext)
  
  const [modalState, setModalState] = useState(true)
  const [addOrderError, setAddOrderError] = useState("")
  const [success, setSuccess] = useState(false)
  const [triggerClose, setTriggerClose] = useState()

  const [locations, setLocations] = useState()
  const [activeOrder, setActiveOrder] = useState({
    LocationName: "",
    LocationID: "",
    Vendor: ""
  })
  
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
      OrderNotes: orderNotes.current.value
    }  
    console.log(data)
    const res = await db.collection("Orders").doc(userContext.userSession.currentOrderID).set(data)
    autoClose()
  }

  useEffect(() => {
    
    fetchOrder()
    fetchLocations()

  },[])

  const fetchOrder = async() => {
    
    const orderRef = await db.collection("Orders").doc(userContext.userSession.currentOrderID).get()
    
    const data = await orderRef.data()
    const id = await orderRef.id
    setActiveOrder(data)

  }
  
  const fetchLocations = async() => {
   
    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({id: doc.id, name: doc.data().Name, ...doc.data()}))
    setLocations(locations)

  }
  
  const handleLocationChange = () => {
   console.log(orderLocationName)
  }

  const handleModalClose = () => {
    setModalState(false)
  }

  const autoClose = () => {
    setTimeout(() => {setModalState(false)}, 1000)
  }

  
  return(
    <div className={modalState === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
      <div className="modal-card-head">
        <p className="modal-card-title">Add Order</p>
      </div>
        <section className="modal-card-body">
          <form>

          <SelectInput
            selectFieldOptionsData={locations}
            selectFieldLabel="Order Location"
            selectFieldValue={activeOrder.LocationID}
            selectFieldCurrentName={activeOrder.LocationName}
            selectFieldIDRef={orderLocationID}
            selectFieldNameRef={orderLocationName}
            selectFieldChange={()=>handleLocationChange()}
             />
             
          <TextInput 
            inputFieldLabel="Vendor"
            inputFieldRef={orderVendor}
            inputFieldValue={activeOrder.OrderVendor}
          />

          <TextInput 
            inputFieldLabel="Service Ordered"
            inputFieldRef={orderServiceType}
            inputFieldValue={activeOrder.OrderServiceType}
          />

          <TextInput 
            inputFieldLabel="Order Number"
            inputFieldRef={orderNum}
            inputFieldValue={activeOrder.OrderNum}
          />  

          <TextInput 
            inputFieldLabel="Date Ordered"
            inputFieldRef={orderDate}
            inputFieldValue={activeOrder.OrderDate}
          />  

          <TextInput 
            inputFieldLabel="Order Type"
            inputFieldRef={orderType}
            inputFieldValue={activeOrder.OrderType}
          />

          <TextInput 
            inputFieldLabel="Status"
            inputFieldRef={orderStatus}
            inputFieldValue={activeOrder.OrderStatus}
          />  

          <TextInput 
            inputFieldLabel="Quoted Monthly Cost"
            inputFieldRef={orderMRC}
            inputFieldValue={activeOrder.OrderMRC}
          />
          
          <TextArea 
            inputFieldLabel="Notes"
            inputFieldRef={orderNotes}
            inputFieldValue={activeOrder.OrderNotes}
          />  
            
          </form>
        <div className="block">
          <div className="notification is-danger is-hidden">{addOrderError}</div>
         {success === true ?  <div className="notification is-success">Order Added</div> : ""}
        </div>
        <div className="modal-card-foot">
          
          <button className="button level-item"
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
export default OrderDetail