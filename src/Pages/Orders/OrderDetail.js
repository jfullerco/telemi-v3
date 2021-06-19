import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import EditDrawer from '../../Components/Layout/EditDrawer'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import TabBar from '../../Components/Tabs/TabBar'

const OrderDetail = (state) => {

  const history = useHistory()
  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          orderStatusType,
          vendorList, 
          isStyle } = userContext

  const { locations,
          services, 
          orders, 
          tickets } = userContext.userSession

  const [active, setActive] = useState("")
  const [data, setData] = useState()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    fetchOrder()
    
  }, [])

  const fetchOrder = async() => {
   
    const orderRef = await db.collection("Orders").doc(state.location.state.id).get()
    
    const data = await orderRef.data()
    const id = await orderRef.id
    setActive({id: id, ...data})
    setData(data)
    console.log({id: state.location.state.id, active, data})
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
    
    setActiveService(id, data)
    
  }

  const handleSubmit = async(e) => {
    
    const res = await db.collection("Orders").doc(state.location.state.id).update(data)
    userContext.setDataLoading(true)
    console.log(res)
    handleToggle(!checked)

  }

  const handleToggle = () => {
    setChecked(!checked)
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1500)
  }

  const pageFields = [
    { label: "Order Number", dataField: "OrderNum", inputFieldType: "text" },
    { label: "Date Ordered", dataField: "OrderDate", inputFieldType: "text" },
    { label: "Vendor", dataField: "Vendor", inputFieldType: "select", inputSource: vendorList, inputID: "id", inputValue: "Name" },
    { label: "Service Name", dataField: "VendorServiceName", inputFieldType: "text" },
    { label: "Bandwidth", dataField: "Bandwidth", inputFieldType: "text" },
    { label: "Monthly Cost", dataField: "MRC", inputFieldType: "text" },
    { label: "Order Location", dataField: "LocationName", inputFieldType: "related-select", inputSource: locations, inputID: "id", inputValue: "Name", relatedDataField: "LocationID"  },
    { label: "Status", dataField: "Status", inputFieldType: "select", inputSource: orderStatusType, inputID: "id", inputValue: "Name" },
    { label: "Details", dataField: "Details", inputFieldType: "text-area" }
  ]

const handleChange = (e) => {
  
  const {name, value} = e.target
  setActive({...active, [name]: value})
  setData({...data, [name]: value})
}

const handleRelatedSelectChange = (e, relatedDataField) => {
  e.preventDefault()
  const selectedValue = e.target.options[e.target.selectedIndex].text
  const id = e.target.options[e.target.selectedIndex].id
  const {name, relatedName} = relatedDataField
  const {value} = e.target
  
  console.log({[relatedName]: id, [name]: value})
  setActive({...active, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
}

console.log(data)
  return (
      <Page title="ORDER DETAILS" status="view" handleToggle={()=> handleToggle()} autoClose={autoClose}>
        {userContext && userContext.userSession != undefined ? 
          <>
            <TabBar>
              <ul>
              <li className="is-active"><a>Basic Info</a></li>
              <li><a>Config</a></li>
              <li><a>Support</a></li>
              <li><a>Billing</a></li>
              </ul>
            </TabBar>
            {active && pageFields.map(el => 
              <>
                {[active].map(h => 
                  <div className={el.visible != false ? "" : "is-hidden" }> 
                  <Columns options="is-mobile">
                    <Column size="is-2">
                      <div className="has-text-weight-semibold" key={el.label}>
                        {el.label} 
                      </div>
                    </Column>
                    <Column size="is-1 is-narrow">:</Column>
                    <Column>
                      <div className="field">{h[el.dataField]}</div>
                    </Column>
                  </Columns>
                  </div>
                )}
              </>
            )}

            <EditDrawer 
              title="BASIC INFO" 
              checked={checked} 
              handleClose={()=>setChecked(!checked)} 
              handleSubmit={()=> handleSubmit()} 
              colRef="Services" 
              docRef={active.id}
            >
              {pageFields.map(h => {
                switch (h.inputFieldType) {

                  case "related-select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={active && active[h.dataField]} handleChange={(e)=>handleRelatedSelectChange(e, {name: h.dataField, relatedName: h.relatedDataField})} >
                              <option></option>
                                {h.inputSource && h.inputSource.map(i => 
                                  <option id={i[h.inputID]} name={i[h.dataField]}>
                                    {i[h.inputValue]}
                                  </option>
                                )}
                            </SelectField>
                        
                    ) 

                  case "select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={active && active[h.dataField]} handleChange={(e)=>handleChange(e)} >
                              <option></option>
                                {h.inputSource && h.inputSource.map(i => 
                                  <option name={i[h.dataField]}>
                                    {i[h.inputValue]} 
                                  </option>
                                )}
                            </SelectField>
                        
                    ) 

                  case "text":
                    return (
                      
                          <TextBox title={h.label} name={h.dataField} value={active && active[h.dataField]} fieldChanged={handleChange} />
                        
                    ) 

                  case "text-area":
                    return (
                      
                          <TextArea title={h.label} name={h.dataField} value={active && active[h.dataField]} fieldChanged={handleChange} />
                        
                    ) 
  
                  }
                }
              )}
              
            </EditDrawer>
          </> : 
        <div className="tile warning"> No record to display </div>}    
      </Page>
  )
}
export default OrderDetail