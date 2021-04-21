import React, {useState, useContext} from 'react'
import {stateContext} from '../../stateContext'
import siteServices from '../../Services/siteService'


const AddClient = () => {
  const userContext = useContext(stateContext)
  const initialClientState = {
    id: null,
    client_name: "",
    site_add1: "",
    site_add2: "",
    site_city: "",
    site_state: "", 
    site_phone: "",
    _parent_id: ""
  }

  const [site, setSite] = useState(initialSiteState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    setSite({...site, [name]: value})
  }

  const saveSite = async () => {
    var data = {
      site_name: site.site_name,
      site_add1: site.site_add1,
      site_add2: site.site_add2,
      site_city: site.site_city,
      site_state: site.site_state,
      site_zip: site.site_zip,
      _parent_id: id
      }
      
      await siteServices.postSite(id, data)
    
      setSubmitted(true)
      console.log()
    
  }

const newSite = () => {
  setClient(initialSiteState)
  setSubmitted(false)
}

  return (
    <div className="block is-ancestor">
      {submitted ? (
        <div>
          <h3>Site Added</h3>
          <button onClick={newSite}>Add Another</button>
        </div>
      ) : (
        <div className="column is-three-fifths">

          <label className="label">Site Name</label>
          <div className="block">
          <input
            type="text"
            id="site_name"
            value={site.site_name}
            onChange={handleInputChange}
            name="site_name"
            className="input is-rounded"
          />
        </div>

        <label className="label">Address 1</label>
          <div className="block">
          <input
            type="text"
            id="site_add1"
            value={site.site_add1}
            onChange={handleInputChange}
            name="site_add1"
            className="input is-rounded"
          />
        </div>

        <label className="label">Address 2</label>
          <div className="block">
          <input
            type="text"
            id="site_add2"
            value={site.site_add2}
            onChange={handleInputChange}
            name="site_add2"
            className="input is-rounded"
          />
        </div>

        <label className="label">City</label>
          <div className="block">
          <input
            type="text"
            id="site_city"
            value={site.site_city}
            onChange={handleInputChange}
            name="site_city"
            className="input is-rounded"
          />
        </div>

        <label className="label">State</label>
          <div className="block">
          <input
            type="text"
            id="site_state"
            value={site.site_state}
            onChange={handleInputChange}
            name="site_state"
            className="input is-rounded"
          />
        </div>

        <label className="label">Zip</label>
          <div className="block">
          <input
            type="text"
            id="site_zip"
            value={site.site_zip}
            onChange={handleInputChange}
            name="site_zip"
            className="input is-rounded"
          />
        </div>

        <div className="block">  
        <div className="control">  
        <button
         onClick={saveSite}
         className="button is-rounded is-primary is-fullwidth">Add</button>
        </div>
        </div>
        </div>
      )}
  </div>
  )
}

export default AddClient