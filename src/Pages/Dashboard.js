import React, {useState, useEffect, useContext} from 'react'
import {Route, Link, useParams, useHistory} from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'

import { db } from '../Contexts/firebase'

import CompanyList from './Companies/CompanyList'

import DashboardGrids from './Dashboard/DashboardGrids'

import DocViewer from './DocViewer'

import Login from './Login'


const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const { setUserType, setCurrentCompany, setCurrentCompanyID, setCompanies, setDataLoading } = userContext
  const { 
    currentUser, 
    userType, 
    currentCompany, 
    companies } = userContext.userSession
  const history = useHistory()


  const isUserLoggedIn = currentUser != undefined ? currentUser : ""
  const isUserAdmin = userType != undefined ? userType : ""
  const [toggleCompanyList, setToggleCompanyList] = useState(false)
  const [toggleDashboard, setToggleDashboard] = useState(false)

  useEffect(() => {
    fetchUser(currentUser)
    
  },[isUserLoggedIn])

  useEffect(() => {
    isCurrentCompany()
  },[isUserAdmin])

  const fetchUser = async(email) => {
    
    const userRef = await db.collection("Users").where("Email", "==", email).get()
    const user = await userRef.docs.map(doc => ({id: doc.id, FirstName: doc.FirstName, Type: doc.Type, ...doc.data()}))
    
    await userContext.setUserFirstName(user[0].FirstName)
    await setUserType(user[0].Type)
    
  }

  const isCurrentCompany = () => {
    userType != "" & userType === "Admin" ?
    currentCompany == "" ? fetchCompaniesAdmin() : "" : 
    currentCompany == "" ? fetchCompanies() : ""
  }

  const fetchCompanies = async() => {
    const companiesRef = await db.collection("Companies").where("Users", "array-contains", currentUser).get() 
     
    const companies = await companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    setCurrentCompanyID(companies[0].id)
    setCurrentCompany(companies[0].Name)
    setCompanies(companies)
    setDataLoading(false)
    console.log("Not Admin")
  }

  const fetchCompaniesAdmin = async() => {
    const companiesRef = await db.collection("Companies").get() 
    
    const companies = await companiesRef.docs.map(doc => ({id: doc.id, ...doc.data()}))
    
    setCurrentCompanyID(companies[0].id)
    setCurrentCompany(companies[0].Name)
    setCompanies(companies)
    setDataLoading(false)
    console.log("Is Admin")
  }
  
  return (   
      <div> 

{/**      Dashboard Header          */        }

        {currentUser != undefined ?
          <>
             

              <section className="hero is-small">
                <div className="hero-body">

                 <CompanyList />
                  
                </div>
              </section>

            

{/**      Toggle Company List          */        }

        <div className={toggleCompanyList != false ? "block" : "is-hidden"} id="companyList">
          <CompanyList /> 
        </div>

{/**      Display Dashboard Items          */        }        

        <div>
          <DashboardGrids />
        </div>
      </>
      : 
      <>

{/**      If not logged in          */        }  

          <Login />

        </>
        }    
    </div>
  )
}

export default Dashboard