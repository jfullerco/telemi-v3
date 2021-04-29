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

  useEffect(() => {
    fetchService()
  },[])

  const fetchService = async() => {
    const serviceRef = await db.collection("Services").doc(currentServiceID).get()
    const data = await serviceRef.data()
    const id = await serviceRef.id
    setActiveService(data)
  }

  return(
    <>
      <button className="button is-small is-rounded" onClick={()=>{history.push("/dashboard")}}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button>
      <p className="block py-3">
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
                Asset ID
              </th>
              <th className="px-6">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="is-size-7">
            <tr>
              <td className="px-6">{activeService.AssetID}</td>
              <td className="px-6">{activeService.LocationName}</td> 
            </tr>
          </tbody>
          {/** Break */}
          <thead className="is-size-6">
            <tr>
              <th className="px-6">
                Vendor
              </th>
              <th className="px-6">
                Service Name
              </th>
            </tr>
          </thead>
          <tbody className="is-size-7">
            <tr>
              <td className="px-6">{activeService.Vendor}</td>
              <td className="px-6">{activeService.VendorServiceName}</td> 
            </tr>
          </tbody>
          {/** Break */}
          <thead className="is-size-6">
            <tr>
              <th className="px-6">
                Details
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="is-size-7">
            <tr>
              <td className="px-6">
              <p className="block"><strong>Type:</strong> {activeService.Type}</p>
              <p className="block"><strong>Access Handoff:</strong> {activeService.AccessType}</p>
              <p className="block"><strong>Bandwidth:</strong> {activeService.Bandwidth}</p>
              </td> 
            </tr>
          </tbody>
             
        </table>
        </nav>
      </div>

        </>

        : ""}
      </p>
    </>
  )
}
export default Service