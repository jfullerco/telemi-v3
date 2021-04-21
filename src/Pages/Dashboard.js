import React, {useState, useEffect, useContext} from 'react'
import {Route, Link, Switch, Redirect, useParams} from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'
import {useAuth} from '../Contexts/AuthContext'

import LogoutButton from '../Components/LogoutButton'
import CompanyList from './Companies/CompanyList'
import TotalLocations from './Dashboard/Components/TotalLocations'
import DataViewer from './Dashboard/Components/DataViewer'

const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const {dataLoading} = userContext.userSession
  const [toggleModal, setToggleModal] = useState(false)
  const {currentUser} = useAuth()
  useEffect(() => {
    userContext.setLoggedIn(currentUser)
  },[])

  const toggleAssetModal = () => {
    setToggleModal(!toggleModal)
  }
  
  return (  
       
      <> 
       <div className="block" id="dashboardHero"> 
        <section className="hero is-small">
          <div className="hero-body">
            <p className="title">Dashboard</p>
          </div>
          
        </section>
      </div>
      
      <div className="block" id="companyList">
        <CompanyList />
      </div>

      

        <div>
          <DataViewer />
        </div>

      
     

      
  </>
  )
}

export default Dashboard