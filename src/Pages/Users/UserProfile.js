import React, {useContext} from 'react'
import Page from '../../Components/Page'

import {stateContext} from '../../Contexts/stateContext'

const UserProfile = () => {
  const userContext = useContext(stateContext)
  const {currentUser} = userContext.userSession
  return(
    <Page title="User Profile" subtitle={currentUser}>
      
    </Page>
  )
}
export default UserProfile