import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {stateContext} from '../stateContext'
import siteService from '../Services/siteService'
import refreshSite from '../Services/refreshSite'


const DeleteSiteButton = ({id}) => {
  const history = useHistory()
  const clientID = localStorage.clientID
  const userContext = useContext(stateContext)
  const deleteEntry = async () => {
    console.log(localStorage.clientID)
    siteService.delSite(id)
    const {data} = await refreshSite(clientID)
      userContext.setSessionData({
        sites: data.sites
      })
      history.push("/sites")
  }

  return (
    <div className="button is-rounded is-small" onClick={deleteEntry}>Delete Site</div>
    )
  
}
export default DeleteSiteButton