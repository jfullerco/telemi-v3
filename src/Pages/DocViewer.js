import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../Contexts/stateContext'
import { db } from '../Contexts/firebase'
import { pageFields } from '../Contexts/pageFields'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import EditDrawer from '../../Components/Layout/EditDrawer'
import SelectField from '../../Components/Forms/SelectField'
import TextArea from '../../Components/Forms/TextArea'
import TabBar from '../../Components/Tabs/TabBar'
import TextBox from '../../Components/Forms/TextBox'
import SelectBox from '../../Components/Forms/SelectBox'


const DocViewer = (state) => {

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

  useEffect(() => {
    
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

 
console.log()
  return (
      <></>
        
  )
}
export default DocViewer