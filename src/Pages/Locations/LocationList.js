import React, {useState, useEffect, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {stateContext} from '../../Contexts/stateContext'
import { db } from '../../Contexts/firebase'

import SiteListNav from '../../Components/Elements/SiteListNav'
import AddLocation from './AddLocation'
import LocationDetail from './LocationDetail'

const SiteList = () => {
  
  const userContext = useContext(stateContext)
  const currentCompany = userContext

  const [toggleModal, setToggleModal] = useState(false)
  const [toggleDetailModal, setToggleDetailModal] = useState(false)
  const [detailPanelState, setDetailPanelState] = useState(false)
  
  const toggleAddLocationModal = () => {
    setToggleModal(!toggleModal)
  }

  const handleToggleDetailModal = (id) => {
    
    userContext.setCurrentLocationID(id)
    setToggleDetailModal(!toggleDetailModal)
  }

  const handleToggleDetailPanel = () => {
    setDetailPanelState(!detailPanelState)
  }

  const [userLocations, setUserLocations] = useState("")
  
  useEffect(() => {
    
    fetchLocations()
  
  }, [])

  useEffect(() => {
    reRender()
    userContext.setDataLoading(false)
  }, [dataLoading])

  const reRender = () => {
    dataLoading != false ? fetchLocations() : ""
  }

  const fetchLocations = async() => {
   
    const locationsRef = await db.collection("Locations").where("CompanyID", "==", userContext.userSession.currentCompanyID).get()

    const locations = locationsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setUserLocations(locations)

  }

  return (
    <>
        <div className="block"> 
          <section className="hero is-info is-small">
            <div className="hero-body">
              <p className="title">Locations</p>
            <div className="subtitle"></div>
            </div>
          </section>
        </div>
              
        <div className="block">
      
        <div className="block">
          {toggleModal === true ? <AddLocation /> : ""}
          <div className="button-group">
            <button className="button is-rounded is-small" onClick={toggleAddLocationModal}>
              Add Location
            </button>
          </div>
        </div>
      
        {(userLocations != "") ? userLocations.map(location => (
        <div className="block" key={location.id}>
          
            <div className="field has-addons">
              <div className="control is-expanded">
              <div className="button is-rounded is-info is-outlined is-fullwidth" onClick={(id) => handleToggleDetailModal(location.id)} >
                
                  <div value={location.id}> {location.Name} </div>
                  
              </div>
              </div>
              <div className="control">
                <div className="button is-info is-rounded" onClick={handleToggleDetailPanel}>...</div>
              </div>
            </div>
            {toggleDetailModal != false ? <LocationDetail /> : ""}
            
        </div>
        )
        ) : (
        <span>
          <div className="button is-rounded is-danger">
              No sites have been added
          </div>
        </span>
        )}
        </div>
    </>
  )
}
export default SiteList