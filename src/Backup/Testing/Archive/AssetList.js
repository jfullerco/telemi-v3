import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import AddAsset from './AddAsset'
import {stateContext} from '../../stateContext'

const AssetList = () => {
  const {id} = useParams()
  const userContext = useContext(stateContext)
  const statusColors = {
    "Active": "is-rounded is-small is-primary",
    "Disconnected": "is-rounded is-small is-primary",
    "In Flight": "is-rounded is-small is-primary is-light",
    undefined: ""
  }
  const {userSession: {assets}} = userContext
  console.log(assets)

  const siteAssets = assets.filter((el) => 
    el.hasOwnProperty('asset_siteID') && el.asset_siteID.find((val) => val._id === id)
  )
  
  const [toggleModal, setToggleModal] = useState(false)

  const toggleAddAssetModal = () => {
    setToggleModal(!toggleModal)
  }
  console.log(siteAssets)
  return (
    <div className="block">
      <div className="button is-rounded is-small" onClick={toggleAddAssetModal}>➕</div>
      <div className="block">  
        {siteAssets != !siteAssets ? siteAssets.map(asset => (
          
          
          <div
            key={asset._id} 
            className={`${
              asset.asset_Status === "Active" ? "button is-rounded is-small is-primary is-fullwidth" : 
              asset.asset_Status === "Disconnected" ? "button is-rounded is-small is-primary" : 
              asset.asset_Status === "In Flight" ? "button is-rounded is-small is-primary is-light" : 
              "button is-rounded is-small is-info"
            }`}>
            
            <div className="columns is-mobile">
            <div className="column ">{asset.asset_ID}</div>
            <div className="column ">{asset.asset_Vendor}</div>
            <div className="column ">{asset.asset_Type}</div>
            </div>
            
          </div>  
          
        )) : (
          <tr><td>Assets loading</td></tr>
        
        )}
        {toggleModal === true ? <AddAsset id={id} /> : ""}
      </div> 
    </div>
  )
}
export default AssetList