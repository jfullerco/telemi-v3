import React from 'react'
import { useHistory } from 'react-router-dom'


const DrawerPage = ({title, handleSubmit, handleClose, children}) => {

  const history = useHistory()
  
  return(
     <div className="drawerPaper">
        
        <div className="mb-2">

          <div className="title">{title && title}</div>

        </div>
        
        <div className="mb-2">
        
          <button className="button is-rounded is-link" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-rounded ml-2" onClick={handleClose}>Close</button>
        
        </div>
        {children}
      </div>
  )
}
export default DrawerPage