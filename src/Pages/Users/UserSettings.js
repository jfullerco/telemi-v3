import React, { useContext } from 'react'
import { stateContext } from '../../Contexts/stateContext'

import TileField from '../../Components/Layout/TileField'

const UserSettings = () => {
  const userContext = useContext(stateContext)
  const { currentUser } = userContext.userSession
  return(
    <div className="py-5">
    <TileField
      options="is-ancestor"
    >
      <TileField
        options="is-parent is-vertical"
      >
        <article className="tile is-child notification is-rounded has-text-black">
          <p className="title">
            USER SETTINGS
          </p>
         

            <div className="control">
              <label>
                <input className="checkbox" type="checkbox" name="welcomeScreen" defaultValue={false} /> 
                  <span className="ml-2">Show Welcome screen</span>
                </label> 
            </div>
          
        </article>
        <article className="is-child notification has-text-black"> Thanks for being patient while we incorporate new features! </article>
      </TileField>
    </TileField>
    </div>
  )
}
export default UserSettings