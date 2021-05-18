import React, {useState} from 'react'

const Section = (state) => {
  const [toggleState, setToggleState] = useState(false)
  const []
  return(
    <>
    {toggleState != false ? 
    <div className="table-container">
    <nav className="level is-centered">
      <table className="table is-striped is-fullwidth ">
        <thead className="is-size-6">
          <tr>
          <th className="px-6">Email</th>
          <th>
            <span className="icon is-left">
              <FontAwesomeIcon 
                icon={faPlus} 
                onClick={handleToggleUsersAddModal} 
              />
            </span>
          </th>
          </tr>
        </thead>
        <tbody className="is-size-7">
        {userContext.userSession.dataLoading != true ?
          users != undefined ? users.map(user => (
          <tr key={user.id}>
            <td className="px-6">
              {user.Email}
            </td>
            <td>
              {/** Insert Edit / Delete User */}
            </td>
          </tr>
        )) : 
          <tr> 
              <td> 
                <button className="button is-rounded is-small" onClick={handleToggleUsersAddModal}>
                  Add a User
                </button> 
              </td> 
            </tr>
        : <tr><td>Fetching Data...</td></tr>}
        </tbody>    
      </table>
      </nav>
    </div> : ""}
  
  </> 
  )
}
export default Section