import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaRobot } from 'react-icons/fa'

const NotFound = () => {
  const history = useHistory()
  return(
    <div className="hero is-medium">

      <div className="hero-body">
        <div className="card is-rounded px-4 py-4">
       <p className="title"> <FaRobot /> SORRY ABOUT THIS... </p><p className="block"> CLICK 
         <a className="pl-1" onclick={()=>history.push("/dashboard")}>
          HERE
        </a> FOR THE DASHBOARD</p></div>
      </div>
    </div>

  )
}
export default NotFound
