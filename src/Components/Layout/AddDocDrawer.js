import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import DeleteButton from '../Buttons/DeleteButton'

const AddDocDrawer = ({title, checked, handleClose, handleSubmit, colRef, docRef, children }) => {
  const headerStyle = {
        borderBottomStyle: "solid",
        bottomBorderColor: "black"
      }
  return(
    <Drawer anchor="right" open={checked} onClose={handleClose}>
      <div className="drawerPaper">
        <div style={headerStyle} className="mb-2">
          <div className="title">{title}</div>
        </div>
        <div className="mb-2">
          <button className="button is-small is-rounded is-link" type="submit" onClick={handleSubmit}>Save</button>
          <button className="button is-small is-rounded ml-2" onClick={handleClose}>Close</button>
        </div>
          {children}    
      </div>
    </Drawer>
  )
}
export default AddDocDrawer