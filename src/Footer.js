import React from 'react'

const Footer = () => {
  return(
    <>
    <nav className="navbar footerblur is-fixed-bottom">
      
      <div className="navbar-item is-hoverable"><a className="has-text-grey is-hidden">Delete</a></div>
      <div className="is-hidden">
      
        
        <div className="navbar-item has-text-grey is-size-7 pr-3"> Terms </div> 
        <div className="navbar-item has-text-grey is-size-7 pr-3">Settings </div>
        <div className="navbar-item has-text-grey is-size-7 pr-3"> <a href="https://www.vecteezy.com/free-vector/network" className="has-text-grey">Vectors by Vecteezy</a></div>
        <div className="navbar-item has-text-grey is-size-7 pr-3">Developed by J Fuller Co </div>
     
      </div>
      </nav>
    </>
  )
}
export default Footer