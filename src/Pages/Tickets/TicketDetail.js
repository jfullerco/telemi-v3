import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'
import {ticketDetailFields} from '../../Contexts/initialFields'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import EditDocDrawer from '../../Components/Layout/EditDocDrawer'
import SelectField from '../../Components/Forms/SelectField'
import TextArea from '../../Components/Forms/TextArea'
import TabBar from '../../Components/Tabs/TabBar'
import TextBox from '../../Components/Forms/TextBox'
import SelectBox from '../../Components/Forms/SelectBox'


const TicketDetail = (state) => {

  const params = useParams()
  const history = useHistory()
  const userContext = useContext(stateContext)

  const { serviceTypes, 
          accessTypes, 
          serviceStatusType,
          vendorList, 
          isStyle,
          setCurrentDate } = userContext

  const { locations,
          services, 
          orders,
          accounts, 
          tickets,
          currentUser,
          currentCompany,
          currentCompanyID } = userContext.userSession

  const [activeTicket, setActiveTicket] = useState("")
  const [pageFields, setPageFields] = useState(ticketDetailFields)
  const [data, setData] = useState()
  const [checked, setChecked] = useState(false)
  const [newTicket, setNewTicket] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [tab, setTab] = useState("BASIC_INFO")
  const [pageSuccess, setPageSuccess] = useState(false)
  const [pageError, setPageError] = useState(false)

  useEffect(() => {
    params.checked === "true" ? setChecked(true) : ""
    params.new === "true" ? setNewTicket(true) : 
    fetchTicket()
    handleInitialFieldMapping("Vendor", vendorList, pageFields)
    handleInitialFieldMapping("LocationName", locations, pageFields)
    handleInitialFieldMapping("AccountNum", accounts, pageFields)
    handleInitialFieldMapping("ServiceAssetID", services, pageFields)
    handleInitialFieldMapping("OrderNum", orders, pageFields)
  }, [])

  useEffect(()=> {
    newTicket === true ?
    setData({...data, ['CompanyID']: currentCompanyID, ['CompanyName']: currentCompany}) : ""
    console.log(data)
  },[newTicket])

  useEffect(() => {
    handleSetLastUpdatedFields()
  },[updated])

  const handleInitialFieldMapping = (field, value, arr) => {
    const indexRef = arr.findIndex(i => i.dataField === field)
    arr[indexRef] = {...arr[indexRef], inputSource: value}

    console.log(arr)
  
  }

  const fetchTicket = async() => {
   
    const ticketRef = await db.collection("Tickets").doc(state.location.state.id).get()
    
    const data = await ticketRef.data()
    const id = await ticketRef.id
    setActiveTicket({id: id, ...data})
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
    newTicket  === true ? 
    await db.collection("Tickets").doc().set(data) : 
    await db.collection("Tickets").doc(activeTicket.id).update(data)
    userContext.setDataLoading(true)
    handleToggle(!checked)
    handlePageSuccess()
  }

  const handleToggle = () => {
    setChecked(!checked)
  }

  const handlePageSuccess = () => {
    setPageSuccess(true)
    setTimeout(() => {setPageSuccess(false)}, 3000)
  }

  const handleSetLastUpdatedFields = () => {
    setActiveTicket({
      ...activeTicket,  
      ['LastUpdated']: setCurrentDate(),
      ['LastUpdatedBy']: currentUser
    })
    setData({
      ...data, 
      ['LastUpdated']: setCurrentDate(),
      ['LastUpdatedBy']: currentUser
    })
  }  

const handleChange = (e) => {
  const {name, value} = e.target
  setActiveTicket({...activeTicket, [name]: value})
  setData({...data, [name]: value})
  setUpdated(!updated)
}

const handleRelatedSelectChange = (e, relatedDataField) => {
  e.preventDefault()
  const selectedValue = e.target.options[e.target.selectedIndex].text
  const id = e.target.options[e.target.selectedIndex].id
  const {name, relatedName} = relatedDataField
  const {value} = e.target
  
  console.log({[relatedName]: id, [name]: value})
  setActiveTicket({...activeTicket, [relatedName]: id, [name]: value})
  setData({...data, [relatedName]: id, [name]: value})
  setUpdated(!updated)
}

console.log(data)
  return (
      <Page title="TICKET" subtitle={activeTicket.TicketNum} status={updated === true ? "edit" : "view"} handleToggle={()=> handleToggle()} pageSuccess={pageSuccess} pageError={pageError}>
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

            <div className="box p-4 is-rounded">

            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li className="is-size-7 is-uppercase">last updated: {activeTicket.LastUpdated && activeTicket.LastUpdated}</li>
                <li className="is-size-7 is-uppercase">updated by: {activeTicket.LastUpdatedBy && activeTicket.LastUpdatedBy}</li>
              </ul>
            </nav>
            {activeTicket && pageFields.map(el => 
              <>
                {[activeTicket].map(h => 
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
              handleChange={(e)=> handleChange(e)}
              handleRelatedSelectChange={(e)=> handleRelatedSelectChange(e)}
              pageFields={pageFields}
              active={activeTicket}
              tab={tab}
              direction="right"
              colRef="Tickets"
              docRef={activeTicket.id}
            />

          </div></> : 
        <div className="tile warning"> No record to display </div>}    
      </Page>
  )
}
export default TicketDetail