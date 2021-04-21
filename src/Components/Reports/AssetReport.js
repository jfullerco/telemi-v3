import React, {useState, useContext} from 'react'
import {stateContext} from '../../Contexts/stateContext'

const AssetReport = () => {
  const userContext = useContext(stateContext)
  const {userSession: {sites}} = userContext
  const {userSession: {assets}} = userContext
  const [toggleModal, setToggleModal] = useState(true)
  const {site_assets} = sites
  
  const toggleModalClose = () => {
    setToggleModal(false)
  }
  
  return (
    <div className={toggleModal != true ? "modal" : "modal is-active"}>
      <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                Asset Report
              </div>
            </div>
          <div className="card-content">
            {sites != undefined ? sites.map(site => (
            <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>
                Site Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td key={site._id}>{site.site_name}</td> 
              </tr>
                <tr>
                  <td>
                    <table className="table is-striped is-fullwidth">
                      <thead>
                        <tr>
                          <th>Asset ID</th>
                          <th>Asset Vendor</th>
                          <th>Asset Type</th>
                        </tr>
                      </thead>
                      <tbody>

                      {assets != undefined ? assets.filter((el) => el.hasOwnProperty('asset_siteID') && el.asset_siteID.find((val) => val._id === site._id)).map(asset => (
                        <tr key={asset._id}>{console.log(asset)}
                          <td>{asset.asset_ID}</td> 
                          <td>{asset.asset_Vendor}</td> 
                          <td>{asset.asset_Type}</td>
                        </tr>
                        )) : (
                          <tr><td>No Assets Added</td></tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
            </tbody>
          </table>
          )) : (
            <div>No Sites added</div>
          )}
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={toggleModalClose}></button>
    </div>
  )
}

export default AssetReport