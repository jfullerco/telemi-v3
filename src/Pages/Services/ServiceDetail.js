import React, {useState, useEffect, useContext, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import Columns from '../../Components/Layout/Columns'
import Column from '../../Components/Layout/Column'
import Page from '../../Components/Page'
import DeleteButton from '../../Components/Buttons/DeleteButton'

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

  useEffect(() => {
    fetchService()
  }, [])

  const fetchService = async() => {
   
    const serviceRef = await db.collection("Services").doc(state.location.state.id).get()
    
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService({id: id, ...data})
    
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

  const autoClose = () => {
    setTimeout(() => {history.push("/dashboard")}, 1500)
  }

  const pageFields = [
    
    { label: "Service Location", dataField: "LocationName", inputFieldType: "select", inputSource: locations, inputID: "ID", inputValue: "Name" },
    { label: "Service Location ID", dataField: "LocationID", inputFieldType: "select", inputSource: locations, inputID: "ID", inputValue: "id" },
    { label: "Vendor", dataField: "Vendor", inputFieldType: "select", inputSource: vendorList, inputID: "id", inputValue: "Name" },
    { label: "Type", dataField: "Type", inputFieldType: "select", inputSource: serviceTypes, inputID: "id", inputValue: "Name"},
    { label: "Service Name", dataField: "VendorServiceName", inputFieldType: "text" },
    { label: "Access Type", dataField: "AccessType", inputFieldType: "select", inputSource: accessTypes, inputID: "id", inputValue: "Name" },
    { label: "Asset ID", dataField: "AssetID", inputFieldType: "text" },
    { label: "Bandwidth", dataField: "Bandwidth", inputFieldType: "text" },
    { label: "Monthly Cost", dataField: "MRC", inputFieldType: "text" },
    { label: "Status", dataField: "Status", inputFieldType: "select", inputSource: serviceStatusType, inputID: "id", inputValue: "Name" },
    { label: "Notes", dataField: "Notes", inputFieldType: "textarea" }
    
  ]

const handleChange = (e) => {
  e.preventDefault()
  const {name, value} = e.target
  setData({...data, [name]: value})
}
console.log(data)
  return (
      <Page title="SERVICE DETAILS" status="view" autoClose={autoClose}>
        {userContext && userContext.userSession != undefined ? 
          <>
            {activeService && pageFields.map(el => 
              <>
                {[activeService].map(h => 
                  <div className={el.visible != false ? "" : "is-hidden" }> 
                  <Columns>
                    <Column size="is-2">
                      <div className="has-text-weight-semibold" key={el.label}>
                        {el.label} 
                      </div>
                    </Column>
                    <Column size="is-1 is-narrow">:</Column>
                    <Column size="is-2">
                      <div>{h[el.dataField]}</div>
                    </Column>
                  </Columns>
                  </div>
                )}
              </>
            )}

            <>
              {pageFields.map(h => {
                switch (h.inputFieldType) {
                  case "select":
                    return (
                      <Columns>
                        <Column size="is-2 px-2 is-narrow">
                          <div className="is-size-6 has-text-weight-semibold" key={h.label}>
                            {h.label} 
                          </div>
                        </Column>
                        <Column size="is-1 is-narrow">:</Column>
                        <Column size="is-2">
                          <div className="select is-rounded is-small is-fullwidth">
                            <select type="select" name={h.dataField} value={activeService[h.dataField] && activeService[h.dataField]} onChange={handleChange}>
                              <option></option>
                                {h.inputSource && h.inputSource.map(i => 
                                  <option key={i[h.inputID]}>
                                    {i[h.inputValue]}
                                  </option>
                                )}
                            </select>
                          </div>
                        </Column>
                      </Columns> 
                    ) 
                  case "text":
                    return (
                      <Columns>
                        <Column size="is-2 px-2 is-narrow">
                          <div className="is-size-6 has-text-weight-semibold" key={h.label}>
                            {h.label} 
                          </div>
                        </Column>
                        <Column size="is-1 is-narrow">:</Column>
                        <Column size="is-2">
                          <input type="text" className="input is-rounded is-small is-fullwidth" name={h.dataField} value={activeService[h.dataField] && activeService[h.dataField]} onChange={handleChange} />
                        </Column>
                      </Columns> 
                    ) 
                  }
                }
              )}
            </>
          </> : 
        <div className="tile warning"> No record to display </div>}    
      </Page>
  )
}
export default ServiceDetailEdit