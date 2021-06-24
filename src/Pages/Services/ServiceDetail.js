import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import EditDocDrawer from '../../Components/Layout/EditDocDrawer'
import SelectField from '../../Components/Forms/SelectField'
import TextArea from '../../Components/Forms/TextArea'
import TabBar from '../../Components/Tabs/TabBar'
import TextBox from '../../Components/Forms/TextBox'
import SelectBox from '../../Components/Forms/SelectBox'


const ServiceDetailEdit = (state) => {

  const history = useHistory()
  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          vendorList, 
          isStyle } = userContext

  const { locations,
          services, 
          orders, 
          tickets } = userContext.userSession

  const [activeService, setActiveService] = useState("")
  const [data, setData] = useState()
  const [checked, setChecked] = useState(false)
  const [tab, setTab] = useState("BASIC_INFO")

  useEffect(() => {
    fetchService()
    
  }, [])

  const fetchService = async() => {
   
    const serviceRef = await db.collection("Services").doc(state.location.state.id).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService({id: id, ...data})
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
    
    const res = await db.collection("Services").doc(activeService.id).update(data)
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
    
    { label: "Service Location", dataField: "LocationName", inputFieldType: "related-select", inputSource: locations, inputID: "id", inputValue: "Name", relatedDataField: "LocationID", tab: "BASIC_INFO"  },
    { label: "Service Location ID", dataField: "LocationID", visible: false, inputSource: locations, inputID: "ID", inputValue: "id", tab: "BASIC_INFO" },
    { label: "Vendor", dataField: "Vendor", inputFieldType: "select", inputSource: vendorList, inputID: "id", inputValue: "Name", tab: "BASIC_INFO" },
    { label: "Type", dataField: "Type", inputFieldType: "select", inputSource: serviceTypes, inputID: "id", inputValue: "Name", tab: "BASIC_INFO"},
    { label: "Service Name", dataField: "VendorServiceName", inputFieldType: "text", tab: "BASIC_INFO" },
    { label: "Access Type", dataField: "AccessType", inputFieldType: "select", inputSource: accessTypes, inputID: "id", inputValue: "Name", tab: "BASIC_INFO" },
    { label: "Asset ID", dataField: "AssetID", inputFieldType: "text", tab: "BASIC_INFO" },
    { label: "Bandwidth", dataField: "Bandwidth", inputFieldType: "text", tab: "BASIC_INFO" },
    { label: "Monthly Cost", dataField: "MRC", inputFieldType: "text", tab: "BASIC_INFO" },
    { label: "Status", dataField: "Status", inputFieldType: "select", inputSource: serviceStatusType, inputID: "id", inputValue: "Name", tab: "BASIC_INFO" },
    { label: "Notes", dataField: "Notes", inputFieldType: "text-area", tab: "BASIC_INFO" },
    { label: "Related Order", dataField: "OrderNum", inputFieldType: "related-select", inputSource: orders, inputID: "id", inputValue: "OrderNum", relatedDataField: "OrderID", tab: "DETAILS"  },
    { label: "Related Order ID", dataField: "OrderID", visible: false, inputSource: orders, inputID: "ID", inputValue: "id", tab: "DETAILS" },
    { label: "Last Updated", dataField: "LastUpdated", visible: false, inputFieldType: "text", inputValue: Date.now() },
    
  ]

const handleChange = (e) => {
  
  const {name, value} = e.target
  setActiveService({...activeService, [name]: value})
  setData({...data, [name]: value})
}

const handleRelatedSelectChange = (e, relatedDataField) => {
  e.preventDefault()
  const selectedValue = e.target.options[e.target.selectedIndex].text
  const id = e.target.options[e.target.selectedIndex].id
  const {name, relatedName} = relatedDataField
  const {value} = e.target
  
  console.log({[relatedName]: id, [name]: value})
  setActiveService({...activeService, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
}

console.log(data)
  return (
      <Page title="DETAILS" subtitle={activeService.AssetID} status="view" handleToggle={()=> handleToggle()} autoClose={autoClose}>
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
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li className="is-size-7 is-uppercase">last updated: {activeService.LastUpdated && activeService.LastUpdated}</li>
                <li className="is-size-7 is-uppercase">updated by: {activeService.LastUpdatedBy && activeService.LastUpdatedBy}</li>
              </ul>
            </nav>
            {activeService && pageFields.map(el => 
              <>
                {[activeService].map(h => 
                  <div className={el.visible != false & el.tab === tab ? "" : "is-hidden" }> 
                  <Columns options="is-mobile">
                    <Column size="is-5-mobile is-3-fullhd">
                      <div className="has-text-weight-semibold" key={el.label}>
                        {el.label} 
                      </div>
                    </Column>
                    <Column size="is-1 is-narrow">:</Column>
                    <Column >
                      <div>{h[el.dataField]}</div>
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
              colRef="Services" 
              docRef={activeService.id}
            >
              {pageFields.filter(t => t.tab === tab).map(h => { 
                switch (h.inputFieldType) {

                  case "related-select":
                    return (
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={activeService && activeService[h.dataField]} handleChange={(e)=>handleRelatedSelectChange(e, {name: h.dataField, relatedName: h.relatedDataField})} >
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
                      
                            <SelectField type="select" title={h.label} name={h.dataField} value={activeService && activeService[h.dataField]} handleChange={(e)=>handleChange(e)} >
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
                      
                          <TextBox title={h.label} name={h.dataField} value={activeService && activeService[h.dataField]} fieldChanged={(e)=>handleChange(e)} />
                        
                    ) 

                  case "text-area":
                    return (
                      
                          <TextArea title={h.label} name={h.dataField} value={activeService && activeService[h.dataField]} fieldChanged={(e)=>handleChange(e)} />
                        
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
export default ServiceDetailEdit