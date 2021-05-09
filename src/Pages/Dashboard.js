import React, {useState, useEffect, useContext} from 'react'
import {Route, Link, useParams, useHistory} from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'

import { db } from '../Contexts/firebase'

import LogoutButton from '../Components/LogoutButton'
import CompanyList from './Companies/CompanyList'
import TotalLocations from './Dashboard/Components/TotalLocations'
import DataViewer from './Dashboard/Components/DataViewer'
import UserDashboard from './Dashboard/Components/UserDashboard'


const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const {currentUser, userFirstName} = userContext.userSession
  const history = useHistory()
  
  const isUserLoggedIn = currentUser != undefined ? currentUser : ""

  useEffect(() => {
    fetchUser(currentUser)
  },[isUserLoggedIn])
  

  const fetchUser = async(email) => {
    
    const userRef = await db.collection("Users").where("Email", "==", email).get()
    const user = userRef.docs.map(doc => ({id: doc.id, FirstName: doc.FirstName, Type: doc.Type, ...doc.data()}))
    userContext.setUserFirstName(user[0].FirstName)
    userContext.setUserType(user[0].Type)
    
  }
  
  return (  
       
      <> 
      {currentUser != undefined ?
      <>
       <div className="block"> 
        <section className="hero is-small">
          <div className="hero-body">
            <p className="title has-text-black">Hello {userFirstName}</p>
          </div>
        </section>
      </div>
      <div className="block" id="companyList">
      <CompanyList />
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