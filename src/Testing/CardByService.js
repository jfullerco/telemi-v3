import React, {useState, useEffect, useRef, useContext} from 'react'

const CardByService = ({...service}) => {
  return(
    <div className="card is-rounded my-5">
        
      
      <div className="card-content">
      <p className="title">{service.AssetID}</p>
      
        <div className="columns">
          <div className="column is-three-quarters is-pulled-left">{service.LocationName}</div>
          <div className="column is-one-quarter is-pulled-right">${service.MRC}</div>
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-item"><a className="link">Accounts</a></div>
        <div className="card-footer-item"><a className="link">Tickets</a></div>
        <div className="card-footer-item"><a className="link">Orders</a></div>
      </div>
    </div>
  )
}
export default CardByService