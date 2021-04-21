import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import loginService from '../Services/loginService'
import {stateContext} from '../stateContext'


export default function Login() {
  const userContext = useContext(stateContext)
  const history = useHistory()

  const [loginAttempt, setLoginAttempt] = useState({user: "", pass: ""})
  const [saveMe, setSaveMe] = useState(false)
  
  const [loginErrors, setLoginErrors] = useState("")

  const handleSubmit = async ({user, pass, save}) => {
    
    const {data: [login]} = await loginService(user, pass)
    
    login != null ? (
        login.telemiUser == user && login.telemiPass == pass ? 
          (
            userContext.setLoggedIn(true),
            localStorage.setItem('initialClientID', login.clients[0]._id),
            localStorage.setItem('userID', login._id),
            userContext.setUser(login._id),
            userContext.setClients(login.clients),
            history.push(`/dashboard/${login._id}`)
             
          ) : (
            setLoginErrors("Incorrect username or password")
          )
          ) : (
            setLoginErrors("Incorrect username or password")
          )
              
  }
  
  const handleInputChange = event => {    
    const {name, value} = event.target
    setLoginAttempt({...loginAttempt, [name]: value})
  }

  const handleKeypress = event => {
    event.key === "Enter" ? handleSubmit(loginAttempt) : ""
  }

  const handleSaveMe = event => {
    setSaveMe(!saveMe)
  }

  return(
    <>
      <div className="block"> 
        <section className="hero is-info">
          <div className="hero-body">
            <p className="title">Login</p>
          </div>
        </section>
      </div>

      <div className="columns is-mobile is-centered">    
      <div className="column is-one-third-widescreen">
      <div className="block">    
        <div className="field">
          <div className="control">
              <input
                type="text"
                placeholder="user"
                name="user"
                value={loginAttempt.user}
                onChange={handleInputChange}
                onKeyPress={handleKeypress}
                className="input is-rounded"
              />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              type="password"
              placeholder="pass"
              name="pass"
              value={loginAttempt.pass}
              onChange={handleInputChange}
              onKeyPress={handleKeypress}
              className="input is-rounded"
            />
          </div>
        </div>
        <div className="field is-grouped is-hidden">
          <input
            type="checkbox"
            name="save"
            onChange={handleSaveMe}
            className="checkbox"
          />  
          <label className="label is-small">Remember me </label>
        </div>
        <div className="control">
          <button
            className="button is-info is-rounded is-fullwidth"
            type="submit"
            onClick={()=>handleSubmit(loginAttempt)}
            
          >Login</button>
        </div>
      </div>
      </div>  
      </div>
    </>
  )

}