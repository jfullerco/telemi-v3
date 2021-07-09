import React, { useState, useEffect, useContext } from 'react'
import {stateContext} from '../../stateContext'
import getClient from '../../Services/clientService'
import siteService from '../../Services/siteService'

const EditSiteModal = ({siteDetails, modalState}) => {

  const userContext = useContext(stateContext)

  const [site, setSite] = useState({
    site_name: siteDetails.site_name,
    site_add1: siteDetails.site_add1,
    site_add2: siteDetails.site_add2,
    site_city: siteDetails.site_city,
    site_state: siteDetails.site_state,
    site_zip: siteDetails.site_zip, 
    _id: siteDetails._id,
    _parent_id: userContext.userSession.clientID
  })

  const [toggleModal, setToggleModal] = useState(true)

  const toggleModalClose = () => {
    setToggleModal(false)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setSite({...site, [name]: value})
  }

  const patchSite = async () => {
    const id = site._id
    const data = {
    site_name: site.site_name,
    site_add1: site.site_add1,
    site_add2: site.site_add2,
    site_city: site.site_city,
    site_state: site.site_state,
    site_zip: site.site_zip, 
    _id: site._id,
    _parent_id: userContext.userSession.clientID
    }
    const response = await siteService.putSite(id, site)
    await getClient(userContext.userSession.userID)
    setToggleModal(false)
  }

  return (
    <div className={toggleModal != true ? "modal" : "modal is-active"}>
                    <div className="modal-background"></div>
                      <div className="modal-content">
                        <div className="card">
                        <div className="card-header"><div className="card-header-title">Update Site Details</div></div>
                          <div className="card-content">

                            <div className="label">Site Name</div>
                            <input 
                              className="input is-small is-rounded" 
                              type="text"
                              name="site_name"
                              value={site.site_name}
                              onChange={handleChange}
                              
                              />
                              <div className="label">Address 1</div>
                              <input 
                              className="input is-small is-rounded" 
                              type="text"
                              name="site_add1"
                              value={site.site_add1}
                              onChange={handleChange}
                              
                              />
                              <div className="label">Address 2</div>
                              <input 
                              className="input is-small is-rounded" 
                              type="text"
                              name="site_add2"
                              value={site.site_add2}
                              onChange={handleChange}
                              
                              />
                              <div className="label">City</div>
                              <input 
                              className="input is-small is-rounded" 
                              type="text"
                              name="site_city"
                              value={site.site_city}
                              onChange={handleChange}
                              
                              />
                              <div className="label">State</div>
                              <input 
                              className="input is-small is-rounded" 
                              type="text"
                              name="site_state"
                              value={site.site_state}
                              onChange={handleChange}
                              
                              />
                              <div className="label">Zip</div>
                              <input 
                              className="input is-small is-rounded" 
                              type="text"
                              name="site_zip"
                              value={site.site_zip}
                              onChange={handleChange}
                              
                              />
                              <div className="button is-info is-small is-rounded" onClick={patchSite}>Save</div>

                          </div>
                        </div>
                      </div>
                    <button className="modal-close is-large" aria-label="close" onClick={toggleModalClose}></button>
                  </div>
  )
}
export default EditSiteModal