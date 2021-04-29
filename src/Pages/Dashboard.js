import React, {useState, useEffect, useContext} from 'react'
import {Route, Link, useParams, useHistory} from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'
import {useAuth} from '../Contexts/AuthContext'

import LogoutButton from '../Components/LogoutButton'
import CompanyList from './Companies/CompanyList'
import TotalLocations from './Dashboard/Components/TotalLocations'
import DataViewer from './Dashboard/Components/DataViewer'


const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const history = useHistory()
  const {dataLoading} = userContext.userSession
  const [toggleModal, setToggleModal] = useState(false)
  const {currentUser} = useAuth()
  console.log(currentUser)
  useEffect(() => {
    userContext.setLoggedIn(currentUser)
  },[])

  const toggleAssetModal = () => {
    setToggleModal(!toggleModal)
  }
  
  return (  
       
      <> 
      {currentUser != undefined ? 
      <>
       <div className="block" id="dashboardHero"> 
        <section className="hero is-small">
          <div className="hero-body">
            <p className="title has-text-black">Dashboard</p>
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