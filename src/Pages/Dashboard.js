import React, {useState, useEffect, useContext} from 'react'
import {Route, Link, useParams, useHistory} from 'react-router-dom'

import { stateContext } from '../Contexts/stateContext'

import { db } from '../Contexts/firebase'

import CompanyList from './Companies/CompanyList'

import DashboardGrids from './Dashboard/DashboardGrids'

import Login from './Login'


const Dashboard = () => {
  
  const userContext = useContext(stateContext)
  const {currentUser, userFirstName, currentCompany, companies} = userContext.userSession
  const history = useHistory()


  const isUserLoggedIn = currentUser != undefined ? currentUser : ""
  const [toggleCompanyList, setToggleCompanyList] = useState(false)
  const [toggleDashboard, setToggleDashboard] = useState(false)

  useEffect(() => {
    fetchUser(currentUser)
    isCurrentCompany()
  },[isUserLoggedIn])

  const fetchUser = async(email) => {
    
    const userRef = await db.collection("Users").where("Email", "==", email).get()
    const user = await userRef.docs.map(doc => ({id: doc.id, FirstName: doc.FirstName, Type: doc.Type, ...doc.data()}))
    userContext.setUserFirstName(user[0].FirstName)
    userContext.setUserType(user[0].Type)
    
  }

  const isCurrentCompany = () => {
    currentCompany == "" ? fetchCompanies() : ""
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
      <div> 

{/**      Dashboard Header          */        }

        {currentUser != undefined ?
          <>
             

              <div className="block">
                <span className="title has-text-black is-size-3 is-size-5-mobile" style={{textTransform: "uppercase"}}>
                  {userContext.userSession.currentCompany}
                </span>

                 
                  <span className="px-3">
                    <a className={companies && companies.length > 1 ? "link is-small is-link is-rounded is-7" : "is-hidden"} onClick={()=>setToggleCompanyList(!toggleCompanyList)}>
                      change
                    </a> 
                  </span>
                
              </div>

            

{/**      Toggle Company List          */        }

        <div className={toggleCompanyList != false ? "block" : "block is-hidden"} id="companyList">
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