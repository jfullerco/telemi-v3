import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import AddAsset from './AddAsset'
import {stateContext} from '../../stateContext'

const AssetList = () => {
  const {id} = useParams()
  const userContext = useContext(stateContext)
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
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>
          Assets:
          </th>
          <th>
          Service ID
          </th>
          <th>
          Vendor
          </th>
          <th>
          Type
          </th>
          <th>
          Status
          </th>
          <th>
          <div className="button is-rounded is-small" onClick={toggleAddAssetModal}>➕</div>
          </th>
        </tr>
        </thead>
        <tbody>
        
        {siteAssets != !siteAssets ? siteAssets.map(asset => (
          <tr key={asset._id} className="content is-small">
            <td></td>
            <td>{asset.asset_ID}</td>
            <td>{asset.asset_Vendor}</td>
            <td>{asset.asset_Type}</td>
            <td>{asset.asset_Status}</td>
            <td></td>
          </tr>
        )) : (
          <tr><td>Assets loading</td></tr>
        )}
        {toggleModal === true ? <AddAsset id={id} /> : ""}
        </tbody>
      
    </table>
  )
}
export default AssetList