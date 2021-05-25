import React, {useState, useEffect, useContext} from 'react'
import {Route, Link, useParams, useHistory} from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'

import { db } from '../Contexts/firebase'

import CompanyList from './Companies/CompanyList'

import DataViewer from './Dashboard/Components/DataViewer'



const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const {currentUser, userFirstName, currentCompany} = userContext.userSession
  const history = useHistory()


  const isUserLoggedIn = currentUser != undefined ? currentUser : ""
  const [toggleCompanyList, setToggleCompanyList] = useState(false)

  useEffect(() => {
    fetchUser(currentUser)
    isCurrentCompany()
  },[isUserLoggedIn])

  const fetchUser = async(email) => {
    
    const userRef = await db.collection("Users").where("Email", "==", email).get()
    const user = userRef.docs.map(doc => ({id: doc.id, FirstName: doc.FirstName, Type: doc.Type, ...doc.data()}))
    userContext.setUserFirstName(user[0].FirstName)
    userContext.setUserType(user[0].Type)
    
  }

  const isCurrentCompany = () => {
    userContext.userSession.currentCompany == "" ? fetchCompanies() : ""
  }

  const fetchCompanies = async() => {
    
    const companiesRef = await db.collection("Companies").where("Users", "array-contains", `${currentUser}`).get()
    const companies = companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    userContext.setCurrentCompanyID(companies[0].id)
    userContext.setCurrentCompany(companies[0].Name)
    userContext.setCompanies(companies)
    userContext.setDataLoading(false)

  }
  
  return (   
      <div id="dashboard" className="dashboard"> 
        {currentUser != undefined ?
          <>
            <div className="block"> 
              <p className="block">
                <span className="title has-text-black is-size-3 is-size-5-mobile">
                  Hello, {userFirstName} 
                </span>
              </p>
              <p className="block">
                <span className="title has-text-black is-size-3 is-size-5-mobile">
                  {userContext.userSession.currentCompany}
                </span>
                {userContext.userSession.companies && userContext.userSession.companies.length > 1 ? 
                  <a className="tag is-small is-link is-rounded is-7" onClick={()=>setToggleCompanyList(!toggleCompanyList)}>change</a> 
                : ""}
              </p>
            </div>

        <div className="block" id="companyList">
          {toggleCompanyList != false ? <CompanyList /> : ""}
        </div>

        <div>
          
          <DataViewer />
        </div>

      </>
      : 
      <>

          <div className="box has-text-centered">
            <p className="title has-text-centered">Please Login </p>
            <button className="button is-rounded is-dark" onClick={() => history.push("/login")}>
              Login
            </button>
          </div>
        </>
        }    
    </div>
  )
}

export default Dashboard