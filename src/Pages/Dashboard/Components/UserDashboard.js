import React, {useRef, useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'

import { stateContext } from '../../../Contexts/stateContext'
import { db } from '../../../Contexts/firebase'
import DeleteButton from '../../../Components/Buttons/DeleteButton'

const ServicesTable = () => {

  const userContext = useContext(stateContext)
  const {dataLoading, setDataLoading, currentCompany} = userContext.userSession

  const [toggleTable, setToggleTable] = useState("Services")
  const [services, setServices] = useState()
  const [accounts, setAccounts] = useState()

  const tableList = [
    "Accounts",
    "Services",
    "Tickets", 
    "Orders",
    "Locations"
  ]

  useEffect(() => {
    fetchServices()
  },[currentCompany])

  const fetchServices = async() => {

    const servicesRef = await db.collection("Services").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()
    console.log(servicesRef)
    const services = servicesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

    setServices(services)
    userContext.setDataLoading(false)

  }
  const handleToggleTable = (table) => {
    setToggleTable(table)
  }
  return(
    <>
    {dataLoading != false ? 
      <div className="page-loader">
        <span className="title">Loading Data...</span>
      </div> 
    :
    <>
    <div className="title">
      <div className="field has-addons">
        <p className="control">
          <button className="button is-link is-rounded" onClick={()=>handleToggleTable("Services")}>
            <span className="icon is-left" >
              <FontAwesomeIcon icon={faCaretLeft} />
            </span>
          </button>
        </p>
        
        <p className="control is-expanded">
          <button className="button is-fullwidth is-link has-text-weight-bold">
          Services 
          </button>
        </p>
        <p className="control is-link is-rounded">
          <button className="button is-link is-rounded" onClick={()=>handleToggleTable("Accounts")}>
            <span className="icon is-right">
              <FontAwesomeIcon icon={faCaretRight} />
            </span>
          </button>
        </p>
      </div>
    </div>
  {toggleTable === "Services" ?
    <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th></th>
              <th>
                Location
              </th>
              <th>
                Asset ID
              </th>
              <th>
                Account
              </th>
              <th>
                
              </th>
              <th>
                <span className="icon is-left">
                  <FontAwesomeIcon 
                    icon={faPlus} 
                    onClick={console.log()} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="is-size-7">

          {services != undefined ? services.map(service => (
            
            <tr key={service.id} >
              <td>
                +
              </td>
              <td>
                {service.LocationName}
              </td>
              <td>
                {service.AssetID} 
              </td>
              <td>
                {service.AccountNum}
              </td>
              <td>
                <span className="tag"># of Tickets</span>
              </td>
              <td> 
                <span className="icon is-left">
                  <FontAwesomeIcon icon={faEdit} onClick={console.log()} />
                </span>
                <span className="icon is-right">
                  <DeleteButton colRef="Services" docRef={service.id} />
                </span>
              </td>
            </tr>
          )) : 
                <tr> 
                  <td> 
                    <button className="button is-rounded is-small" onClick={console.log()}>
                      Add a service
                    </button> 
                  </td> 
                </tr>
            }
          </tbody>    
        </table>
      </nav>
    </div>

    : toggleTable === "Accounts" ? 

    <div className="table-container">
      <nav className="level">
        <table className="table is-striped is-hoverable is-fullwidth has-text-centered">
          <thead>
            <tr>
            <th className="px-5">Vendor</th>
            <th className="px-5">Account</th>
            <th className="px-5">Sub Account</th>
            <th className="px-5">Location Linked</th>
            <th className="px-5">Monthly Cost</th>
            <th>
              <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                onClick={} 
              />
              </span>
            </th>
            </tr>
          </thead>
          <tbody className="is-size-7">
          {dataLoading != true ?
            accounts != undefined ? accounts.map(account => (
            
            <tr key={account.id}>
              <td >{account.Vendor}</td>
              <td >{account.ParentAccountID === "Parent" ? account.AccountNum : account.ParentAccountNum}</td>
              <td >{account.ParentAccountID != "Parent" ? account.AccountNum : ""}</td>
              <td >{account.AccountServiceLocationName} </td>
              <td >$ {account.PostTaxMRC}</td>
              <td>
                <span className="icon is-left">
                <FontAwesomeIcon icon={faEdit} onClick={}/></span>
                <span className="icon is-right">
                <DeleteButton colRef="Accounts" docRef={account.id} />
                </span>
              
              </td>
            </tr>
            
          )) : 
            <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={}>
                  Add an Account
                </button> 
              </td> 
            </tr> 
          
        : <tr><td>Fetching Data...</td></tr>}

          </tbody>    
        </table>
        </nav>
      </div>
    : ""}
  </>
    }
    </>
  )
}
export default ServicesTable