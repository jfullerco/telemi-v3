import React from 'react'
import Drawer from '@material-ui/core/Drawer'

const ViewDocDrawer = ({
    title, 
    checked, 
    handleClose,   
    direction, 
  }) => {

  return(

    <Drawer anchor={direction} open={checked} onClose={handleClose}>

      <div className="drawerPaper">
        
        <div className="mb-2">

          <div className="title">{title && title}</div>

        </div>
        
        <div className="mb-2">

          <button className="button is-small is-rounded ml-2" onClick={handleClose}>Close</button>

        </div>
        
      </div>
      
    </Drawer>
  )
}
export default ViewDocDrawer