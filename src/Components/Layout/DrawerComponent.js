import React from 'react'
import Drawer from '@material-ui/core/Drawer'

const DrawerComponent = ({
    title, 
    checked, 
    handleClose,   
    direction,
    hideBtns,
    handleSubmit,
    children 
  }) => {

  return(

    <Drawer anchor={direction} open={checked} onClose={handleClose}>

      <div className="drawerPaper">
        
        <div className="mb-2">

          <div className="title">{title && title}</div>

        </div>
        
        <div className={hideBtns === true ? "is-hidden" : "mb-2"}>
        
          <button className="button is-rounded is-link" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-rounded ml-2" onClick={handleClose}>Close</button>
        
        </div>
        {children}
      </div>
      
    </Drawer>
  )
}
export default DrawerComponent