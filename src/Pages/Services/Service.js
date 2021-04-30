import React, {useState, useRef, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

import {stateContext} from '../../Contexts/stateContext'
import {db} from '../../Contexts/firebase'

const Service = () => {

  const userContext = useContext(stateContext)
  const {currentServiceID, dataLoading} = userContext.userSession 
  const history = useHistory()
  const [activeService, setActiveService] = useState()
  const [relatedAccounts, setRelatedAccounts] = useState()

  useEffect(() => {
    fetchService()
    fetchRelatedAccounts()
  },[])

  const fetchService = async() => {
    const serviceRef = await db.collection("Services").doc(currentServiceID).get()
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService(data)
  }

  const fetchRelatedAccounts = async() => {
    const accountsRef = await db.collection("Accounts").where("AccountServiceID", "==", currentServiceID).get()
    const accounts = accountsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setRelatedAccounts(accounts)
  }

  return(
    <>
      <button className="button is-small is-rounded" onClick={()=>{history.push("/dashboard")}}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button>
      <div className="block py-3">
        {activeService != undefined ?
        <> 
        <button className="button is-rounded is-black is-fullwidth">Service Details - {activeService.AssetID}</button>

      <p className="block"></p>  

      <div className="table-container">
      <nav className="level">
        <table className="table is-fullwidth">

        <thead className="is-size-6">
            <tr>
              <th className="px-6">
               <span className="tag is-medium"> Asset ID </span>
              </th>
              <th className="px-6">
               <span className="tag is-medium"> Location </span>
              </th>
            </tr>
          </thead>
          <tbody className="is-size-6">
            <tr>
              <td className="px-6">{activeService.AssetID}</td>
              <td className="px-6">{activeService.LocationName}</td> 
            </tr>
          </tbody>
          {/** Break */}
          <thead className="is-size-6">
            <tr>
              <th className="px-6">
               <span className="tag is-medium"> Vendor </span>
              </th>
              <th className="px-6">
               <span className="tag is-medium"> Service Name </span>
              </th>
            </tr>
          </thead>
          <tbody className="is-size-6">
            <tr>
              <td className="px-6">{activeService.Vendor}</td>
              <td className="px-6">{activeService.VendorServiceName}</td> 
            </tr>
          </tbody>
          {/** Break */}
          <thead className="is-size-6">
            <tr>
              <th className="px-6">
                <span className="tag is-medium">Details</span>
              </th>
              <th className="px-6">
                <span className="tag is-medium">Related Accounts</span>
              </th>
            </tr>
          </thead>
          <tbody className="is-size-6">
            <tr>
              <td className="px-6">
                <p className="block"><strong>Type:</strong> {activeService.Type}</p>
                <p className="block"><strong>Access Handoff:</strong> {activeService.AccessType}</p>
                <p className="block"><strong>Bandwidth:</strong> {activeService.Bandwidth}</p>
              </td> 
            <td className="px-6">
              {relatedAccounts != undefined ? relatedAccounts.map(account => (
              <button className="button is-small is-rounded is-black is-outlined" key={account.id}>
                {account.AccountNum}
              </button>
              )) : ""}
            </td>
            </tr>
          </tbody>
          {/** Break */}
          <thead className="is-size-6">
            <tr>
              <th className="px-6">
               <span className="tag is-medium">Notes</span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="is-size-6">
            <tr>
              <td className="px-6">
              {activeService.Notes}
              </td> 
            </tr>
          </tbody>
             
        </table>
        </nav>
      </div>

        </>

        : ""}
      </div>
    </>
  )
}
export default Service