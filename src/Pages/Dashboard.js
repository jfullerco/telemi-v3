import React, {useState, useEffect, useContext} from 'react'
import {Route, Link, useParams, useHistory} from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'
import { useAuth } from '../Contexts/AuthContext'
import { db } from '../Contexts/firebase'

import LogoutButton from '../Components/LogoutButton'
import CompanyList from './Companies/CompanyList'
import TotalLocations from './Dashboard/Components/TotalLocations'
import DataViewer from './Dashboard/Components/DataViewer'
import UserDashboard from './Dashboard/Components/UserDashboard'


const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const {currentUser} = userContext.userSession
  const history = useHistory()
  const {dataLoading, toggleAdmin} = userContext.userSession
  
  
  
  console.log(currentUser)

  useEffect(() => {
    userContext.userSession.currentUser != undefined ? fetchUser() : ""
  },[])
  

  const fetchUser = async() => {
    
    const userRef = await db.collection("Users").where("Email", "==", userContext.userSession.currentUser).get()
    const user = userRef.docs.map(doc => ({id: doc.id, userFirstName: doc.FirstName, userType: doc.Type, ...doc.data()}))
    userContext.setUserFirstName(user.userFirstName)
    userContext.setUserType(user.userType)
    
  }
  
  return (  
       
      <> 
      {currentUser != undefined ?
      <>
       <div className="block" id="dashboardHero"> 
        <section className="hero is-small">
          <div className="hero-body">
            <p className="title has-text-black">Hello {userContext.userSession.userFirstName}</p>
          </div>
        </section>
      </div>
      <div className="block" id="companyList">
        {/**<CompanyList />**/}
      </div>
      <div>
        {/**<UserDashboard />**/}
       {/** <DataViewer visible={toggleAdmin} />**/}
      </div>
      </>
      : 
      <>
      <div className="box has-text-centered">
      <p className="title has-text-centered">Please Login </p>
      <button className="button is-rounded is-dark" onClick={() => history.push("/login")}>Login</button>
      </div>
      </>
      }
     

      
  </>
  )
}

export default Dashboard