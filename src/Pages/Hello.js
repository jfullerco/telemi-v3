import React, {useState} from 'react'
import Register from './Register'
import {useAuth} from '../Contexts/AuthContext'

const Hello = () => {
  const [modalState, setModalState] = useState(false)
  const handleModalState = () => {
    setModalState(!modalState)
  }
  const currentUser = useAuth()
  console.log(currentUser)
  return (
    <div>
    
      <section className="hero ">
          <div className="hero-body">
            <div className="columns">
                <div className="column">
                  <div className="title has-text-weight-bold"> Telecom is hard... </div>
                    <div className="subtitle has-text-weight-light">
                      Managing it shouldn't be!
                    </div></div>
                    <div className="level">
                      <div className="column level-right">
                        <button className="button is-small is-rounded is-black" onClick={handleModalState}>
                          create your free account
                        </button>
                        
                      </div>
                    </div>
               
            </div>
          </div>
        </section>
        {modalState === true ? <Register modalState={modalState} /> : ""}
        <div className="columns is-centered ">
          <div className="column">
            <div className="notification is-light is-parent is-vertical">
              <p className="is-size-5-fullhd is-size-5-widescreen">
                <span className="has-text-weight-semibold is-uppercase">Think of this as your telecom passport</span>
              
              
              <div className="content is-size-6-fullhd is-size-6-widescreen has-text-black">
                Managing your sites and services across 100's of different vendor portals is not a solution for today's business. 
                
              </div>
              </p>
              
            </div>
          </div>
        </div>
    </div>
  )
}
export default Hello