import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import EditDocDrawer from '../../Components/Layout/EditDocDrawer'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'
import TabBar from '../../Components/Tabs/TabBar'

const OrderDetail = (state) => {
  const params = useParams()
  
  const history = useHistory()
  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          orderStatusType,
          orderType,
          vendorList, 
          isStyle } = userContext

  const { locations,
          services, 
          orders, 
          tickets, 
          currentCompany,
          currentCompanyID } = userContext.userSession

  const [activeOrder, setActiveOrder] = useState("")
  const [data, setData] = useState()
  const [checked, setChecked] = useState(false)
  const [newOrder, setNewOrder] = useState(false)
  const [tab, setTab] = useState("BASIC_INFO")
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)

  useEffect(() => {
    params.checked === "true" ? setChecked(true) : ""
    params.new === "true" ? setNewOrder(true) : 
    fetchOrder()
    
  }, [])

  useEffect(()=> {
    newOrder === true ?
    setData({...data, ['CompanyID']: currentCompanyID, ['CompanyName']: currentCompany}) : ""
    console.log(data)
  },[newOrder])

  const fetchOrder = async() => {
   
    const orderRef = await db.collection("Orders").doc(params.id).get()
    
    const data = await orderRef.data()
    const id = await orderRef.id
    setActiveOrder({id: id, ...data})
    setData(data)
    
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
    newOrder  === true ? 
    
    await db.collection("Orders").doc().set(data) : 
    await db.collection("Orders").doc(state.location.state.id).update(data)
    userContext.setDataLoading(true)
    console.log()
    handleToggle(!checked)

  }

  const handleToggle = () => {
    setChecked(!checked)
  }

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1500)
  }

  const pageFields = [
    { 
      label: "Order Number", 
      dataField: "OrderNum", 
      inputFieldType: "text", 
      tab: "BASIC_INFO" 
    },
    { 
      label: "Date Ordered", 
      dataField: "OrderDate", 
      inputFieldType: "datepicker", 
      tab: "BASIC_INFO" 
    },
    { 
      label: "Vendor", 
      dataField: "Vendor", 
      inputFieldType: "select", 
      inputSource: vendorList, 
      inputID: "id", 
      inputValue: "Name", 
      tab: "BASIC_INFO" 
    },
    { 
      label: "Service Name", 
      dataField: "VendorServiceName", 
      inputFieldType: "text", 
      tab: "BASIC_INFO" 
    },
    {
      label: "Order Type",
      dataField: "Type",
      inputField: "select",
      inputSource: orderType,
      inputID: "id",
      inputValue: "Name",
      tab: "BASIC_INFO"
    },
    { 
      label: "Bandwidth", 
      dataField: "Bandwidth", 
      inputFieldType: "text", 
      tab: "BASIC_INFO" 
    },
    { 
      label: "Monthly Cost", 
      dataField: "MRC", 
      inputFieldType: "currency", 
      tab: "BASIC_INFO" 
    },
    { 
      label: "Order Location", 
      dataField: "LocationName", 
      inputFieldType: "related-select", 
      inputSource: locations, 
      inputID: "id", 
      inputValue: "Name", 
      relatedDataField: "LocationID", 
      tab: "BASIC_INFO" 
    },
    { 
      label: "Status", 
      dataField: "Status", 
      inputFieldType: "select", 
      inputSource: orderStatusType, 
      inputID: "id", 
      inputValue: "Name", 
      tab: "BASIC_INFO" 
    },
    { 
      label: "Details", 
      dataField: "Details", 
      inputFieldType: "text-area", 
      tab: "BASIC_INFO" 
    },
    {
      label: "Notes",
      dataField: "Notes",
      inputFieldType: "map",
      tab: "DETAILS"
    }
  ]

const handleChange = (e) => {
  
  const {name, value} = e.target
  setActiveOrder({...activeOrder, [name]: value})
  setData({...data, [name]: value})
}

const handleRelatedSelectChange = (e, relatedDataField) => {
  e.preventDefault()
  const selectedValue = e.target.options[e.target.selectedIndex].text
  const id = e.target.options[e.target.selectedIndex].id
  const {name, relatedName} = relatedDataField
  const {value} = e.target
  
  console.log({[relatedName]: id, [name]: value})
  setActiveOrder({...activeOrder, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
}

console.log(data)
  return (
      <Page title={`ORDER`} subtitle={activeOrder.OrderNum} active={activeOrder.CompanyName} status="view" handleToggle={()=> handleToggle()} pageSuccess={pageSuccess} pageError={pageError}>
        {userContext && userContext.userSession != undefined ? 
          <>
            <TabBar>
              <ul>
              <li className={tab === "BASIC_INFO" ? "is-active" : ""}><a onClick={()=>setTab("BASIC_INFO")}>Basic Info</a></li>
              <li className={tab === "DETAILS" ? "is-active" : ""}><a onClick={()=>setTab("DETAILS")}>Details</a></li>
              <li className={tab === "SUPPORT" ? "is-active" : ""}><a onClick={()=>setTab("SUPPORT")}>Support</a></li>
              <li className={tab === "BILLING" ? "is-active" : ""}><a onClick={()=>setTab("BILLING")}>Billing</a></li>
              </ul>
            </TabBar>
            {activeOrder && pageFields.map(el => 
              <>
                {[activeOrder].map(h => 
                  <div className={el.visible != false & el.tab === tab ? "" : "is-hidden" }> 
                  <Columns options="is-mobile">
                    <Column size="is-5-mobile is-3-fullhd">
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

            <EditDocDrawer 
              title="BASIC INFO" 
              checked={checked} 
              handleClose={()=>setChecked(!checked)} 
              handleSubmit={()=> handleSubmit()} 
              colRef="Orders" 
              docRef={activeOrder.id}
            >
              {pageFields.map(h => {
                switch (h.inputFieldType) {

                  case "related-select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={activeOrder && activeOrder[h.dataField]} handleChange={(e)=>handleRelatedSelectChange(e, {name: h.dataField, relatedName: h.relatedDataField})} >
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
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={activeOrder && activeOrder[h.dataField]} handleChange={(e)=>handleChange(e)} >
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
                      
                          <TextBox title={h.label} name={h.dataField} value={activeOrder && activeOrder[h.dataField]} fieldChanged={handleChange} />
                        
                    ) 
                  
                    case "currency":
                      return (
                        
                            <TextBox title={h.label} name={h.dataField} value={activeOrder && activeOrder[h.dataField]} fieldChanged={handleChange} />
                          
                      )

                  case "text-area":
                    return (
                      
                          <TextArea title={h.label} name={h.dataField} value={activeOrder && activeOrder[h.dataField]} fieldChanged={handleChange} />
                        
                    ) 
                  
                    case "datepicker":
                      return (
                        
                            <TextBox 
                              id="datetime-local"
                              title={h.label}
                              type="date" 
                              name={h.dataField} 
                              className="input is-rounded is-small"
                              value={activeOrder && activeOrder[h.dataField]} 
                              fieldChanged={(e)=>handleChange(e)} 
                            />
                          
                      )

                      case "mapTEST":
                        return (
                          
                              <>
                              {activeOrder[h.dataField].map(item => 
                                <TextArea value={activeOrder} />
                              )}
                              <TextBox 
                                id="datetime-local"
                                title={h.label}
                                type="date" 
                                name={h.dataField} 
                                className="input is-rounded is-small"
                                value={activeOrder && activeOrder[h.dataField]} 
                                fieldChanged={(e)=>handleChange(e)} 
                              />
                              </>
                            
                        ) 
  
                  }
                }
              )}
              
            </EditDocDrawer>
          </> : 
        <div className="tile warning"> No record to display </div>}    
      </Page>
  )
}
export default OrderDetail